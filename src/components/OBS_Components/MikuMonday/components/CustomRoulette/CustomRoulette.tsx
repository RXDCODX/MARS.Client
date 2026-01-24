import { useEffect, useRef, useState } from "react";

import type { RoulettePrize } from "../../types";
import styles from "./CustomRoulette.module.scss";

interface CustomRouletteProps {
  prizes: RoulettePrize[];
  prizeIndex: number;
  isReversed?: boolean;
  start: boolean;
  spinningTime?: number;
  onComplete?: () => void;
}

const PRIZE_WIDTH = 200; // ширина одного приза
const PRIZE_GAP = 10; // отступ между призами
const SPIN_DURATION = 20; // секунды

export default function CustomRoulette({
  prizes,
  prizeIndex,
  isReversed = false,
  start,
  spinningTime = SPIN_DURATION,
  onComplete,
}: CustomRouletteProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (!start || isSpinning || prizes.length === 0) return;

    console.log("[CustomRoulette] Начинаем вращение", {
      prizeIndex,
      prizesCount: prizes.length,
      isReversed,
      spinningTime,
    });

    setIsSpinning(true);

    // Создаем зацикленный массив призов (повторяем 5 раз для плавной прокрутки)
    const containerWidth = containerRef.current?.offsetWidth || 1000;
    const totalPrizeWidth = PRIZE_WIDTH + PRIZE_GAP;

    // Центр контейнера
    const centerOffset = containerWidth / 2 - PRIZE_WIDTH / 2;

    // Вычисляем сколько полных прокруток сделать (3-5 оборотов)
    const totalPrizes = prizes.length;

    // Индекс выигрышного приза в повторяющемся массиве (берем средний повтор)
    const middleRepeat = 2; // из 5 повторов берем средний
    const targetPrizeIndex = middleRepeat * totalPrizes + prizeIndex;

    // Финальная позиция выигрышного приза
    const targetPosition = targetPrizeIndex * totalPrizeWidth;

    // Финальная позиция с центрированием
    const endPosition = centerOffset - targetPosition;

    console.log("[CustomRoulette] Расчет позиций", {
      endPosition,
      targetPosition,
      targetPrizeIndex,
      centerOffset,
    });

    // Запускаем анимацию
    setTranslateX(endPosition);

    // Уведомляем о завершении
    const timer = setTimeout(() => {
      console.log("[CustomRoulette] Вращение завершено", {
        prizeIndex,
        finalPrize: prizes[prizeIndex],
      });
      setIsSpinning(false);
      onComplete?.();
    }, spinningTime * 1000);

    return () => clearTimeout(timer);
  }, [start, prizes, prizeIndex, isReversed, spinningTime, onComplete]);

  // Создаем повторяющийся массив призов
  const repeatedPrizes = Array(5).fill(prizes).flat();

  return (
    <div className={styles.roulette} ref={containerRef}>
      <div
        className={styles.track}
        style={{
          transform: `translateX(${translateX}px)`,
          transition: isSpinning
            ? `transform ${spinningTime}s cubic-bezier(0.17, 0.67, 0.12, 0.99)`
            : "none",
        }}
      >
        {repeatedPrizes.map((prize, index) => (
          <div
            key={`${prize.id}-${index}`}
            className={styles.prize}
            style={{
              width: `${PRIZE_WIDTH}px`,
              marginRight: `${PRIZE_GAP}px`,
            }}
          >
            {prize.image && (
              <img
                src={prize.image}
                alt={prize.text}
                className={styles.prizeImage}
              />
            )}
            <div className={styles.prizeText}>{prize.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
