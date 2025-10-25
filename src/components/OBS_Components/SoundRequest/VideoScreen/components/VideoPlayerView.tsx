import ReactPlayer from "react-player";

import type { PlayerState, QueueItem } from "@/shared/api";

import styles from "./VideoPlayerView.module.scss";

interface Props {
  currentTrack: NonNullable<QueueItem["track"]>;
  playerState: PlayerState;
  isMainPlayer: boolean;
  onEnded: () => void;
  onStart: () => void;
  onError: () => void;
  onProgress: (event: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
}

/**
 * Компонент для отображения видео плеера
 * Используется когда videoState === PlayerStateVideoStateEnum.Video
 */
export function VideoPlayerView({
  currentTrack,
  playerState,
  isMainPlayer,
  onEnded,
  onStart,
  onError,
  onProgress,
}: Props) {
  const isPlaying = playerState.state === "Playing";

  return (
    <div className={styles.container}>
      <ReactPlayer
        key={currentTrack.url}
        src={currentTrack.url}
        playing={isPlaying}
        volume={playerState.volume / 100}
        muted={!isMainPlayer || playerState.isMuted}
        onEnded={() => isMainPlayer && onEnded()}
        onStart={() => isMainPlayer && onStart()}
        onError={() => isMainPlayer && onError()}
        onProgress={progress => isMainPlayer && onProgress(progress)}
        width="100%"
        height="100%"
        controls={false}
      />
    </div>
  );
}

