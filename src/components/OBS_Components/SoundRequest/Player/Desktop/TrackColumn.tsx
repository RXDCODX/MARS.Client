import { JSX, useMemo } from "react";

import { BaseTrackInfo, QueueItem } from "@/shared/api";

import { TrackListViewMode } from "../stores/usePlayerStore";
import styles from "./SoundRequestPlayerDesktop.module.scss";
import { TrackItem } from "./TrackItem";

interface TrackColumnProps {
  viewMode: TrackListViewMode;
  current: BaseTrackInfo | null;
  isPlaying: boolean;
  queueWithoutCurrent: QueueItem[];
  history: BaseTrackInfo[];
  onItemHover: (trackId: string | undefined, isEnter: boolean) => void;
  onDelete: (queueItemId: string) => void;
}

export function TrackColumn({
  viewMode,
  current,
  isPlaying,
  queueWithoutCurrent,
  history,
  onItemHover,
  onDelete,
}: TrackColumnProps) {
  const renderTracksList = useMemo(() => {
    const trackItems: JSX.Element[] = [];

    switch (viewMode) {
      case TrackListViewMode.Default:
        // Обычный режим: текущий трек -> очередь (до 5 треков)
        if (current) {
          trackItems.push(
            <TrackItem
              key={`current-${current.id}`}
              track={current}
              isCurrent
              isPlaying={isPlaying}
              onMouseEnter={() => onItemHover(current.id, true)}
              onMouseLeave={() => onItemHover(current.id, false)}
            />
          );
        }
        queueWithoutCurrent.slice(0, 8).forEach(q => {
          if (q.track) {
            trackItems.push(
              <TrackItem
                key={`queue-${q.id}`}
                track={q.track}
                queueItemId={q.id}
                onMouseEnter={() => onItemHover(q.track?.id, true)}
                onMouseLeave={() => onItemHover(q.track?.id, false)}
                onDelete={onDelete}
              />
            );
          }
        });
        break;

      case TrackListViewMode.WithHistory: {
        // С историей: история -> текущий трек -> очередь
        // Показываем до 3 треков истории и до 3 треков очереди
        const historyCount = Math.min(history.length, 4);
        [...history]
          .slice(0, historyCount)
          .reverse()
          .forEach((track, index) => {
            trackItems.push(
              <TrackItem
                key={`history-${track.id}-${index}`}
                track={track}
                isHistory
                onMouseEnter={() => onItemHover(track.id, true)}
                onMouseLeave={() => onItemHover(track.id, false)}
              />
            );
          });
        if (current) {
          trackItems.push(
            <TrackItem
              key={`current-${current.id}`}
              track={current}
              isCurrent
              isPlaying={isPlaying}
              onMouseEnter={() => onItemHover(current.id, true)}
              onMouseLeave={() => onItemHover(current.id, false)}
            />
          );
        }
        queueWithoutCurrent.slice(0, 4).forEach(q => {
          if (q.track) {
            trackItems.push(
              <TrackItem
                key={`queue-${q.id}`}
                track={q.track}
                queueItemId={q.id}
                onMouseEnter={() => onItemHover(q.track?.id, true)}
                onMouseLeave={() => onItemHover(q.track?.id, false)}
                onDelete={onDelete}
              />
            );
          }
        });
        break;
      }

      case TrackListViewMode.Reversed:
        // Обратный режим: история -> текущий трек (снизу)
        // Не разворачиваем, так как column-reverse сделает за нас
        history
          .slice(0, 8)
          .toReversed()
          .forEach((track, index) => {
            trackItems.push(
              <TrackItem
                key={`history-${track.id}-${index}`}
                track={track}
                isHistory
                onMouseEnter={() => onItemHover(track.id, true)}
                onMouseLeave={() => onItemHover(track.id, false)}
              />
            );
          });
        if (current) {
          trackItems.push(
            <TrackItem
              key={`current-${current.id}`}
              track={current}
              isCurrent
              isPlaying={isPlaying}
              onMouseEnter={() => onItemHover(current.id, true)}
              onMouseLeave={() => onItemHover(current.id, false)}
            />
          );
        }
        break;
    }

    return trackItems;
  }, [
    viewMode,
    current,
    isPlaying,
    queueWithoutCurrent,
    history,
    onItemHover,
    onDelete,
  ]);

  return (
    <div
      className={`${styles.leftCol} ${viewMode === TrackListViewMode.Reversed ? styles.reversedMode : ""} ${viewMode === TrackListViewMode.WithHistory ? styles.withHistory : ""}`}
    >
      <div className={styles.scrollList}>{renderTracksList}</div>
    </div>
  );
}
