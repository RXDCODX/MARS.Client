export function MukbangVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      style={{
        objectFit: "cover",
        position: "absolute",
        top: "38vh",
        left: "0",
        zIndex: 1000,
        transform: "scale(0.75)",
        transformOrigin: "left",
      }}
    >
      <source
        src="/src/components/OBS_Components/ADHDLayout/content/mukbang-small.webm"
        type="video/webm"
      />
      Ваш браузер не поддерживает видео.
    </video>
  );
}
