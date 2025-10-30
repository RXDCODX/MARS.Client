import { create } from "zustand";

import { BaseTrackInfo, QueueItem } from "@/shared/api";

export enum TrackListViewMode {
  Default = "default", // Текущий трек сверху + очередь
  WithHistory = "withHistory", // История -> текущий -> очередь
  Reversed = "reversed", // Очередь сверху -> текущий снизу
}

interface PlayerStore {
  // Состояние
  queue: QueueItem[];
  history: BaseTrackInfo[];
  viewMode: TrackListViewMode;

  // Методы управления очередью
  setQueue: (queue: QueueItem[]) => void;
  removeFromQueue: (queueItemId: string) => void;
  rollbackQueue: (queue: QueueItem[]) => void;

  // Методы управления историей
  setHistory: (history: BaseTrackInfo[]) => void;
  addToHistory: (track: BaseTrackInfo) => void;

  // Методы управления режимом отображения
  setViewMode: (mode: TrackListViewMode) => void;
  cycleViewMode: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  // Начальное состояние
  queue: [],
  history: [],
  viewMode: TrackListViewMode.Default,

  // Установить очередь
  setQueue: (queue) => set({ queue }),

  // Удалить трек из очереди (оптимистичное обновление)
  removeFromQueue: (queueItemId) => {
    const currentQueue = get().queue;
    const updatedQueue = currentQueue.filter((item) => item.id !== queueItemId);
    set({ queue: updatedQueue });
  },

  // Откатить очередь (в случае ошибки)
  rollbackQueue: (queue) => set({ queue }),

  // Установить историю
  setHistory: (history) => set({ history }),

  // Добавить трек в историю
  addToHistory: (track) => {
    const currentHistory = get().history;
    const updatedHistory = [track, ...currentHistory].slice(0, 5); // Последние 5 треков
    set({ history: updatedHistory });
  },

  // Установить режим отображения
  setViewMode: (mode) => set({ viewMode: mode }),

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

