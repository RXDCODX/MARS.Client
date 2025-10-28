import { useEffect, useRef } from "react";
import ReactPlayer from "react-player";

import type { PlayerState, QueueItem } from "@/shared/api";

import styles from "./AudioOnlyView.module.scss";

interface Props {
  currentTrack: NonNullable<QueueItem["track"]>;
  queueItemId?: string;
  playerState: PlayerState;
  isMainPlayer: boolean;
  hasUserInteracted: boolean;
  onEnded: () => void;
  onStart: () => void;
  onError: () => void;
  onProgress: (state: {
    played: number;
    playedSeconds: number;
    loaded: number;
    loadedSeconds: number;
  }) => void;
}

/**
 * Парсит строку времени "HH:MM:SS" или "MM:SS" в секунды
 */
function parseDurationToSeconds(duration?: string): number {
  if (!duration) return 0;
  try {
    // Парсим формат времени: "HH:MM:SS" или "MM:SS"
    const parts = duration.split(":").map(part => parseFloat(part));

    if (parts.length === 3) {
      // Формат HH:MM:SS
      const [hours, minutes, seconds] = parts;
      return hours * 3600 + minutes * 60 + seconds;
    } else if (parts.length === 2) {
      // Формат MM:SS
      const [minutes, seconds] = parts;
      return minutes * 60 + seconds;
    }

    return 0;
  } catch {
    return 0;
  }
}

/**
 * Компонент для отображения только аудио
 * Используется когда videoState === PlayerStateVideoStateEnum.AudioOnly
 * Ничего не показывает на экране, только воспроизводит звук
 */
export function AudioOnlyView({
  currentTrack,
  queueItemId,
  playerState,
  isMainPlayer,
  hasUserInteracted,
  onEnded,
  onStart,
  onError,
  onProgress,
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

  return (
    <div className={styles.container}>
      {/* Полностью скрытый аудио плеер - ничего не показываем */}
      <ReactPlayer
        ref={playerRef}
        key={playerKey}
        src={currentTrack.url}
        playing={isPlaying}
        volume={playerState.volume / 100}
        muted={!isMainPlayer || shouldMute}
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
