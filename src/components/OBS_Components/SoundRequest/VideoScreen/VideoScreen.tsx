import type { HubConnection } from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

import { PlayerState, PlayerStateStateEnum } from "@/shared/api";
import { SoundRequestHubSignalRConnectionBuilder } from "@/shared/api";

import styles from "./VideoScreen.module.scss";

interface Props {
  groupName?: string;
  className?: string;
}

export function VideoScreen({ className, groupName = "mainplayer" }: Props) {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const isMainPlayer = groupName === "mainplayer";
  const connectionRef = useRef<HubConnection | null>(null);

  // Управление подключением к SignalR
  useEffect(() => {
    const connection = SoundRequestHubSignalRConnectionBuilder.build();
    connectionRef.current = connection;

    // Обработчик изменения состояния плеера
    const handlePlayerStateChange = (state: PlayerState) => {
      console.log("[VideoScreen] PlayerStateChange получено:", {
        hasCurrentTrack: !!state.currentTrack,
        trackName: state.currentTrack?.trackName,
        state: state.state,
        url: state.currentTrack?.url,
      });
      setPlayerState(state);
    };

    // Подписываемся на события
    connection.on("PlayerStateChange", handlePlayerStateChange);

    // Запускаем подключение
    connection
      .start()
      .then(async () => {
        console.log("[VideoScreen] Подключение установлено");

        // Присоединяемся к группе
        await connection.invoke("Join", groupName);
        if (isMainPlayer) {
          console.warn("ЭТО МЕЙН ПЛЕЕР");
        }
      })
      .catch(error => {
        console.error("[VideoScreen] Ошибка подключения к SignalR:", error);
      });

    // Очистка при размонтировании
    return () => {
      connection.off("PlayerStateChange", handlePlayerStateChange);
      connection.stop().catch(() => undefined);
      if (connectionRef.current === connection) {
        connectionRef.current = null;
      }
    };
  }, [groupName, isMainPlayer]);

  // Обработчики событий плеера
  const handleEnded = useCallback(() => {
    connectionRef.current?.invoke("Ended").catch(error => {
      console.error("[VideoScreen] Ошибка при вызове Ended:", error);
    });
  }, []);

  const handleStart = useCallback(() => {
    connectionRef.current?.invoke("Started").catch(error => {
      console.error("[VideoScreen] Ошибка при вызове Started:", error);
    });
  }, []);

  const handleError = useCallback(() => {
    connectionRef.current?.invoke("ErrorPlaying").catch(error => {
      console.error("[VideoScreen] Ошибка при вызове ErrorPlaying:", error);
    });
  }, []);

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
    playerState.currentTrackRequestedByTwitchUser?.displayName ||
    "Неизвестный пользователь";
  const authors = currentTrack.authors?.join(", ") || "Неизвестный автор";
  const trackName = currentTrack.trackName;

  const isPlaying = playerState.state === PlayerStateStateEnum.Playing;
  console.log("[VideoScreen] ReactPlayer props:", {
    src: currentTrack.url,
    playing: isPlaying,
    state: playerState.state,
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
          muted={!isMainPlayer || playerState.isMuted}
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
