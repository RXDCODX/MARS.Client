import type { HubConnection } from "@microsoft/signalr";
import { TimeSpan } from "@tempestive/timespan.js";
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
  const lastProgressSentRef = useRef<number>(0);

  // Управление подключением к SignalR
  useEffect(() => {
    const connection = SoundRequestHubSignalRConnectionBuilder.build();
    connectionRef.current = connection;

    // Обработчик изменения состояния плеера
    const handlePlayerStateChange = (state: PlayerState) => {
      console.log("[VideoScreen] PlayerStateChange получено:", {
        hasCurrentTrack: !!state.currentQueueItem?.track,
        trackName: state.currentQueueItem?.track?.trackName,
        state: state.state,
        url: state.currentQueueItem?.track?.url,
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
    connectionRef.current
      ?.invoke("Ended", playerState?.currentQueueItem?.track)
      .catch(error => {
        console.error("[VideoScreen] Ошибка при вызове Ended:", error);
      });
  }, [playerState?.currentQueueItem?.track]);

  const handleStart = useCallback(() => {
    connectionRef.current
      ?.invoke("Started", playerState?.currentQueueItem?.track)
      .catch(error => {
        console.error("[VideoScreen] Ошибка при вызове Started:", error);
      });
  }, [playerState?.currentQueueItem?.track]);

  const handleError = useCallback(() => {
    connectionRef.current
      ?.invoke("ErrorPlaying", playerState?.currentQueueItem?.track)
      .catch(error => {
        console.error("[VideoScreen] Ошибка при вызове ErrorPlaying:", error);
      });
  }, [playerState?.currentQueueItem?.track]);

  const handleProgress = useCallback(
    (event: React.SyntheticEvent<HTMLVideoElement, Event>) => {
      // Отправляем прогресс только каждые 3 секунды, чтобы не перегружать SignalR
      const progress = event.currentTarget.currentTime;
      const timespan = new TimeSpan({ seconds: progress });
      const currentSeconds = timespan.totalSeconds;
      const lastSent = lastProgressSentRef.current;

      if (currentSeconds - lastSent >= 3) {
        lastProgressSentRef.current = currentSeconds;

        connectionRef.current
          ?.invoke("TrackProgress", timespan.totalSeconds)
          .catch(error => {
            console.error(
              "[VideoScreen] Ошибка при вызове TrackProgress:",
              error
            );
          });

        console.log(
          `[VideoScreen] Прогресс отправлен: ${timespan.totalSeconds}s (${timespan.minutes}:${timespan.seconds})`
        );
      }
    },
    []
  );

  // Если нет текущего трека, показываем пустой экран
  if (!playerState?.currentQueueItem?.track) {
    console.log("[VideoScreen] Нет трека - показываем пустой экран");
    return null;
  }

  console.log(
    "[VideoScreen] Рендерим плеер с треком:",
    playerState.currentQueueItem.track.trackName
  );

  const { currentQueueItem } = playerState;
  const currentTrack = currentQueueItem.track;
  const userName =
    currentQueueItem.requestedByTwitchUser?.displayName ??
    currentQueueItem.requestedByTwitchUser?.userLogin ??
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
            <div className={styles.userDisplay}>
              {currentQueueItem.requestedByTwitchUser?.profileImageUrl && (
                <img
                  src={currentQueueItem.requestedByTwitchUser.profileImageUrl}
                  alt={userName}
                  className={styles.userAvatar}
                />
              )}
              <span
                className={styles.userName}
                style={{
                  color: currentQueueItem.requestedByTwitchUser?.chatColor,
                }}
              >
                {userName}
              </span>
            </div>
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
          onProgress={progress => isMainPlayer && handleProgress(progress)}
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
