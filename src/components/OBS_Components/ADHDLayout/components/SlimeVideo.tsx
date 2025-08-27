export function SlimeVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        objectFit: "cover",
        position: "absolute",
        top: "8vh",
        left: "0px",
        zIndex: 1000,
        transform: "scale(0.75)",
        transformOrigin: "left",
      }}
    >
      <source
        src="/src/components/OBS_Components/ADHDLayout/content/slime-small.webm"
        type="video/webm"
      />
      Ваш браузер не поддерживает видео.
    </video>
  );
}
