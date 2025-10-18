import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import { PlayerState, SoundRequest, UserRequestedTrack } from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";

/**
 * Хук для управления SoundRequest плеером
 * Содержит всю общую логику управления плеером
 */
export const useSoundRequestPlayer = () => {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [queue, setQueue] = useState<UserRequestedTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState(50);
  const [debouncedVolume, setDebouncedVolume] = useState(50);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const { showToast } = useToastModal();
  const soundRequestApi = useMemo(() => new SoundRequest(), []);

  // Debounce для громкости с задержкой 500мс
  useDebounce(
    () => {
      setDebouncedVolume(volume);
    },
    500,
    [volume]
  );

  // Отправка громкости на сервер после debounce
  useEffect(() => {
    // Пропускаем первую загрузку
    if (isInitialLoad) {
      setIsInitialLoad(false);
      return;
    }

    const sendVolumeToServer = async () => {
      try {
        const response =
          await soundRequestApi.soundRequestVolumeCreate(debouncedVolume);
        showToast(response.data);
      } catch {
        showToast({
          success: false,
          message: "Ошибка при изменении громкости",
        });
      }
    };

    sendVolumeToServer();
  }, [debouncedVolume, soundRequestApi, showToast, isInitialLoad]);

  // Загрузка состояния плеера
  const fetchPlayerState = useCallback(async () => {
    try {
      const response = await soundRequestApi.soundRequestStateList();
      if (response.data.success && response.data.data) {
        setPlayerState(response.data.data);
        setVolume(response.data.data.volume);
      }
    } catch {
      console.error("Ошибка загрузки состояния плеера");
    }
  }, [soundRequestApi]);

  // Загрузка очереди
  const fetchQueue = useCallback(async () => {
    try {
      const response = await soundRequestApi.soundRequestQueueList();
      if (response.data.success && response.data.data) {
        setQueue(response.data.data);
      }
    } catch {
      console.error("Ошибка загрузки очереди");
    }
  }, [soundRequestApi]);

  // Инициализация
  useEffect(() => {
    fetchPlayerState();
    fetchQueue();

    // Обновление каждые 2 секунды
    const interval = setInterval(() => {
      fetchPlayerState();
      fetchQueue();
    }, 2000);

    return () => clearInterval(interval);
  }, [fetchPlayerState, fetchQueue]);

  // Управление воспроизведением
  const handlePlay = useCallback(async () => {
    try {
      setLoading(true);
      const response = await soundRequestApi.soundRequestPlayCreate();
      showToast(response.data);
      await fetchPlayerState();
    } catch {
      showToast({
        success: false,
        message: "Ошибка при воспроизведении",
      });
    } finally {
      setLoading(false);
    }
  }, [soundRequestApi, showToast, fetchPlayerState]);

  const handlePause = useCallback(async () => {
    try {
      setLoading(true);
      const response = await soundRequestApi.soundRequestPauseCreate();
      showToast(response.data);
      await fetchPlayerState();
    } catch {
      showToast({
        success: false,
        message: "Ошибка при паузе",
      });
    } finally {
      setLoading(false);
    }
  }, [soundRequestApi, showToast, fetchPlayerState]);

  const handleTogglePlayPause = useCallback(async () => {
    try {
      setLoading(true);
      const response =
        await soundRequestApi.soundRequestTogglePlayPauseCreate();
      showToast(response.data);
      await fetchPlayerState();
    } catch {
      showToast({
        success: false,
        message: "Ошибка при переключении воспроизведения",
      });
    } finally {
      setLoading(false);
    }
  }, [soundRequestApi, showToast, fetchPlayerState]);

  const handleStop = useCallback(async () => {
    try {
      setLoading(true);
      const response = await soundRequestApi.soundRequestStopCreate();
      showToast(response.data);
      await fetchPlayerState();
    } catch {
      showToast({
        success: false,
        message: "Ошибка при остановке",
      });
    } finally {
      setLoading(false);
    }
  }, [soundRequestApi, showToast, fetchPlayerState]);

  const handleSkip = useCallback(async () => {
    try {
      setLoading(true);
      const response = await soundRequestApi.soundRequestSkipCreate();
      showToast(response.data);
      await fetchPlayerState();
      await fetchQueue();
    } catch {
      showToast({
        success: false,
        message: "Ошибка при пропуске трека",
      });
    } finally {
      setLoading(false);
    }
  }, [soundRequestApi, showToast, fetchPlayerState, fetchQueue]);

  // Управление громкостью
  const handleVolumeChange = useCallback((newVolume: number) => {
    // Сразу обновляем локальное состояние для UI
    setVolume(newVolume);
    // Отправка на сервер произойдет автоматически через debounce в useEffect
  }, []);

  const handleMute = useCallback(async () => {
    try {
      const response = await soundRequestApi.soundRequestToggleMuteCreate();
      showToast(response.data);
      await fetchPlayerState();
    } catch {
      showToast({
        success: false,
        message: "Ошибка при изменении режима звука",
      });
    }
  }, [soundRequestApi, showToast, fetchPlayerState]);

  // Удаление трека из очереди
  const handleRemoveFromQueue = useCallback(
    async (trackId: string) => {
      try {
        const response = await soundRequestApi.soundRequestQueueDelete(trackId);
        showToast(response.data);
        await fetchQueue();
      } catch {
        showToast({
          success: false,
          message: "Ошибка при удалении трека из очереди",
        });
      }
    },
    [soundRequestApi, showToast, fetchQueue]
  );

  // Вычисление состояния воспроизведения
  const isPlaying =
    playerState && !playerState.isPaused && !playerState.isStoped;

  return {
    // Состояние
    playerState,
    queue,
    loading,
    volume,
    isPlaying,

    // Обработчики управления воспроизведением
    handlePlay,
    handlePause,
    handleTogglePlayPause,
    handleStop,
    handleSkip,

    // Обработчики управления громкостью
    handleVolumeChange,
    handleMute,

    // Обработчики управления очередью
    handleRemoveFromQueue,
  };
};
