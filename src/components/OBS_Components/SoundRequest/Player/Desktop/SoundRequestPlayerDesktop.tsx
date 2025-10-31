import { useCallback, useEffect, useMemo, useState } from "react";

import { SoundRequest } from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";

import { LiquidChrome } from "../Background";
import { useSoundRequestPlayer } from "../hooks";
import { usePlayerStore } from "../stores/usePlayerStore";
import { AddTrackModal, PlayerToolbar } from "./PlayerToolbar";
import styles from "./SoundRequestPlayerDesktop.module.scss";
import { TrackColumn } from "./TrackColumn";
import { UserColumn } from "./UserColumn";
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
  const [showAddTrackModal, setShowAddTrackModal] = useState(false);
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
      // Сортируем историю по дате воспроизведения (свежие первыми)
      const sortedHistory = [...hookHistory].sort((a, b) => {
        const dateA = new Date(a.lastTimePlays).getTime();
        const dateB = new Date(b.lastTimePlays).getTime();
        return dateB - dateA; // Убывание - самые свежие первыми
      });
      setHistory(sortedHistory);
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

  return (
    <>
      <LiquidChrome
        baseColor={[0.1, 0.05, 0.2]}
        speed={0.15}
        amplitude={0.25}
        frequencyX={2.5}
        frequencyY={2.5}
        interactive={false}
      />
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
              currentQueueItem={playerState?.currentQueueItem}
              queueWithoutCurrent={queueWithoutCurrent}
              history={history}
              onItemHover={handleItemHover}
            />
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
            onAddTrack={() => setShowAddTrackModal(true)}
          />
        </div>

        <AddTrackModal
          show={showAddTrackModal}
          onClose={() => setShowAddTrackModal(false)}
          onSubmit={handleAddTrack}
        />
      </div>
    </>
  );
}
