import { HubConnection, HubConnectionState } from "@microsoft/signalr";
import { create } from "zustand";

import { ScoreboardDto } from "../../../../../shared/api/generated/Api";
import {
  ColorInfoWIthTimestamp,
  ColorPreset,
  defaultLayout,
  defaultPreset,
  LayoutSettings,
  MetaInfo,
  MetaInfoWithTimestamp,
  PlayerWithTimestamp,
} from "../types";
import { ScoreboardSignalRContext } from "./signalConnection";

// Интерфейс состояния
export interface ScoreboardState {
  _connection: HubConnection;

  // Данные игроков
  player1: PlayerWithTimestamp;
  player2: PlayerWithTimestamp;

  // Мета информация
  meta: MetaInfoWithTimestamp;

  // Настройки внешнего вида
  color: ColorInfoWIthTimestamp;
  layout: LayoutSettings;

  // Настройки видимости
  isVisible: boolean;
  animationDuration: number;
}

// Интерфейс действий
export interface ScoreboardActions {
  // Действия с игроками
  setPlayer1: (player: Partial<PlayerWithTimestamp>) => void;
  setPlayer2: (player: Partial<PlayerWithTimestamp>) => void;
  swapPlayers: () => void;

  // Действия с мета информацией
  setMeta: (meta: Partial<MetaInfo>) => void;

  // Действия с цветами
  setColor: (color: Partial<ColorPreset>) => void;
  handleColorChange: (color: Partial<ColorPreset>) => void;

  // Действия с макетом
  setLayout: (layout: Partial<LayoutSettings>) => void;

  // Действия с видимостью
  setVisibility: (isVisible: boolean) => void;
  setAnimationDuration: (duration: number) => void;

  // Действия сброса
  reset: () => void;

  // Действия для получения состояния с сервера
  handleReceiveState: (state: ScoreboardState) => void;

  // Внутренние действия (не экспортируются)
  _sendToServer: (
    method: string,
    data: ScoreboardDto | boolean,
    updateId?: string
  ) => boolean;
  _createServerState: (
    updatedPlayer1?: PlayerWithTimestamp,
    updatedPlayer2?: PlayerWithTimestamp,
    updatedMeta?: MetaInfoWithTimestamp,
    updatedColor?: ColorPreset,
    updatedLayout?: LayoutSettings,
    updatedVisibility?: boolean,
    updatedAnimationDuration?: number
  ) => ScoreboardDto;
}

// Тип полного store
export type ScoreboardStore = ScoreboardState & ScoreboardActions;

// Начальное состояние
const initialState: ScoreboardState = {
  _connection: ScoreboardSignalRContext.build(),
  player1: {
    name: "Daigo Umehara",
    sponsor: "Red Bull",
    score: 2,
    tag: "The Beast",
    flag: "jp",
    final: "none",
    _lastEdit: 0,
    _receivedAt: 0,
  },
  player2: {
    name: "Tokido",
    sponsor: "Mad Catz",
    score: 1,
    tag: "Murder Face",
    flag: "jp",
    final: "none",
    _lastEdit: 0,
    _receivedAt: 0,
  },
  meta: {
    title: "Street Fighter 6",
    fightRule: "Grand Finals",
    _lastEdit: 0,
    _receivedAt: 0,
  },
  color: defaultPreset,
  layout: defaultLayout,
  isVisible: true,
  animationDuration: 800,
};

