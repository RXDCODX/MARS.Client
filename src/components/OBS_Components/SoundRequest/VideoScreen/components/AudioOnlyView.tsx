import ReactPlayer from "react-player";

import type { PlayerState, QueueItem } from "@/shared/api";

import styles from "./AudioOnlyView.module.scss";

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
 * Компонент для отображения только аудио
 * Используется когда videoState === PlayerStateVideoStateEnum.AudioOnly
 * Ничего не показывает на экране, только воспроизводит звук
 */
export function AudioOnlyView({
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
      {/* Полностью скрытый аудио плеер - ничего не показываем */}
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
        width="0"
        height="0"
        controls={false}
        style={{ display: "none" }}
      />
    </div>
  );
}
