import { HubConnection } from "@microsoft/signalr";
import type {} from "@redux-devtools/extension";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { MikuMondayDto, MikuTrackDto } from "@/shared/api";
import { TelegramusHubSignalRConnectionBuilder } from "@/shared/api/signalr-clients/TelegramusHub/SignalRContext";

import type { QueuedMikuMondayAlert } from "../types";

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
  alerts: QueuedMikuMondayAlert[];
  currentAlert?: QueuedMikuMondayAlert;
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
        const alert: QueuedMikuMondayAlert = {
          ...dto,
          queueId:
            dto.id ||
            (typeof crypto !== "undefined" && "randomUUID" in crypto
              ? crypto.randomUUID()
              : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`),
        };

        set(state => {
          if (!state.isAlertShowing) {
            console.debug("[MikuMonday] Новый алерт, очередь пуста", {
              alertId: alert.id,
              displayName: alert.twitchUser.displayName,
              selectedTrack: alert.selectedTrack.number,
            });
            return {
              currentAlert: alert,
              isAlertShowing: true,
              alerts: [...state.alerts],
            };
          }

          const updatedAlerts = [...state.alerts, alert];
          console.debug("[MikuMonday] Алерт добавлен в очередь", {
            alertId: alert.id,
            queueLength: updatedAlerts.length,
            displayName: alert.twitchUser.displayName,
            selectedTrack: alert.selectedTrack.number,
          });
          return { alerts: updatedAlerts };
        });
      },

      dequeueCurrent: () => {
        set(state => {
          if (state.alerts.length > 0) {
            const [nextAlert, ...rest] = state.alerts;
            console.debug("[MikuMonday] Показ следующего алерта", {
              alertId: nextAlert.id,
              queueLength: rest.length,
              displayName: nextAlert.twitchUser.displayName,
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