// Создание store
export const useScoreboardStore = create<ScoreboardStore>((set, get) => {
  // Инициализируем соединение
  const connection = ScoreboardSignalRContext.build();

  const firstActiveFunction = (state: ScoreboardState) => {
    get().handleReceiveState(state);
    connection.off("ReceiveState", firstActiveFunction);
  };

  connection.on("ReceiveState", firstActiveFunction);

  // Запускаем соединение
  connection.start().catch(err => {
    console.error("Error starting SignalR connection:", err);
  });

  return {
    ...initialState,
    _connection: connection,
    // Действия с игроками
    setPlayer1: playerUpdate => {
      const currentPlayer = get().player1;
      const updatedPlayer = {
        ...currentPlayer,
        ...playerUpdate,
        _lastEdit: Date.now(),
      };

      set({ player1: updatedPlayer });

      // Отправляем на сервер
      const serverState = get()._createServerState(updatedPlayer);
      get()._sendToServer("UpdateState", serverState);
    },

    setPlayer2: playerUpdate => {
      const currentPlayer = get().player2;
      const updatedPlayer = {
        ...currentPlayer,
        ...playerUpdate,
        _lastEdit: Date.now(),
      };

      set({ player2: updatedPlayer });

      // Отправляем на сервер
      const serverState = get()._createServerState(undefined, updatedPlayer);
      get()._sendToServer("UpdateState", serverState);
    },

    swapPlayers: () => {
      const { player1, player2 } = get();
      const now = Date.now();

      const newPlayer1 = { ...player2, _lastEdit: now };
      const newPlayer2 = { ...player1, _lastEdit: now };

      set({
        player1: newPlayer1,
        player2: newPlayer2,
      });

      // Отправляем на сервер
      const serverState = get()._createServerState(newPlayer1, newPlayer2);
      get()._sendToServer("UpdateState", serverState);
    },

    // Действия с мета информацией
    setMeta: metaUpdate => {
      const currentMeta = get().meta;
      const updatedMeta = {
        ...currentMeta,
        ...metaUpdate,
        _lastEdit: Date.now(),
      };

      set({ meta: updatedMeta });

      // Отправляем на сервер
      const serverState = get()._createServerState(
        undefined,
        undefined,
        updatedMeta
      );
      get()._sendToServer("UpdateState", serverState);
    },

    // Действия с цветами
    setColor: colorUpdate => {
      const currentColor = get().color;
      const updatedColor = {
        ...currentColor,
        ...colorUpdate,
        _lastEdit: Date.now(),
      };

      set({ color: updatedColor });

      // Отправляем на сервер
      const serverState = get()._createServerState(
        undefined,
        undefined,
        undefined,
        updatedColor
      );
      get()._sendToServer("UpdateState", serverState);
    },

    handleColorChange: colorUpdate => {
      get().setColor(colorUpdate);
    },

    // Действия с макетом
    setLayout: layoutUpdate => {
      const currentLayout = get().layout;
      const updatedLayout = {
        ...currentLayout,
        ...layoutUpdate,
      };

      set({ layout: updatedLayout });

      // Отправляем на сервер
      const serverState = get()._createServerState(
        undefined,
        undefined,
        undefined,
        undefined,
        updatedLayout
      );
      get()._sendToServer("UpdateState", serverState);
    },

    // Действия с видимостью
    setVisibility: isVisible => {
      set({ isVisible });

      // Отправляем на сервер
      get()._sendToServer("SetVisibility", isVisible);
    },

    setAnimationDuration: duration => {
      set({ animationDuration: duration });

      // Отправляем на сервер
      const serverState = get()._createServerState(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        duration
      );
      get()._sendToServer("UpdateState", serverState);
    },

    // Действия сброса
    reset: () => {
      set(initialState);

      // Отправляем на сервер
      const serverState = get()._createServerState();
      get()._sendToServer("UpdateState", serverState);
    },

    // Действия для получения состояния с сервера
    handleReceiveState: state => {
      if (state.player1) {
        set({ player1: { ...state.player1, _receivedAt: Date.now() } });
      }
      if (state.player2) {
        set({ player2: { ...state.player2, _receivedAt: Date.now() } });
      }
      if (state.meta) {
        set({ meta: { ...state.meta, _receivedAt: Date.now() } });
      }
      if (state.color) {
        set({ color: { ...state.color, _lastEdit: Date.now() } });
      }
      if (state.layout) {
        set({ layout: state.layout });
      }
      if (typeof state.isVisible === "boolean") {
        set({ isVisible: state.isVisible });
      }
      if (state.animationDuration) {
        set({ animationDuration: state.animationDuration });
      }
    },

    // Внутренние действия
    _sendToServer: (method, data) => {
      try {
        const connection = get()._connection;
        if (!connection || connection.state !== HubConnectionState.Connected) {
          console.log(
            "SignalR connection not available, using local state only"
          );
          return true;
        }

        console.log(`Sending ${method}:`, data);
        connection.invoke(method, data);
        console.log(`Successfully sent ${method}`);
        return true;
      } catch (error) {
        console.error(`Error sending ${method}:`, error);
        return false;
      }
    },

    _createServerState: (
      updatedPlayer1,
      updatedPlayer2,
      updatedMeta,
      updatedColor,
      updatedLayout,
      updatedVisibility,
      updatedAnimationDuration
    ) => {
      const state = get();

      return {
        player1: updatedPlayer1 || state.player1,
        player2: updatedPlayer2 || state.player2,
        meta: updatedMeta || state.meta,
        colors: updatedColor || state.color,
        layout: updatedLayout || state.layout,
        isVisible:
          updatedVisibility !== undefined ? updatedVisibility : state.isVisible,
        animationDuration: updatedAnimationDuration || state.animationDuration,
      };
    },
  };
});

// Селекторы для оптимизации
export const usePlayer1 = () => useScoreboardStore(state => state.player1);
export const usePlayer2 = () => useScoreboardStore(state => state.player2);
export const useMeta = () => useScoreboardStore(state => state.meta);
export const useColor = () => useScoreboardStore(state => state.color);
export const useLayout = () => useScoreboardStore(state => state.layout);
export const useVisibility = () => useScoreboardStore(state => state.isVisible);
export const useAnimationDuration = () =>
  useScoreboardStore(state => state.animationDuration);

// Селекторы для действий - возвращаем отдельные функции для стабильности
export const usePlayerActions = () => {
  const setPlayer1 = useScoreboardStore(state => state.setPlayer1);
  const setPlayer2 = useScoreboardStore(state => state.setPlayer2);
  const swapPlayers = useScoreboardStore(state => state.swapPlayers);

  return { setPlayer1, setPlayer2, swapPlayers };
};

export const useMetaActions = () => {
  const setMeta = useScoreboardStore(state => state.setMeta);
  return { setMeta };
};

export const useColorActions = () => {
  const setColor = useScoreboardStore(state => state.setColor);
  const handleColorChange = useScoreboardStore(
    state => state.handleColorChange
  );
  return { setColor, handleColorChange };
};

export const useLayoutActions = () => {
  const setLayout = useScoreboardStore(state => state.setLayout);
  return { setLayout };
};

export const useVisibilityActions = () => {
  const setVisibility = useScoreboardStore(state => state.setVisibility);
  const setAnimationDuration = useScoreboardStore(
    state => state.setAnimationDuration
  );
  return { setVisibility, setAnimationDuration };
};

export const useGeneralActions = () => {
  const reset = useScoreboardStore(state => state.reset);
  const handleReceiveState = useScoreboardStore(
    state => state.handleReceiveState
  );
  return { reset, handleReceiveState };
};
