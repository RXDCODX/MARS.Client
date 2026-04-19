import { useEffect, useRef } from "react";
import { useShallow } from "zustand/react/shallow";

import { useVideoScreenStore } from "../store/useVideoScreenStore";
import { parseDurationToSeconds } from "../utils/parseDuration";
import { CustomMarquee } from "./CustomMarquee";
import styles from "./InfoBar.module.scss";

/**
 * Компонент локального отображения прогресса в реальном времени с 60FPS.
 * Получает элемент video/audio напрямую из DOM, обходя ререндеры React.
 */
function ProgressPercentLabel({ trackDuration }: { trackDuration?: string }) {
  const labelRef = useRef<HTMLDivElement>(null);
  const durationSeconds = parseDurationToSeconds(trackDuration);

  useEffect(() => {
    if (!durationSeconds || durationSeconds <= 0) return;

    let frameId: number;

    const updateProgress = () => {
      const mediaElement = document.querySelector(
        "video, audio"
      ) as HTMLMediaElement | null;

      if (mediaElement && labelRef.current) {
        const currentProgress = mediaElement.currentTime;
        const calculatedProgressPercent =
          (currentProgress / durationSeconds) * 100;
        const sanitizedProgress = Math.min(
          Math.max(calculatedProgressPercent, 0),
          100
        );

        labelRef.current.textContent = `${sanitizedProgress.toFixed(1)}%`;
      }

      frameId = requestAnimationFrame(updateProgress);
    };

    frameId = requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, [durationSeconds]);

  return (
    <div className={styles.progressPercentOverlay}>
      <div ref={labelRef} className={styles.progressPercentLabel}>
        0.0%
      </div>
    </div>
  );
}

/**
 * Компонент информационной полоски с прогрессом
 * Показывает информацию о пользователе и треке с визуализацией прогресса
 */
function InfoBarComponent() {
  const {
    userName,
    userAvatar,
    userColor,
    trackName,
    artistName,
    trackDuration,
  } = useVideoScreenStore(
    useShallow(state => {
      const currentQueueItem = state.playerState?.currentQueueItem;
      const currentTrack = currentQueueItem?.track;
      const requestedByUser = currentQueueItem?.requestedByTwitchUser;

      return {
        userName:
          requestedByUser?.displayName ??
          requestedByUser?.userLogin ??
          "Неизвестный пользователь",
        userAvatar: requestedByUser?.profileImageUrl,
        userColor: requestedByUser?.chatColor,
        trackName: currentTrack?.trackName ?? "",
        artistName: currentTrack?.authors?.join(", ") ?? "Неизвестный автор",
        trackDuration: currentTrack?.duration,
      };
    })
  );

  return (
    <div className={styles.infoBar}>
      {/* Анимированный фон */}
      <div className={styles.silkBackground} />

      <div className={styles.infoBarContent}>
        <div className={styles.mainMarqueeContainer}>
          <CustomMarquee speed={60} trailingGapCount={5}>
            {userAvatar && (
              <img src={userAvatar} alt={userName} className={styles.avatar} />
            )}

            <span className={styles.userNameBlock}>
              <span className={styles.userName} style={{ color: userColor }}>
                {userName}
              </span>
            </span>

            {userAvatar && (
              <img src={userAvatar} alt={userName} className={styles.avatar} />
            )}

            <span className={styles.contentSeparator}>•</span>
            <span className={styles.trackNameBlock}>
              <span className={styles.trackName}>
                {artistName ? `${artistName} - ${trackName}` : trackName}
              </span>
            </span>
          </CustomMarquee>
        </div>

        <ProgressPercentLabel trackDuration={trackDuration} />
      </div>
    </div>
  );
}

export const InfoBar = InfoBarComponent;
