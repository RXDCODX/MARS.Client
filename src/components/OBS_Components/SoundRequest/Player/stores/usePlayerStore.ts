import { create } from "zustand";

import { BaseTrackInfo, PlayerState, QueueItem } from "@/shared/api";

export enum TrackListViewMode {
  Default = "default", // Текущий трек сверху + очередь
  WithHistory = "withHistory", // История -> текущий -> очередь
  Reversed = "reversed", // Очередь сверху -> текущий снизу
}

interface PlayerStore {
  // Состояние
  playerState: PlayerState | null;
  queue: QueueItem[];
  history: BaseTrackInfo[];
  viewMode: TrackListViewMode;
  volume: number;
  loading: boolean;

  // Методы управления состоянием плеера
  setPlayerState: (state: PlayerState | null) => void;

  // Методы управления очередью
  setQueue: (queue: QueueItem[]) => void;
  removeFromQueue: (queueItemId: string) => void;
  rollbackQueue: (queue: QueueItem[]) => void;

  // Методы управления историей
  setHistory: (history: BaseTrackInfo[]) => void;
  addToHistory: (track: BaseTrackInfo) => void;

  // Методы управления громкостью
  setVolume: (volume: number) => void;

  // Методы управления состоянием загрузки
  setLoading: (loading: boolean) => void;

  // Методы управления режимом отображения
  setViewMode: (mode: TrackListViewMode) => void;
  cycleViewMode: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // Начальное состояние
  playerState: null,
  queue: [],
  history: [],
  viewMode: TrackListViewMode.Default,
  volume: 0,
  loading: false,

  // Установить состояние плеера
  setPlayerState: playerState => set({ playerState }),

  // Установить очередь
  setQueue: queue => set({ queue }),

  // Удалить трек из очереди (оптимистичное обновление)
  removeFromQueue: queueItemId => {
    const currentQueue = get().queue;
    const updatedQueue = currentQueue.filter(item => item.id !== queueItemId);
    set({ queue: updatedQueue });
  },

  // Откатить очередь (в случае ошибки)
  rollbackQueue: queue => set({ queue }),

  // Установить историю
  setHistory: history => set({ history }),

  // Добавить трек в историю
  addToHistory: track => {
    const currentHistory = get().history;

    // Проверяем, нужно ли вообще обновлять историю
    // Если трек уже первый в истории - не делаем ничего
    if (currentHistory.length > 0 && currentHistory[0].id === track.id) {
      return;
    }

    // Создаем новый массив вручную без slice - max 5 элементов
    const MAX_HISTORY = 5;
    const updatedHistory: BaseTrackInfo[] = [track];

    // Добавляем элементы из текущей истории, пропуская дубликаты
    for (
      let i = 0;
      i < currentHistory.length && updatedHistory.length < MAX_HISTORY;
      i++
    ) {
      if (currentHistory[i].id !== track.id) {
        updatedHistory.push(currentHistory[i]);
      }
    }

    set({ history: updatedHistory });
  },

  // Установить громкость
  setVolume: volume => set({ volume }),

  // Установить состояние загрузки
  setLoading: loading => set({ loading }),

  // Установить режим отображения
  setViewMode: mode => set({ viewMode: mode }),

  // Переключить режим отображения по кругу
  cycleViewMode: () => {
    const currentMode = get().viewMode;
    let nextMode: TrackListViewMode;

    switch (currentMode) {
      case TrackListViewMode.Default:
        nextMode = TrackListViewMode.WithHistory;
        break;
      case TrackListViewMode.WithHistory:
        nextMode = TrackListViewMode.Reversed;
        break;
      case TrackListViewMode.Reversed:
        nextMode = TrackListViewMode.Default;
        break;
      default:
        nextMode = TrackListViewMode.Default;
    }

    set({ viewMode: nextMode });
  },
}));
