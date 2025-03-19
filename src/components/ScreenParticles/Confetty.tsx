import Fireworks from "react-canvas-confetti/dist/presets/fireworks";
import { randomInRange } from ".";
const defaultOptions: confetti.Options = {
  spread: randomInRange(50, 70),
  particleCount: randomInRange(50, 100),
};

const variants: confetti.Options[] = [
  // Top
  {
    ...defaultOptions,
    angle: 315,
    origin: { y: 0, x: 0 },
  },
  {
    ...defaultOptions,
    angle: 270,
    origin: { y: 0, x: 0.5 },
  },
  {
    ...defaultOptions,
    angle: 235,
    origin: { y: 0, x: 0.5 },
  },
  // Middle
  {
    ...defaultOptions,
    angle: 0,
    origin: { y: 0.5, x: 0 },
  },
  {
    ...defaultOptions,
    startVelocity: 30,
    spread: 360,
    zIndex: 0,
    origin: { y: 0.5, x: 0.5 },
  },
  {
    ...defaultOptions,
    angle: 180,
    origin: { y: 0.5, x: 1 },
  },
  // Bottom
  {
    ...defaultOptions,
    angle: 45,
    origin: { y: 1, x: 0 },
  },
  {
    ...defaultOptions,
    angle: 90,
    origin: { y: 1, x: 0.5 },
  },
  {
    ...defaultOptions,
    angle: 135,
    origin: { y: 1, x: 1 },
  },
];

export default function Confetty() {
  const randomVariant = variants[Math.floor(Math.random() * variants.length)];

  return (
    <Fireworks
      width="100%"
      height="100%"
      autorun={{ speed: 3, duration: 5000 }}
      decorateOptions={() => randomVariant}
    ></Fireworks>
  );
}
