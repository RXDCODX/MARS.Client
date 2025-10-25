import type { HubConnection } from "@microsoft/signalr";
import { TimeSpan } from "@tempestive/timespan.js";
import { useCallback, useEffect, useRef, useState } from "react";

import { PlayerState } from "@/shared/api";
import { SoundRequestHubSignalRConnectionBuilder } from "@/shared/api";

import { useVideoStateRenderer } from "./hooks";
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

  // Проверяем наличие трека
  const currentQueueItem = playerState?.currentQueueItem;
  const currentTrack = currentQueueItem?.track;
  const hasTrack = !!currentTrack;

  // Подготовка данных для хука (нужно делать до условных return'ов)
  const userName =
    currentQueueItem?.requestedByTwitchUser?.displayName ??
    currentQueueItem?.requestedByTwitchUser?.userLogin ??
    "Неизвестный пользователь";
  const authors = currentTrack?.authors?.join(", ") || "Неизвестный автор";
  const trackName = currentTrack?.trackName || "";

  // Используем хук для управления рендерингом компонентов
  // Хук ВСЕГДА должен вызываться, независимо от условий
  const { component, videoState, showSections } = useVideoStateRenderer({
    playerState,
    currentTrack,
    isMainPlayer,
    userName,
    userAvatar: currentQueueItem?.requestedByTwitchUser?.profileImageUrl,
    userColor: currentQueueItem?.requestedByTwitchUser?.chatColor,
    onEnded: handleEnded,
    onStart: handleStart,
    onError: handleError,
    onProgress: handleProgress,
  });

  // Если нет трека, показываем пустой экран
  if (!hasTrack) {
    console.log("[VideoScreen] Нет трека - показываем пустой экран");
    return null;
  }

  console.log("[VideoScreen] Рендеринг с videoState:", videoState);
  console.log("[VideoScreen] Рендерим плеер с треком:", currentTrack.trackName);

  return (
    <div className={styles.container}>
      {/* Верхняя секция - никнейм пользователя (20%) - только для Video */}
      {showSections && (
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

      {/* Средняя секция - плеер с разными видами отображения */}
      <div
        className={`${styles.videoSection} ${!isMainPlayer || !showSections ? styles.fullScreen + " " + className : ""}`}
      >
        {component}
      </div>

      {/* Нижняя секция - информация о треке (10%) - только для Video */}
      {showSections && (
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
