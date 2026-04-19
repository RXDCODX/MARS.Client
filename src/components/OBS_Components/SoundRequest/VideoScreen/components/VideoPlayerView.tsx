import { memo, useEffect, useMemo } from "react";

import type { PlayerState, QueueItem } from "@/shared/api";

import { parseDurationToSeconds } from "../utils/parseDuration";
import { InfoBar } from "./InfoBar";
import { useReactCustomPlayer } from "./useReactCustomPlayer";
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
}: Props) {
  const { playerContainerRef, playerElement, playbackInfo } =
    useReactCustomPlayer({
      track: currentTrack,
      queueItemId,
      playerState,
      isMainPlayer,
      hasUserInteracted,
      localVolume,
      pauseSuppressionMs: 900,
      playerView: {
        width: "100%",
        height: "100%",
        controls: true,
      },
    });

  const durationSeconds = playbackInfo.maxTrackTimeSeconds;

  const trackKey = useMemo(() => {
    if (queueItemId) {
      return queueItemId;
    }
    if (currentTrack.id) {
      return currentTrack.id;
    }
    return currentTrack.url;
  }, [currentTrack.id, currentTrack.url, queueItemId]);

  const authors = currentTrack.authors?.join(", ") || "Неизвестный автор";
  const trackName = currentTrack.trackName ?? "";

  useEffect(() => {
    const externalProgressSec = parseDurationToSeconds(
      playerState.currentTrackProgress
    );
    const progressPercentForLog =
      durationSeconds > 0
        ? Math.min(
            Math.max((externalProgressSec / durationSeconds) * 100, 0),
            100
          )
        : 0;

    console.log("[VideoPlayerView][InfoBarProgress]", {
      trackKey,
      trackName: currentTrack.trackName,
      durationSeconds,
      rawProgressIso: playerState.currentTrackProgress,
      externalProgressSec,
      progressPercent: progressPercentForLog,
      isPlaying: playbackInfo.isTrackPlaying,
    });
  }, [
    durationSeconds,
    playerState.currentTrackProgress,
    playbackInfo.isTrackPlaying,
    trackKey,
    currentTrack.trackName,
  ]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.videoContainer} ref={playerContainerRef}>
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
          currentTrackProgress={playbackInfo.currentSecondProgress}
          trackDuration={currentTrack.duration}
        />
      )}
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации
export const VideoPlayerView = memo(VideoPlayerViewComponent);
