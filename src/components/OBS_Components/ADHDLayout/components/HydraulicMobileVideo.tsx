import { useEffect, useRef } from "react";
import { getVideoPath } from "./imageAssets";

export function HydraulicMobileVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 2.5;
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      style={{
        objectFit: "fill",
        position: "absolute",
        bottom: "0px",
        left: "22vw",
        zIndex: 1000,
        width: "20vw",
        height: "19vh",
      }}
    >
      <source
        src={getVideoPath("hydraulic")}
        type="video/webm"
      />
      Ваш браузер не поддерживает видео.
    </video>
  );
}
