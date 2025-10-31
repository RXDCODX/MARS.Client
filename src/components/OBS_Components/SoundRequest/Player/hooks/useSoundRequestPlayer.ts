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

import { usePlayerStore } from "../stores/usePlayerStore";

/**
 * Хук для управления SoundRequest плеером
 * Содержит всю общую логику управления плеером
 */
export const useSoundRequestPlayer = () => {
  const [playerState, setPlayerState] = useState<PlayerState | null>(null);
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [history, setHistory] = useState<BaseTrackInfo[]>([]);

  const { showToast } = useToastModal();
  const soundRequestApi = useMemo(() => new SoundRequest(), []);
  const connectionRef = useRef<HubConnection | null>(null);

  // Ref'ы для управления изменением громкости
  const isVolumeChangingRef = useRef(false);
  const volumeDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const volumeIgnoreTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Ref для актуального состояния плеера (чтобы избежать зависимости в useCallback)
  const playerStateRef = useRef<PlayerState | null>(null);

  // Методы стора для управления громкостью
  const setVolume = usePlayerStore(state => state.setVolume);

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
          isVolumeChanging: isVolumeChangingRef.current,
        }
      );

      // Игнорируем обновления во время изменения громкости
      if (isVolumeChangingRef.current) {
        console.log(
          "[useSoundRequestPlayer] Обновление PlayerState проигнорировано - меняется громкость"
        );
        return;
      }

      playerStateRef.current = state;
      setPlayerState(state);
      usePlayerStore.getState().setPlayerState(state);
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
      // Очищаем таймеры при размонтировании
      if (volumeDebounceTimerRef.current) {
        clearTimeout(volumeDebounceTimerRef.current);
      }
      if (volumeIgnoreTimerRef.current) {
        clearTimeout(volumeIgnoreTimerRef.current);
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
  }, [playerState?.volume, setVolume]);

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

      playerStateRef.current = response.data.data;
      setPlayerState(response.data.data);
      usePlayerStore.getState().setPlayerState(response.data.data);
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
      if (!connectionRef.current || !playerStateRef.current) {
        console.warn("[useSoundRequestPlayer] Нет подключения или состояния");
        return;
      }

      try {
        const newState: PlayerState = {
          ...playerStateRef.current,
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
    [showToast]
  );

  // Управление воспроизведением
  const handlePlay = useCallback(async () => {
    usePlayerStore.getState().setLoading(true);
    await updatePlayerState({ state: PlayerStateStateEnum.Playing });
    usePlayerStore.getState().setLoading(false);
  }, [updatePlayerState]);

  const handlePause = useCallback(async () => {
    usePlayerStore.getState().setLoading(true);
    await updatePlayerState({ state: PlayerStateStateEnum.Paused });
    usePlayerStore.getState().setLoading(false);
  }, [updatePlayerState]);

  const handleTogglePlayPause = useCallback(async () => {
    usePlayerStore.getState().setLoading(true);
    const newState =
      playerStateRef.current?.state === PlayerStateStateEnum.Playing
        ? PlayerStateStateEnum.Paused
        : PlayerStateStateEnum.Playing;
    await updatePlayerState({ state: newState });
    usePlayerStore.getState().setLoading(false);
  }, [updatePlayerState]);

  const handleStop = useCallback(async () => {
    usePlayerStore.getState().setLoading(true);
    await updatePlayerState({ state: PlayerStateStateEnum.Stopped });
    usePlayerStore.getState().setLoading(false);
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
      usePlayerStore.getState().setLoading(true);
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
      usePlayerStore.getState().setLoading(false);
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
      usePlayerStore.getState().setLoading(true);
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
      usePlayerStore.getState().setLoading(false);
    }
  }, [showToast, fetchQueue, fetchHistory]);

  // Управление громкостью с debounce и игнорированием обновлений от бэкенда
  const handleVolumeChange = useCallback(
    (newVolume: number) => {
      // Сразу обновляем локальное состояние для UI
      setVolume(newVolume);

      // Устанавливаем флаг игнорирования обновлений от бэкенда
      isVolumeChangingRef.current = true;

      // Отменяем предыдущие таймеры
      if (volumeDebounceTimerRef.current) {
        clearTimeout(volumeDebounceTimerRef.current);
      }
      if (volumeIgnoreTimerRef.current) {
        clearTimeout(volumeIgnoreTimerRef.current);
      }

      // Устанавливаем таймер для отправки на бэкенд (debounce 150ms)
      volumeDebounceTimerRef.current = setTimeout(() => {
        updatePlayerState({ volume: newVolume });
      }, 150);

      // Устанавливаем таймер для снятия флага игнорирования (300ms - даём время на обработку)
      volumeIgnoreTimerRef.current = setTimeout(() => {
        isVolumeChangingRef.current = false;
        console.log(
          "[useSoundRequestPlayer] Флаг isVolumeChanging снят - принимаем обновления от бэкенда"
        );
      }, 300);
    },
    [updatePlayerState, setVolume]
  );

  const handleMute = useCallback(async () => {
    const isMuted = playerStateRef.current?.isMuted ?? false;
    await updatePlayerState({ isMuted: !isMuted });
  }, [updatePlayerState]);

  // Переключение режима отображения видео
  const handleToggleVideoState = useCallback(async () => {
    const currentVideoState =
      playerStateRef.current?.videoState ?? PlayerStateVideoStateEnum.Video;

    // Циклическое переключение: Video -> NoVideo -> AudioOnly -> Video
    const nextVideoState =
      currentVideoState === PlayerStateVideoStateEnum.Video
        ? PlayerStateVideoStateEnum.NoVideo
        : currentVideoState === PlayerStateVideoStateEnum.NoVideo
          ? PlayerStateVideoStateEnum.AudioOnly
          : PlayerStateVideoStateEnum.Video;

    await updatePlayerState({ videoState: nextVideoState });
  }, [updatePlayerState]);

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
