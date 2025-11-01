import { memo, useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";

import type { PlayerState, QueueItem } from "@/shared/api";

import { useTrackProgress } from "../../Player/Desktop/useTrackProgress";
import { parseDurationToSeconds } from "../utils/parseDuration";
import { InfoBar } from "./InfoBar";
import styles from "./VideoPlayerView.module.scss";

interface Props {
  currentTrack: NonNullable<QueueItem["track"]>;
  queueItemId?: string;
  playerState: PlayerState;
  isMainPlayer: boolean;
  hasUserInteracted: boolean;
  userName: string;
  userAvatar?: string;
  userColor?: string;
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
 * Компонент для отображения видео плеера
 * Используется когда videoState === PlayerStateVideoStateEnum.Video
 */
function VideoPlayerViewComponent({
  currentTrack,
  queueItemId,
  playerState,
  isMainPlayer,
  hasUserInteracted,
  userName,
  userAvatar,
  userColor,
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

  // Подготовка данных для прогресс-бара
  const durationSeconds = useMemo(
    () => parseDurationToSeconds(currentTrack.duration),
    [currentTrack.duration]
  );

  const trackKey = useMemo(() => {
    if (queueItemId) {
      return queueItemId;
    }
    if (currentTrack.id) {
      return currentTrack.id;
    }
    return currentTrack.url;
  }, [currentTrack.id, currentTrack.url, queueItemId]);

  const animatedProgress = useTrackProgress({
    durationSec: durationSeconds,
    isPlaying,
    trackId: trackKey,
    initialProgress: playerState.currentTrackProgress,
  });

  const progressPercent = useMemo(() => {
    if (!Number.isFinite(animatedProgress)) {
      return 0;
    }
    return Math.min(animatedProgress * 100, 100);
  }, [animatedProgress]);

  const authors = currentTrack.authors?.join(", ") || "Неизвестный автор";
  const trackName = currentTrack.trackName ?? "";

  // Восстановление прогресса воспроизведения при загрузке трека
  useEffect(() => {
    const savedProgressSeconds = parseDurationToSeconds(
      playerState.currentTrackProgress
    );

    // Восстанавливаем прогресс только если он больше 0 и еще не применен
    if (
      savedProgressSeconds > 0 &&
      !progressAppliedRef.current &&
      playerRef.current
    ) {
      const internalPlayer = playerRef.current.getInternalPlayer();

      // Проверяем, что это HTMLVideoElement
      if (internalPlayer && "currentTime" in internalPlayer) {
        // Устанавливаем позицию воспроизведения
        (internalPlayer as HTMLVideoElement).currentTime = savedProgressSeconds;
        progressAppliedRef.current = true;

        console.log(
          `[VideoPlayerView] Восстановлен прогресс: ${savedProgressSeconds}s для трека ${currentTrack.trackName}`
        );
      }
    }
  }, [playerState.currentTrackProgress, currentTrack.trackName]);

  // Сбрасываем флаг при смене трека
  useEffect(() => {
    progressAppliedRef.current = false;
  }, [queueItemId]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.videoContainer}>
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
          width="100%"
          height="100%"
          controls={import.meta.env.DEV}
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
                  `[VideoPlayerView] Восстановлен прогресс (onReady): ${savedProgressSeconds}s для трека ${currentTrack.trackName}`
                );
              }
            }
          }}
        />
      </div>

      {/* Информационная полоска с прогрессом */}
      {isMainPlayer && (
        <InfoBar
          userName={userName}
          userAvatar={userAvatar}
          userColor={userColor}
          trackName={trackName}
          artistName={authors}
          progressPercent={progressPercent}
        />
      )}
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации
export const VideoPlayerView = memo(VideoPlayerViewComponent);
