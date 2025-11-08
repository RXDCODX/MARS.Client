import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import animate from "@/shared/styles/animate.module.scss";
import type { OperationResult } from "@/shared/types/OperationResult";
import { createErrorResult } from "@/shared/types/OperationResult";

import styles from "../MikuMonday.module.scss";
import type { RouletteGroup } from "../types";

type ShowToast = (result: OperationResult<unknown>) => void;

interface UseRouletteAnimationParams {
  rouletteGroups: RouletteGroup[];
  shouldSkipAvailableTracksUpdate: boolean;
  decrementAvailableTrack: () => Promise<void>;
  dequeueCurrent: () => void;
  showToast: ShowToast;
}

export function useRouletteAnimation({
  rouletteGroups,
  shouldSkipAvailableTracksUpdate,
  decrementAvailableTrack,
  dequeueCurrent,
  showToast,
}: UseRouletteAnimationParams) {
  const containerRef = useRef<HTMLDivElement>(null);
  const groupsRef = useRef<HTMLDivElement>(null);

  const [baseStyle, setBaseStyle] = useState<CSSProperties>({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-end",
    animationDuration: "2.2s",
  });
  const [rouletteStart, setRouletteStart] = useState(false);
  const [visible, setVisible] = useState(false);
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

    const fadeTimer = setTimeout(() => {
      const newOpacities = rouletteGroups.map(group =>
        group.hasWinner ? 1 : 0
      );
      setFadedOpacities(newOpacities);
    }, 15000);

    return () => {
      clearTimeout(fadeTimer);
      setFadedOpacities([]);
    };
  }, [rouletteStart, rouletteGroups]);

  const handleContainerAnimationEnd = useCallback(() => {
    setRouletteStart(true);
    setVisible(true);
    if (groupsRef.current) {
      setPointerHeight(groupsRef.current.offsetHeight);
    }
  }, []);

  const handleSingleRouletteComplete = useCallback(() => {
    setCompletedRoulettes(prev => {
      const newCount = prev + 1;
      console.log(
        `✅ Рулетка завершена. Всего: ${newCount}/${rouletteGroups.length}`
      );

      if (newCount === rouletteGroups.length) {
        setTimeout(() => {
          setVisible(false);
          const div = containerRef.current;
          if (div) {
            div.onanimationend = async () => {
              if (!shouldSkipAvailableTracksUpdate) {
                try {
                  await decrementAvailableTrack();
                } catch {
                  showToast(
                    createErrorResult("Ошибка обновления свободных треков")
                  );
                }
              }
              dequeueCurrent();
            };
            setBaseStyle(prevStyle => ({
              ...prevStyle,
              animationDuration: "1.5s",
            }));
            div.className = `${styles.layout} ${animate.animated} ${animate.fadeOut}`;
          }
        }, 100);
      }

      return newCount;
    });
  }, [
    rouletteGroups.length,
    shouldSkipAvailableTracksUpdate,
    decrementAvailableTrack,
    showToast,
    dequeueCurrent,
  ]);

  return {
    containerRef,
    groupsRef,
    baseStyle,
    rouletteStart,
    visible,
    pointerHeight,
    rouletteOpacities,
    handleContainerAnimationEnd,
    handleSingleRouletteComplete,
  };
}
