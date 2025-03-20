import { useEffect } from "react";
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

interface Props {
  callback: () => void;
}

export default function Firework({ callback }: Props) {
  const duration = 10000;

  useEffect(() => {
    setTimeout(() => callback(), duration);
  }, [callback]);

  return (
    <Fireworks width="100%" height="100%" autorun={{ speed: 3, duration }} />
  );
}
