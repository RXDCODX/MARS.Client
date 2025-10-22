import type { HubConnection } from "@microsoft/signalr";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  BaseTrackInfo,
  PlayerState,
  PlayerStateStateEnum,
  SoundRequest,
  SoundRequestHubSignalRConnectionBuilder,
} from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";

/**
 * Хук для управления SoundRequest плеером
 * Содержит всю общую логику управления плеером
 */
export const useSoundRequestPlayer = () => {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [queue, setQueue] = useState<BaseTrackInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [volume, setVolume] = useState<number>(0);
  const [history, setHistory] = useState<BaseTrackInfo[]>([]);

  const { showToast } = useToastModal();
  const soundRequestApi = useMemo(() => new SoundRequest(), []);
  const connectionRef = useRef<HubConnection | null>(null);

  // Инициализация SignalR подключения
  useEffect(() => {
    const connection = SoundRequestHubSignalRConnectionBuilder.build();
    connectionRef.current = connection;

    connection
      .start()
      .then(() => {
        console.log("[useSoundRequestPlayer] SignalR подключение установлено");
      })
      .catch(error => {
        console.error(
          "[useSoundRequestPlayer] Ошибка подключения к SignalR:",
          error
        );
      });

    return () => {
      connection.stop().catch(() => undefined);
      if (connectionRef.current === connection) {
        connectionRef.current = null;
      }
    };
  }, []);

  // Синхронизация volume с playerState
  useEffect(() => {
    if (playerState?.volume !== undefined) {
      setVolume(playerState.volume);
    }
  }, [playerState?.volume]);

  // Загрузка состояния плеера
  const fetchPlayerState = useCallback(async () => {
    try {
      const response = await soundRequestApi.soundRequestStateList();
      if (response.data.success && response.data.data) {
        setPlayerState(response.data.data);
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
      if (!response.data.success) {
        showToast(response.data);
      }
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
      if (!response.data.success) {
        showToast(response.data);
      }
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
      if (!response.data.success) {
        showToast(response.data);
      }
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
      if (!response.data.success) {
        showToast(response.data);
      }
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
      if (!response.data.success) {
        showToast(response.data);
      }
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
      if (!response.data.success) {
        showToast(response.data);
      }
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
  const handleVolumeChange = useCallback(
    async (newVolume: number) => {
      // Сразу обновляем локальное состояние для UI
      setVolume(newVolume);

      // Отправляем изменение громкости через SignalR
      if (!connectionRef.current) {
        return;
      }

      try {
        await connectionRef.current.invoke("VolumeChange", newVolume);
      } catch (error) {
        console.error("Ошибка при изменении громкости через SignalR:", error);
        showToast({
          success: false,
          message: "Ошибка при изменении громкости",
        });
      }
    },
    [showToast]
  );

  const handleMute = useCallback(async () => {
    try {
      const response = await soundRequestApi.soundRequestToggleMuteCreate();
      if (!response.data.success) {
        showToast(response.data);
      }
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
        if (!response.data.success) {
          showToast(response.data);
        }
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
        if (!response.data.success) {
          showToast(response.data);
        }
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
    playerState && playerState.state === PlayerStateStateEnum.Playing;

  // Ближайшие 5 заказов
  const nextFiveOrders = useMemo(() => queue.slice(0, 5), [queue]);

  // Набор отображаемых видео для карусели: текущее, следующее, первые в очереди
  const displayedVideos: BaseTrackInfo[] = useMemo(() => {
    const list: BaseTrackInfo[] = [];
    if (playerState?.currentTrack) list.push(playerState.currentTrack);
    if (playerState?.nextTrack) list.push(playerState.nextTrack);
    for (const item of queue) {
      if (list.length >= 6) break;
      list.push(item);
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
