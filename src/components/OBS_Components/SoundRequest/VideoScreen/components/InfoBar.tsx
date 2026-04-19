import { useShallow } from "zustand/react/shallow";

import { useVideoScreenStore } from "../store/useVideoScreenStore";
import { CustomMarquee } from "./CustomMarquee";
import styles from "./InfoBar.module.scss";
import { ProgressPercentLabel } from "./ProgressPercentLabel";

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
