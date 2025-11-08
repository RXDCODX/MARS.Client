import "react-roulette-pro/dist/index.css";

import { useCallback, useState } from "react";

import IntroStage from "./components/stages/IntroStage";
import ResultStage from "./components/stages/ResultStage";
import RouletteStage from "./components/stages/RouletteStage";
import { useRouletteGroups } from "./hooks/useRouletteGroups";
import styles from "./MikuMonday.module.scss";
import useMikuMondayStore from "./store/mikuMondayStore";

type StageKey = "intro" | "roulette" | "result";

function MikuMondayContent() {
  const currentAlert = useMikuMondayStore(state => state.currentAlert);
  const availableTracksCount = useMikuMondayStore(
    state => state.availableTracksCount
  );
  const decrementAvailableTrack = useMikuMondayStore(
    state => state.decrementAvailableTrack
  );
  const dequeueCurrent = useMikuMondayStore(state => state.dequeueCurrent);

  const rouletteGroups = useRouletteGroups(currentAlert);

  const [stage, setStage] = useState<StageKey>("intro");

  const shouldSkipAvailableTracksUpdate =
    currentAlert?.skipAvailableTracksUpdate === true;

  const handleIntroComplete = useCallback(() => {
    if (rouletteGroups.length > 0) {
      setStage("roulette");
      return;
    }
    setStage("result");
  }, [rouletteGroups.length]);

  const handleRouletteComplete = useCallback(() => {
    setStage("result");
  }, []);

  const handleResultComplete = useCallback(() => {
    dequeueCurrent();
  }, [dequeueCurrent]);

  if (!currentAlert) {
    return null;
  }

  if (stage === "intro") {
    return (
      <div className={styles.layout}>
        <IntroStage
          twitchUser={currentAlert.twitchUser}
          fallbackAvatar={currentAlert.selectedTrack.thumbnailUrl ?? undefined}
          onComplete={handleIntroComplete}
        />
      </div>
    );
  }

  if (stage === "roulette") {
    return (
      <RouletteStage
        rouletteGroups={rouletteGroups}
        shouldSkipAvailableTracksUpdate={shouldSkipAvailableTracksUpdate}
        decrementAvailableTrack={decrementAvailableTrack}
        availableTracksCount={availableTracksCount}
        onComplete={handleRouletteComplete}
      />
    );
  }

  return (
    <div className={styles.layout}>
      <ResultStage
        track={currentAlert.selectedTrack}
        twitchUser={currentAlert.twitchUser}
        onComplete={handleResultComplete}
      />
    </div>
  );
}

// Wrapper с key для автоматического сброса состояния при смене алерта
export default MikuMondayContent;
