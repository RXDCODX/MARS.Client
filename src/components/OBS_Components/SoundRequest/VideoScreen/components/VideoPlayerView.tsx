import { memo, useCallback, useEffect, useMemo, useRef } from "react";
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

  // Отслеживание изменений громкости через внутренний плеер
  // Используем ref для хранения функции cleanup
  const volumeTrackingCleanupRef = useRef<(() => void) | null>(null);

  // Очистка обработчика при размонтировании или смене трека
  useEffect(
    () => () => {
      if (volumeTrackingCleanupRef.current) {
        volumeTrackingCleanupRef.current();
        volumeTrackingCleanupRef.current = null;
      }
    },
    [playerKey]
  );

  // Функция для установки обработчика на готовый плеер
  const setupVolumeTracking = useCallback(() => {
    if (!playerRef.current || !onVolumeChange) {
      return;
    }

    // Очищаем предыдущий обработчик
    if (volumeTrackingCleanupRef.current) {
      volumeTrackingCleanupRef.current();
      volumeTrackingCleanupRef.current = null;
    }

    // Проверяем, что getInternalPlayer существует
    if (typeof playerRef.current.getInternalPlayer !== "function") {
      console.warn(
        "[VideoPlayerView] getInternalPlayer не доступен на playerRef"
      );
      return;
    }

    const internalPlayer = playerRef.current.getInternalPlayer();
    if (
      !internalPlayer ||
      !("volume" in internalPlayer) ||
      !("addEventListener" in internalPlayer)
    ) {
      console.warn(
        "[VideoPlayerView] Внутренний плеер не поддерживает отслеживание громкости"
      );
      return;
    }

    const handleVolumeChange = () => {
      const mediaElement = internalPlayer as HTMLMediaElement;
      const newVolume = mediaElement.volume;
      if (typeof newVolume === "number" && newVolume >= 0 && newVolume <= 1) {
        onVolumeChange(newVolume);
      }
    };

    (internalPlayer as HTMLMediaElement).addEventListener(
      "volumechange",
      handleVolumeChange
    );

    volumeTrackingCleanupRef.current = () => {
      (internalPlayer as HTMLMediaElement).removeEventListener(
        "volumechange",
        handleVolumeChange
      );
    };

    console.log("[VideoPlayerView] Отслеживание громкости установлено");
  }, [onVolumeChange]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.videoContainer}>
        <ReactPlayer
          ref={playerRef}
          key={playerKey}
          src={currentTrack.url}
          playing={isPlaying}
          volume={localVolume / 100}
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
          controls={true}
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

            // Устанавливаем отслеживание изменения громкости
            setupVolumeTracking();
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
