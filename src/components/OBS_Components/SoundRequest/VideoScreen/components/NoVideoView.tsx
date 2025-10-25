import ReactPlayer from "react-player";

import type { PlayerState, QueueItem } from "@/shared/api";

import styles from "./NoVideoView.module.scss";

interface Props {
  currentTrack: NonNullable<QueueItem["track"]>;
  playerState: PlayerState;
  isMainPlayer: boolean;
  userName: string;
  userAvatar?: string;
  userColor?: string;
  onEnded: () => void;
  onStart: () => void;
  onError: () => void;
  onProgress: (event: React.SyntheticEvent<HTMLVideoElement, Event>) => void;
}

/**
 * Компонент для отображения плеера без видео
 * Используется когда videoState === PlayerStateVideoStateEnum.NoVideo
 * Показывает одну полоску с информацией о пользователе и треке
 */
export function NoVideoView({
  currentTrack,
  playerState,
  isMainPlayer,
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

  return (
    <div className={styles.container}>
      {/* Скрытый аудио плеер */}
      <div className={styles.hiddenPlayer}>
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
        />
      </div>

      {/* Одна полоска с информацией */}
      <div className={styles.infoBar}>
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
  );
}
