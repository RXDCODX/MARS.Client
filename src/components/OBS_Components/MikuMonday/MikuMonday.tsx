import "react-roulette-pro/dist/index.css";

import { useCallback } from "react";
import type PrizeType from "react-roulette-pro/dist/types/PrizeType";

import animate from "@/shared/styles/animate.module.scss";
import { useToastModal } from "@/shared/Utils/ToastModal";

import RouletteGroupList from "./components/RouletteGroupList";
import RoulettePointer from "./components/RoulettePointer";
import { useRouletteAnimation } from "./hooks/useRouletteAnimation";
import { useRouletteGroups } from "./hooks/useRouletteGroups";
import styles from "./MikuMonday.module.scss";
import PrizeItem from "./PrizeItem";
import useMikuMondayStore from "./store/mikuMondayStore";
import type { RoulettePrize } from "./types";

function MikuMondayContent() {
  const currentAlert = useMikuMondayStore(state => state.currentAlert);
  const availableTracksCount = useMikuMondayStore(
    state => state.availableTracksCount
  );
  const decrementAvailableTrack = useMikuMondayStore(
    state => state.decrementAvailableTrack
  );
  const dequeueCurrent = useMikuMondayStore(state => state.dequeueCurrent);
  const { showToast } = useToastModal();
  const shouldSkipAvailableTracksUpdate =
    currentAlert?.skipAvailableTracksUpdate === true;

  const rouletteGroups = useRouletteGroups(currentAlert);
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
    dequeueCurrent,
    showToast,
  });

  const renderPrizeItem = useCallback(
    (prize: PrizeType) => <PrizeItem prize={prize as RoulettePrize} />,
    []
  );

  // Если нет групп рулеток - не показываем (защита от edge cases)
  if (!currentAlert || rouletteGroups.length === 0) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`${styles.layout} ${animate.animated} ${animate.fadeIn}`}
      onAnimationEnd={handleContainerAnimationEnd}
      style={baseStyle}
    >
      {availableTracksCount > 0 && (
        <div className={styles["available-tracks"]}>
          <span className={styles["available-tracks-text"]}>
            Осталось свободных треков: {availableTracksCount}
          </span>
        </div>
      )}
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

// Wrapper с key для автоматического сброса состояния при смене алерта
export default MikuMondayContent;
