import type {} from "@redux-devtools/extension";
import { PrizeType } from "react-roulette-pro";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface Actions {
  addPrizes: (prizes: PrizeType[]) => void;
  shuffle: () => void;
  clear: () => void;
  preloadImages: (prizes: PrizeType[]) => void;
}

interface State {
  prizes: PrizeType[];
}

const initialState: State = {
  prizes: [],
};

/**
 * Store для управления призами рулетки вайфу
 */
export const useWaifuPrizesStore = create<State & Actions>()(
  devtools(
    (set, get) => ({
      ...initialState,

      /**
       * Добавляет новые призы, исключая дубликаты
       */
      addPrizes: (newPrizes: PrizeType[]) => {
        debugger; // eslint-disable-line no-debugger
        const currentPrizes = get().prizes;

        // Фильтруем только те призы, которых еще нет в текущем массиве
        const prizesToAdd = newPrizes.filter(
          newPrize =>
            !currentPrizes.some(existing => existing.id === newPrize.id)
        );

        console.log("🔄 Добавление призов в store:", {
          текущееКоличество: currentPrizes.length,
          новыхПризов: newPrizes.length,
          добавляется: prizesToAdd.length,
          итогоПосле: currentPrizes.length + prizesToAdd.length,
          первыйНовыйПриз: prizesToAdd[0]?.id,
        });

        // Если нет новых призов для добавления, не обновляем state
        if (prizesToAdd.length === 0) {
          console.log("ℹ️ Нет новых призов для добавления");
          return;
        }

        // Предзагрузка изображений для новых призов
        prizesToAdd.forEach(prize => {
          if (prize.image) {
            const img = new Image();
            img.src = prize.image;
          }
        });

        debugger; // eslint-disable-line no-debugger
        set({ prizes: [...currentPrizes, ...prizesToAdd] });

        console.log("✅ Призы обновлены. Всего призов:", get().prizes.length);
      },

      /**
       * Перемешивает призы в случайном порядке
       */
      shuffle: () => {
        debugger; // eslint-disable-line no-debugger
        const currentPrizes = get().prizes;
        const shuffled = [...currentPrizes].sort(() => Math.random() - 0.5);

        console.log("🔀 Призы перемешаны:", shuffled.length);

        set({ prizes: shuffled });
      },

      /**
       * Очищает все призы
       */
      clear: () => {
        debugger; // eslint-disable-line no-debugger
        console.log("🗑️ Очистка всех призов");
        set({ prizes: [] });
      },

      /**
       * Предзагружает изображения призов
       */
      preloadImages: (prizes: PrizeType[]) => {
        prizes.forEach(prize => {
          if (prize.image) {
            const img = new Image();
            img.src = prize.image;
          }
        });
      },
    }),
    { name: "WaifuPrizesStore" }
  )
);

export default useWaifuPrizesStore;
