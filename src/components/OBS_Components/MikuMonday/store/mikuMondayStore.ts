import { HubConnection } from "@microsoft/signalr";
import type {} from "@redux-devtools/extension";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { MikuMondayDto, MikuTrackDto } from "@/shared/api";
import { TelegramusHubSignalRConnectionBuilder } from "@/shared/api/signalr-clients/TelegramusHub/SignalRContext";

type ConnectionStatus = "idle" | "connecting" | "connected" | "error";

interface MikuMondayState {
  connection?: HubConnection;
  isConnected: boolean;
  status: ConnectionStatus;
  error?: string;

  // Свободные треки
  availableTracks: MikuTrackDto[];
  availableTracksCount: number;

  // Очередь алертов
  alerts: MikuMondayDto[];
  currentAlert?: MikuMondayDto;
  isAlertShowing: boolean;
}

interface MikuMondayActions {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  invoke: (methodName: string, ...args: unknown[]) => Promise<unknown>;

  fetchAvailableTracks: () => Promise<void>;
  decrementAvailableTrack: () => Promise<void>;

  handleIncomingAlert: (dto: MikuMondayDto) => void;
  dequeueCurrent: () => void;
  clearQueue: () => void;
  reset: () => void;
}

const initialState: MikuMondayState = {
  isConnected: false,
  status: "idle",
  availableTracks: [],
  availableTracksCount: 0,
  alerts: [],
  isAlertShowing: false,
};

export const useMikuMondayStore = create<MikuMondayState & MikuMondayActions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      start: async () => {
        const { connection, isConnected, status } = get();
        if (connection && (isConnected || status === "connecting")) {
          return;
        }

        set({ status: "connecting", error: undefined });

        const newConnection = TelegramusHubSignalRConnectionBuilder.build();

        // Очередь: приход нового алерта
        newConnection.on("MikuMonday", (dto: MikuMondayDto) => {
          get().handleIncomingAlert(dto);
        });

        // Обработка закрытия соединения
        newConnection.onclose(() => {
          set({ isConnected: false, status: "idle" });
        });

        try {
          await newConnection.start();
          set({
            connection: newConnection,
            isConnected: true,
            status: "connected",
          });
          await get().fetchAvailableTracks();
        } catch (e) {
          const message =
            e instanceof Error ? e.message : "Не удалось подключиться";
          set({ status: "error", error: message, isConnected: false });
          throw e;
        }
      },

      stop: async () => {
        const { connection } = get();
        if (!connection) return;
        try {
          await connection.stop();
        } finally {
          set({ ...initialState, status: "idle" });
        }
      },

      invoke: async (methodName: string, ...args: unknown[]) => {
        const { connection, isConnected } = get();
        if (!connection || !isConnected) {
          await get().start();
        }
        return await get().connection!.invoke(methodName, ...args);
      },

      fetchAvailableTracks: async () => {
        const { connection, isConnected } = get();
        if (!connection || !isConnected) {
          return;
        }
        try {
          const tracks = (await connection.invoke(
            "MikuMondayTracks"
          )) as MikuTrackDto[];

          set({
            availableTracks: tracks ?? [],
            availableTracksCount: (tracks ?? []).length,
          });
        } catch (e) {
          const message =
            e instanceof Error ? e.message : "Ошибка получения треков";
          set({ error: message });
          throw e;
        }
      },

      decrementAvailableTrack: async () => {
        const { connection, isConnected, availableTracksCount } = get();
        if (!connection || !isConnected) {
          return;
        }
        if (availableTracksCount <= 0) {
          return;
        }
        try {
          await connection.invoke("DecrementAvailableMikuTrack");
          const newCount = Math.max(0, availableTracksCount - 1);
          set({ availableTracksCount: newCount });
          if (newCount === 0) {
            await get().fetchAvailableTracks();
          }
        } catch (e) {
          const message =
            e instanceof Error ? e.message : "Ошибка списания трека";
          set({ error: message });
          throw e;
        }
      },

      handleIncomingAlert: (dto: MikuMondayDto) => {
        set(state => {
          if (!state.isAlertShowing) {
            console.debug("[MikuMonday] Новый алерт, очередь пуста", {
              displayName: dto.displayName,
              selectedTrack: dto.selectedTrack.number,
            });
            return {
              currentAlert: dto,
              isAlertShowing: true,
              alerts: [...state.alerts],
            };
          }

          const updatedAlerts = [...state.alerts, dto];
          console.debug("[MikuMonday] Алерт добавлен в очередь", {
            queueLength: updatedAlerts.length,
            displayName: dto.displayName,
            selectedTrack: dto.selectedTrack.number,
          });
          return { alerts: updatedAlerts };
        });
      },

      dequeueCurrent: () => {
        set(state => {
          if (state.alerts.length > 0) {
            const [nextAlert, ...rest] = state.alerts;
            console.debug("[MikuMonday] Показ следующего алерта", {
              queueLength: rest.length,
              displayName: nextAlert.displayName,
              selectedTrack: nextAlert.selectedTrack.number,
            });
            return {
              alerts: rest,
              currentAlert: nextAlert,
              isAlertShowing: true,
            };
          }
          console.debug("[MikuMonday] Очередь опустела");
          return {
            alerts: [],
            currentAlert: undefined,
            isAlertShowing: false,
          };
        });
      },

      clearQueue: () => {
        set({ alerts: [], currentAlert: undefined, isAlertShowing: false });
      },

      reset: () => set({ ...initialState }),
    }),
    { name: "MikuMondayStore" }
  )
);

export default useMikuMondayStore;
