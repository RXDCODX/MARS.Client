import { useEffect, useRef, useState } from "react";

interface UseTrackProgressProps {
  durationSec: number;
  isPlaying: boolean;
  trackId?: string;
}

export function useTrackProgress({
  durationSec,
  isPlaying,
  trackId,
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
    startTimeRef.current = Date.now();
    wasPausedRef.current = false;
    pausedAtRef.current = 0;
    setProgress(0);
  }, [trackId, durationSec]);

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
