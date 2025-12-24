import { useRef, useState } from "react";

import { useInjectStyles } from "@/shared/hooks";

import { getRandomAudio, getRandomImage } from "./mediaAssets";
import styles from "./PhonkShitAlerts.module.scss";

export default function PhonkShitAlerts({
  callback,
}: {
  callback: () => void;
}) {
  const [imageSrc] = useState<string>(getRandomImage());
  const [audioSrc] = useState<string>(getRandomAudio());
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useInjectStyles(`
    body {
      background-color: #00000052 !important;
    }
    
    `);

  return (
    <div className={styles.container}>
      {/* Left black bar */}
      <div className={`${styles.sideBar} ${styles.leftBar}`} />

      {/* Right black bar */}
      <div className={`${styles.sideBar} ${styles.rightBar}`} />

      {/* Невидимый audio элемент в дереве для управления через реф */}
      <audio
        ref={audioRef}
        autoPlay
        onPlay={event => {
          event.currentTarget.volume = 0.22;
        }}
        onEnded={callback}
        style={{ display: "none" }}
        src={audioSrc}
      />

      {/* Random image positioned 22% from bottom, centered horizontally */}
      {imageSrc && <img src={imageSrc} alt="" className={styles.image} />}
    </div>
  );
}
