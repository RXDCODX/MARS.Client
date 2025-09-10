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

  // Создаем уникальный ключ для трека
  const trackKey = `${track.artists.join(",")}-${track.title}-${track.duration}`;

  useEffect(() => {
    if (!track.duration || track.duration === 0) {
      setProgress(0);
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
      isPausedRef.current = false;
      pausedTimeRef.current = 0;
      startTimeRef.current = Date.now() - initialProgress * 1000;
    }

    // Если трек остановлен, сбрасываем прогресс
    if (track.status === "stopped") {
      setProgress(0);
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
  }, [track.status, track.duration, track.progress, trackKey]);

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
      style={{
        "--track-progress": `${progressPercentage}%`,
      } as React.CSSProperties}
    />
  );
};
