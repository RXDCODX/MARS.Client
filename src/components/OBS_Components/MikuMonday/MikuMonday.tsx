import "react-roulette-pro/dist/index.css";

import {
  CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import RoulettePro from "react-roulette-pro";
import type PrizeType from "react-roulette-pro/dist/types/PrizeType";

import { MikuTrackDto } from "@/shared/api";
import animate from "@/shared/styles/animate.module.scss";
import { createErrorResult } from "@/shared/types/OperationResult";
import { useToastModal } from "@/shared/Utils/ToastModal";

import styles from "./MikuMonday.module.scss";
import PrizeItem from "./PrizeItem";
import useMikuMondayStore from "./store/mikuMondayStore";

export interface RoulettePrize extends PrizeType {
  isPlaceholder?: boolean;
}

interface RouletteGroup {
  prizes: RoulettePrize[];
  prizeIndex: number;
  hasWinner: boolean;
  isReversed: boolean;
}

function createPlaceholderPrize(index: number, groupId: number): RoulettePrize {
  if (index >= 0) {
    return {
      id: `placeholder-${groupId}-${index}`,
      image: "",
      text: "Свободный слот",
      isPlaceholder: true,
    };
  }
  return {
    id: `placeholder-${groupId}-fallback`,
    image: "",
    text: "Свободный слот",
    isPlaceholder: true,
  };
}

function fillPrizesToTwenty(
  prizes: RoulettePrize[],
  groupId: number
): RoulettePrize[] {
  if (prizes.length < 20) {
    const extendedPrizes = [...prizes];
    while (extendedPrizes.length < 20) {
      extendedPrizes.push(
        createPlaceholderPrize(extendedPrizes.length, groupId)
      );
    }
    return extendedPrizes;
  }
  return prizes;
}

// Вспомогательная функция для разделения треков на группы
function divideTracksIntoGroups(
  availableTracks: MikuTrackDto[],
  selectedTrack: MikuTrackDto
): RouletteGroup[] {
  const tracksCount = availableTracks.length;
  const allTracks = [...availableTracks, selectedTrack];
  const selectedTrackId = selectedTrack.number.toString();

  // Преобразуем треки в призы
  const allPrizes: RoulettePrize[] = allTracks.map(track => ({
    id: track.number.toString(),
    image: track.thumbnailUrl || "",
    text: `#${track.number}: ${track.artist} - ${track.title}`,
    isPlaceholder: false,
  }));

  // Определяем количество рулеток
  let roulettesCount = 1;
  if (tracksCount >= 6) {
    roulettesCount = 3;
  } else if (tracksCount >= 4) {
    roulettesCount = 2;
  }

  // Если только одна рулетка, возвращаем все призы
  if (roulettesCount === 1) {
    return [
      {
        prizes: allPrizes,
        prizeIndex: allPrizes.length - 1,
        hasWinner: true,
        isReversed: false,
      },
    ];
  }

  // Разделяем призы на группы
  const groups: RouletteGroup[] = [];
  const prizesPerGroup = Math.ceil(allPrizes.length / roulettesCount);

  // Находим индекс выбранного трека в общем массиве
  const selectedIndex = allPrizes.findIndex(p => p.id === selectedTrackId);
  const winnerGroupIndex = Math.floor(selectedIndex / prizesPerGroup);

  for (let i = 0; i < roulettesCount; i++) {
    const startIdx = i * prizesPerGroup;
    const endIdx = Math.min(startIdx + prizesPerGroup, allPrizes.length);
    const groupPrizes = allPrizes.slice(startIdx, endIdx);

    const hasWinner = i === winnerGroupIndex;
    const localPrizeIndex = hasWinner
      ? selectedIndex - startIdx
      : groupPrizes.length > 0
        ? groupPrizes.length - 1
        : 0;

    // Четные индексы (0, 2, 4...) крутятся обычно, нечетные (1, 3...) - в обратную сторону
    const isReversed = i % 2 !== 0;

    const filledPrizes = fillPrizesToTwenty(groupPrizes, i);

    groups.push({
      prizes: filledPrizes,
      prizeIndex: localPrizeIndex,
      hasWinner,
      isReversed,
    });
  }

  return groups;
}

function MikuMondayContent() {
  const [rouletteStart, setRouletteStart] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pointerHeight, setPointerHeight] = useState(0);
  const [fadedOpacities, setFadedOpacities] = useState<number[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setCompletedRoulettes] = useState<number>(0);
  const rouletteDiv = useRef<HTMLDivElement>(null);
  const heightDiv = useRef<HTMLDivElement>(null);

  // Получаем данные из store
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

  const [baseStyle, setBaseStyle] = useState<CSSProperties>({
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    animationDuration: "2.2s",
  });

  // Подготовка групп рулеток с использованием useMemo
  // currentAlert гарантированно не null, так как wrapper проверяет это перед рендером
  const rouletteGroups = useMemo<RouletteGroup[]>(
    () =>
      currentAlert
        ? divideTracksIntoGroups(
            currentAlert.availableTracks,
            currentAlert.selectedTrack
          )
        : [],
    [currentAlert]
  );

  // Вычисляем начальные opacity для рулеток напрямую из данных
  const initialOpacities = useMemo(
    () => new Array(rouletteGroups.length).fill(1),
    [rouletteGroups.length]
  );

  // Используем fadedOpacities если есть, иначе initialOpacities
  const rouletteOpacities =
    fadedOpacities.length > 0 ? fadedOpacities : initialOpacities;

  // Анимация исчезновения проигравших рулеток
  useEffect(() => {
    if (!rouletteStart || rouletteGroups.length <= 1) return;

    // Начинаем скрывать проигравшие рулетки за 5 секунд до конца (время вращения 20 сек)
    const fadeTimer = setTimeout(() => {
      const newOpacities = rouletteGroups.map(group =>
        group.hasWinner ? 1 : 0
      );
      setFadedOpacities(newOpacities);
    }, 15000); // 20s - 5s = 15s

    return () => {
      clearTimeout(fadeTimer);
      setFadedOpacities([]);
    };
  }, [rouletteStart, rouletteGroups]);

  const handleSingleRouletteComplete = useCallback(() => {
    setCompletedRoulettes(prev => {
      const newCount = prev + 1;
      console.log(
        `✅ Рулетка завершена. Всего: ${newCount}/${rouletteGroups.length}`
      );

      // Если все рулетки завершили вращение
      if (newCount === rouletteGroups.length) {
        // Запускаем завершающую анимацию
        setTimeout(() => {
          setVisible(false);
          const div = rouletteDiv.current;
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
            setBaseStyle(prev => ({
              ...prev,
              animationDuration: "1.5s",
            }));
            div.className = " " + animate.animated + " " + animate.fadeOut;
          }
        }, 100);
      }

      return newCount;
    });
  }, [
    rouletteGroups.length,
    decrementAvailableTrack,
    dequeueCurrent,
    showToast,
    shouldSkipAvailableTracksUpdate,
  ]);

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
      ref={rouletteDiv}
      className={" " + animate.animated + " " + animate.fadeIn}
      onAnimationEnd={() => {
        setRouletteStart(true);
        setVisible(true);
        if (heightDiv.current) {
          setPointerHeight(heightDiv.current.offsetHeight);
        }
      }}
      style={baseStyle}
    >
      <div
        ref={heightDiv}
        className={styles["roulette-container"]}
        style={{
          width: "100%",
          margin: "0 auto",
          height: "80vh",
          alignSelf: "center",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {visible && (
          <div
            className={styles["roulette-pointer"]}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "4px",
              height: `${pointerHeight}px`,
              background: "var(--bs-primary)",
              zIndex: 10,
              transform: "translate(-50%, -50%)",
              visibility: visible ? "visible" : "hidden",
              boxShadow:
                "0 0 20px var(--bs-primary), 0 0 40px var(--bs-primary)",
            }}
          />
        )}

        {rouletteGroups.map((group, index) => (
          <div
            key={index}
            className={`${styles["single-roulette"]} ${group.isReversed ? styles["reversed"] : ""}`}
            style={{
              opacity: rouletteOpacities[index] ?? 1,
              transition: "opacity 2s ease-out",
              flex: 1,
              minHeight: 0,
            }}
          >
            <RoulettePro
              start={rouletteStart}
              prizes={group.prizes}
              prizeIndex={group.prizeIndex}
              prizeItemRenderFunction={renderPrizeItem}
              spinningTime={20}
              type="horizontal"
              options={{ withoutAnimation: false, stopInCenter: true }}
              defaultDesignOptions={{
                prizesWithText: true,
                hideCenterDelimiter: true,
              }}
              onPrizeDefined={handleSingleRouletteComplete}
            />
          </div>
        ))}
      </div>
      <div className={styles["user-info"]}>
        <div className={styles["user-name-container"]}>
          <span className={styles["label"]}>Мику заметила:</span>
          <span className={styles["user-name"]}>
            {currentAlert.displayName}
          </span>
        </div>
        <div className={styles["track-info"]}>
          <span className={styles["track-title"]}>
            И дарит трек #{currentAlert.selectedTrack.number}
          </span>
        </div>
        {availableTracksCount > 0 && (
          <div className={styles["available-tracks"]}>
            <span className={styles["available-tracks-text"]}>
              Осталось свободных треков: {availableTracksCount}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

// Wrapper с key для автоматического сброса состояния при смене алерта
export default function MikuMonday() {
  const currentAlert = useMikuMondayStore(state => state.currentAlert);
  const isAlertShowing = useMikuMondayStore(state => state.isAlertShowing);

  // Если нет алерта - не показываем компонент вообще (полное размонтирование)
  if (!isAlertShowing || !currentAlert) {
    return null;
  }

  // Используем ID алерта как key - React автоматически пересоздаст компонент с чистым состоянием
  const alertKey = currentAlert.selectedTrack.number;

  return <MikuMondayContent key={alertKey} />;
}
