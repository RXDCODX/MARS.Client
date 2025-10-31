import { memo, useCallback, useEffect, useMemo, useState } from "react";

import { SoundRequest } from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";

import { LiquidChrome } from "../Background";
import { PlayerActionsProvider } from "../contexts/PlayerActionsContext";
import { useSoundRequestPlayer } from "../hooks";
import { usePlayerStore } from "../stores/usePlayerStore";
import { AddTrackModal, PlayerToolbar } from "./PlayerToolbar";
import styles from "./SoundRequestPlayerDesktop.module.scss";
import { TrackColumn } from "./TrackColumn";
import { UserColumn } from "./UserColumn";

function SoundRequestPlayerDesktopComponent() {
  const {
    queue: hookQueue,
    history: hookHistory,
    handlePlayPrevious,
    handleTogglePlayPause,
    handleStop,
    handleSkip,
    handleVolumeChange,
    handleMute,
    handleToggleVideoState,
  } = useSoundRequestPlayer();

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

  // Обработчик добавления трека
  const handleAddTrack = useCallback(
    async (query: string) => {
      try {
        const response = await soundRequestApi.soundRequestAddTrackCreate({
          query,
        });

        showToast(response.data);
        // Очередь обновится автоматически через SignalR
      } catch (error) {
        console.error("Ошибка при добавлении трека:", error);
        showToast({
          success: false,
          message: "Произошла ошибка при добавлении трека",
        });
      }
    },
    [soundRequestApi, showToast]
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
            <TrackColumn />
            <UserColumn />
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
