import { memo, useMemo } from "react";

import styles from "./InfoBar.module.scss";
import { ScrollingText } from "./ScrollingText";
import Silk from "./Silk";

interface Props {
  userName: string;
  userAvatar?: string;
  userColor?: string;
  trackName: string;
  artistName: string;
  progressPercent: number;
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
}: Props) {
  const sanitizedProgress = useMemo(() => {
    if (!Number.isFinite(progressPercent)) {
      return 0;
    }
    return Math.min(Math.max(progressPercent, 0), 100);
  }, [progressPercent]);

  return (
    <div
      className={styles.infoBar}
      style={
        {
          "--track-progress": `${sanitizedProgress}%`,
        } as React.CSSProperties
      }
    >
      {/* Анимированный фон Silk */}
      <div className={styles.silkBackground}>
        <Silk
          speed={2}
          scale={1.5}
          color="#000000"
          noiseIntensity={0.8}
          rotation={0}
        />
      </div>

      {/* Оверлей с прогрессом */}
      <div className={styles.progressOverlay} />

      <div className={styles.infoBarContent}>
        {/* Левая часть - пользователь */}
        <div className={styles.userInfo}>
          <div className={styles.userContent}>
            {userAvatar && (
              <img src={userAvatar} alt={userName} className={styles.avatar} />
            )}
            <ScrollingText
              text={userName}
              className={styles.userName + " " + styles.container}
              style={{ color: userColor }}
            />
          </div>
        </div>

        {/* Разделитель */}
        <div className={styles.divider}></div>

        {/* Правая часть - трек */}
        <div className={styles.trackInfo}>
          <ScrollingText text={trackName} className={styles.trackName} />
          <ScrollingText text={artistName} className={styles.artist} />
        </div>
      </div>
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации
export const InfoBar = memo(InfoBarComponent);
