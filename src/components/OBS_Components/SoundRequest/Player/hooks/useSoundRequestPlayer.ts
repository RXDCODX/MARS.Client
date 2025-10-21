import { useCallback, useEffect, useMemo, useState } from "react";
import { useDebounce } from "react-use";

import {
  BaseTrackInfo,
  PlayerState,
  SoundRequest,
  UserRequestedTrack,
} from "@/shared/api";
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
  const [history, setHistory] = useState<BaseTrackInfo[]>([]);

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

  // Загрузка истории
  const fetchHistory = useCallback(
    async (count: number = 20) => {
      try {
        const response = await soundRequestApi.soundRequestHistoryList({
          count,
        });
        if (response.data.success && response.data.data) {
          setHistory(response.data.data);
        }
      } catch {
        console.error("Ошибка загрузки истории плеера");
      }
    },
    [soundRequestApi]
  );

  // Инициализация
  useEffect(() => {
    fetchPlayerState();
    fetchQueue();
    fetchHistory(20);

    // Обновление каждые 2 секунды
    const interval = setInterval(() => {
      fetchPlayerState();
      fetchQueue();
      // Историю можно обновлять реже
    }, 2000);

    const historyInterval = setInterval(() => {
      fetchHistory(20);
    }, 10000);

    return () => {
      clearInterval(interval);
      clearInterval(historyInterval);
    };
  }, [fetchPlayerState, fetchQueue, fetchHistory]);

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

  // Воспроизвести следующий трек из очереди
  const handlePlayNext = useCallback(async () => {
    try {
      setLoading(true);
      const response = await soundRequestApi.soundRequestPlayNextCreate();
      showToast(response.data);
      await fetchPlayerState();
      await fetchQueue();
    } catch {
      showToast({
        success: false,
        message: "Ошибка при запуске следующего трека",
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

  // Воспроизвести конкретный трек из очереди
  const handlePlayTrackFromQueue = useCallback(
    async (queueItemId: string) => {
      try {
        setLoading(true);
        const response =
          await soundRequestApi.soundRequestPlayTrackCreate(queueItemId);
        showToast(response.data);
        await fetchPlayerState();
        await fetchQueue();
      } catch {
        showToast({
          success: false,
          message: "Ошибка при запуске выбранного трека",
        });
      } finally {
        setLoading(false);
      }
    },
    [soundRequestApi, showToast, fetchPlayerState, fetchQueue]
  );

  // Вычисление состояния воспроизведения
  const isPlaying =
    playerState && !playerState.isPaused && !playerState.isStoped;

  // Ближайшие 5 заказов
  const nextFiveOrders = useMemo(() => queue.slice(0, 5), [queue]);

  // Набор отображаемых видео для карусели: текущее, следующее, первые в очереди
  const displayedVideos: BaseTrackInfo[] = useMemo(() => {
    const list: BaseTrackInfo[] = [];
    if (playerState?.currentTrack) list.push(playerState.currentTrack);
    if (playerState?.nextTrack) list.push(playerState.nextTrack);
    for (const item of queue) {
      if (list.length >= 6) break;
      list.push(item.requestedTrack);
    }
    return list;
  }, [playerState, queue]);

  return {
    // Состояние
    playerState,
    queue,
    loading,
    volume,
    isPlaying,
    history,
    nextFiveOrders,
    displayedVideos,

    // Обработчики управления воспроизведением
    handlePlay,
    handlePause,
    handleTogglePlayPause,
    handleStop,
    handleSkip,
    handlePlayNext,

    // Обработчики управления громкостью
    handleVolumeChange,
    handleMute,

    // Обработчики управления очередью
    handleRemoveFromQueue,
    handlePlayTrackFromQueue,
  };
};
