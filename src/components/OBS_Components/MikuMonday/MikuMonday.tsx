import "react-roulette-pro/dist/index.css";

import { useCallback, useEffect, useRef, useState } from "react";

import IntroStage from "./components/stages/IntroStage";
import ResultStage from "./components/stages/ResultStage";
import RouletteStage from "./components/stages/RouletteStage";
import WaitingStage from "./components/stages/WaitingStage";
import { useRouletteGroups } from "./hooks/useRouletteGroups";
import styles from "./MikuMonday.module.scss";
import useMikuMondayStore from "./store/mikuMondayStore";

type StageKey = "waiting" | "intro" | "roulette" | "result";
const QUEUE_PAUSE_MS = 2000;

function MikuMondayContent() {
  const currentAlert = useMikuMondayStore(state => state.currentAlert);
  const decrementAvailableTrack = useMikuMondayStore(
    state => state.decrementAvailableTrack
  );
  const dequeueCurrent = useMikuMondayStore(state => state.dequeueCurrent);

  const rouletteGroups = useRouletteGroups(currentAlert);

  const [stage, setStage] = useState<StageKey>("waiting");
  const waitingTimeoutRef = useRef<number | null>(null);
  const stageSyncTimeoutRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (waitingTimeoutRef.current !== null) {
        window.clearTimeout(waitingTimeoutRef.current);
        waitingTimeoutRef.current = null;
      }
      if (stageSyncTimeoutRef.current !== null) {
        window.clearTimeout(stageSyncTimeoutRef.current);
        stageSyncTimeoutRef.current = null;
      }
    },
    []
  );

  useEffect(() => {
    if (stageSyncTimeoutRef.current !== null) {
      window.clearTimeout(stageSyncTimeoutRef.current);
      stageSyncTimeoutRef.current = null;
    }

    if (currentAlert) {
      if (waitingTimeoutRef.current !== null) {
        window.clearTimeout(waitingTimeoutRef.current);
        waitingTimeoutRef.current = null;
      }
      stageSyncTimeoutRef.current = window.setTimeout(() => {
        setStage(previousStage =>
          previousStage === "waiting" ? "intro" : previousStage
        );
        stageSyncTimeoutRef.current = null;
      }, 0);
      return;
    }

    stageSyncTimeoutRef.current = window.setTimeout(() => {
      setStage(previousStage =>
        previousStage !== "waiting" ? "waiting" : previousStage
      );
      stageSyncTimeoutRef.current = null;
    }, 0);
  }, [currentAlert?.queueId, currentAlert]);

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
    setStage("waiting");
    if (waitingTimeoutRef.current !== null) {
      window.clearTimeout(waitingTimeoutRef.current);
    }

    waitingTimeoutRef.current = window.setTimeout(() => {
      waitingTimeoutRef.current = null;
      dequeueCurrent();
      const nextAlert = useMikuMondayStore.getState().currentAlert;
      setStage(nextAlert ? "intro" : "waiting");
    }, QUEUE_PAUSE_MS);
  }, [dequeueCurrent]);

  if (!currentAlert || stage === "waiting") {
    return (
      <div className={styles.layout}>
        <WaitingStage />
      </div>
    );
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
