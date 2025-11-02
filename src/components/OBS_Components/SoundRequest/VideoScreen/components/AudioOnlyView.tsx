import { memo, useEffect, useRef } from "react";
import ReactPlayer from "react-player";

import type { PlayerState, QueueItem } from "@/shared/api";
import { useInjectStyles } from "@/shared/hooks/useInjectStyles";

import { parseDurationToSeconds } from "../utils/parseDuration";
import styles from "./AudioOnlyView.module.scss";

interface Props {
  currentTrack: NonNullable<QueueItem["track"]>;
  queueItemId?: string;
  playerState: PlayerState;
  isMainPlayer: boolean;
  hasUserInteracted: boolean;
  localVolume: number;
  onEnded: () => void;
  onStart: () => void;
  onError: () => void;
  onProgress: (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => void;
  onVolumeChange?: (volume: number) => void;
}

/**
 * Компонент для отображения только аудио
 * Используется когда videoState === PlayerStateVideoStateEnum.AudioOnly
 * Ничего не показывает на экране, только воспроизводит звук
 */
function AudioOnlyViewComponent({
  currentTrack,
  queueItemId,
  playerState,
  isMainPlayer,
  hasUserInteracted,
  localVolume,
  onEnded,
  onStart,
  onError,
  onProgress,
  onVolumeChange,
}: Props) {
  const isPlaying = playerState.state === "Playing";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const progressAppliedRef = useRef<boolean>(false);

  // Используем queueItemId если доступен, иначе fallback на URL
  // queueItemId гарантирует пересоздание плеера при новом заказе
  const playerKey = queueItemId || currentTrack.url;

  // Определяем нужно ли мьютить: мьютим если не было взаимодействия ИЛИ если в стейте указан мьют
  const shouldMute = !hasUserInteracted || playerState.isMuted;

  // Сбрасываем флаг при смене трека
  useEffect(() => {
    progressAppliedRef.current = false;
  }, [queueItemId]);

  // Инжектим стили для прозрачного фона
  useInjectStyles(
    `
      body {
        background-color: transparent !important;
        background: transparent !important;
      }
      
      #root {
        background-color: transparent !important;
        background: transparent !important;
      }
      
      html {
        background-color: transparent !important;
        background: transparent !important;
      }
    `,
    "audio-only-view-transparent-bg"
  );

  return (
    <div className={styles.container}>
      {/* Полностью скрытый аудио плеер - ничего не показываем */}
      <ReactPlayer
        ref={playerRef}
        key={playerKey}
        src={currentTrack.url}
        playing={isPlaying}
        volume={localVolume / 100}
        muted={!isMainPlayer || shouldMute}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onVolumeChange={(volume: any) => {
          if (onVolumeChange && typeof volume === "number") {
            onVolumeChange(volume);
          }
        }}
        onEnded={() => {
          if (isMainPlayer) onEnded();
        }}
        onStart={() => {
          if (isMainPlayer) onStart();
        }}
        onError={() => {
          if (isMainPlayer) onError();
        }}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onProgress={(state: any) => {
          if (isMainPlayer) onProgress(state);
        }}
        width="0"
        height="0"
        controls={false}
        style={{ display: "none" }}
        onReady={() => {
          // Применяем прогресс при готовности плеера
          const savedProgressSeconds = parseDurationToSeconds(
            playerState.currentTrackProgress
          );

          if (
            savedProgressSeconds > 0 &&
            !progressAppliedRef.current &&
            playerRef.current
          ) {
            const internalPlayer = playerRef.current.getInternalPlayer();

            if (internalPlayer && "currentTime" in internalPlayer) {
              (internalPlayer as HTMLVideoElement).currentTime =
                savedProgressSeconds;
              progressAppliedRef.current = true;

              console.log(
                `[AudioOnlyView] Восстановлен прогресс: ${savedProgressSeconds}s для трека ${currentTrack.trackName}`
              );
            }
          }
        }}
      />
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации
export const AudioOnlyView = memo(AudioOnlyViewComponent);
