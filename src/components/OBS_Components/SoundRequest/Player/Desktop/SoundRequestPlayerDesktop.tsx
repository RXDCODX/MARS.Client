import { JSX, useCallback, useEffect, useMemo, useState } from "react";

import { SoundRequest } from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";

import { useSoundRequestPlayer } from "../hooks";
import { TrackListViewMode, usePlayerStore } from "../stores/usePlayerStore";
import { PlayerToolbar } from "./PlayerToolbar";
import styles from "./SoundRequestPlayerDesktop.module.scss";
import { TrackItem } from "./TrackItem";
import { UserItem } from "./UserItem";
import { useTrackProgress } from "./useTrackProgress";

function parseIsoDurationToSeconds(duration?: string): number {
  if (!duration) return 0;
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const h = parseInt(match[1] || "0");
  const m = parseInt(match[2] || "0");
  const s = parseInt(match[3] || "0");
  return h * 3600 + m * 60 + s;
}

export function SoundRequestPlayerDesktop() {
  const {
    playerState,
    queue: hookQueue,
    loading,
    volume,
    isPlaying,
    isStopped,
    history: hookHistory,
    handlePlayPrevious,
    handleTogglePlayPause,
    handleStop,
    handleSkip,
    handleVolumeChange,
    handleMute,
    handleToggleVideoState,
    fetchQueue,
  } = useSoundRequestPlayer();

  // Zustand store
  const queue = usePlayerStore(state => state.queue);
  const history = usePlayerStore(state => state.history);
  const viewMode = usePlayerStore(state => state.viewMode);
  const setQueue = usePlayerStore(state => state.setQueue);
  const setHistory = usePlayerStore(state => state.setHistory);
  const removeFromQueue = usePlayerStore(state => state.removeFromQueue);
  const rollbackQueue = usePlayerStore(state => state.rollbackQueue);
  const cycleViewMode = usePlayerStore(state => state.cycleViewMode);

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { showToast } = useToastModal();
  const soundRequestApi = useMemo(() => new SoundRequest(), []);

  // Синхронизация очереди и истории из хука с Zustand
  useEffect(() => {
    if (hookQueue) {
      setQueue(hookQueue);
    }
  }, [hookQueue, setQueue]);

  useEffect(() => {
    if (hookHistory) {
      setHistory(hookHistory);
    }
  }, [hookHistory, setHistory]);

  const current = playerState?.currentQueueItem?.track || null;
  const durationSec = parseIsoDurationToSeconds(current?.duration || "PT0S");

  const progress = useTrackProgress({
    durationSec,
    isPlaying: isPlaying ?? false,
    trackId: current?.id,
    initialProgress: playerState?.currentTrackProgress,
  });

  // Build lists: sticky current + rest of queue
  const queueWithoutCurrent = useMemo(() => {
    const currentQueueItemId = playerState?.currentQueueItem?.id;
    return queue.filter(x => x.id !== currentQueueItemId);
  }, [queue, playerState?.currentQueueItem?.id]);

  // Обработчики для синхронизации hover между левой и правой колонками
  const handleItemHover = useCallback(
    (trackId: string | undefined, isEnter: boolean) => {
      if (!trackId) return;

      const items = document.querySelectorAll(`[data-track-id="${trackId}"]`);
      items.forEach(item => {
        if (isEnter) {
          item.classList.add(styles.pairHovered);
        } else {
          item.classList.remove(styles.pairHovered);
        }
      });
    },
    []
  );

  // Обработчик удаления трека из очереди с оптимистичным обновлением
  const handleDeleteFromQueue = useCallback(
    async (queueItemId: string) => {
      if (deletingId) return; // Предотвращаем множественные удаления

      setDeletingId(queueItemId);

      // Сохраняем текущую очередь для отката
      const previousQueue = [...queue];

      // Оптимистичное обновление - удаляем сразу из UI
      removeFromQueue(queueItemId);

      try {
        const response =
          await soundRequestApi.soundRequestQueueDelete(queueItemId);

        if (response.data.success) {
          // Подтверждаем обновление очереди от сервера
          await fetchQueue();
        } else {
          // Откатываем изменения при ошибке
          rollbackQueue(previousQueue);
          showToast({
            success: false,
            message: response.data.message || "Не удалось удалить трек",
          });
        }
      } catch (error) {
        // Откатываем изменения при ошибке
        rollbackQueue(previousQueue);
        console.error("Ошибка при удалении трека:", error);
        showToast({
          success: false,
          message: "Произошла ошибка при удалении трека",
        });
      } finally {
        setDeletingId(null);
      }
    },
    [
      deletingId,
      queue,
      removeFromQueue,
      rollbackQueue,
      soundRequestApi,
      showToast,
      fetchQueue,
    ]
  );

  // Рендеринг треков в зависимости от режима
  const renderTracksList = useMemo(() => {
    const trackItems: JSX.Element[] = [];

    switch (viewMode) {
      case TrackListViewMode.Default:
        // Обычный режим: текущий трек -> очередь
        if (current) {
          trackItems.push(
            <TrackItem
              key={`current-${current.id}`}
              track={current}
              isCurrent
              isPlaying={isPlaying ?? false}
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

      case TrackListViewMode.WithHistory:
        // С историей: история -> текущий трек -> очередь
        history.slice(0, 5).forEach((track, index) => {
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
              isPlaying={isPlaying ?? false}
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

      case TrackListViewMode.Reversed:
        // Обратный режим: история -> текущий трек (снизу)
        history.slice(0, 5).forEach((track, index) => {
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
              isPlaying={isPlaying ?? false}
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

  // Рендеринг пользователей в зависимости от режима
  const renderUsersList = useMemo(() => {
    const userItems: JSX.Element[] = [];

    switch (viewMode) {
      case TrackListViewMode.Default:
        // Обычный режим: текущий пользователь -> пользователи очереди
        if (current) {
          userItems.push(
            <UserItem
              key={`current-user-${
                playerState?.currentQueueItem?.requestedByTwitchId +
                "_" +
                current.id
              }`}
              user={
                playerState?.currentQueueItem?.requestedByTwitchUser ??
                undefined
              }
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

      case TrackListViewMode.WithHistory:
        // С историей: заглушки для истории -> текущий -> очередь
        history.slice(0, 5).forEach((track, index) => {
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
                playerState?.currentQueueItem?.requestedByTwitchId +
                "_" +
                current.id
              }`}
              user={
                playerState?.currentQueueItem?.requestedByTwitchUser ??
                undefined
              }
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

      case TrackListViewMode.Reversed:
        // Обратный режим: пустые UserItem для истории -> текущий пользователь
        history.slice(0, 5).forEach((track, index) => {
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
                playerState?.currentQueueItem?.requestedByTwitchId +
                "_" +
                current.id
              }`}
              user={
                playerState?.currentQueueItem?.requestedByTwitchUser ??
                undefined
              }
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
    playerState?.currentQueueItem,
    queueWithoutCurrent,
    history,
    handleItemHover,
  ]);

  return (
    <div className={styles.root}>
      <div className={styles.container1}>
        {/* Верхний блок 9 частей высоты: 7:3 по ширине */}
        <div className={styles.topSplit}>
          <div
            className={`${styles.leftCol} ${viewMode === TrackListViewMode.Reversed ? styles.reversedMode : ""}`}
          >
            <div className={styles.scrollList}>{renderTracksList}</div>
          </div>

          <div
            className={`${styles.rightCol} ${viewMode === TrackListViewMode.Reversed ? styles.reversedMode : ""}`}
          >
            <div className={styles.scrollList}>{renderUsersList}</div>
          </div>
        </div>
      </div>

      {/* Нижний блок 1 часть высоты — тулбар с прогресс-заливкой */}
      <div className={styles.container3}>
        <PlayerToolbar
          isPlaying={isPlaying ?? false}
          isStopped={isStopped ?? false}
          isMuted={playerState?.isMuted ?? false}
          volume={volume}
          loading={loading}
          hasPrevious={!!history?.length}
          progress={progress}
          videoState={playerState?.videoState}
          viewMode={viewMode}
          onPrev={handlePlayPrevious}
          onTogglePlayPause={handleTogglePlayPause}
          onStop={handleStop}
          onSkip={handleSkip}
          onMute={handleMute}
          onVolumeChange={handleVolumeChange}
          onToggleVideoState={handleToggleVideoState}
          onToggleViewMode={cycleViewMode}
        />
      </div>
    </div>
  );
}
