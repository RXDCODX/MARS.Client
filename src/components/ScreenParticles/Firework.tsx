import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

export default function Firework() {
  return (
    <Fireworks
      width="100%"
      height="100%"
      autorun={{ speed: 3, duration: 5000 }}
    />
  );
}
