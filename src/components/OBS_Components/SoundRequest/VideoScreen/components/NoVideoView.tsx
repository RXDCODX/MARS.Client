import { memo, useMemo } from "react";

import type { PlayerState, QueueItem } from "@/shared/api";
import { useInjectStyles } from "@/shared/hooks/useInjectStyles";

import { useTrackProgress } from "../../Player/Desktop/useTrackProgress";
import { InfoBar } from "./InfoBar";
import styles from "./NoVideoView.module.scss";
import { useReactCustomPlayer } from "./useReactCustomPlayer";

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
  localVolume,
}: Props) {
  const authors = currentTrack.authors?.join(", ") || "Неизвестный автор";

  const { playerContainerRef, playerElement, playbackInfo } =
    useReactCustomPlayer({
      track: currentTrack,
      queueItemId,
      playerState,
      isMainPlayer,
      hasUserInteracted,
      localVolume,
      playerView: {
        width: "0",
        height: "0",
        controls: false,
      },
    });

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
    durationSec: playbackInfo.maxTrackTimeSeconds,
    isPlaying: playbackInfo.isTrackPlaying,
    trackId: trackKey,
    initialProgress: playerState.currentTrackProgress,
  });

  const progressPercent = useMemo(() => {
    if (!Number.isFinite(animatedProgress)) {
      return 0;
    }

    return Math.min(animatedProgress * 100, 100);
  }, [animatedProgress]);

  const trackName = currentTrack.trackName ?? "";

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
    "no-video-view-transparent-bg"
  );

  return (
    <div
      className={styles.container}
      style={{ margin: 0, padding: 0, maxWidth: "100vw" }}
    >
      {/* Скрытый аудио плеер */}
      <div className={styles.hiddenPlayer} ref={playerContainerRef}>
        {playerElement}
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
export const NoVideoView = memo(NoVideoViewComponent);
