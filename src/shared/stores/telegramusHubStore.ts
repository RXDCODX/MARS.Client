import { HubConnection } from "@microsoft/signalr";
import type {} from "@redux-devtools/extension";
import { PrizeType } from "react-roulette-pro";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { FumoAlertProps } from "@/components/OBS_Components/FumoAlerts/helper";
import { WaifuAlertProps } from "@/components/OBS_Components/WaifuAlerts/helper";
import { Fumo, Host, TwitchUser, Waifu } from "@/shared/api";
import { TelegramusHubSignalRConnectionBuilder } from "@/shared/api/signalr-clients/TelegramusHub/SignalRContext";
import useFumoPrizesStore from "@/shared/stores/fumoPrizesStore";
import useWaifuPrizesStore from "@/shared/stores/waifuPrizesStore";

interface TelegramusHubActions {
  start: () => Promise<void>;
  stop: () => Promise<void>;
  invoke: (methodName: string, ...args: unknown[]) => Promise<unknown>;

  dequeueCurrent: () => void;
  dequeueFumoCurrent: () => void;
}

interface TelegramusHubState {
  connection?: HubConnection;
  isConnected: boolean;

  // Очередь алертов вайфу
  messages: WaifuAlertProps[];
  currentMessage?: WaifuAlertProps;
  isWaifuShowing: boolean;

  // Очередь алертов Fumo
  fumoMessages: FumoAlertProps[];
  currentFumoMessage?: FumoAlertProps;
  isFumoShowing: boolean;
}

const initialState: TelegramusHubState = {
  isConnected: false,
  messages: [],
  isWaifuShowing: false,
  fumoMessages: [],
  isFumoShowing: false,
};

export const useTelegramusHubStore = create<
  TelegramusHubState & TelegramusHubActions
>()(
  devtools(
    (set, get) => ({
      ...initialState,

      start: async () => {
        const state = get();
        if (state.connection && state.isConnected) {
          return;
        }

        const connection = TelegramusHubSignalRConnectionBuilder.build();

        // Регистрация обработчиков событий до старта
        connection.on(
          "WaifuRoll",
          (message: Waifu, displayName: string, host: Host, color?: string) => {
            const parsed: WaifuAlertProps = {
              waifu: message,
              displayName,
              waifuHusband: host,
              color,
            };
            const { messages, isWaifuShowing } = get();
            if (!isWaifuShowing) {
              set({
                messages: [...messages],
                currentMessage: parsed,
                isWaifuShowing: true,
              });
              return;
            }
            set({ messages: [...messages, parsed] });
          }
        );

        connection.on(
          "addnewwaifu",
          (message: Waifu, displayName: string, color?: string) => {
            message.isAdded = true;
            const parsed: WaifuAlertProps = {
              waifu: message,
              displayName,
              color,
            };
            const { messages, isWaifuShowing } = get();
            if (!isWaifuShowing) {
              set({
                messages: [...messages],
                currentMessage: parsed,
                isWaifuShowing: true,
              });
              return;
            }
            set({ messages: [...messages, parsed] });
          }
        );

        connection.on(
          "Mergewaifu",
          (message: Waifu, host: Host, _avatar?: string, color?: string) => {
            message.isMerged = true;
            const parsed: WaifuAlertProps = {
              waifu: message,
              displayName: host.twitchUser!.displayName!,
              waifuHusband: host,
              color,
            };
            const { messages, isWaifuShowing } = get();
            if (!isWaifuShowing) {
              set({
                messages: [...messages],
                currentMessage: parsed,
                isWaifuShowing: true,
              });
              return;
            }
            set({ messages: [...messages, parsed] });
          }
        );

        // FumoRoll обработчик
        connection.on(
          "FumoRoll",
          (fumo: Fumo, twitchUser: TwitchUser, color?: string) => {
            const parsed: FumoAlertProps = {
              fumo,
              twitchUser,
              color,
            };
            const { fumoMessages, isFumoShowing } = get();
            if (!isFumoShowing) {
              set({
                fumoMessages: [...fumoMessages],
                currentFumoMessage: parsed,
                isFumoShowing: true,
              });
              return;
            }
            set({ fumoMessages: [...fumoMessages, parsed] });
          }
        );

        // UpdateWaifuPrizes обработчик
        const handlePrizesUpdate = (prizes: PrizeType[]) => {
          if (!prizes || prizes.length === 0) {
            return;
          }
          useWaifuPrizesStore.getState().addPrizes(prizes);
        };

        connection.on("updatewaifuprizes", handlePrizesUpdate);
        connection.on("UpdateWaifuPrizes", handlePrizesUpdate);

        // UpdateFumoPrizes обработчик
        const handleFumoPrizesUpdate = (prizes: PrizeType[]) => {
          if (!prizes || prizes.length === 0) {
            return;
          }
          useFumoPrizesStore.getState().addPrizes(prizes);
        };

        connection.on("updatefumoprizes", handleFumoPrizesUpdate);
        connection.on("UpdateFumoPrizes", handleFumoPrizesUpdate);

        await connection.start();
        set({ connection, isConnected: true });
      },

      stop: async () => {
        const { connection } = get();
        if (!connection) {
          return;
        }
        try {
          await connection.stop();
        } finally {
          set({ isConnected: false, connection: undefined });
        }
      },

      invoke: async (methodName: string, ...args: unknown[]) => {
        const { connection, isConnected } = get();
        if (!connection || !isConnected) {
          await get().start();
        }
        return await get().connection!.invoke(methodName, ...args);
      },

      dequeueCurrent: () => {
        const { messages, currentMessage } = get();
        if (messages.length > 0 && currentMessage) {
          const newArray = messages.filter(
            m => m.waifu.shikiId !== currentMessage.waifu.shikiId
          );
          if (newArray.length > 0) {
            const next = newArray[0];
            set({
              messages: newArray,
              currentMessage: next,
              isWaifuShowing: true,
            });
            return;
          }
          set({
            messages: [],
            currentMessage: undefined,
            isWaifuShowing: false,
          });
          return;
        }
        set({ messages: [], currentMessage: undefined, isWaifuShowing: false });
      },

      dequeueFumoCurrent: () => {
        const { fumoMessages, currentFumoMessage } = get();
        if (fumoMessages.length > 0 && currentFumoMessage) {
          const newArray = fumoMessages.filter(
            m => m.fumo.mfcId !== currentFumoMessage.fumo.mfcId
          );
          if (newArray.length > 0) {
            const next = newArray[0];
            set({
              fumoMessages: newArray,
              currentFumoMessage: next,
              isFumoShowing: true,
            });
            return;
          }
          set({
            fumoMessages: [],
            currentFumoMessage: undefined,
            isFumoShowing: false,
          });
          return;
        }
        set({
          fumoMessages: [],
          currentFumoMessage: undefined,
          isFumoShowing: false,
        });
      },
    }),
    { name: "TelegramusHubStore" }
  )
);

export default useTelegramusHubStore;
