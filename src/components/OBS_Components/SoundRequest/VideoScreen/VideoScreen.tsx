import { useCallback, useEffect, useState } from "react";
import ReactPlayer from "react-player";

import { PlayerState } from "@/shared/api";
import { SoundRequestHubSignalRContext } from "@/shared/api/signalr-clients/SoundRequestHub/SignalRHubWrapper";

import styles from "./VideoScreen.module.scss";

interface Props {
  groupName?: string;
  className?: string;
}

export function VideoScreen({ className, groupName }: Props) {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const isMainPlayer = groupName === "mainplayer";

  // Подписываемся на события изменения состояния плеера
  SoundRequestHubSignalRContext.useSignalREffect(
    "PlayerStateChange",
    (state: PlayerState) => {
      console.log("[VideoScreen] PlayerStateChange получено:", {
        hasCurrentTrack: !!state.currentTrack,
        trackName: state.currentTrack?.trackName,
        isPaused: state.isPaused,
        isStoped: state.isStoped,
        url: state.currentTrack?.url,
      });
      setPlayerState(state);
    },
    []
  );

  // Получаем начальное состояние при монтировании
  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const state = (await SoundRequestHubSignalRContext.invoke(
          "GetPlayerState"
        )) as PlayerState;

        console.log("[VideoScreen] Получено начальное состояние:", {
          hasCurrentTrack: !!state?.currentTrack,
          trackName: state?.currentTrack?.trackName,
          isPaused: state?.isPaused,
          isStoped: state?.isStoped,
        });

        if (state) {
          setPlayerState(state);
        }
      } catch (error) {
        console.error("[VideoScreen] ОШИБКА при получении состояния:", error);
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

  useEffect(() => {
    SoundRequestHubSignalRContext.invoke("Join", groupName);
  }, [groupName]);

  // Если нет текущего трека, показываем пустой экран
  if (!playerState?.currentTrack) {
    console.log("[VideoScreen] Нет трека - показываем пустой экран");
    return null;
  }

  console.log(
    "[VideoScreen] Рендерим плеер с треком:",
    playerState.currentTrack.trackName
  );

  const { currentTrack } = playerState;
  const userName =
    playerState.currentTrackRequestedByDisplayName ||
    "Неизвестный пользователь";
  const authors = currentTrack.authors?.join(", ") || "Неизвестный автор";
  const trackName = currentTrack.trackName;

  const isPlaying = !playerState.isPaused && !playerState.isStoped;
  console.log("[VideoScreen] ReactPlayer props:", {
    src: currentTrack.url,
    playing: isPlaying,
    isPaused: playerState.isPaused,
    isStoped: playerState.isStoped,
    volume: playerState.volume / 100,
    muted: playerState.isMuted,
  });

  return (
    <div className={styles.container}>
      {/* Верхняя секция - никнейм пользователя (20%) - только для mainPlayer */}
      {isMainPlayer && (
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <span className={styles.label}>Заказал:</span>
            <span className={styles.userName}>{userName}</span>
          </div>
        </div>
      )}

      {/* Средняя секция - видео плеер (70% или 100% если не mainPlayer) */}
      <div
        className={`${styles.videoSection} ${!isMainPlayer ? styles.fullScreen + " " + className : ""}`}
      >
        <ReactPlayer
          key={currentTrack.url} // Перемонтировать плеер при смене трека
          src={currentTrack.url}
          playing={isPlaying}
          volume={playerState.volume / 100}
          muted={playerState.isMuted}
          onEnded={() => isMainPlayer && handleEnded()}
          onStart={() => isMainPlayer && handleStart()}
          onError={() => isMainPlayer && handleError()}
          width="100%"
          height="100%"
          controls={false}
        />
      </div>

      {/* Нижняя секция - информация о треке (10%) - только для mainPlayer */}
      {isMainPlayer && (
        <div className={styles.trackSection}>
          <div className={styles.trackInfo}>
            <div className={styles.trackTitle}>{trackName}</div>
            <div className={styles.trackArtist}>{authors}</div>
          </div>
        </div>
      )}
    </div>
  );
}
