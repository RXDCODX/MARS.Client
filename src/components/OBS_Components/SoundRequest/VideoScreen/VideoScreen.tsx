import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";

import { SoundRequestHubSignalRContext } from "@/shared/api/signalr-clients/SoundRequestHub/SignalRHubWrapper";
import { PlayerState } from "@/shared/api/types/signalr-types";

import styles from "./VideoScreen.module.scss";

export function VideoScreen() {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);

  // Подписываемся на события изменения состояния плеера
  SoundRequestHubSignalRContext.useSignalREffect(
    "PlayerStateChange",
    (state: PlayerState) => {
      setPlayerState(state);
    },
    []
  );

  // Получаем начальное состояние при монтировании
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        await SoundRequestHubSignalRContext.invoke("BePlayer");
        const state = (await SoundRequestHubSignalRContext.invoke(
          "GetPlayerState"
        )) as PlayerState;
        if (state) {
          setPlayerState(state);
        }
      } catch (error) {
        console.error("Failed to fetch initial player state:", error);
      }
    };

    fetchInitialState();
  }, []);

  // Обработчики событий плеера
  const handleEnded = useCallback(() => {
    SoundRequestHubSignalRContext.invoke("Ended");
  }, []);

  const handleStart = useCallback(() => {
    SoundRequestHubSignalRContext.invoke("Started");
  }, []);

  const handleError = useCallback(() => {
    SoundRequestHubSignalRContext.invoke("ErrorPlaying");
  }, []);

  // Если нет текущего трека, показываем заглушку
  if (!playerState?.currentTrack) {
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>
          <h2>Ожидание трека...</h2>
        </div>
      </div>
    );
  }

  const { currentTrack, currentTrackRequestedByDisplayName } = playerState;
  const userName =
    currentTrackRequestedByDisplayName || "Неизвестный пользователь";
  const authors = currentTrack.authors?.join(", ") || "Неизвестный автор";
  const trackName = currentTrack.trackName;

  return (
    <div className={styles.container}>
      {/* Верхняя секция - никнейм пользователя (20%) */}
      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <span className={styles.label}>Заказал:</span>
          <span className={styles.userName}>{userName}</span>
        </div>
      </div>

      {/* Средняя секция - видео плеер (70%) */}
      <div className={styles.videoSection}>
        <ReactPlayer
          src={currentTrack.url}
          playing={!playerState.isPaused && !playerState.isStoped}
          volume={playerState.volume / 100}
          muted={playerState.isMuted}
          onEnded={handleEnded}
          onStart={handleStart}
          onError={handleError}
          width="100%"
          height="100%"
          controls={false}
        />
      </div>

      {/* Нижняя секция - информация о треке (10%) */}
      <div className={styles.trackSection}>
        <div className={styles.trackInfo}>
          <div className={styles.trackTitle}>{trackName}</div>
          <div className={styles.trackArtist}>{authors}</div>
        </div>
      </div>
    </div>
  );
}
