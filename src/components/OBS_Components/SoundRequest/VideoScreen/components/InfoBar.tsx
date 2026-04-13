import { useCallback, useEffect, useMemo } from "react";
import Marquee from "react-fast-marquee";

import { parseDurationToSeconds } from "../utils/parseDuration";
import styles from "./InfoBar.module.scss";

interface Props {
  userName: string;
  userAvatar?: string;
  userColor?: string;
  trackName: string;
  artistName: string;
  progressPercent?: number;
  currentTrackProgress?: string;
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
  progressPercent,
  currentTrackProgress,
  trackDuration,
}: Props) {
  const durationSeconds = useMemo(
    () => parseDurationToSeconds(trackDuration),
    [trackDuration]
  );

  const currentProgressSeconds = useMemo(
    () => parseDurationToSeconds(currentTrackProgress),
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

  const progressValue = useMemo(() => {
    if (
      typeof progressPercent === "number" &&
      Number.isFinite(progressPercent)
    ) {
      return progressPercent;
    }

    return calculatedProgressPercent;
  }, [calculatedProgressPercent, progressPercent]);

  const sanitizedProgress = useCallback(() => {
    if (!Number.isFinite(progressValue)) {
      return 0;
    }
    return Math.min(Math.max(progressValue, 0), 100);
  }, [progressValue]);

  const progressLabel = `${sanitizedProgress().toFixed(1)}%`;

  useEffect(() => {
    console.log("[InfoBar] incoming progress", {
      progressPercent,
      calculatedProgressPercent,
      progressValue,
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
    progressPercent,
    progressValue,
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
          <Marquee
            className={styles.mainMarquee}
            play={true}
            pauseOnHover={false}
            gradient={false}
          >
            <div className={styles.mainMarqueeContent}>
              {userAvatar && (
                <img
                  src={userAvatar}
                  alt={userName}
                  className={styles.avatar}
                />
              )}

              <span className={styles.userNameBlock}>
                <span className={styles.userName} style={{ color: userColor }}>
                  {userName}
                </span>
              </span>

              {userAvatar && (
                <img
                  src={userAvatar}
                  alt={userName}
                  className={styles.avatar}
                />
              )}

              <span className={styles.contentSeparator}>{"   "}</span>
              <span className={styles.trackNameBlock}>
                <span className={styles.trackName}>
                  {/* {artistName ? `${trackName} - ${artistName}` : trackName} */}
                  {trackName}
                </span>
              </span>
            </div>
          </Marquee>
        </div>

        <div className={styles.progressPercentOverlay}>
          <div className={styles.progressPercentLabel}>{progressLabel}</div>
        </div>
      </div>
    </div>
  );
}

export const InfoBar = InfoBarComponent;
