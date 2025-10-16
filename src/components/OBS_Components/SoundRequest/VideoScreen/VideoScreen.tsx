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
        console.log("[VideoScreen] Подключаемся к группе player...");
        await SoundRequestHubSignalRContext.invoke("BePlayer", []);
        console.log("[VideoScreen] Успешно подключились к группе player");

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

  // Если нет текущего трека, показываем заглушку
  if (!playerState?.currentTrack) {
    console.log("[VideoScreen] Рендерим заглушку - нет трека");
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>
          <h2>Ожидание трека...</h2>
          <p style={{ fontSize: "12px", opacity: 0.5, marginTop: "10px" }}>
            PlayerState: {playerState ? "есть" : "нет"}, CurrentTrack:{" "}
            {playerState?.currentTrack ? "есть" : "нет"}
          </p>
        </div>
      </div>
    );
  }

  console.log(
    "[VideoScreen] Рендерим плеер с треком:",
    playerState.currentTrack.trackName
  );

  const { currentTrack, currentTrackRequestedByDisplayName } = playerState;
  const userName =
    currentTrackRequestedByDisplayName || "Неизвестный пользователь";
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
          key={currentTrack.url} // Перемонтировать плеер при смене трека
          src={currentTrack.url}
          playing={isPlaying}
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
