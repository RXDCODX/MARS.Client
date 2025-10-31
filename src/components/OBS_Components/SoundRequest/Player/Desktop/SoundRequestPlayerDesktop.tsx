import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useShallow } from "zustand/react/shallow";

import { SoundRequest } from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";

import { LiquidChrome } from "../Background";
import { PlayerActionsProvider } from "../contexts/PlayerActionsContext";
import { useSoundRequestPlayer } from "../hooks";
import { usePlayerStore } from "../stores/usePlayerStore";
import { parseDurationToSeconds } from "../utils";
import { AddTrackModal, PlayerToolbar } from "./PlayerToolbar";
import styles from "./SoundRequestPlayerDesktop.module.scss";
import { TrackColumn } from "./TrackColumn";
import { UserColumn } from "./UserColumn";
import { useTrackProgress } from "./useTrackProgress";

function SoundRequestPlayerDesktopComponent() {
  const {
    playerState,
    queue: hookQueue,
    isPlaying,
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

  // Zustand store - только данные для чтения (с useShallow для оптимизации)
  const { queue, history, viewMode } = usePlayerStore(
    useShallow(state => ({
      queue: state.queue,
      history: state.history,
      viewMode: state.viewMode,
    }))
  );

  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddTrackModal, setShowAddTrackModal] = useState(false);
  const { showToast } = useToastModal();
  const soundRequestApi = useMemo(() => new SoundRequest(), []);

  // Синхронизация очереди и истории из хука с Zustand
  // Используем прямое обращение к стору через getState, чтобы избежать зависимостей
  useEffect(() => {
    if (hookQueue) {
      usePlayerStore.getState().setQueue(hookQueue);
    }
  }, [hookQueue]);

  useEffect(() => {
    if (hookHistory) {
      // Сортируем историю по дате воспроизведения (свежие первыми)
      const sortedHistory = [...hookHistory].sort((a, b) => {
        const dateA = new Date(a.lastTimePlays).getTime();
        const dateB = new Date(b.lastTimePlays).getTime();
        return dateB - dateA; // Убывание - самые свежие первыми
      });
      usePlayerStore.getState().setHistory(sortedHistory);
    }
  }, [hookHistory]);

  // Извлекаем конкретные значения из playerState
  const current = playerState?.currentQueueItem?.track || null;
  const currentQueueItem = playerState?.currentQueueItem;
  const currentQueueItemId = playerState?.currentQueueItem?.id;
  const currentTrackProgress = playerState?.currentTrackProgress;

  const durationSec = parseDurationToSeconds(current?.duration || "PT0S");

  const progress = useTrackProgress({
    durationSec,
    isPlaying: isPlaying ?? false,
    trackId: current?.id,
    initialProgress: currentTrackProgress,
  });

  // Build lists: sticky current + rest of queue
  const queueWithoutCurrent = useMemo(
    () => queue.filter(x => x.id !== currentQueueItemId),
    [queue, currentQueueItemId]
  );

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
      const previousQueue = [...usePlayerStore.getState().queue];

      // Оптимистичное обновление - удаляем сразу из UI
      usePlayerStore.getState().removeFromQueue(queueItemId);

      try {
        const response =
          await soundRequestApi.soundRequestQueueDelete(queueItemId);

        if (response.data.success) {
          // Подтверждаем обновление очереди от сервера
          await fetchQueue();
        } else {
          // Откатываем изменения при ошибке
          usePlayerStore.getState().rollbackQueue(previousQueue);
          showToast({
            success: false,
            message: response.data.message || "Не удалось удалить трек",
          });
        }
      } catch (error) {
        // Откатываем изменения при ошибке
        usePlayerStore.getState().rollbackQueue(previousQueue);
        console.error("Ошибка при удалении трека:", error);
        showToast({
          success: false,
          message: "Произошла ошибка при удалении трека",
        });
      } finally {
        setDeletingId(null);
      }
    },
    [deletingId, soundRequestApi, showToast, fetchQueue]
  );

  // Обработчик добавления трека
  const handleAddTrack = useCallback(
    async (query: string) => {
      try {
        const response = await soundRequestApi.soundRequestAddTrackCreate({
          query,
        });

        showToast(response.data);

        if (response.data.success) {
          // Обновляем очередь после успешного добавления
          await fetchQueue();
        }
      } catch (error) {
        console.error("Ошибка при добавлении трека:", error);
        showToast({
          success: false,
          message: "Произошла ошибка при добавлении трека",
        });
      }
    },
    [soundRequestApi, showToast, fetchQueue]
  );

  // Мемоизированные обработчики для модального окна
  const handleOpenAddTrackModal = useCallback(() => {
    setShowAddTrackModal(true);
  }, []);

  const handleCloseAddTrackModal = useCallback(() => {
    setShowAddTrackModal(false);
  }, []);

  // Собираем все обработчики в один объект для контекста
  const playerActions = useMemo(
    () => ({
      handlePlayPrevious,
      handleTogglePlayPause,
      handleStop,
      handleSkip,
      handleMute,
      handleVolumeChange,
      handleToggleVideoState,
      handleOpenAddTrackModal,
    }),
    [
      handlePlayPrevious,
      handleTogglePlayPause,
      handleStop,
      handleSkip,
      handleMute,
      handleVolumeChange,
      handleToggleVideoState,
      handleOpenAddTrackModal,
    ]
  );

  return (
    <PlayerActionsProvider actions={playerActions}>
      <LiquidChrome key={1} />
      <div className={styles.root}>
        <div className={styles.container1}>
          {/* Верхний блок 9 частей высоты: 7:3 по ширине */}
          <div className={styles.topSplit}>
            <TrackColumn
              viewMode={viewMode}
              current={current}
              isPlaying={isPlaying ?? false}
              queueWithoutCurrent={queueWithoutCurrent}
              history={history}
              onItemHover={handleItemHover}
              onDelete={handleDeleteFromQueue}
            />

            <UserColumn
              viewMode={viewMode}
              current={current}
              currentQueueItem={currentQueueItem}
              queueWithoutCurrent={queueWithoutCurrent}
              history={history}
              onItemHover={handleItemHover}
            />
          </div>
        </div>

        {/* Нижний блок 1 часть высоты — тулбар с прогресс-заливкой */}
        <div className={styles.container3}>
          <PlayerToolbar />
        </div>

        <AddTrackModal
          show={showAddTrackModal}
          onClose={handleCloseAddTrackModal}
          onSubmit={handleAddTrack}
        />
      </div>
    </PlayerActionsProvider>
  );
}

// Экспортируем мемоизированную версию для оптимизации производительности
export const SoundRequestPlayerDesktop = memo(
  SoundRequestPlayerDesktopComponent
);
