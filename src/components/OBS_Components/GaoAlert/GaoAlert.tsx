import { useEffect, useMemo, useRef, useState } from "react";

import type { GaoAlertDto } from "@/shared/api";

import styles from "./GaoAlert.module.scss";
import gaoImage from "./images/gao.png";
import notGaoImage from "./images/notgao.png";
import gaoVoice from "./voices/gao.ogg";
import neGaoVoice from "./voices/ne gao.ogg";

interface GaoAlertProps {
  dto: GaoAlertDto;
  onComplete: () => void;
}

export function GaoAlert({ dto, onComplete }: GaoAlertProps) {
  const [overlayVisible, setOverlayVisible] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isTextOnly = dto.isJustText;

  const variant = useMemo(() => (Math.random() < 0.5 ? "gao" : "notgao"), []);
  const overlayImage = variant === "gao" ? gaoImage : notGaoImage;
  const voiceSrc = variant === "gao" ? gaoVoice : neGaoVoice;

  const avatarUrl = dto.twitchUser?.profileImageUrl ?? "";

  useEffect(() => {
    const timer = setTimeout(() => setOverlayVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      try {
        // Autoplay; volume gentle
        audioRef.current.volume = 0.9;
        const playPromise = audioRef.current.play();
        if (playPromise && typeof playPromise.then === "function") {
          playPromise.catch(() => onComplete());
        }
      } catch {
        onComplete();
      }
    }
  }, [onComplete]);

  // Таймер на 5 секунд для автоматического скрытия
  useEffect(() => {
    const hideTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => clearTimeout(hideTimer);
  }, [onComplete]);

  return (
    <div className={styles.wrapper}>
      {!isTextOnly && avatarUrl && (
        <img
          className={`${styles.avatarBg} ${overlayVisible ? styles.avatarBg_visible : ""}`}
          src={avatarUrl}
          alt="avatar"
          draggable={false}
        />
      )}

      <div className={styles.textBlock}>
        <span>
          {isTextOnly
            ? (dto.justText ?? "")
            : (dto.twitchUser?.displayName ?? "")}
        </span>
      </div>

      <img
        className={`${styles.overlayImage} ${overlayVisible ? styles.overlayImage_visible : ""}`}
        src={overlayImage}
        alt={variant}
        draggable={false}
      />

      <audio ref={audioRef} src={voiceSrc} autoPlay onError={onComplete} />
    </div>
  );
}

export default GaoAlert;
