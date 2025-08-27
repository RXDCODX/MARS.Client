export const Surfer = () => (
  <video
    autoPlay
    loop
    muted
    playsInline
    style={{
      objectFit: "cover",
      position: "absolute",
      top: "10vh",
      right: "0",
      zIndex: 1000,
      transform: "scale(0.65)",
      transformOrigin: "right bottom",
    }}
  >
    <source
      src="/src/components/OBS_Components/ADHDLayout/content/surfer.mp4"
      type="video/mp4"
    />
    Ваш браузер не поддерживает видео.
  </video>
);
