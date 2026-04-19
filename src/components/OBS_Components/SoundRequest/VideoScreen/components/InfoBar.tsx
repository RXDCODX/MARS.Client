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
  const durationSeconds = parseDurationToSeconds(trackDuration);
  const currentProgressSeconds =
    typeof currentTrackProgress === "number" &&
    Number.isFinite(currentTrackProgress)
      ? currentTrackProgress
      : 0;
  const calculatedProgressPercent =
    Number.isFinite(durationSeconds) &&
    durationSeconds > 0 &&
    Number.isFinite(currentProgressSeconds)
      ? (currentProgressSeconds / durationSeconds) * 100
      : 0;
  const sanitizedProgress = Number.isFinite(calculatedProgressPercent)
    ? Math.min(Math.max(calculatedProgressPercent, 0), 100)
    : 0;

  const progressLabel = `${sanitizedProgress.toFixed(1)}%`;

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
