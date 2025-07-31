import { HubConnectionState } from "@microsoft/signalr";
import { useCallback, useState } from "react";

import { ScoreboardDto } from "../../../../shared/api/generated/Api";
import { ScoreboardSignalRContext } from "../ScoreboardContext";
import {
  ColorPreset,
  LayoutSettings,
  defaultLayout,
  MetaInfo,
  MetaInfoWithTimestamp,
  Player,
  PlayerWithTimestamp,
  ScoreboardState,
} from "./types";

export const useAdminState = () => {
  // Флаг для предотвращения рекурсии при получении обновлений от сервера
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  
  const [player1, setPlayer1State] = useState<PlayerWithTimestamp>({
    name: "Daigo Umehara",
    sponsor: "Red Bull",
    score: 2,
    tag: "The Beast",
    flag: "jp",
    final: "none",
    _lastEdit: 0,
    _receivedAt: 0,
  });

  const [player2, setPlayer2State] = useState<PlayerWithTimestamp>({
    name: "Tokido",
    sponsor: "Mad Catz",
    score: 1,
    tag: "Murder Face",
    flag: "jp",
    final: "none",
    _lastEdit: 0,
    _receivedAt: 0,
  });

  const [meta, setMetaState] = useState<MetaInfoWithTimestamp>({
    title: "Street Fighter 6",
    fightRule: "Grand Finals",
    _lastEdit: 0,
    _receivedAt: 0,
  });

  const [isVisible, setIsVisibleState] = useState<boolean>(true);
  const [animationDuration, setAnimationDurationState] = useState<number>(800);
  const [layout, setLayoutState] = useState<LayoutSettings>(defaultLayout);

  // Функция для безопасной отправки данных на сервер
  const sendToServer = useCallback(
    async (method: string, data: ScoreboardDto | boolean) => {
      try {
        if (
          !ScoreboardSignalRContext.connection ||
          ScoreboardSignalRContext.connection.state !==
            HubConnectionState.Connected
        ) {
          console.log("SignalR connection not available, using local state only");
          return true; // Возвращаем true для локальной работы
        }

        // Устанавливаем флаг обновления для предотвращения рекурсии
        setIsUpdating(true);
        console.log(`Sending ${method}:`, data);
        await ScoreboardSignalRContext.invoke(method, data);
        console.log(`Successfully sent ${method}`);
        
        // Сбрасываем флаг через небольшую задержку
        setTimeout(() => setIsUpdating(false), 100);
        return true;
      } catch (error) {
        console.error(`Error sending ${method}:`, error);
        setIsUpdating(false);
        return true; // Возвращаем true для локальной работы даже при ошибке
      }
    },
    [],
  );

  // Функция для преобразования состояния в формат, ожидаемый сервером
  const createServerState = useCallback(
    (
      updatedPlayer1?: PlayerWithTimestamp,
      updatedPlayer2?: PlayerWithTimestamp,
      updatedMeta?: MetaInfoWithTimestamp,
    ) => {
      const currentPlayer1 = updatedPlayer1 || player1;
      const currentPlayer2 = updatedPlayer2 || player2;
      const currentMeta = updatedMeta || meta;

      return {
        player1: {
          name: currentPlayer1.name,
          sponsor: currentPlayer1.sponsor,
          score: currentPlayer1.score,
          tag: currentPlayer1.tag,
          flag: currentPlayer1.flag,
          final: currentPlayer1.final,
        },
        player2: {
          name: currentPlayer2.name,
          sponsor: currentPlayer2.sponsor,
          score: currentPlayer2.score,
          tag: currentPlayer2.tag,
          flag: currentPlayer2.flag,
          final: currentPlayer2.final,
        },
        meta: {
          title: currentMeta.title,
          fightRule: currentMeta.fightRule,
        },
        colors: {
          mainColor: "#3F00FF",
          playerNamesColor: "#ffffff",
          tournamentTitleColor: "#3F00FF",
          fightModeColor: "#3F00FF",
          scoreColor: "#ffffff",
          backgroundColor: "#23272f",
          borderColor: "#3F00FF",
        },
        isVisible,
        animationDuration,
        layout,
      };
    },
    [player1, player2, meta, isVisible, animationDuration],
  );

  const handleReceiveState = (state: ScoreboardState) => {
    const now = Date.now();
    console.log("Received state from server:", state);

    // Игнорируем обновления, если мы сами отправляем данные на сервер
    if (isUpdating) {
      console.log("Ignoring server update while local update is in progress");
      return;
    }

    // Обновляем состояние игроков, проверяя только timestamp последнего редактирования
    setPlayer1State((prev) => {
      // Если локальное изменение было больше 500мс назад, обновляем с сервера
      const shouldUpdate = !prev._lastEdit || prev._lastEdit < now - 500;
      return shouldUpdate
        ? { ...state.player1, _lastEdit: prev._lastEdit, _receivedAt: now }
        : prev;
    });

    setPlayer2State((prev) => {
      const shouldUpdate = !prev._lastEdit || prev._lastEdit < now - 500;
      return shouldUpdate
        ? { ...state.player2, _lastEdit: prev._lastEdit, _receivedAt: now }
        : prev;
    });

    setMetaState((prev) => {
      const shouldUpdate = !prev._lastEdit || prev._lastEdit < now - 500;
      return shouldUpdate
        ? { ...state.meta, _lastEdit: prev._lastEdit, _receivedAt: now }
        : prev;
    });

    // Обновляем видимость без проверки timestamp, так как это глобальное состояние
    setIsVisibleState(state.isVisible);

    // Обновляем время анимации
    if (state.animationDuration) {
      setAnimationDurationState(state.animationDuration);
    }

    // Обновляем настройки макета, если они есть в состоянии
    if (state.layout) {
      setLayoutState(state.layout);
    }
  };

  // Методы для отправки данных с timestamp
  const setPlayer1 = useCallback(
    async (playerUpdate: Partial<Player>) => {
      const now = Date.now();
      const updatedPlayer = { ...player1, ...playerUpdate, _lastEdit: now };
      setPlayer1State(updatedPlayer); // Оптимистичное обновление

      // Отправляем состояние на сервер
      const serverState = createServerState(updatedPlayer);
      await sendToServer("UpdateState", serverState);
    },
    [player1, createServerState, sendToServer],
  );

  const setPlayer2 = useCallback(
    async (playerUpdate: Partial<Player>) => {
      const now = Date.now();
      const updatedPlayer = { ...player2, ...playerUpdate, _lastEdit: now };
      setPlayer2State(updatedPlayer); // Оптимистичное обновление

      // Отправляем состояние на сервер
      const serverState = createServerState(undefined, updatedPlayer);
      await sendToServer("UpdateState", serverState);
    },
    [player2, createServerState, sendToServer],
  );

  const setMeta = useCallback(
    async (metaUpdate: Partial<MetaInfo>) => {
      const now = Date.now();
      const updatedMeta = { ...meta, ...metaUpdate, _lastEdit: now };
      setMetaState(updatedMeta); // Оптимистичное обновление

      // Отправляем состояние на сервер
      const serverState = createServerState(undefined, undefined, updatedMeta);
      await sendToServer("UpdateState", serverState);
    },
    [meta, createServerState, sendToServer],
  );

  const setVisibility = useCallback(
    async (isVisible: boolean) => {
      setIsVisibleState(isVisible); // Оптимистичное обновление
      await sendToServer("SetVisibility", isVisible);
    },
    [sendToServer],
  );

  const setAnimationDuration = useCallback(
    async (duration: number) => {
      setAnimationDurationState(duration); // Оптимистичное обновление

      // Отправляем полное состояние на сервер
      const serverState = createServerState();
      serverState.animationDuration = duration;
      await sendToServer("UpdateState", serverState);
    },
    [createServerState, sendToServer],
  );

  const setState = useCallback(
    async (state: ScoreboardState) => {
      const now = Date.now();
      setPlayer1State({ ...state.player1, _lastEdit: now }); // Оптимистичное обновление
      setPlayer2State({ ...state.player2, _lastEdit: now }); // Оптимистичное обновление
      setMetaState({ ...state.meta, _lastEdit: now }); // Оптимистичное обновление
      setIsVisibleState(state.isVisible);

      const serverState = createServerState();
      await sendToServer("UpdateState", serverState);
    },
    [createServerState, sendToServer],
  );

  const getState = useCallback(async () => {
    try {
      if (!ScoreboardSignalRContext.connection) {
        console.error("SignalR connection not available");
        return;
      }
      await ScoreboardSignalRContext.connection.invoke("GetCurrentState");
    } catch (error) {
      console.error("Error getting current state:", error);
    }
  }, []);

  // Вспомогательные функции
  const swapPlayers = useCallback(async () => {
    const now = Date.now();
    const newPlayer1 = { ...player2, _lastEdit: now };
    const newPlayer2 = { ...player1, _lastEdit: now };
    setPlayer1State(newPlayer1);
    setPlayer2State(newPlayer2);

    // Отправляем полное состояние на сервер
    const serverState = createServerState(newPlayer1, newPlayer2);
    await sendToServer("UpdateState", serverState);
  }, [player1, player2, createServerState, sendToServer]);

  const reset = useCallback(async () => {
    const now = Date.now();
    const initialState = {
      player1: {
        name: "Player 1",
        sponsor: "",
        score: 0,
        tag: "",
        flag: "none",
        final: "none",
      },
      player2: {
        name: "Player 2",
        sponsor: "",
        score: 0,
        tag: "",
        flag: "none",
        final: "none",
      },
      meta: {
        title: "",
        fightRule: "",
      },
      colors: {
        mainColor: "#3F00FF",
        playerNamesColor: "#ffffff",
        tournamentTitleColor: "#3F00FF",
        fightModeColor: "#3F00FF",
        scoreColor: "#ffffff",
        backgroundColor: "#23272f",
        borderColor: "#3F00FF",
      },
      isVisible: true,
      animationDuration: 800,
    };

    setPlayer1State({ ...initialState.player1, _lastEdit: now });
    setPlayer2State({ ...initialState.player2, _lastEdit: now });
    setMetaState({ ...initialState.meta, _lastEdit: now });
    setIsVisibleState(initialState.isVisible);
    setAnimationDurationState(initialState.animationDuration ?? 1000);

    await sendToServer("UpdateState", initialState);
  }, [sendToServer]);

  // Обработчик изменения цветов
  const handleColorChange = useCallback(
    async (colorUpdate: Partial<ColorPreset>) => {
      const currentColors = {
        mainColor: "#3F00FF",
        playerNamesColor: "#ffffff",
        tournamentTitleColor: "#3F00FF",
        fightModeColor: "#3F00FF",
        scoreColor: "#ffffff",
        backgroundColor: "#23272f",
        borderColor: "#3F00FF",
        ...colorUpdate,
      };

      // Отправляем полное состояние на сервер
      const serverState = createServerState();
      serverState.colors = currentColors;
      await sendToServer("UpdateState", serverState);
    },
    [createServerState, sendToServer],
  );

  const setLayout = useCallback(
    async (layoutUpdate: Partial<LayoutSettings>) => {
      const updatedLayout = { ...layout, ...layoutUpdate };
      setLayoutState(updatedLayout);

      // Отправляем полное состояние на сервер
      const serverState = createServerState();
      serverState.layout = updatedLayout;
      await sendToServer("UpdateState", serverState);
    },
    [layout, createServerState, sendToServer],
  );

  // Подписки на SignalR события теперь находятся в AdminPanel.tsx
  // для лучшего контроля и предотвращения рекурсии

  return {
    player1,
    player2,
    meta,
    isVisible,
    animationDuration,
    layout,
    setPlayer1,
    setPlayer2,
    setMeta,
    setVisibility,
    setAnimationDuration,
    setLayout,
    setState,
    getState,
    swapPlayers,
    reset,
    handleColorChange,
    handleReceiveState,
  };
};
