import animate from "@/shared/styles/animate.module.scss";
import { useToastModal } from "@/shared/Utils/ToastModal";

import { useRouletteAnimation } from "../../hooks/useRouletteAnimation";
import styles from "../../MikuMonday.module.scss";
import type { RouletteGroup } from "../../types";
import CustomRouletteGroupList from "../CustomRouletteGroupList/CustomRouletteGroupList";
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
    handleOthersFaded,
    handleWinnerFaded,
  } = useRouletteAnimation({
    rouletteGroups,
    shouldSkipAvailableTracksUpdate,
    decrementAvailableTrack,
    showToast,
    onComplete,
  });

  return (
    <div
      ref={containerRef}
      className={`${styles.layout} ${styles["stage"]} ${styles["roulette-stage"]} ${animate.animated} ${animate.fadeIn}`}
      onAnimationEnd={handleContainerAnimationEnd}
      style={baseStyle}
    >
      <CustomRouletteGroupList
        ref={groupsRef}
        groups={rouletteGroups}
        rouletteStart={rouletteStart}
        rouletteOpacities={rouletteOpacities}
        onPrizeDefined={handleSingleRouletteComplete}
        onOthersFaded={handleOthersFaded}
        onWinnerFaded={handleWinnerFaded}
        pointer={
          <RoulettePointer visible={visible} pointerHeight={pointerHeight} />
        }
      />
    </div>
  );
}
