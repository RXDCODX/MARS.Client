import "react-roulette-pro/dist/index.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

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

  // Получаем выигрышный трек из рулетки
  const winnerTrack = useMemo(() => {
    if (!currentAlert) return undefined;

    const winnerGroup = rouletteGroups.find(group => group.hasWinner);
    if (!winnerGroup) {
      console.log(
        "[MikuMonday] Нет группы с победителем, используем исходный трек"
      );
      return currentAlert.selectedTrack;
    }

    const winnerPrize = winnerGroup.prizes[winnerGroup.prizeIndex];
    if (!winnerPrize) {
      console.warn("[MikuMonday] Не найден приз для победителя");
      return currentAlert.selectedTrack;
    }

    // Ищем полный объект трека в availableTracks
    const fullTrack = currentAlert.availableTracks.find(
      track => track.id === winnerPrize.id
    );

    if (!fullTrack) {
      console.warn("[MikuMonday] Не найден полный объект трека", {
        prizeId: winnerPrize.id,
        prizeText: winnerPrize.text,
      });
      return currentAlert.selectedTrack;
    }

    console.log("[MikuMonday] Выигрышный трек определен", {
      originalTrackId: currentAlert.selectedTrack.id,
      originalTrackNumber: currentAlert.selectedTrack.number,
      winnerTrackId: fullTrack.id,
      winnerTrackNumber: fullTrack.number,
      winnerArtist: fullTrack.artist,
      winnerTitle: fullTrack.title,
    });

    return fullTrack;
  }, [currentAlert, rouletteGroups]);

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
    console.log("[MikuMonday] handleIntroComplete вызван", {
      rouletteGroupsLength: rouletteGroups.length,
      currentAlertId: currentAlert?.id,
      trackNumber: currentAlert?.selectedTrack.number,
    });
    if (rouletteGroups.length > 0) {
      console.log("[MikuMonday] Переходим на рулетку");
      setStage("roulette");
      return;
    }
    console.log("[MikuMonday] Нет рулеток, переходим на результат");
    setStage("result");
  }, [rouletteGroups.length, currentAlert]);

  const handleRouletteComplete = useCallback(() => {
    setStage("result");
  }, []);

  const handleResultComplete = useCallback(() => {
    console.log("[MikuMonday] handleResultComplete вызван", {
      currentAlertId: currentAlert?.id,
      queueId: currentAlert?.queueId,
      displayName: currentAlert?.twitchUser.displayName,
      trackNumber: currentAlert?.selectedTrack.number,
    });
    setStage("waiting");
    if (waitingTimeoutRef.current !== null) {
      window.clearTimeout(waitingTimeoutRef.current);
    }

    waitingTimeoutRef.current = window.setTimeout(() => {
      console.log("[MikuMonday] Вызываем dequeueCurrent после паузы", {
        pauseMs: QUEUE_PAUSE_MS,
      });
      waitingTimeoutRef.current = null;
      dequeueCurrent();
      const nextAlert = useMikuMondayStore.getState().currentAlert;
      console.log("[MikuMonday] Текущий статус после деквеу", {
        nextAlertId: nextAlert?.id,
        nextAlertDisplayName: nextAlert?.twitchUser.displayName,
        nextAlertTrackNumber: nextAlert?.selectedTrack.number,
      });
      setStage(nextAlert ? "intro" : "waiting");
    }, QUEUE_PAUSE_MS);
  }, [dequeueCurrent, currentAlert]);

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
      {(() => {
        const trackToDisplay = winnerTrack ?? currentAlert.selectedTrack;
        console.log("[MikuMonday] 📺 Отправляем трек в ResultStage", {
          trackId: trackToDisplay.id,
          trackNumber: trackToDisplay.number,
          trackTitle: trackToDisplay.title,
          trackArtist: trackToDisplay.artist,
          isWinnerTrack: winnerTrack !== undefined,
          winnerGroupExists: rouletteGroups.some(g => g.hasWinner),
        });
        return (
          <ResultStage
            track={trackToDisplay}
            twitchUser={currentAlert.twitchUser}
            onComplete={handleResultComplete}
          />
        );
      })()}
    </div>
  );
}

// Wrapper с key для автоматического сброса состояния при смене алерта
export default MikuMondayContent;
