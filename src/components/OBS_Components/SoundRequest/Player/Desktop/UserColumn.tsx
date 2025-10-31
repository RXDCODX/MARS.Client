import { JSX, memo, useMemo } from "react";
import { useShallow } from "zustand/react/shallow";

import { useQueueActions } from "../hooks";
import { TrackListViewMode, usePlayerStore } from "../stores/usePlayerStore";
import styles from "./SoundRequestPlayerDesktop.module.scss";
import { UserItem } from "./UserItem";

function UserColumnComponent() {
  // Получаем данные напрямую из стора
  const { playerState, queue, history, viewMode } = usePlayerStore(
    useShallow(state => ({
      playerState: state.playerState,
      queue: state.queue,
      history: state.history,
      viewMode: state.viewMode,
    }))
  );

  // Получаем обработчики из хука
  const { handleItemHover } = useQueueActions();

  // Вычисляем производные значения
  const current = playerState?.currentQueueItem?.track || null;
  const currentQueueItem = playerState?.currentQueueItem;
  const currentQueueItemId = playerState?.currentQueueItem?.id;

  // Очередь без текущего трека
  const queueWithoutCurrent = useMemo(
    () => queue.filter(x => x.id !== currentQueueItemId),
    [queue, currentQueueItemId]
  );
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
              onMouseEnter={() => handleItemHover(current.id, true)}
              onMouseLeave={() => handleItemHover(current.id, false)}
            />
          );
        }
        queueWithoutCurrent.forEach(q => {
          if (q.track) {
            userItems.push(
              <UserItem
                key={`queue-user-${q.id}`}
                user={q.requestedByTwitchUser ?? undefined}
                lastTimePlays={q.requestedAt}
                trackId={q.track.id}
                onMouseEnter={() => handleItemHover(q.track?.id, true)}
                onMouseLeave={() => handleItemHover(q.track?.id, false)}
              />
            );
          }
        });
        break;

      case TrackListViewMode.WithHistory: {
        // С историей: заглушки для истории -> текущий -> очередь
        [...history].reverse().forEach((track, index) => {
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
              onMouseEnter={() => handleItemHover(current.id, true)}
              onMouseLeave={() => handleItemHover(current.id, false)}
            />
          );
        }
        queueWithoutCurrent.forEach(q => {
          if (q.track) {
            userItems.push(
              <UserItem
                key={`queue-user-${q.id}`}
                user={q.requestedByTwitchUser ?? undefined}
                lastTimePlays={q.requestedAt}
                trackId={q.track.id}
                onMouseEnter={() => handleItemHover(q.track?.id, true)}
                onMouseLeave={() => handleItemHover(q.track?.id, false)}
              />
            );
          }
        });
        break;
      }

      case TrackListViewMode.Reversed:
        // Обратный режим: пустые UserItem для истории -> текущий пользователь
        // Не разворачиваем, так как column-reverse сделает за нас
        history.forEach((track, index) => {
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
              onMouseEnter={() => handleItemHover(current.id, true)}
              onMouseLeave={() => handleItemHover(current.id, false)}
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
    handleItemHover,
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
