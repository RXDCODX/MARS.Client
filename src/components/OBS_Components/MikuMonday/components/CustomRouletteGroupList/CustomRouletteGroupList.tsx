import { forwardRef, ReactNode } from "react";

import type { RouletteGroup } from "../../types";
import CustomRoulette from "../CustomRoulette/CustomRoulette";
import styles from "./CustomRouletteGroupList.module.scss";

interface CustomRouletteGroupListProps {
  groups: RouletteGroup[];
  rouletteStart: boolean;
  rouletteOpacities: number[];
  pointer: ReactNode;
  onPrizeDefined: () => void;
  onOthersFaded?: () => void;
  onWinnerFaded?: () => void;
}

const CustomRouletteGroupList = forwardRef<
  HTMLDivElement,
  CustomRouletteGroupListProps
>(
  (
    {
      groups,
      rouletteStart,
      rouletteOpacities,
      pointer,
      onPrizeDefined,
      onOthersFaded,
      onWinnerFaded,
    },
    ref
  ) => {
    const handleRouletteComplete = (index: number) => {
      const group = groups[index];
      console.log(`[CustomRouletteGroupList] ✨ Рулетка ${index} завершена`, {
        prizeIndex: group.prizeIndex,
        prizeId: group.prizes[group.prizeIndex]?.id,
        prizeText: group.prizes[group.prizeIndex]?.text,
        isWinner: group.hasWinner,
      });
      onPrizeDefined?.();
    };

    const handleTransitionEnd = (index: number) => {
      const group = groups[index];
      const opacity = rouletteOpacities[index];

      if (opacity === 0) {
        if (group?.hasWinner) {
          console.log(
            `[CustomRouletteGroupList] 🎯 Выигрышная рулетка затухла (группа ${index})`,
            {
              winningPrizeId: group.prizes[group.prizeIndex]?.id,
              winningPrizeText: group.prizes[group.prizeIndex]?.text,
            }
          );
          onWinnerFaded?.();
        } else {
          // Проверяем, все ли проигравшие затухли
          const allOthersFaded = groups.every(
            (g, i) => g.hasWinner || rouletteOpacities[i] === 0
          );
          if (allOthersFaded) {
            console.log(
              `[CustomRouletteGroupList] ⚪ Все остальные рулетки затухли (группа ${index})`
            );
            onOthersFaded?.();
          }
        }
      }
    };

    return (
      <div ref={ref} className={styles.container}>
        {pointer}
        {groups.map((group, index) => (
          <div
            key={index}
            className={`${styles.rouletteWrapper} ${
              group.isReversed ? styles.reversed : ""
            }`}
            style={{
              opacity: rouletteOpacities[index] ?? 1,
              transition: "opacity 2s ease-out",
            }}
            onTransitionEnd={() => handleTransitionEnd(index)}
          >
            <CustomRoulette
              prizes={group.prizes}
              prizeIndex={group.prizeIndex}
              isReversed={group.isReversed}
              start={rouletteStart}
              spinningTime={group.hasWinner ? 23 : 20}
              onComplete={() => handleRouletteComplete(index)}
            />
          </div>
        ))}
      </div>
    );
  }
);

CustomRouletteGroupList.displayName = "CustomRouletteGroupList";

export default CustomRouletteGroupList;
