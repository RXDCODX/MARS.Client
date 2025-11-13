import { forwardRef, JSX, ReactNode } from "react";
import RoulettePro from "react-roulette-pro";
import type PrizeType from "react-roulette-pro/dist/types/PrizeType";

import styles from "../MikuMonday.module.scss";
import type { RouletteGroup } from "../types";

interface RouletteGroupListProps {
  groups: RouletteGroup[];
  rouletteStart: boolean;
  rouletteOpacities: number[];
  renderPrizeItem: (prize: PrizeType) => JSX.Element;
  onPrizeDefined: () => void;
  pointer: ReactNode;
}

const RouletteGroupList = forwardRef<HTMLDivElement, RouletteGroupListProps>(
  (
    {
      groups,
      rouletteStart,
      rouletteOpacities,
      renderPrizeItem,
      onPrizeDefined,
      pointer,
    },
    ref
  ) => (
    <div ref={ref} className={styles["roulette-container"]}>
      {pointer}
      {groups.map((group, index) => (
        <div
          key={index}
          className={`${styles["single-roulette"]} ${
            group.isReversed ? styles["single-roulette-reversed"] : ""
          }`}
          style={{
            opacity: rouletteOpacities[index] ?? 1,
            transition: "opacity 2s ease-out",
            flex: 1,
            minHeight: 0,
            pointerEvents: "none",
            maskImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 100%)",
          }}
        >
          <RoulettePro
            start={rouletteStart}
            prizes={group.prizes}
            prizeIndex={group.prizeIndex}
            prizeItemRenderFunction={renderPrizeItem}
            spinningTime={group.hasWinner ? 23 : 20}
            type="horizontal"
            options={{ withoutAnimation: false, stopInCenter: false }}
            defaultDesignOptions={{
              prizesWithText: true,
              hideCenterDelimiter: true,
            }}
            onPrizeDefined={onPrizeDefined}
          />
        </div>
      ))}
    </div>
  )
);

RouletteGroupList.displayName = "RouletteGroupList";

export default RouletteGroupList;
