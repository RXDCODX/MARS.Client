import { HubConnection } from "@microsoft/signalr";
import { create } from "zustand";

import type { PlayerState, QueueItem } from "@/shared/api";
import { SoundRequestHubSignalRConnectionBuilder } from "@/shared/api";

import { parseDurationToSeconds } from "../utils/parseDuration";

interface VideoScreenStoreState {
  playerState: PlayerState | null;
  hasUserInteracted: boolean;
  currentProgressSeconds: number;
  lastReportedSeconds: number;
  connection: HubConnection | null;
  isInitialized: boolean;
  localVolume: number;
  isVolumeManuallyChanged: boolean;

  init: (defaultHasUserInteracted: boolean) => Promise<void>;
  dispose: () => Promise<void>;
  markUserInteraction: () => void;
  reportProgress: (playedSeconds: number) => Promise<void>;
  notifyEnded: (track: QueueItem["track"]) => Promise<void>;
  notifyStarted: (track: QueueItem["track"]) => Promise<void>;
  notifyError: (track: QueueItem["track"]) => Promise<void>;
  setLocalVolume: (volume: number) => void;
}

function extractQueueItemId(state: PlayerState | null): string | undefined {
  return state?.currentQueueItem?.id;
}

export const useVideoScreenStore = create<VideoScreenStoreState>(
  (set, get) => ({
    playerState: null,
    hasUserInteracted: false,
    currentProgressSeconds: 0,
    lastReportedSeconds: 0,
    connection: null,
    isInitialized: false,
    localVolume: 100,
    isVolumeManuallyChanged: false,

    init: async defaultHasUserInteracted => {
      const currentState = get();

      // Если уже инициализировано, просто обновляем hasUserInteracted если нужно
      if (currentState.isInitialized) {
        if (defaultHasUserInteracted && !currentState.hasUserInteracted) {
          set({ hasUserInteracted: true });
        }
        return;
      }

      // Инициализируем localVolume из первого playerState если он уже есть
      const initialPlayerState = get().playerState;
      const initialVolume = initialPlayerState?.volume ?? 100;

      set({
        hasUserInteracted: defaultHasUserInteracted,
        isInitialized: true,
        localVolume: initialVolume,
      });

      // Закрываем существующее подключение если есть
      if (currentState.connection) {
        await currentState.connection.stop().catch(() => undefined);
      }

      const connection = SoundRequestHubSignalRConnectionBuilder.build();

      const onPlayerStateChange = async (playerState: PlayerState) => {
        const state = get();
        const previousPlayerState = state.playerState;
        const previousVideoState = previousPlayerState?.videoState;
        const nextVideoState = playerState.videoState;
        const isVideoStateChanged =
          previousPlayerState && previousVideoState !== nextVideoState;

        // Синхронизируем прогресс при смене режима отображения
        if (
          isVideoStateChanged &&
          state.currentProgressSeconds > 0 &&
          state.connection
        ) {
          try {
            await state.connection.invoke(
              "TrackProgress",
              state.currentProgressSeconds
            );
            set({ lastReportedSeconds: state.currentProgressSeconds });
          } catch (error) {
            console.error(
              "[VideoScreenStore] Не удалось синхронизировать прогресс перед сменой режима",
              error
            );
          }
        }

        const newProgressSeconds = parseDurationToSeconds(
          playerState.currentTrackProgress
        );
        const currentQueueItemId = extractQueueItemId(playerState);
        const previousQueueItemId = extractQueueItemId(previousPlayerState);
        const isNewTrack =
          currentQueueItemId && currentQueueItemId !== previousQueueItemId;

        const shouldResetProgress = isNewTrack || !previousPlayerState;

        // Синхронизируем локальную громкость с playerState только если она не была изменена вручную
        const newLocalVolume = state.isVolumeManuallyChanged
          ? state.localVolume
          : playerState.volume;

        set({
          playerState,
          currentProgressSeconds:
            shouldResetProgress && newProgressSeconds >= 0
              ? newProgressSeconds
              : newProgressSeconds > 0
                ? newProgressSeconds
                : state.currentProgressSeconds,
          lastReportedSeconds:
            shouldResetProgress && newProgressSeconds >= 0
              ? newProgressSeconds
              : state.lastReportedSeconds,
          localVolume: newLocalVolume,
        });
      };

      connection.on("PlayerStateChange", onPlayerStateChange);

      try {
        await connection.start();
        set({ connection });
        console.log("[VideoScreenStore] SignalR подключение установлено");
      } catch (error) {
        console.error(
          "[VideoScreenStore] Не удалось подключиться к SignalR",
          error
        );
      }
    },

    dispose: async () => {
      const { connection } = get();
      if (connection) {
        await connection.stop().catch(() => undefined);
      }

      set({
        playerState: null,
        hasUserInteracted: false,
        currentProgressSeconds: 0,
        lastReportedSeconds: 0,
        connection: null,
        isInitialized: false,
        localVolume: 100,
        isVolumeManuallyChanged: false,
      });
    },

    markUserInteraction: () => {
      set({ hasUserInteracted: true });
    },

    reportProgress: async playedSeconds => {
      const state = get();

      if (playedSeconds < 0) {
        return;
      }

      const shouldReportImmediately =
        playedSeconds < state.lastReportedSeconds ||
        playedSeconds - state.lastReportedSeconds >= 3;

      set({
        currentProgressSeconds: playedSeconds,
        lastReportedSeconds: shouldReportImmediately
          ? playedSeconds
          : state.lastReportedSeconds,
      });

      if (shouldReportImmediately && state.connection) {
        try {
          await state.connection.invoke("TrackProgress", playedSeconds);
        } catch (error) {
          console.error(
            "[VideoScreenStore] Не удалось отправить прогресс трека",
            error
          );
        }
      }
    },

    notifyEnded: async track => {
      const { connection } = get();

      if (!track || !connection) {
        return;
      }

      try {
        await connection.invoke("Ended", track);
      } catch (error) {
        console.error(
          "[VideoScreenStore] Не удалось отправить событие завершения трека",
          error
        );
      }
    },

    notifyStarted: async track => {
      const { connection } = get();

      if (!track || !connection) {
        return;
      }

      try {
        await connection.invoke("Started", track);
      } catch (error) {
        console.error(
          "[VideoScreenStore] Не удалось отправить событие старта трека",
          error
        );
      }
    },

    notifyError: async track => {
      const { connection } = get();

      if (!track || !connection) {
        return;
      }

      try {
        await connection.invoke("ErrorPlaying", track);
      } catch (error) {
        console.error(
          "[VideoScreenStore] Не удалось отправить событие ошибки воспроизведения",
          error
        );
      }
    },

    setLocalVolume: volume => {
      if (volume < 0 || volume > 100) {
        return;
      }

      set({
        localVolume: volume,
        isVolumeManuallyChanged: true,
      });
    },
  })
);
