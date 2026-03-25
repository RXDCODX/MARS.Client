import "react-roulette-pro/dist/index.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { MikuTrackDto } from "@/shared/api";

import IntroStage from "./components/stages/IntroStage";
import ResultStage from "./components/stages/ResultStage";
import RouletteStage from "./components/stages/RouletteStage";
import WaitingStage from "./components/stages/WaitingStage";
import { useRouletteGroups } from "./hooks/useRouletteGroups";
import styles from "./MikuMonday.module.scss";
import useMikuMondayStore from "./store/mikuMondayStore";

type StageKey = "waiting" | "intro" | "roulette" | "result";
const QUEUE_PAUSE_MS = 2000;
const BACKGROUND_AUDIO_START_PROGRESS = 0.33;
const BACKGROUND_AUDIO_TARGET_VOLUME = 0.25;
const BACKGROUND_AUDIO_FADE_IN_MS = 5500;
const BACKGROUND_AUDIO_FADE_OUT_MS = 5500;
const BACKGROUND_AUDIO_FADE_TICK_MS = 100;

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
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [backgroundTrack, setBackgroundTrack] = useState<MikuTrackDto>();
  const waitingTimeoutRef = useRef<number | null>(null);
  const stageSyncTimeoutRef = useRef<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const backgroundAudioFadeIntervalRef = useRef<number | null>(null);

  const shouldPlayBackgroundAudio =
    Boolean(currentAlert) && stage !== "waiting";

  const excludedBackgroundTrackIds = useMemo(() => {
    const ids = new Set<string>();

    if (currentAlert?.selectedTrack?.id) {
      ids.add(currentAlert.selectedTrack.id);
    }

    if (winnerTrack?.id) {
      ids.add(winnerTrack.id);
    }

    return ids;
  }, [currentAlert?.selectedTrack?.id, winnerTrack?.id]);

  const backgroundTrackCandidates = useMemo(() => {
    if (!currentAlert?.availableTracks) {
      return [];
    }

    return currentAlert.availableTracks.filter(
      track =>
        Boolean(track.url) &&
        track.url.trim().length > 0 &&
        !excludedBackgroundTrackIds.has(track.id)
    );
  }, [currentAlert?.availableTracks, excludedBackgroundTrackIds]);

  const clearBackgroundAudioFadeInterval = useCallback(() => {
    if (backgroundAudioFadeIntervalRef.current !== null) {
      window.clearInterval(backgroundAudioFadeIntervalRef.current);
      backgroundAudioFadeIntervalRef.current = null;
    }
  }, []);

  const fadeBackgroundAudioTo = useCallback(
    (targetVolume: number, durationMs: number, onComplete?: () => void) => {
      const audio = backgroundAudioRef.current;
      if (!audio) {
        return;
      }

      clearBackgroundAudioFadeInterval();

      const startVolume = audio.volume;
      const volumeDelta = targetVolume - startVolume;
      if (Math.abs(volumeDelta) < 0.001 || durationMs <= 0) {
        audio.volume = Math.max(0, Math.min(1, targetVolume));
        onComplete?.();
        return;
      }

      const steps = Math.max(
        1,
        Math.round(durationMs / BACKGROUND_AUDIO_FADE_TICK_MS)
      );
      let currentStep = 0;

      backgroundAudioFadeIntervalRef.current = window.setInterval(() => {
        currentStep += 1;
        const progress = Math.min(1, currentStep / steps);
        audio.volume = Math.max(
          0,
          Math.min(1, startVolume + volumeDelta * progress)
        );

        if (progress >= 1) {
          clearBackgroundAudioFadeInterval();
          onComplete?.();
        }
      }, BACKGROUND_AUDIO_FADE_TICK_MS);
    },
    [clearBackgroundAudioFadeInterval]
  );

  const startBackgroundAudio = useCallback(() => {
    const audio = backgroundAudioRef.current;
    if (!audio || !backgroundTrack?.url) {
      return;
    }

    clearBackgroundAudioFadeInterval();
    audio.volume = 0;

    const handleLoadedMetadata = () => {
      if (Number.isFinite(audio.duration) && audio.duration > 0) {
        audio.currentTime = audio.duration * BACKGROUND_AUDIO_START_PROGRESS;
      }
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata, {
      once: true,
    });

    audio
      .play()
      .then(() => {
        fadeBackgroundAudioTo(
          BACKGROUND_AUDIO_TARGET_VOLUME,
          BACKGROUND_AUDIO_FADE_IN_MS
        );
      })
      .catch(err => {
        console.warn("[MikuMonday] Не удалось запустить фоновый трек:", err);
      });
  }, [
    backgroundTrack?.url,
    clearBackgroundAudioFadeInterval,
    fadeBackgroundAudioTo,
  ]);

  const stopBackgroundAudio = useCallback(() => {
    const audio = backgroundAudioRef.current;
    if (!audio) {
      return;
    }

    fadeBackgroundAudioTo(0, BACKGROUND_AUDIO_FADE_OUT_MS, () => {
      audio.pause();
      audio.currentTime = 0;
    });
  }, [fadeBackgroundAudioTo]);

  // Предзагружаем видео при монтировании компонента
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load(); // Начинаем загрузку видео
    }
  }, []);

  // Управление воспроизведением видео
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoVisible) {
      video.currentTime = 0; // Сбрасываем на начало
      video.play().catch(err => {
        console.warn("[MikuMonday] Не удалось воспроизвести видео:", err);
      });
    } else {
      video.pause();
    }
  }, [isVideoVisible]);

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
      clearBackgroundAudioFadeInterval();
    },
    [clearBackgroundAudioFadeInterval]
  );

  useEffect(() => {
    if (!currentAlert) {
      setBackgroundTrack(undefined);
      return;
    }

    if (backgroundTrackCandidates.length === 0) {
      setBackgroundTrack(undefined);
      return;
    }

    // При переходе на result stage — всегда выбираем новый трек для смены
    if (stage === "result") {
      const randomIndex = Math.floor(
        Math.random() * backgroundTrackCandidates.length
      );
      const nextBackgroundTrack = backgroundTrackCandidates[randomIndex];
      setBackgroundTrack(nextBackgroundTrack);
      console.log("[MikuMonday] Выбран новый фоновый трек (result stage)", {
        backgroundTrackId: nextBackgroundTrack.id,
        backgroundTrackNumber: nextBackgroundTrack.number,
        backgroundTrackArtist: nextBackgroundTrack.artist,
        backgroundTrackTitle: nextBackgroundTrack.title,
      });
      return;
    }

    const currentTrackIsValid =
      backgroundTrack &&
      backgroundTrackCandidates.some(track => track.id === backgroundTrack.id);

    if (currentTrackIsValid) {
      return;
    }

    const randomIndex = Math.floor(
      Math.random() * backgroundTrackCandidates.length
    );
    const nextBackgroundTrack = backgroundTrackCandidates[randomIndex];

    setBackgroundTrack(nextBackgroundTrack);

    console.log("[MikuMonday] Выбран фоновый трек", {
      backgroundTrackId: nextBackgroundTrack.id,
      backgroundTrackNumber: nextBackgroundTrack.number,
      backgroundTrackArtist: nextBackgroundTrack.artist,
      backgroundTrackTitle: nextBackgroundTrack.title,
      excludedTrackIds: Array.from(excludedBackgroundTrackIds),
    });
  }, [
    currentAlert,
    stage,
    backgroundTrack,
    backgroundTrackCandidates,
    excludedBackgroundTrackIds,
  ]);

  useEffect(() => {
    const audio = backgroundAudioRef.current;
    if (!audio) {
      return;
    }

    if (!backgroundTrack?.url) {
      stopBackgroundAudio();
      return;
    }

    audio.src = backgroundTrack.url;
    audio.load();

    if (!shouldPlayBackgroundAudio) {
      stopBackgroundAudio();
    }
  }, [
    backgroundTrack?.id,
    backgroundTrack?.url,
    shouldPlayBackgroundAudio,
    stopBackgroundAudio,
  ]);

  useEffect(() => {
    if (!backgroundTrack?.url) {
      stopBackgroundAudio();
      return;
    }

    if (shouldPlayBackgroundAudio) {
      startBackgroundAudio();
      return;
    }

    stopBackgroundAudio();
  }, [
    shouldPlayBackgroundAudio,
    backgroundTrack?.url,
    startBackgroundAudio,
    stopBackgroundAudio,
  ]);

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
        setIsVideoVisible(true);
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
    setIsVideoVisible(false);
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

  // Видео-фон существует постоянно, чтобы не перемонтироваться между стейджами
  const videoBackground = (
    <div
      className={`${styles.videoBackground} ${isVideoVisible ? styles.videoVisible : styles.videoHidden}`}
    >
      <video
        ref={videoRef}
        src="/static/miku.mp4"
        preload="auto"
        muted
        playsInline
        loop
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          minWidth: "100%",
          minHeight: "100%",
          width: "auto",
          height: "auto",
          transform: "translate(-50%, -50%)",
          objectFit: "cover",
          pointerEvents: "none",
        }}
      />
    </div>
  );

  // Рендерим контент в зависимости от стейджа
  let stageContent;

  if (!currentAlert || stage === "waiting") {
    stageContent = (
      <div className={styles.layout}>
        <WaitingStage onComplete={() => {}} />
      </div>
    );
  } else if (stage === "intro") {
    stageContent = (
      <div className={styles.layout}>
        <IntroStage
          twitchUser={currentAlert.twitchUser}
          fallbackAvatar={currentAlert.selectedTrack.thumbnailUrl ?? undefined}
          onComplete={handleIntroComplete}
        />
      </div>
    );
  } else if (stage === "roulette") {
    stageContent = (
      <RouletteStage
        rouletteGroups={rouletteGroups}
        shouldSkipAvailableTracksUpdate={shouldSkipAvailableTracksUpdate}
        decrementAvailableTrack={decrementAvailableTrack}
        onComplete={handleRouletteComplete}
      />
    );
  } else {
    const trackToDisplay = winnerTrack ?? currentAlert.selectedTrack;
    console.log("[MikuMonday] 📺 Отправляем трек в ResultStage", {
      trackId: trackToDisplay.id,
      trackNumber: trackToDisplay.number,
      trackTitle: trackToDisplay.title,
      trackArtist: trackToDisplay.artist,
      isWinnerTrack: winnerTrack !== undefined,
      winnerGroupExists: rouletteGroups.some(g => g.hasWinner),
    });
    stageContent = (
      <div className={styles.layout}>
        <ResultStage
          track={trackToDisplay}
          twitchUser={currentAlert.twitchUser}
          onComplete={handleResultComplete}
        />
      </div>
    );
  }

  return (
    <>
      <audio ref={backgroundAudioRef} preload="auto" loop />
      {videoBackground}
      {stageContent}
    </>
  );
}

// Wrapper с key для автоматического сброса состояния при смене алерта
export default MikuMondayContent;
