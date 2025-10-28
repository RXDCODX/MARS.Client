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
  // В production режиме считаем что интеракция уже была (не мьютим)
  const [hasUserInteracted, setHasUserInteracted] = useState<boolean>(
    import.meta.env.PROD
  );
  const isMainPlayer = groupName === "mainplayer";
  const connectionRef = useRef<HubConnection | null>(null);
  const lastProgressSentRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0); // Храним текущий прогресс
  const previousVideoStateRef = useRef<string | undefined>(undefined); // Храним предыдущий videoState

  // Отслеживание взаимодействия пользователя со страницей
  // В production режиме пропускаем эту логику
  const handleUserInteraction = useCallback(() => {
    if (!hasUserInteracted) {
      console.log("[VideoScreen] Пользователь взаимодействовал со страницей");
      setHasUserInteracted(true);
    }
  }, [hasUserInteracted]);

  useEffect(() => {
    // В production режиме не нужно ждать интеракции
    if (import.meta.env.PROD) {
      return;
    }

    // Подписываемся на события взаимодействия пользователя
    document.addEventListener("click", handleUserInteraction, { once: true });
    document.addEventListener("touchstart", handleUserInteraction, {
      once: true,
    });

    // Очистка при размонтировании
    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [handleUserInteraction, hasUserInteracted]);

  // Управление подключением к SignalR
  useEffect(() => {
    const connection = SoundRequestHubSignalRConnectionBuilder.build();
    connectionRef.current = connection;

    // Обработчик изменения состояния плеера
    const handlePlayerStateChange = (state: PlayerState) => {
      console.log("[VideoScreen] PlayerStateChange получено:", state);
      setPlayerState(state);
    };

    // Подписываемся на события
    connection.on("PlayerStateChange", handlePlayerStateChange);

    // Запускаем подключение
    connection
      .start()
      .then(async () => {
        console.log("[VideoScreen] Подключение установлено");

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
    if (isMainPlayer) {
      connectionRef.current
        ?.invoke("Ended", playerState?.currentQueueItem?.track)
        .catch(error => {
          console.error("[VideoScreen] Ошибка при вызове Ended:", error);
        });
    }
  }, [isMainPlayer, playerState?.currentQueueItem?.track]);

  const handleStart = useCallback(() => {
    if (isMainPlayer) {
      connectionRef.current
        ?.invoke("Started", playerState?.currentQueueItem?.track)
        .catch(error => {
          console.error("[VideoScreen] Ошибка при вызове Started:", error);
        });
    }
  }, [isMainPlayer, playerState?.currentQueueItem?.track]);

  const handleError = useCallback(() => {
    if (isMainPlayer) {
      connectionRef.current
        ?.invoke("ErrorPlaying", playerState?.currentQueueItem?.track)
        .catch(error => {
          console.error("[VideoScreen] Ошибка при вызове ErrorPlaying:", error);
        });
    }
  }, [isMainPlayer, playerState?.currentQueueItem?.track]);

  const handleProgress = useCallback(
    (state: {
      played: number;
      playedSeconds: number;
      loaded: number;
      loadedSeconds: number;
    }) => {
      if (isMainPlayer) {
        // Отправляем прогресс только каждые 3 секунды, чтобы не перегружать SignalR
        const progress = state.playedSeconds;
        const timespan = new TimeSpan({ seconds: progress });
        const currentSeconds = timespan.totalSeconds;
        const lastSent = lastProgressSentRef.current;

        // Сохраняем текущий прогресс в ref для использования при переключении videoState
        currentProgressRef.current = currentSeconds;

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
      }
    },
    [isMainPlayer]
  );

  // Отслеживаем изменение videoState и отправляем прогресс перед переключением
  useEffect(() => {
    const currentVideoState = playerState?.videoState;

    // Если videoState изменился (и это не первая загрузка)
    if (
      previousVideoStateRef.current !== undefined &&
      previousVideoStateRef.current !== currentVideoState &&
      isMainPlayer
    ) {
      // Отправляем текущий прогресс на сервер перед переключением
      const currentProgress = currentProgressRef.current;
      if (currentProgress > 0 && connectionRef.current) {
        connectionRef.current
          .invoke("TrackProgress", currentProgress)
          .then(() => {
            console.log(
              `[VideoScreen] Прогресс сохранен перед переключением videoState: ${currentProgress}s (${previousVideoStateRef.current} -> ${currentVideoState})`
            );
            lastProgressSentRef.current = currentProgress;
          })
          .catch(error => {
            console.error(
              "[VideoScreen] Ошибка при отправке прогресса перед переключением:",
              error
            );
          });
      }
    }

    // Обновляем предыдущее значение
    previousVideoStateRef.current = currentVideoState;
  }, [playerState?.videoState, isMainPlayer]);

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
    queueItemId: currentQueueItem?.id,
    isMainPlayer,
    userName,
    userAvatar: currentQueueItem?.requestedByTwitchUser?.profileImageUrl,
    userColor: currentQueueItem?.requestedByTwitchUser?.chatColor,
    onEnded: handleEnded,
    onStart: handleStart,
    onError: handleError,
    onProgress: handleProgress,
    hasUserInteracted,
  });

  // Если нет трека, показываем пустой экран
  if (!hasTrack) {
    console.log("[VideoScreen] Нет трека - показываем пустой экран");
    return null;
  }

  console.log("[VideoScreen] Рендеринг с videoState:", videoState);
  console.log("[VideoScreen] Рендерим плеер с треком:", currentTrack.trackName);

  return (
    <div className={styles.container} style={{ padding: 0 }}>
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
