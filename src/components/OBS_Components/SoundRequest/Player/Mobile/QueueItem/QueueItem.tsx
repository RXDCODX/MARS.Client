import { memo, useCallback } from "react";

import { QueueItem as QueueItemType } from "@/shared/api";

import {
  formatDuration,
  getAuthorsString,
  getRequestedByString,
} from "../../utils";
import styles from "./QueueItem.module.scss";

interface QueueItemProps {
  item: QueueItemType;
  index: number;
  showPlayButton?: boolean;
  showDeleteButton?: boolean;
  onPlay?: (item: QueueItemType) => void;
  onDelete?: (queueItemId: string) => void;
  isDeleting?: boolean;
  isLoading?: boolean;
}

/**
 * Элемент очереди треков
 */
function QueueItemComponent({
  item,
  index,
  showPlayButton = false,
  showDeleteButton = false,
  onPlay,
  onDelete,
  isDeleting = false,
  isLoading = false,
}: QueueItemProps) {
  const handlePlay = useCallback(() => {
    if (onPlay && !isLoading) {
      onPlay(item);
    }
  }, [onPlay, item, isLoading]);

  const handleDelete = useCallback(() => {
    if (onDelete && !isLoading && !isDeleting) {
      onDelete(item.id);
    }
  }, [onDelete, item.id, isLoading, isDeleting]);

  if (!item.track) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <span className={styles.number}>{index + 1}</span>
        <div className={styles.trackInfo}>
          <h6 className={styles.trackName}>{item.track.trackName}</h6>
          <p className={styles.trackAuthor}>
            {getAuthorsString(item.track.authors)}
          </p>
          <p className={styles.requestedBy}>
            {getRequestedByString(item.requestedByTwitchUser?.displayName)}
          </p>
        </div>
      </div>
      <div className={styles.actions}>
        <span className={styles.duration}>
          {formatDuration(item.track.duration)}
        </span>
        {showPlayButton && onPlay && (
          <button
            onClick={handlePlay}
            disabled={isLoading}
            className="btn btn-sm btn-success"
            type="button"
          >
            Играть
          </button>
        )}
        {showDeleteButton && onDelete && (
          <button
            className="btn btn-sm btn-danger"
            onClick={handleDelete}
            disabled={isLoading || isDeleting}
            type="button"
          >
            {isDeleting ? "..." : "Удалить"}
          </button>
        )}
      </div>
    </div>
  );
}

export const QueueItem = memo(QueueItemComponent);

















