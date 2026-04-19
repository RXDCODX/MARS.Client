import { useCallback, useEffect, useMemo } from "react";

import { parseDurationToSeconds } from "../utils/parseDuration";
import { CustomMarquee } from "./CustomMarquee";
import styles from "./InfoBar.module.scss";

interface Props {
  userName: string;
  userAvatar?: string;
  userColor?: string;
  trackName: string;
  artistName: string;
  currentTrackProgress?: number;
  trackDuration?: string;
}

/**
 * Компонент информационной полоски с прогрессом
 * Показывает информацию о пользователе и треке с визуализацией прогресса
 */
function InfoBarComponent({
  userName,
  userAvatar,
  userColor,
  trackName,
  artistName,
  currentTrackProgress,
  trackDuration,
}: Props) {
  const durationSeconds = useMemo(
    () => parseDurationToSeconds(trackDuration),
    [trackDuration]
  );

  const currentProgressSeconds = useMemo(
    () =>
      typeof currentTrackProgress === "number" &&
      Number.isFinite(currentTrackProgress)
        ? currentTrackProgress
        : 0,
    [currentTrackProgress]
  );

  const calculatedProgressPercent = useMemo(() => {
    if (!Number.isFinite(durationSeconds) || durationSeconds <= 0) {
      return 0;
    }

    if (!Number.isFinite(currentProgressSeconds)) {
      return 0;
    }

    return (currentProgressSeconds / durationSeconds) * 100;
  }, [currentProgressSeconds, durationSeconds]);

  const sanitizedProgress = useCallback(() => {
    if (!Number.isFinite(calculatedProgressPercent)) {
      return 0;
    }
    return Math.min(Math.max(calculatedProgressPercent, 0), 100);
  }, [calculatedProgressPercent]);

  const progressLabel = `${sanitizedProgress().toFixed(1)}%`;

  useEffect(() => {
    console.log("[InfoBar] incoming progress", {
      calculatedProgressPercent,
      sanitizedProgress,
      progressLabel,
      currentTrackProgress,
      currentProgressSeconds,
      trackDuration,
      durationSeconds,
      userName,
      trackName,
      artistName,
    });
  }, [
    artistName,
    currentProgressSeconds,
    currentTrackProgress,
    calculatedProgressPercent,
    durationSeconds,
    progressLabel,
    sanitizedProgress,
    trackDuration,
    trackName,
    userName,
  ]);

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

        <div className={styles.progressPercentOverlay}>
          <div className={styles.progressPercentLabel}>{progressLabel}</div>
        </div>
      </div>
    </div>
  );
}

export const InfoBar = InfoBarComponent;
