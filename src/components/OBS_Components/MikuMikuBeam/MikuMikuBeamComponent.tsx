import { useCallback, useRef, useState } from "react";

import { TelegramusHubSignalRContext, TwitchUser } from "@/shared/api";
import Announce from "@/shared/Utils/Announce/Announce";

import styles from "./MikuMikuBeam.module.scss";
import videoSrc from "./video/miku_miku_beam.webm";

interface VideoState {
  isActive: boolean;
  users: TwitchUser[];
}

const TICKER_START_TIME = 9.28; // 9 секунд 280 миллисекунд
const TICKER_END_TIME = 18.19; // 18 секунд 190 миллисекунд

const MikuMikuBeamComponent = () => {
  const [videoState, setVideoState] = useState<VideoState>({
    isActive: false,
    users: [],
  });
  const [showTickers, setShowTickers] = useState(false);
  const [announced, setAnnounced] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Обработчик события MikuMikuBeam из SignalR
  TelegramusHubSignalRContext.useSignalREffect(
    "MikuMikuBeam",
    (users: TwitchUser[]) => {
      console.log("[MikuMikuBeam] Получены пользователи:", users);
      handleMikuBeamActivation(users);
    },
    []
  );

  const preloadImages = useCallback(async (users: TwitchUser[]) => {
    const imagePromises = users
      .filter(user => user.profileImageUrl)
      .map(
        user =>
          new Promise<void>(resolve => {
            const img = new Image();
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Resolve даже при ошибке, чтобы не блокировать
            img.src = user.profileImageUrl!;
          })
      );

    await Promise.all(imagePromises);
    console.log("[MikuMikuBeam] Все аватарки предзагружены");
  }, []);

  const handleMikuBeamActivation = useCallback(
    async (users: TwitchUser[]) => {
      // Предзагружаем аватарки
      await preloadImages(users);

      // Вызываем MuteAll с пустым массивом
      try {
        await TelegramusHubSignalRContext.invoke("MuteAll", []);
        console.log("[MikuMikuBeam] MuteAll вызван");
      } catch (error) {
        console.error("[MikuMikuBeam] Ошибка вызова MuteAll:", error);
      }

      // Активируем видео
      setVideoState({
        isActive: true,
        users: users,
      });
    },
    [preloadImages]
  );

  // Обработчик прогресса воспроизведения видео
  const handleTimeUpdate = useCallback(() => {
    if (!videoRef.current) return;

    const currentTime = videoRef.current.currentTime;

    // Показываем бегущие строки в нужный временной интервал
    if (currentTime >= TICKER_START_TIME && currentTime <= TICKER_END_TIME) {
      setShowTickers(true);
      TelegramusHubSignalRContext.invoke("MikuMikuDeleteTwitchMessages");
    } else {
      setShowTickers(false);
    }
  }, []);

  // Обработчик завершения видео
  const handleVideoEnded = useCallback(async () => {
    console.log("[MikuMikuBeam] Видео завершено");

    // Вызываем UnmuteSessions
    try {
      await TelegramusHubSignalRContext.invoke("UnmuteSessions");
      console.log("[MikuMikuBeam] UnmuteSessions вызван");
    } catch (error) {
      console.error("[MikuMikuBeam] Ошибка вызова UnmuteSessions:", error);
    }

    // Деактивируем видео
    setVideoState({
      isActive: false,
      users: [],
    });
    setShowTickers(false);
  }, []);

  // Создаем массив пользователей для бегущих строк (дублируем для непрерывности)
  const tickerUsers = [
    ...videoState.users,
    ...videoState.users,
    ...videoState.users,
  ];

  return (
    <>
      {!announced && (
        <Announce callback={() => setAnnounced(true)} title="MikuMikuBeam" />
      )}
      <div
        className={`${styles.container} ${videoState.isActive ? styles.active : ""}`}
      >
        {videoState.isActive && (
          <>
            {/* Видео на весь экран */}
            <video
              ref={videoRef}
              src={videoSrc}
              className={styles.video}
              autoPlay
              playsInline
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
            />

            {/* Бегущие строки */}
            {showTickers && videoState.users.length > 0 && (
              <>
                {/* Верхняя бегущая строка (движется налево) */}
                <div className={`${styles.ticker} ${styles.tickerTop}`}>
                  <div className={styles.tickerContent}>
                    {tickerUsers.map((user, index) => (
                      <div key={`top-${index}`} className={styles.userItem}>
                        {user.profileImageUrl && (
                          <img
                            src={user.profileImageUrl}
                            alt={user.displayName}
                            className={styles.avatar}
                          />
                        )}
                        <span
                          className={styles.username}
                          style={{ color: user.chatColor || "#FFFFFF" }}
                        >
                          {user.displayName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Нижняя бегущая строка (движется направо) */}
                <div className={`${styles.ticker} ${styles.tickerBottom}`}>
                  <div className={styles.tickerContent}>
                    {tickerUsers.map((user, index) => (
                      <div key={`bottom-${index}`} className={styles.userItem}>
                        {user.profileImageUrl && (
                          <img
                            src={user.profileImageUrl}
                            alt={user.displayName}
                            className={styles.avatar}
                          />
                        )}
                        <span
                          className={styles.username}
                          style={{ color: user.chatColor || "#FFFFFF" }}
                        >
                          {user.displayName}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MikuMikuBeamComponent;
