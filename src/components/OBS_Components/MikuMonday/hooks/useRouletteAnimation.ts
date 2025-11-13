import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import type { OperationResult } from "@/shared/types/OperationResult";
import { createErrorResult } from "@/shared/types/OperationResult";

import type { RouletteGroup } from "../types";

type ShowToast = (result: OperationResult<unknown>) => void;

interface UseRouletteAnimationParams {
  rouletteGroups: RouletteGroup[];
  shouldSkipAvailableTracksUpdate: boolean;
  decrementAvailableTrack: () => Promise<void>;
  showToast: ShowToast;
  onComplete: () => void;
}

const ROULETTE_FADE_TIMEOUT = 15000;
const WINNER_FADE_DELAY = 1200;
const ROULETTE_START_DELAY = 0;

export function useRouletteAnimation({
  rouletteGroups,
  shouldSkipAvailableTracksUpdate,
  decrementAvailableTrack,
  showToast,
  onComplete,
}: UseRouletteAnimationParams) {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);
  const completionNotifiedRef = useRef(false);
  const fadeTimersRef = useRef<{ fadeOthers?: number; fadeWinner?: number }>(
    {}
  );
  const startTimerRef = useRef<number | undefined>(undefined);

  const [baseStyle, setBaseStyle] = useState<CSSProperties>({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    animationDuration: "2.2s",
  });
  const [rouletteStart, setRouletteStart] = useState(true);
  const [pointerVisible, setPointerVisible] = useState(false);
  const [pointerHeight, setPointerHeight] = useState(0);
  const [fadedOpacities, setFadedOpacities] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCompletedRoulettes] = useState(0);

  const initialOpacities = useMemo(
    () => new Array(rouletteGroups.length).fill(1),
    [rouletteGroups.length]
  );

  const rouletteOpacities =
    fadedOpacities.length > 0 ? fadedOpacities : initialOpacities;

  useEffect(() => {
    if (!rouletteStart || rouletteGroups.length <= 1) {
      return;
    }

    const fadeOthersTimer = window.setTimeout(() => {
      const nextOpacities = rouletteGroups.map(group =>
        group.hasWinner ? 1 : 0
      );
      setFadedOpacities(nextOpacities);

      fadeTimersRef.current.fadeWinner = window.setTimeout(() => {
        setFadedOpacities(nextOpacities.map(() => 0));
      }, WINNER_FADE_DELAY);
    }, ROULETTE_FADE_TIMEOUT);

    fadeTimersRef.current.fadeOthers = fadeOthersTimer;

    return () => {
      const { fadeOthers, fadeWinner } = fadeTimersRef.current;
      if (fadeOthers) {
        window.clearTimeout(fadeOthers);
      }
      if (fadeWinner) {
        window.clearTimeout(fadeWinner);
      }
      fadeTimersRef.current = {};
      setFadedOpacities([]);
    };
  }, [rouletteStart, rouletteGroups]);

  useEffect(() => {
    const groupsElement = groupsRef.current;
    if (!groupsElement) {
      return;
    }

    const updatePointer = () => {
      const height = groupsElement.offsetHeight;
      if (height > 0) {
        setPointerHeight(height);
        setPointerVisible(true);
      }
    };

    updatePointer();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(() => {
        updatePointer();
      });
      observer.observe(groupsElement);

      return () => {
        observer.disconnect();
      };
    }

    const fallbackInterval = window.setInterval(updatePointer, 250);
    return () => {
      window.clearInterval(fallbackInterval);
    };
  }, [rouletteGroups.length]);

  const handleContainerAnimationEnd = useCallback(() => {
    startTimerRef.current = window.setTimeout(() => {
      setRouletteStart(true);
    }, ROULETTE_START_DELAY);
  }, []);

  useEffect(
    () => () => {
      if (startTimerRef.current) {
        window.clearTimeout(startTimerRef.current);
      }
    },
    []
  );

  useEffect(
    () => () => {
      const { fadeOthers, fadeWinner } = fadeTimersRef.current;
      if (fadeOthers) {
        window.clearTimeout(fadeOthers);
      }
      if (fadeWinner) {
        window.clearTimeout(fadeWinner);
      }
    },
    []
  );

  const handleSingleRouletteComplete = useCallback(() => {
    setCompletedRoulettes(prev => {
      const newCount = prev + 1;
      console.log(
        `✅ Рулетка завершена. Всего: ${newCount}/${rouletteGroups.length}`
      );

      if (
        newCount === rouletteGroups.length &&
        !completionNotifiedRef.current
      ) {
        completionNotifiedRef.current = true;
        setTimeout(() => {
          setPointerVisible(false);
          setBaseStyle(prevStyle => ({
            ...prevStyle,
            animationDuration: "1.5s",
          }));
          const finalize = async () => {
            if (!shouldSkipAvailableTracksUpdate) {
              try {
                await decrementAvailableTrack();
              } catch {
                showToast(
                  createErrorResult("Ошибка обновления свободных треков")
                );
              }
            }
            onComplete();
          };
          void finalize();
        }, 800);
      }

      return newCount;
    });
  }, [
    rouletteGroups.length,
    shouldSkipAvailableTracksUpdate,
    decrementAvailableTrack,
    showToast,
    onComplete,
  ]);

  return {
    containerRef,
    groupsRef,
    baseStyle,
    rouletteStart,
    visible: pointerVisible,
    pointerHeight,
    rouletteOpacities,
    handleContainerAnimationEnd,
    handleSingleRouletteComplete,
  };
}
