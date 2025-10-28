import { useEffect, useRef, useState } from "react";

interface UseTrackProgressProps {
  durationSec: number;
  isPlaying: boolean;
  trackId?: string;
  initialProgress?: string; // ISO 8601 duration строка (например, PT30S)
}

/**
 * Парсит ISO 8601 duration строку (PT30S) в секунды
 */
function parseDurationToSeconds(duration?: string): number {
  if (!duration) return 0;
  try {
    // Парсим ISO 8601 duration формат: PT1H2M3S
    const match = duration.match(
      /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?/
    );
    if (!match) return 0;

    const hours = parseFloat(match[1] || "0");
    const minutes = parseFloat(match[2] || "0");
    const seconds = parseFloat(match[3] || "0");

    return hours * 3600 + minutes * 60 + seconds;
  } catch {
    return 0;
  }
}

export function useTrackProgress({
  durationSec,
  isPlaying,
  trackId,
  initialProgress,
}: UseTrackProgressProps) {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef<number>(0);
  const pausedAtRef = useRef<number>(0);
  const wasPausedRef = useRef<boolean>(false);
  const rafRef = useRef<number | null>(null);

  // Reset/start progress when track changes
  useEffect(() => {
    if (!trackId || !durationSec) {
      setProgress(0);
      return;
    }

    // Парсим начальный прогресс (если есть)
    const initialProgressSec = parseDurationToSeconds(initialProgress);

    if (initialProgressSec > 0) {
      // Устанавливаем начальный прогресс
      const initialProgressRatio = initialProgressSec / durationSec;
      setProgress(Math.min(initialProgressRatio, 1));

      // Устанавливаем startTime с учетом начального прогресса
      startTimeRef.current = Date.now() - initialProgressSec * 1000;

      console.log(
        `[useTrackProgress] Восстановлен прогресс: ${initialProgressSec}s (${(initialProgressRatio * 100).toFixed(1)}%)`
      );
    } else {
      // Начинаем с нуля
      setProgress(0);
      startTimeRef.current = Date.now();
    }

    wasPausedRef.current = false;
    pausedAtRef.current = 0;
  }, [trackId, durationSec, initialProgress]);

  // Drive progress animation
  useEffect(() => {
    if (!trackId || !durationSec) return;

    const loop = () => {
      const elapsedSec = (Date.now() - startTimeRef.current) / 1000;
      const pr = Math.min(elapsedSec / durationSec, 1);
      setProgress(pr);
      if (pr < 1 && isPlaying) {
        rafRef.current = requestAnimationFrame(loop);
      }
    };

    if (isPlaying) {
      if (wasPausedRef.current) {
        const pauseDelta = Date.now() - pausedAtRef.current;
        startTimeRef.current += pauseDelta;
        wasPausedRef.current = false;
      }
      rafRef.current = requestAnimationFrame(loop);
    } else {
      if (!wasPausedRef.current) {
        wasPausedRef.current = true;
        pausedAtRef.current = Date.now();
      }
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isPlaying, trackId, durationSec]);

  return progress;
}
