import { useEffect, useRef, useState } from "react";

import { TunaMusicData } from "@/shared/api";

import styles from "./CurrentTrack.module.scss";

interface Props {
  track: TunaMusicData;
}

export const ProgressBar = ({ track }: Props) => {
  const [progress, setProgress] = useState(0);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const pausedTimeRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const lastTrackKeyRef = useRef<string>("");
  const lastExternalProgressRef = useRef<number>(0);

  // Создаем уникальный ключ для трека
  const trackKey = `${track.artists.join(",")}-${track.title}-${track.duration}`;

  // Отдельный эффект для синхронизации с внешними изменениями прогресса
  useEffect(() => {
    if (!track.duration || track.duration === 0) return;

    const externalProgress = track.progress || 0;
    const lastProgress = lastExternalProgressRef.current;
    const progressDiff = externalProgress - lastProgress;

    // Проверяем значительные изменения вперед (перемотка вперед на 3+ секунд)
    const isSignificantForwardJump = progressDiff > 3;

    // Проверяем значительные изменения назад (перемотка назад на 3+ секунд)
    const isSignificantBackwardJump = progressDiff < -3;

    // Проверяем резкие изменения в любом направлении (более 1 секунды)
    const isRapidChange = Math.abs(progressDiff) > 1;

    // Дополнительная проверка для отмотки назад - если прогресс резко уменьшился
    const isRewindBack = progressDiff < -0.5 && externalProgress < lastProgress;

    // Проверяем, что изменение не слишком большое (не больше половины трека)
    const isReasonableChange = Math.abs(progressDiff) < track.duration / 2;

    // Синхронизируемся при значительных перемотках, резких изменениях или отмотке назад
    if (
      (isSignificantForwardJump ||
        isSignificantBackwardJump ||
        isRapidChange ||
        isRewindBack) &&
      isReasonableChange
    ) {
      lastExternalProgressRef.current = externalProgress;
      setProgress(externalProgress);

      // Пересчитываем время начала для корректного продолжения анимации
      if (track.status === "playing") {
        startTimeRef.current = Date.now() - externalProgress * 1000;
      }
    } else {
      // Если изменение незначительное, просто обновляем отслеживаемое значение
      // но не синхронизируемся, чтобы избежать бликов
      lastExternalProgressRef.current = externalProgress;
    }
  }, [track.progress, track.duration, track.status]);

  useEffect(() => {
    if (!track.duration || track.duration === 0) {
      setProgress(0);
      lastExternalProgressRef.current = 0;
      return;
    }

    // Очищаем предыдущую анимацию
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    // Если это новый трек, сбрасываем все состояния
    if (lastTrackKeyRef.current !== trackKey) {
      lastTrackKeyRef.current = trackKey;
      const initialProgress = track.progress || 0;
      setProgress(initialProgress);
      lastExternalProgressRef.current = initialProgress;
      isPausedRef.current = false;
      pausedTimeRef.current = 0;
      startTimeRef.current = Date.now() - initialProgress * 1000;
    }

    // Если трек остановлен, сбрасываем прогресс
    if (track.status === "stopped") {
      setProgress(0);
      lastExternalProgressRef.current = 0;
      isPausedRef.current = false;
      pausedTimeRef.current = 0;
      return;
    }

    // Если трек на паузе
    if (track.status === "paused") {
      if (!isPausedRef.current) {
        isPausedRef.current = true;
        pausedTimeRef.current = Date.now();
      }
      return;
    }

    // Если трек играет
    if (track.status === "playing") {
      // Если был на паузе, корректируем время начала
      if (isPausedRef.current) {
        const pauseDuration = Date.now() - pausedTimeRef.current;
        startTimeRef.current += pauseDuration;
        isPausedRef.current = false;
      }

      const animate = () => {
        const currentTime = Date.now();
        const elapsed = (currentTime - startTimeRef.current) / 1000;
        const newProgress = Math.min(elapsed / track.duration, 1);

        setProgress(newProgress);

        if (newProgress < 1 && track.status === "playing") {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [track.status, track.duration, trackKey, track.progress, progress]);

  // Очищаем анимацию при размонтировании
  useEffect(
    () => () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    },
    []
  );

  const progressPercentage = Math.min(progress * 100, 100);

  return (
    <div
      className={styles.progressBarContainer}
      style={
        {
          "--track-progress": `${progressPercentage}%`,
        } as React.CSSProperties
      }
    />
  );
};
