import { JSX, memo, useMemo } from "react";

import { BaseTrackInfo, QueueItem } from "@/shared/api";

import { TrackListViewMode } from "../stores/usePlayerStore";
import styles from "./SoundRequestPlayerDesktop.module.scss";
import { UserItem } from "./UserItem";

interface UserColumnProps {
  viewMode: TrackListViewMode;
  current: BaseTrackInfo | null;
  currentQueueItem: QueueItem | undefined;
  queueWithoutCurrent: QueueItem[];
  history: BaseTrackInfo[];
  onItemHover: (trackId: string | undefined, isEnter: boolean) => void;
}

function UserColumnComponent({
  viewMode,
  current,
  currentQueueItem,
  queueWithoutCurrent,
  history,
  onItemHover,
}: UserColumnProps) {
  const renderUsersList = useMemo(() => {
    const userItems: JSX.Element[] = [];

    switch (viewMode) {
      case TrackListViewMode.Default:
        // Обычный режим: текущий пользователь -> пользователи очереди (до 8)
        if (current) {
          userItems.push(
            <UserItem
              key={`current-user-${
                currentQueueItem?.requestedByTwitchId + "_" + current.id
              }`}
              user={currentQueueItem?.requestedByTwitchUser ?? undefined}
              lastTimePlays={current.lastTimePlays}
              trackId={current.id}
              isCurrent
              onMouseEnter={() => onItemHover(current.id, true)}
              onMouseLeave={() => onItemHover(current.id, false)}
            />
          );
        }
        queueWithoutCurrent.slice(0, 8).forEach(q => {
          if (q.track) {
            userItems.push(
              <UserItem
                key={`queue-user-${q.id}`}
                user={q.requestedByTwitchUser ?? undefined}
                lastTimePlays={q.requestedAt}
                trackId={q.track.id}
                onMouseEnter={() => onItemHover(q.track?.id, true)}
                onMouseLeave={() => onItemHover(q.track?.id, false)}
              />
            );
          }
        });
        break;

      case TrackListViewMode.WithHistory: {
        // С историей: заглушки для истории -> текущий -> очередь (до 4 треков очереди)
        const userHistoryCount = Math.min(history.length, 4);
        [...history]
          .slice(0, userHistoryCount)
          .reverse()
          .forEach((track, index) => {
            userItems.push(
              <div
                key={`history-user-${track.id}-${index}`}
                className={styles.userRow}
                style={{ opacity: 0, pointerEvents: "none" }}
              >
                <div className={styles.avatar}>
                  <div className={styles.avatarPlaceholder} />
                </div>
                <div className={styles.userBody}>
                  <div className={styles.userName}>-</div>
                  <div className={styles.userMeta}>-</div>
                </div>
              </div>
            );
          });
        if (current) {
          userItems.push(
            <UserItem
              key={`current-user-${
                currentQueueItem?.requestedByTwitchId + "_" + current.id
              }`}
              user={currentQueueItem?.requestedByTwitchUser ?? undefined}
              lastTimePlays={current.lastTimePlays}
              trackId={current.id}
              isCurrent
              onMouseEnter={() => onItemHover(current.id, true)}
              onMouseLeave={() => onItemHover(current.id, false)}
            />
          );
        }
        queueWithoutCurrent.slice(0, 4).forEach(q => {
          if (q.track) {
            userItems.push(
              <UserItem
                key={`queue-user-${q.id}`}
                user={q.requestedByTwitchUser ?? undefined}
                lastTimePlays={q.requestedAt}
                trackId={q.track.id}
                onMouseEnter={() => onItemHover(q.track?.id, true)}
                onMouseLeave={() => onItemHover(q.track?.id, false)}
              />
            );
          }
        });
        break;
      }

      case TrackListViewMode.Reversed:
        // Обратный режим: пустые UserItem для истории -> текущий пользователь
        // Не разворачиваем, так как column-reverse сделает за нас
        history.slice(0, 8).forEach((track, index) => {
          userItems.push(
            <div
              key={`history-user-${track.id}-${index}`}
              className={styles.userRow}
              style={{ opacity: 0, pointerEvents: "none" }}
            >
              <div className={styles.avatar}>
                <div className={styles.avatarPlaceholder} />
              </div>
              <div className={styles.userBody}>
                <div className={styles.userName}>-</div>
                <div className={styles.userMeta}>-</div>
              </div>
            </div>
          );
        });
        if (current) {
          userItems.push(
            <UserItem
              key={`current-user-${
                currentQueueItem?.requestedByTwitchId + "_" + current.id
              }`}
              user={currentQueueItem?.requestedByTwitchUser ?? undefined}
              lastTimePlays={current.lastTimePlays}
              trackId={current.id}
              isCurrent
              onMouseEnter={() => onItemHover(current.id, true)}
              onMouseLeave={() => onItemHover(current.id, false)}
            />
          );
        }
        break;
    }

    return userItems;
  }, [
    viewMode,
    current,
    currentQueueItem,
    queueWithoutCurrent,
    history,
    onItemHover,
  ]);

  return (
    <div
      className={`${styles.rightCol} ${viewMode === TrackListViewMode.Reversed ? styles.reversedMode : ""}`}
    >
      <div className={styles.scrollList}>{renderUsersList}</div>
    </div>
  );
}

// Экспортируем мемоизированную версию для оптимизации
export const UserColumn = memo(UserColumnComponent);
