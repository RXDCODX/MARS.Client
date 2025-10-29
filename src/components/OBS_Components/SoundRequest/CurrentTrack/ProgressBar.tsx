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

    // Конвертируем внешний прогресс из секунд в проценты
    const externalProgressSeconds = track.progress || 0;
    const externalProgress =
      track.duration > 0 ? externalProgressSeconds / track.duration : 0;
    const lastProgress = lastExternalProgressRef.current;
    const progressDiff = externalProgress - lastProgress;

    // Проверяем значительные изменения вперед (перемотка вперед на 3+ секунд в процентах)
    const isSignificantForwardJump = progressDiff > 3 / track.duration;

    // Проверяем значительные изменения назад (перемотка назад на 3+ секунд в процентах)
    const isSignificantBackwardJump = progressDiff < -(3 / track.duration);

    // Проверяем резкие изменения в любом направлении (более 1 секунды в процентах)
    const isRapidChange = Math.abs(progressDiff) > 1 / track.duration;

    // Дополнительная проверка для отмотки назад - если прогресс резко уменьшился
    const isRewindBack =
      progressDiff < -(0.5 / track.duration) && externalProgress < lastProgress;

    // Проверяем, что изменение не слишком большое (не больше половины трека)
    const isReasonableChange = Math.abs(progressDiff) < 0.5;

    // Логируем все изменения прогресса для отладки
    if (Math.abs(progressDiff) > 0.01) {
      console.log("🟡 PROGRESS CHANGE:", {
        externalProgressSeconds,
        externalProgress,
        lastProgress,
        progressDiff,
        isSignificantForwardJump,
        isSignificantBackwardJump,
        isRapidChange,
        isRewindBack,
        isReasonableChange,
        willSync:
          (isSignificantForwardJump ||
            isSignificantBackwardJump ||
            isRapidChange ||
            isRewindBack) &&
          isReasonableChange,
        trackStatus: track.status,
        currentInternalProgress: progress,
        trackDuration: track.duration,
      });
    }

    // Синхронизируемся при значительных перемотках, резких изменениях или отмотке назад
    if (
      (isSignificantForwardJump ||
        isSignificantBackwardJump ||
        isRapidChange ||
        isRewindBack) &&
      isReasonableChange
    ) {
      console.log("🟢 SYNCING PROGRESS:", {
        from: progress,
        to: externalProgress,
        fromSeconds: progress * track.duration,
        toSeconds: externalProgressSeconds,
      });
      lastExternalProgressRef.current = externalProgress;
      setProgress(externalProgress);

      // Пересчитываем время начала для корректного продолжения анимации
      if (track.status === "playing") {
        startTimeRef.current = Date.now() - externalProgressSeconds * 1000;
      }
    } else {
      // Если изменение незначительное, просто обновляем отслеживаемое значение
      // но не синхронизируемся, чтобы избежать бликов
      lastExternalProgressRef.current = externalProgress;
    }
  }, [track.progress, track.duration, track.status, progress]);

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
      console.log("🟠 NEW TRACK DETECTED:", {
        oldTrackKey: lastTrackKeyRef.current,
        newTrackKey: trackKey,
        initialProgress: track.progress || 0,
        trackStatus: track.status,
        trackDuration: track.duration,
      });

      lastTrackKeyRef.current = trackKey;
      const initialProgressSeconds = track.progress || 0;
      const initialProgress =
        track.duration > 0 ? initialProgressSeconds / track.duration : 0;
      setProgress(initialProgress);
      lastExternalProgressRef.current = initialProgress;
      isPausedRef.current = false;
      pausedTimeRef.current = 0;
      startTimeRef.current = Date.now() - initialProgressSeconds * 1000;
    }

    // Если трек остановлен, сбрасываем прогресс
    if (track.status === "stopped") {
      console.log("🔴 TRACK STOPPED - resetting progress");
      setProgress(0);
      lastExternalProgressRef.current = 0;
      isPausedRef.current = false;
      pausedTimeRef.current = 0;
      return;
    }

    // Если трек на паузе
    if (track.status === "paused") {
      if (!isPausedRef.current) {
        console.log("⏸️ TRACK PAUSED");
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
        console.log("▶️ TRACK RESUMED after pause:", { pauseDuration });
        startTimeRef.current += pauseDuration;
        isPausedRef.current = false;
      }

      const animate = () => {
        const currentTime = Date.now();
        const elapsed = (currentTime - startTimeRef.current) / 1000;
        const newProgress = Math.min(elapsed / track.duration, 1);

        // Логируем изменения прогресса в анимации
        if (Math.abs(newProgress - progress) > 0.01) {
          console.log("🔵 ANIMATION PROGRESS:", {
            newProgress,
            newProgressSeconds: newProgress * track.duration,
            currentProgress: progress,
            currentProgressSeconds: progress * track.duration,
            elapsed,
            trackDuration: track.duration,
            trackStatus: track.status,
            startTime: startTimeRef.current,
            currentTime,
          });
        }

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

  useEffect(() => {
    if (progressPercentage >= 99) {
      console.log("🔴 PROGRESS BAR DEBUG - 99%+ reached:", {
        progressPercentage,
        progress,
        trackStatus: track.status,
        trackDuration: track.duration,
        externalProgressSeconds: track.progress,
        externalProgressPercent:
          track.duration > 0 ? (track.progress || 0) / track.duration : 0,
        lastExternalProgress: lastExternalProgressRef.current,
        isPaused: isPausedRef.current,
        startTime: startTimeRef.current,
        currentTime: Date.now(),
        elapsed: (Date.now() - startTimeRef.current) / 1000,
        trackKey,
        lastTrackKey: lastTrackKeyRef.current,
      });
    }
  }, [
    progressPercentage,
    progress,
    track.status,
    track.duration,
    track.progress,
    trackKey,
  ]);

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
