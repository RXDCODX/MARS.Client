export function HydraulicMobileVideo() {
  return (
    <video
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
        src="/src/components/OBS_Components/ADHDLayout/content/hydraulic-mobile.webm"
        type="video/webm"
      />
      Ваш браузер не поддерживает видео.
    </video>
  );
}
