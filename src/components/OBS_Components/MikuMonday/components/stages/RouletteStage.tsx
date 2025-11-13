import { useCallback } from "react";
import type PrizeType from "react-roulette-pro/dist/types/PrizeType";

import animate from "@/shared/styles/animate.module.scss";
import { useToastModal } from "@/shared/Utils/ToastModal";

import { useRouletteAnimation } from "../../hooks/useRouletteAnimation";
import styles from "../../MikuMonday.module.scss";
import PrizeItem from "../../PrizeItem";
import type { RouletteGroup, RoulettePrize } from "../../types";
import RouletteGroupList from "../RouletteGroupList";
import RoulettePointer from "../RoulettePointer";

interface RouletteStageProps {
  rouletteGroups: RouletteGroup[];
  shouldSkipAvailableTracksUpdate: boolean;
  decrementAvailableTrack: () => Promise<void>;
  onComplete: () => void;
}

export default function RouletteStage({
  rouletteGroups,
  shouldSkipAvailableTracksUpdate,
  decrementAvailableTrack,
  onComplete,
}: RouletteStageProps) {
  const { showToast } = useToastModal();

  const {
    containerRef,
    groupsRef,
    baseStyle,
    rouletteStart,
    visible,
    pointerHeight,
    rouletteOpacities,
    handleContainerAnimationEnd,
    handleSingleRouletteComplete,
  } = useRouletteAnimation({
    rouletteGroups,
    shouldSkipAvailableTracksUpdate,
    decrementAvailableTrack,
    showToast,
    onComplete,
  });

  const renderPrizeItem = useCallback(
    (prize: PrizeType) => <PrizeItem prize={prize as RoulettePrize} />,
    []
  );

  return (
    <div
      ref={containerRef}
      className={`${styles.layout} ${styles["stage"]} ${styles["roulette-stage"]} ${animate.animated} ${animate.fadeIn}`}
      onAnimationEnd={handleContainerAnimationEnd}
      style={baseStyle}
    >
      <RouletteGroupList
        ref={groupsRef}
        groups={rouletteGroups}
        rouletteStart={rouletteStart}
        rouletteOpacities={rouletteOpacities}
        renderPrizeItem={renderPrizeItem}
        onPrizeDefined={handleSingleRouletteComplete}
        pointer={
          <RoulettePointer visible={visible} pointerHeight={pointerHeight} />
        }
      />
    </div>
  );
}
