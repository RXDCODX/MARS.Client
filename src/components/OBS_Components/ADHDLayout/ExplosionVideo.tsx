import { useEffect, useRef, useState } from "react";

import { TelegramusHubSignalRContext as SignalRContext } from "@/shared/api/signalr-clients/TelegramusHub/SignalRHubWrapper";
import Announce from "@/shared/Utils/Announce/Announce";

import styles from "./ADHDLayout.module.scss";
import { videoAssets } from "./components/imageAssets";

export function ExplosionVideo() {
  const [announced, setAnnounced] = useState<boolean>(false);
  const [isExploding, setIsExploding] = useState(false);
  const explosionRef = useRef<HTMLVideoElement | null>(null);

  // Подписка на SignalR событие "explosion"
  SignalRContext.useSignalREffect(
    "explosion",
    () => {
      setIsExploding(true);
    },
    []
  );

  useEffect(() => {
    if (isExploding && explosionRef.current) {
      const videoElement = explosionRef.current;
      videoElement.play();

      // Сброс состояния после окончания видео
      const handleVideoEnd = () => {
        setIsExploding(false);
        videoElement.pause();
        videoElement.currentTime = 0;
      };

      videoElement.addEventListener("ended", handleVideoEnd);

      return () => {
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, [isExploding]);

  return (
    <>
      {!announced && (
        <Announce title="Explosion" callback={() => setAnnounced(true)} />
      )}
      {isExploding && (
        <video
          ref={explosionRef}
          className={styles.explosionVideo}
          src={videoAssets.explosion}
          muted
          autoPlay
        />
      )}
    </>
  );
}
