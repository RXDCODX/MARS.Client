import { memo, useCallback, useEffect, useMemo, useRef } from "react";
import ReactPlayer from "react-player";

import type { PlayerState, QueueItem } from "@/shared/api";

import { useTrackProgress } from "../../Player/Desktop/useTrackProgress";
import { parseDurationToSeconds } from "../utils/parseDuration";
import styles from "./NoVideoView.module.scss";

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
 * Компонент для отображения плеера без видео
 * Используется когда videoState === PlayerStateVideoStateEnum.NoVideo
 * Показывает одну полоску с информацией о пользователе и треке
 */
function NoVideoViewComponent({
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
  const authors = currentTrack.authors?.join(", ") || "Неизвестный автор";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const progressAppliedRef = useRef<boolean>(false);

  // Используем queueItemId если доступен, иначе fallback на URL
  // queueItemId гарантирует пересоздание плеера при новом заказе
  const playerKey = queueItemId || currentTrack.url;

  // Определяем нужно ли мьютить: мьютим если не было взаимодействия ИЛИ если в стейте указан мьют
  const shouldMute = !hasUserInteracted || playerState.isMuted;

  // Сбрасываем флаг восстановления при смене трека
  useEffect(() => {
    progressAppliedRef.current = false;
  }, [queueItemId]);

  // Обработка прогресса плеера - просто обновляем процент
  const handleTimeUpdate = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      const durationSeconds = parseDurationToSeconds(currentTrack.duration);
      const currentTime = event.currentTarget?.currentTime ?? 0;

      const playedRatio =
        durationSeconds > 0 ? currentTime / durationSeconds : 0;

      onProgress({
        played: playedRatio,
        playedSeconds: currentTime,
        loaded: 0,
        loadedSeconds: 0,
      });
    },
    [currentTrack.duration, onProgress]
  );

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

  return (
    <div
      className={styles.container}
      style={{ margin: 0, padding: 0, maxWidth: "100vw" }}
    >
      {/* Скрытый аудио плеер */}
      <div className={styles.hiddenPlayer}>
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
          onProgress={(
            event: React.SyntheticEvent<HTMLVideoElement, Event>
          ) => {
            if (isMainPlayer) handleTimeUpdate(event);
          }}
          width="0"
          height="0"
          controls={false}
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
                  `[NoVideoView] Восстановлен прогресс: ${savedProgressSeconds}s для трека ${currentTrack.trackName}`
                );
              }
            }
          }}
        />
      </div>

      {/* Одна полоска с информацией */}
      <div
        className={styles.infoBar}
        style={
          {
            "--track-progress": `${isNaN(progressPercent) ? 0 : progressPercent}%`,
          } as React.CSSProperties
        }
      >
        <div className={styles.infoBarContent}>
          {/* Левая часть - пользователь */}
          <div className={styles.userInfo}>
            <span className={styles.label}>Заказал:</span>
            {userAvatar && (
              <img src={userAvatar} alt={userName} className={styles.avatar} />
            )}
            <span className={styles.userName} style={{ color: userColor }}>
              {userName}
            </span>
          </div>

          {/* Разделитель */}
          <div className={styles.divider}></div>

          {/* Правая часть - трек */}
          <div className={styles.trackInfo}>
            <div className={styles.trackName}>{currentTrack.trackName}</div>
            <div className={styles.artist}>{authors}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации
export const NoVideoView = memo(NoVideoViewComponent);
