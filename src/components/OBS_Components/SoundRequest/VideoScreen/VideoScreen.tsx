import { useCallback, useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useVideoStateRenderer } from "./hooks";
import { useVideoScreenStore } from "./store/useVideoScreenStore";
import styles from "./VideoScreen.module.scss";

interface Props {
  groupName?: string;
  className?: string;
}

export function VideoScreen({ className, groupName = "mainplayer" }: Props) {
  const isMainPlayer = groupName === "mainplayer";

  const playerState = useVideoScreenStore(
    useShallow(state => state.playerState)
  );
  const hasUserInteracted = useVideoScreenStore(
    useShallow(state => state.hasUserInteracted)
  );

  // Инициализация и очистка с использованием getState()
  useEffect(() => {
    void useVideoScreenStore.getState().init(import.meta.env.PROD);

    return () => {
      void useVideoScreenStore.getState().dispose();
    };
  }, []);

  // Обработчик взаимодействия с использованием getState()
  const handleUserInteraction = useCallback(() => {
    useVideoScreenStore.getState().markUserInteraction();
  }, []);

  useEffect(() => {
    if (import.meta.env.PROD) {
      return;
    }

    if (hasUserInteracted) {
      return;
    }

    document.addEventListener("click", handleUserInteraction, { once: true });
    document.addEventListener("touchstart", handleUserInteraction, {
      once: true,
    });

    return () => {
      document.removeEventListener("click", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [handleUserInteraction, hasUserInteracted]);

  const currentQueueItem = playerState?.currentQueueItem;
  const currentTrack = currentQueueItem?.track;

  const { component, videoState, showSections } = useVideoStateRenderer({
    isMainPlayer,
  });

  if (!currentTrack) {
    console.log("[VideoScreen] Нет трека - показываем пустой экран");
    return null;
  }

  const userName =
    currentQueueItem?.requestedByTwitchUser?.displayName ??
    currentQueueItem?.requestedByTwitchUser?.userLogin ??
    "Неизвестный пользователь";
  const authors = currentTrack.authors?.join(", ") ?? "Неизвестный автор";
  const trackName = currentTrack.trackName ?? "";
  const userAvatar = currentQueueItem?.requestedByTwitchUser?.profileImageUrl;
  const userColor = currentQueueItem?.requestedByTwitchUser?.chatColor;

  console.log("[VideoScreen] Рендеринг с videoState:", videoState);
  console.log("[VideoScreen] Рендерим плеер с треком:", currentTrack.trackName);

  const classList = [styles.videoSection];
  if (!isMainPlayer || !showSections) {
    classList.push(styles.fullScreen);
  }
  if (className) {
    classList.push(className);
  }

  const videoSectionClassName = classList.filter(Boolean).join(" ");

  return (
    <div className={styles.container} style={{ padding: 0 }}>
      {showSections && (
        <div className={styles.userSection}>
          <div className={styles.userInfo}>
            <span className={styles.label}>Заказал:</span>
            <div className={styles.userDisplay}>
              {userAvatar && (
                <img
                  src={userAvatar}
                  alt={userName}
                  className={styles.userAvatar}
                />
              )}
              <span
                className={styles.userName}
                style={{
                  color: userColor,
                }}
              >
                {userName}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className={videoSectionClassName}>{component}</div>

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
