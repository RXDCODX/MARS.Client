import type PrizeType from "react-roulette-pro/dist/types/PrizeType";

export interface RoulettePrize extends PrizeType {
  isPlaceholder?: boolean;
}

export interface RouletteGroup {
  prizes: RoulettePrize[];
  prizeIndex: number;
  hasWinner: boolean;
  isReversed: boolean;
}
