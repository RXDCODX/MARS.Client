import { X } from "lucide-react";
import { memo, useCallback } from "react";

import { BaseTrackInfo } from "@/shared/api";

import { formatDuration } from "../../utils";
import styles from "../SoundRequestPlayerDesktop.module.scss";

interface TrackItemProps {
  track: BaseTrackInfo;
  queueItemId?: string;
  isCurrent?: boolean;
  isPlaying?: boolean;
  isHistory?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onDelete?: (queueItemId: string) => void;
}

function TrackItemComponent({
  track,
  queueItemId,
  isCurrent = false,
  isPlaying = false,
  isHistory = false,
  onMouseEnter,
  onMouseLeave,
  onDelete,
}: TrackItemProps) {
  const showPlayingIndicator = isCurrent && isPlaying;

  const handleDelete = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (queueItemId && onDelete) {
        onDelete(queueItemId);
      }
    },
    [queueItemId, onDelete]
  );

  return (
    <div
      className={`${styles.item} ${isCurrent ? `${styles.sticky} ${styles.current}` : ""} ${isHistory ? styles.historyItem : ""}`}
      data-track-id={track.id}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      key={track.id}
    >
      {!isCurrent && queueItemId && onDelete && (
        <button
          className={styles.deleteButton}
          onClick={handleDelete}
          title="Удалить из очереди"
          type="button"
        >
          <X size={18} />
        </button>
      )}
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

// Экспортируем мемоизированную версию для оптимизации
export const TrackItem = memo(TrackItemComponent);
