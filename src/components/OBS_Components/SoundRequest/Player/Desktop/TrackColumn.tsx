import { JSX, memo, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { PlayerStateStateEnum } from "@/shared/api";

import { useQueueActions } from "../hooks";
import { TrackListViewMode, usePlayerStore } from "../stores/usePlayerStore";
import styles from "./SoundRequestPlayerDesktop.module.scss";
import { TrackItem } from "./TrackItem";

function TrackColumnComponent() {
  // Получаем данные напрямую из стора - ТОЛЬКО нужные поля
  const {
    currentTrack,
    currentQueueItemId,
    isPlaying,
    queue,
    history,
    viewMode,
  } = usePlayerStore(
    useShallow(state => ({
      currentTrack: state.playerState?.currentQueueItem?.track || null,
      currentQueueItemId: state.playerState?.currentQueueItem?.id,
      isPlaying: state.playerState?.state === PlayerStateStateEnum.Playing,
      queue: state.queue,
      history: state.history,
      viewMode: state.viewMode,
    }))
  );

  // Получаем обработчики из хука
  const { handleItemHover, handleDeleteFromQueue } = useQueueActions();

  // Используем переименованные переменные
  const current = currentTrack;

  // Очередь без текущего трека
  const queueWithoutCurrent = useMemo(
    () => queue.filter(x => x.id !== currentQueueItemId),
    [queue, currentQueueItemId]
  );
  const renderTracksList = useMemo(() => {
    const trackItems: JSX.Element[] = [];

    switch (viewMode) {
      case TrackListViewMode.Default:
        // Обычный режим: текущий трек -> вся очередь (overflow hidden скроет лишнее)
        if (current) {
          trackItems.push(
            <TrackItem
              key={`current-${current.id}`}
              track={current}
              isCurrent
              isPlaying={isPlaying}
              onMouseEnter={() => handleItemHover(current.id, true)}
              onMouseLeave={() => handleItemHover(current.id, false)}
            />
          );
        }
        queueWithoutCurrent.forEach(q => {
          if (q.track) {
            trackItems.push(
              <TrackItem
                key={`queue-${q.id}`}
                track={q.track}
                queueItemId={q.id}
                onMouseEnter={() => handleItemHover(q.track?.id, true)}
                onMouseLeave={() => handleItemHover(q.track?.id, false)}
                onDelete={handleDeleteFromQueue}
              />
            );
          }
        });
        break;

      case TrackListViewMode.WithHistory: {
        // С историей: история -> текущий трек -> очередь (ограниченная)
        // Ограничиваем общее количество треков, чтобы не выталкивать тулбар
        const MAX_QUEUE_IN_HISTORY_MODE = 4;

        [...history]
          .reverse()
          .slice(0, MAX_QUEUE_IN_HISTORY_MODE)
          .forEach((track, index) => {
            trackItems.push(
              <TrackItem
                key={`history-${track.id}-${index}`}
                track={track}
                isHistory
                onMouseEnter={() => handleItemHover(track.id, true)}
                onMouseLeave={() => handleItemHover(track.id, false)}
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
              onMouseEnter={() => handleItemHover(current.id, true)}
              onMouseLeave={() => handleItemHover(current.id, false)}
            />
          );
        }
        // Показываем только первые N треков из очереди
        queueWithoutCurrent.slice(0, MAX_QUEUE_IN_HISTORY_MODE).forEach(q => {
          if (q.track) {
            trackItems.push(
              <TrackItem
                key={`queue-${q.id}`}
                track={q.track}
                queueItemId={q.id}
                onMouseEnter={() => handleItemHover(q.track?.id, true)}
                onMouseLeave={() => handleItemHover(q.track?.id, false)}
                onDelete={handleDeleteFromQueue}
              />
            );
          }
        });
        break;
      }

      case TrackListViewMode.Reversed:
        // Обратный режим: история -> текущий трек (снизу)
        // Не разворачиваем, так как column-reverse сделает за нас
        history.toReversed().forEach((track, index) => {
          trackItems.push(
            <TrackItem
              key={`history-${track.id}-${index}`}
              track={track}
              isHistory
              onMouseEnter={() => handleItemHover(track.id, true)}
              onMouseLeave={() => handleItemHover(track.id, false)}
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
              onMouseEnter={() => handleItemHover(current.id, true)}
              onMouseLeave={() => handleItemHover(current.id, false)}
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
    handleItemHover,
    handleDeleteFromQueue,
  ]);

  return (
    <div
      className={`${styles.leftCol} ${viewMode === TrackListViewMode.Reversed ? styles.reversedMode : ""} ${viewMode === TrackListViewMode.WithHistory ? styles.withHistory : ""}`}
    >
      <div className={styles.scrollList}>{renderTracksList}</div>
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации
export const TrackColumn = memo(TrackColumnComponent);
