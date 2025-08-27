export const LOFIGirl = () => (
  <picture
    style={{
      objectFit: "cover",
      position: "absolute",
      right: "30vh",
      bottom: "0",
      zIndex: 1000,
      transform: "scale(0.55)",
      transformOrigin: "bottom",
    }}
  >
    <source src="/src/components/OBS_Components/ADHDLayout/content/lofi-girl-small.gif" />
    <img
      src="/src/components/OBS_Components/ADHDLayout/content/lofi-girl-small.gif"
      alt="LOFI Girl"
    />
  </picture>
);
