import { BaseTrackInfo } from "@/shared/api";

import { formatDuration } from "../../utils";
import styles from "../SoundRequestPlayerDesktop.module.scss";

interface TrackItemProps {
  track: BaseTrackInfo;
  isCurrent?: boolean;
  isPlaying?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function TrackItem({
  track,
  isCurrent = false,
  isPlaying = false,
  onMouseEnter,
  onMouseLeave,
}: TrackItemProps) {
  const showPlayingIndicator = isCurrent && isPlaying;

  return (
    <div
      className={`${styles.item} ${isCurrent ? `${styles.sticky} ${styles.current}` : ""}`}
      data-track-id={track.id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      key={track.id}
    >
      <div
        className={`${styles.thumb} ${showPlayingIndicator ? styles.thumbPlaying : ""}`}
      >
        {track.artworkUrl ? (
          <img src={track.artworkUrl} alt="art" />
        ) : (
          <div className={styles.thumbPlaceholder} />
        )}
        {showPlayingIndicator && (
          <div className={styles.playingOverlay}>
            <div className={styles.playingIndicator}>
              <span className={styles.equalizer}>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
                <span className={styles.bar}></span>
              </span>
            </div>
          </div>
        )}
      </div>
      <div className={styles.itemBody}>
        <div className={styles.itemTitle}>
          <span className={styles.trackName}>{track.trackName}</span>
          {track.authors && track.authors.length > 0 && (
            <span className={styles.itemAuthors}>
              {track.authors.join(", ")}
            </span>
          )}
        </div>
        <div className={styles.itemMeta}>
          <a
            href={track.url}
            target="_blank"
            rel="noreferrer"
            className={styles.itemLink}
            title={track.url}
          >
            {track.url}
          </a>
          <span className={styles.itemDuration}>
            {formatDuration(track.duration || "PT0S")}
          </span>
        </div>
      </div>
    </div>
  );
}
