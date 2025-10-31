import type { HubConnection } from "@microsoft/signalr";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  BaseTrackInfo,
  PlayerState,
  PlayerStateStateEnum,
  PlayerStateVideoStateEnum,
  QueueItem,
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
  const [queue, setQueue] = useState<QueueItem[]>([]);
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

    // Подписка на события от сервера
    connection.on("PlayerStateChange", (state: PlayerState) => {
      console.log(
        "[useSoundRequestPlayer] Получено обновление состояния через SignalR:",
        {
          currentTrack: state?.currentQueueItem?.track?.trackName,
          nextTrack: state?.nextQueueItem?.track?.trackName,
          state: state?.state,
        }
      );
      setPlayerState(state);
    });

    connection.on("QueueChanged", (queueItems: QueueItem[]) => {
      console.log(
        "[useSoundRequestPlayer] Получено обновление очереди через SignalR:",
        {
          count: queueItems?.length || 0,
        }
      );
      if (queueItems) {
        setQueue(queueItems);
      }
    });

    connection
      .start()
      .then(async () => {
        console.log("[useSoundRequestPlayer] SignalR подключение установлено");
        // Присоединяемся к группе для получения обновлений
        console.log(
          "[useSoundRequestPlayer] Присоединились к группе apiplayer"
        );
      })
      .catch(error => {
        console.error(
          "[useSoundRequestPlayer] Ошибка подключения к SignalR:",
          error
        );
      });

    return () => {
      connection.off("PlayerStateChange");
      connection.off("QueueChanged");
      connection.stop().catch(() => undefined);
      if (connectionRef.current === connection) {
        connectionRef.current = null;
      }
    };
  }, []);

  // Отслеживание изменений playerState и обновление очереди/истории
  useEffect(() => {
    if (!playerState) return;

    console.log("[useSoundRequestPlayer] PlayerState изменился:", {
      hasState: !!playerState,
      currentTrack: playerState?.currentQueueItem?.track?.trackName,
      nextTrack: playerState?.nextQueueItem?.track?.trackName,
      state: playerState?.state,
      volume: playerState?.volume,
      isMuted: playerState?.isMuted,
    });

    // Обновляем очередь и последние 5 треков истории при каждом изменении состояния
    const updateData = async () => {
      try {
        console.log(
          "[useSoundRequestPlayer] Обновление очереди и истории (последние 5 треков)"
        );
        const queueResponse = await soundRequestApi.soundRequestQueueList();
        const historyResponse = await soundRequestApi.soundRequestHistoryList({
          count: 5,
        });

        if (queueResponse.data.success && queueResponse.data.data) {
          setQueue(queueResponse.data.data);
        }

        if (historyResponse.data.success && historyResponse.data.data) {
          setHistory(historyResponse.data.data);
        }
      } catch (error) {
        console.error(
          "[useSoundRequestPlayer] Ошибка при обновлении данных:",
          error
        );
      }
    };

    updateData();
  }, [playerState, soundRequestApi]);

  // Синхронизация volume с playerState
  useEffect(() => {
    if (playerState?.volume !== undefined) {
      setVolume(playerState.volume);
    }
  }, [playerState?.volume]);

  // Загрузка состояния плеера
  const fetchPlayerState = useCallback(async () => {
    try {
      console.log("[useSoundRequestPlayer] Запрос состояния плеера...");
      const response = await soundRequestApi.soundRequestStateList();
      console.log("[useSoundRequestPlayer] Ответ от API:", {
        success: response.data.success,
        hasData: !!response.data.data,
        currentTrack: response.data.data?.currentQueueItem?.track?.trackName,
        nextTrack: response.data.data?.nextQueueItem?.track?.trackName,
        state: response.data.data?.state,
      });

      if (!response.data.success) {
        console.error(
          "[useSoundRequestPlayer] API вернул success=false:",
          response.data
        );
        return;
      }

      if (!response.data.data) {
        console.warn(
          "[useSoundRequestPlayer] API не вернул данные (data пусто)"
        );
        return;
      }

      setPlayerState(response.data.data);
      console.log("[useSoundRequestPlayer] Состояние плеера обновлено");
    } catch (error) {
      console.error(
        "[useSoundRequestPlayer] Ошибка загрузки состояния плеера:",
        error
      );
    }
  }, [soundRequestApi]);

  // Загрузка очереди
  const fetchQueue = useCallback(async () => {
    try {
      console.log("[useSoundRequestPlayer] Запрос очереди...");
      const response = await soundRequestApi.soundRequestQueueList();
      console.log("[useSoundRequestPlayer] Очередь получена:", {
        success: response.data.success,
        count: response.data.data?.length || 0,
      });

      if (!response.data.success) {
        console.error(
          "[useSoundRequestPlayer] API очереди вернул success=false:",
          response.data
        );
        return;
      }

      if (response.data.data) {
        setQueue(response.data.data);
      }
    } catch (error) {
      console.error("[useSoundRequestPlayer] Ошибка загрузки очереди:", error);
    }
  }, [soundRequestApi]);

  // Загрузка истории
  const fetchHistory = useCallback(
    async (count: number = 20) => {
      try {
        console.log("[useSoundRequestPlayer] Запрос истории...");
        const response = await soundRequestApi.soundRequestHistoryList({
          count,
        });
        console.log("[useSoundRequestPlayer] История получена:", {
          success: response.data.success,
          count: response.data.data?.length || 0,
        });

        if (!response.data.success) {
          console.error(
            "[useSoundRequestPlayer] API истории вернул success=false:",
            response.data
          );
          return;
        }

        if (response.data.data) {
          setHistory(response.data.data);
        }
      } catch (error) {
        console.error(
          "[useSoundRequestPlayer] Ошибка загрузки истории плеера:",
          error
        );
      }
    },
    [soundRequestApi]
  );

  // Обновление очереди при переключении треков теперь происходит автоматически
  // через useEffect отслеживания изменений playerState (см. выше)

  // Инициализация
  useEffect(() => {
    console.log(
      "[useSoundRequestPlayer] Инициализация - загружаем начальные данные"
    );
    // Загружаем начальное состояние (если SignalR еще не отправил)
    // Очередь и история (последние 5 треков) будут автоматически загружены
    // при получении playerState через SignalR
    fetchPlayerState();
  }, [fetchPlayerState]);

  // Вспомогательная функция для отправки изменений состояния через SignalR
  const updatePlayerState = useCallback(
    async (updates: Partial<PlayerState>) => {
      if (!connectionRef.current || !playerState) {
        console.warn("[useSoundRequestPlayer] Нет подключения или состояния");
        return;
      }

      try {
        const newState: PlayerState = {
          ...playerState,
          ...updates,
        };

        console.log(
          "[useSoundRequestPlayer] Отправка FrontStateChange:",
          newState
        );
        await connectionRef.current.invoke("FrontStateChange", newState);
      } catch (error) {
        console.error(
          "[useSoundRequestPlayer] Ошибка при отправке FrontStateChange:",
          error
        );
        showToast({
          success: false,
          message: "Ошибка при обновлении состояния плеера",
        });
      }
    },
    [playerState, showToast]
  );

  // Управление воспроизведением
  const handlePlay = useCallback(async () => {
    setLoading(true);
    await updatePlayerState({ state: PlayerStateStateEnum.Playing });
    setLoading(false);
  }, [updatePlayerState]);

  const handlePause = useCallback(async () => {
    setLoading(true);
    await updatePlayerState({ state: PlayerStateStateEnum.Paused });
    setLoading(false);
  }, [updatePlayerState]);

  const handleTogglePlayPause = useCallback(async () => {
    setLoading(true);
    const newState =
      playerState?.state === PlayerStateStateEnum.Playing
        ? PlayerStateStateEnum.Paused
        : PlayerStateStateEnum.Playing;
    await updatePlayerState({ state: newState });
    setLoading(false);
  }, [updatePlayerState, playerState]);

  const handleStop = useCallback(async () => {
    setLoading(true);
    await updatePlayerState({ state: PlayerStateStateEnum.Stopped });
    setLoading(false);
  }, [updatePlayerState]);

  // Управление переключением треков через SignalR
  const handleSkip = useCallback(async () => {
    if (!connectionRef.current) {
      console.warn("[useSoundRequestPlayer] Нет подключения к SignalR");
      showToast({
        success: false,
        message: "Нет подключения к серверу",
      });
      return;
    }

    try {
      setLoading(true);
      console.log("[useSoundRequestPlayer] Отправка SkipTrack");
      await connectionRef.current.invoke("SkipTrack");

      // Обновляем очередь и историю после переключения
      console.log(
        "[useSoundRequestPlayer] Обновление очереди и истории после Skip"
      );
      await Promise.all([fetchQueue(), fetchHistory(5)]);
    } catch (error) {
      console.error(
        "[useSoundRequestPlayer] Ошибка при пропуске трека:",
        error
      );
    } finally {
      setLoading(false);
    }
  }, [showToast, fetchQueue, fetchHistory]);

  const handlePlayNext = useCallback(async () => {
    // Псевдоним для handleSkip
    await handleSkip();
  }, [handleSkip]);

  const handlePlayPrevious = useCallback(async () => {
    if (!connectionRef.current) {
      console.warn("[useSoundRequestPlayer] Нет подключения к SignalR");
      showToast({
        success: false,
        message: "Нет подключения к серверу",
      });
      return;
    }

    try {
      setLoading(true);
      console.log("[useSoundRequestPlayer] Отправка PlayPrevious");
      await connectionRef.current.invoke("PlayPrevious");

      // Обновляем очередь и историю после переключения
      console.log(
        "[useSoundRequestPlayer] Обновление очереди и истории после PlayPrevious"
      );
      await Promise.all([fetchQueue(), fetchHistory(5)]);
    } catch (error) {
      console.error(
        "[useSoundRequestPlayer] Ошибка при переключении на предыдущий трек:",
        error
      );
      showToast({
        success: false,
        message: "Ошибка при переключении на предыдущий трек",
      });
    } finally {
      setLoading(false);
    }
  }, [showToast, fetchQueue, fetchHistory]);

  // Управление громкостью
  const handleVolumeChange = useCallback(
    async (newVolume: number) => {
      // Сразу обновляем локальное состояние для UI
      setVolume(newVolume);
      // Отправляем изменение через FrontStateChange
      await updatePlayerState({ volume: newVolume });
    },
    [updatePlayerState]
  );

  const handleMute = useCallback(async () => {
    const isMuted = playerState?.isMuted ?? false;
    await updatePlayerState({ isMuted: !isMuted });
  }, [updatePlayerState, playerState]);

  // Переключение режима отображения видео
  const handleToggleVideoState = useCallback(async () => {
    const currentVideoState =
      playerState?.videoState ?? PlayerStateVideoStateEnum.Video;

    // Циклическое переключение: Video -> NoVideo -> AudioOnly -> Video
    const nextVideoState =
      currentVideoState === PlayerStateVideoStateEnum.Video
        ? PlayerStateVideoStateEnum.NoVideo
        : currentVideoState === PlayerStateVideoStateEnum.NoVideo
          ? PlayerStateVideoStateEnum.AudioOnly
          : PlayerStateVideoStateEnum.Video;

    await updatePlayerState({ videoState: nextVideoState });
  }, [updatePlayerState, playerState]);

  // Удаление трека из очереди и управление треками удалены
  const handleRemoveFromQueue = useCallback(async () => {
    console.warn(
      "[useSoundRequestPlayer] handleRemoveFromQueue: функция удалена из API"
    );
  }, []);

  const handlePlayTrackFromQueue = useCallback(async () => {
    console.warn(
      "[useSoundRequestPlayer] handlePlayTrackFromQueue: функция удалена из API"
    );
  }, []);

  // Вычисление состояния воспроизведения
  const isPlaying =
    playerState && playerState.state === PlayerStateStateEnum.Playing;

  // Вычисление состояния остановки
  const isStopped =
    playerState && playerState.state === PlayerStateStateEnum.Stopped;

  // Ближайшие 5 заказов
  const nextFiveOrders = useMemo(() => queue.slice(0, 5), [queue]);

  // Набор отображаемых видео для карусели: текущее, следующее, первые в очереди
  const displayedVideos: BaseTrackInfo[] = useMemo(() => {
    const list: BaseTrackInfo[] = [];
    if (playerState?.currentQueueItem?.track)
      list.push(playerState.currentQueueItem.track);
    if (playerState?.nextQueueItem?.track)
      list.push(playerState.nextQueueItem.track);
    for (const item of queue) {
      if (list.length >= 6) break;
      if (item.track) {
        list.push(item.track);
      }
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
    isStopped,
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
    handlePlayPrevious,

    // Обработчики управления громкостью
    handleVolumeChange,
    handleMute,

    // Обработчики управления очередью
    handleRemoveFromQueue,
    handlePlayTrackFromQueue,
    fetchQueue,

    // Обработчики управления отображением
    handleToggleVideoState,
  };
};
