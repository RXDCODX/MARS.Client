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
  SoundRequestVideoDisplayCreateParamsEnum,
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
        try {
          await connection.invoke("Join", "apiplayer");
          console.log(
            "[useSoundRequestPlayer] Присоединились к группе apiplayer"
          );
        } catch (error) {
          console.error(
            "[useSoundRequestPlayer] Ошибка присоединения к группе:",
            error
          );
        }
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

  // Отслеживание изменений playerState
  useEffect(() => {
    console.log("[useSoundRequestPlayer] PlayerState изменился:", {
      hasState: !!playerState,
      currentTrack: playerState?.currentQueueItem?.track?.trackName,
      nextTrack: playerState?.nextQueueItem?.track?.trackName,
      state: playerState?.state,
      volume: playerState?.volume,
      isMuted: playerState?.isMuted,
    });
  }, [playerState]);

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

  // Обновление очереди при переключении треков
  useEffect(() => {
    const currentQueueItemId = playerState?.currentQueueItem?.id;
    const currentTrackName = playerState?.currentQueueItem?.track?.trackName;

    if (currentQueueItemId) {
      console.log(
        "[useSoundRequestPlayer] Трек изменился, обновляем очередь:",
        {
          queueItemId: currentQueueItemId,
          trackName: currentTrackName,
        }
      );
      fetchQueue();
    }
  }, [
    fetchQueue,
    playerState?.currentQueueItem?.id,
    playerState?.currentQueueItem?.track?.trackName,
  ]);

  // Инициализация
  useEffect(() => {
    console.log(
      "[useSoundRequestPlayer] Инициализация - загружаем начальные данные"
    );
    // Загружаем начальное состояние (если SignalR еще не отправил)
    fetchPlayerState();
    fetchQueue();
    fetchHistory(20);

    // Обновляем только историю периодически (состояние и очередь приходят через SignalR)
    const historyInterval = setInterval(() => {
      fetchHistory(20);
    }, 10000);

    return () => {
      console.log(
        "[useSoundRequestPlayer] Размонтирование - очищаем интервалы"
      );
      clearInterval(historyInterval);
    };
  }, [fetchPlayerState, fetchQueue, fetchHistory]);

  // Управление воспроизведением
  const handlePlay = useCallback(async () => {
    try {
      setLoading(true);
      const response =
        await soundRequestApi.soundRequestTogglePlayPauseCreate();
      if (!response.data.success) {
        showToast(response.data);
      }
      // Состояние обновится автоматически через SignalR
    } catch {
      showToast({
        success: false,
        message: "Ошибка при воспроизведении",
      });
    } finally {
      setLoading(false);
    }
  }, [soundRequestApi, showToast]);

  const handlePause = useCallback(async () => {
    try {
      setLoading(true);
      const response =
        await soundRequestApi.soundRequestTogglePlayPauseCreate();
      if (!response.data.success) {
        showToast(response.data);
      }
      // Состояние обновится автоматически через SignalR
    } catch {
      showToast({
        success: false,
        message: "Ошибка при паузе",
      });
    } finally {
      setLoading(false);
    }
  }, [soundRequestApi, showToast]);

  const handleTogglePlayPause = useCallback(async () => {
    try {
      setLoading(true);
      const response =
        await soundRequestApi.soundRequestTogglePlayPauseCreate();
      if (!response.data.success) {
        showToast(response.data);
      }
      // Состояние обновится автоматически через SignalR
    } catch {
      showToast({
        success: false,
        message: "Ошибка при переключении воспроизведения",
      });
    } finally {
      setLoading(false);
    }
  }, [soundRequestApi, showToast]);

  const handleStop = useCallback(async () => {
    try {
      setLoading(true);
      const response = await soundRequestApi.soundRequestStopCreate();
      if (!response.data.success) {
        showToast(response.data);
      }
      // Состояние обновится автоматически через SignalR
    } catch {
      showToast({
        success: false,
        message: "Ошибка при остановке",
      });
    } finally {
      setLoading(false);
    }
  }, [soundRequestApi, showToast]);

  const handleSkip = useCallback(async () => {
    try {
      setLoading(true);
      const response = await soundRequestApi.soundRequestSkipCreate();
      if (!response.data.success) {
        showToast(response.data);
      }
      // Состояние и очередь обновятся автоматически через SignalR
    } catch {
      showToast({
        success: false,
        message: "Ошибка при пропуске трека",
      });
    } finally {
      setLoading(false);
    }
  }, [soundRequestApi, showToast]);

  // Воспроизвести следующий трек из очереди
  const handlePlayNext = useCallback(async () => {
    try {
      setLoading(true);
      const response = await soundRequestApi.soundRequestPlayNextCreate();
      if (!response.data.success) {
        showToast(response.data);
      }
      // Состояние и очередь обновятся автоматически через SignalR
    } catch {
      showToast({
        success: false,
        message: "Ошибка при запуске следующего трека",
      });
    } finally {
      setLoading(false);
    }
  }, [soundRequestApi, showToast]);

  // Воспроизвести предыдущий трек из истории
  const handlePlayPrevious = useCallback(async () => {
    try {
      setLoading(true);
      const response = await soundRequestApi.soundRequestPlayPreviousCreate();
      if (!response.data.success) {
        showToast(response.data);
      }
      // Состояние и очередь обновятся автоматически через SignalR
    } catch {
      showToast({
        success: false,
        message: "Ошибка при запуске предыдущего трека",
      });
    } finally {
      setLoading(false);
    }
  }, [soundRequestApi, showToast]);

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
      const isMuted = playerState?.isMuted ?? false;
      const response = await soundRequestApi.soundRequestMuteCreate(!isMuted);
      if (!response.data.success) {
        showToast(response.data);
      }
      // Состояние обновится автоматически через SignalR
    } catch {
      showToast({
        success: false,
        message: "Ошибка при изменении режима звука",
      });
    }
  }, [soundRequestApi, showToast, playerState]);

  // Переключение режима отображения видео
  const handleToggleVideoState = useCallback(async () => {
    try {
      const currentVideoState =
        playerState?.videoState ?? PlayerStateVideoStateEnum.Video;

      // Циклическое переключение: Video -> NoVideo -> AudioOnly -> Video
      const nextVideoState =
        currentVideoState === PlayerStateVideoStateEnum.Video
          ? SoundRequestVideoDisplayCreateParamsEnum.NoVideo
          : currentVideoState === PlayerStateVideoStateEnum.NoVideo
            ? SoundRequestVideoDisplayCreateParamsEnum.AudioOnly
            : SoundRequestVideoDisplayCreateParamsEnum.Video;

      const response =
        await soundRequestApi.soundRequestVideoDisplayCreate(nextVideoState);
      if (!response.data.success) {
        showToast(response.data);
      }
      // Состояние обновится автоматически через SignalR
    } catch {
      showToast({
        success: false,
        message: "Ошибка при переключении режима отображения видео",
      });
    }
  }, [soundRequestApi, showToast, playerState]);

  // Удаление трека из очереди
  const handleRemoveFromQueue = useCallback(
    async (trackId: string) => {
      try {
        const response = await soundRequestApi.soundRequestQueueDelete(trackId);
        if (!response.data.success) {
          showToast(response.data);
        }
        // Очередь обновится автоматически через SignalR
      } catch {
        showToast({
          success: false,
          message: "Ошибка при удалении трека из очереди",
        });
      }
    },
    [soundRequestApi, showToast]
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
        // Состояние и очередь обновятся автоматически через SignalR
      } catch {
        showToast({
          success: false,
          message: "Ошибка при запуске выбранного трека",
        });
      } finally {
        setLoading(false);
      }
    },
    [soundRequestApi, showToast]
  );

  // Вычисление состояния воспроизведения
  const isPlaying =
    playerState && playerState.state === PlayerStateStateEnum.Playing;

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

    // Обработчики управления отображением
    handleToggleVideoState,
  };
};
