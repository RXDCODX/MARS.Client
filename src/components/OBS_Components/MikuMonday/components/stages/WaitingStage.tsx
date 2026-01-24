import { useEffect, useState } from "react";

import animate from "@/shared/styles/animate.module.scss";

import styles from "../../MikuMonday.module.scss";

interface WaitingStageProp {
  durationMs?: number;
  onComplete: () => void;
}

const DEFAULT_WAITING_DURATION = 3000;
const FADE_OUT_DURATION = 600;

export default function WaitingStage({
  durationMs = DEFAULT_WAITING_DURATION,
  onComplete,
}: WaitingStageProp) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const fadeOutTimerId = window.setTimeout(() => {
      setIsFadingOut(true);
    }, durationMs - FADE_OUT_DURATION);

    const completeTimerId = window.setTimeout(onComplete, durationMs);

    return () => {
      window.clearTimeout(fadeOutTimerId);
      window.clearTimeout(completeTimerId);
    };
  }, [durationMs, onComplete]);

  return (
    <div
      className={`${styles["waiting-stage"]} ${animate.animated} ${
        isFadingOut ? animate.fadeOut : animate.fadeIn
      }`}
    />
  );
}
