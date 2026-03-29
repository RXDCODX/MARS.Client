import { CSSProperties, useMemo } from "react";

import styles from "./ReactBitsBackgroundLegacy.module.scss";

type ReactBitsBackgroundLegacyProps = {
  name: string;
};

type Preset = {
  c1: string;
  c2: string;
  c3: string;
  bg: string;
  line: string;
  scan: string;
  blur: string;
  speed: string;
  spin: string;
  gridSize: string;
  rot: string;
  gridOpacity: string;
  raysOpacity: string;
  veilOpacity: string;
  noiseOpacity: string;
  scanSpeed: string;
};

const defaultPreset: Preset = {
  c1: "#5227ff44",
  c2: "#ff9ffc44",
  c3: "#7cff6740",
  bg: "#03030a",
  line: "#ffffff22",
  scan: "#ff9ffc66",
  blur: "34px",
  speed: "18s",
  spin: "24s",
  gridSize: "38px",
  rot: "0deg",
  gridOpacity: "0.3",
  raysOpacity: "0.45",
  veilOpacity: "0.85",
  noiseOpacity: "0.25",
  scanSpeed: "4.2s",
};

const presetByName: Record<string, Partial<Preset>> = {
  Aurora: {
    c1: "#5227ff55",
    c2: "#7cff6755",
    c3: "#ff9ffc44",
    speed: "20s",
    blur: "42px",
  },
  Balatro: {
    c1: "#de443b55",
    c2: "#006bb455",
    c3: "#16232566",
    bg: "#05070a",
    spin: "33s",
  },
  Ballpit: {
    c1: "#ff7b4a44",
    c2: "#52b3ff44",
    c3: "#ffe56a33",
    noiseOpacity: "0.4",
  },
  Beams: {
    c1: "#ff9ffc4d",
    c2: "#ffffff66",
    c3: "#5227ff4d",
    raysOpacity: "0.62",
    speed: "14s",
  },
  ColorBends: {
    c1: "#5227ff55",
    c2: "#ff9ffc55",
    c3: "#7cff6755",
    rot: "35deg",
    spin: "20s",
  },
  DarkVeil: {
    bg: "#020204",
    c1: "#9d7cff2f",
    c2: "#7298ff2a",
    c3: "#ffffff14",
    veilOpacity: "0.6",
  },
  Dither: {
    line: "#ffffff15",
    gridSize: "22px",
    noiseOpacity: "0.48",
    scan: "#ffffff22",
  },
  DotGrid: { gridSize: "26px", line: "#ffffff20", gridOpacity: "0.45" },
  EvilEye: { c1: "#6f7bff55", c2: "#9a2f4755", c3: "#ffe07233", spin: "14s" },
  FaultyTerminal: {
    c1: "#6dff9250",
    c2: "#8cff6a44",
    c3: "#7ad6ff22",
    bg: "#02120a",
    noiseOpacity: "0.5",
  },
  FloatingLines: {
    line: "#ff9ffc3d",
    gridOpacity: "0.2",
    raysOpacity: "0.25",
    speed: "22s",
  },
  Galaxy: {
    c1: "#597bff4c",
    c2: "#ad79ff47",
    c3: "#ffffff21",
    bg: "#01020a",
    blur: "48px",
  },
  GradientBlinds: {
    c1: "#ff9ffc4f",
    c2: "#5227ff59",
    c3: "#7cff6730",
    line: "#ffffff13",
  },
  Grainient: {
    c1: "#ff6f5e4f",
    c2: "#6e6aff4f",
    c3: "#ffd56f2b",
    noiseOpacity: "0.45",
  },
  GridDistortion: { gridSize: "30px", gridOpacity: "0.5", line: "#7fa8ff42" },
  GridMotion: { gridSize: "42px", gridOpacity: "0.4", speed: "10s" },
  GridScan: {
    line: "#af8cff40",
    scan: "#ff9ffc88",
    gridOpacity: "0.55",
    scanSpeed: "3.5s",
  },
  Hyperspeed: {
    c1: "#5b8dff55",
    c2: "#67ffe055",
    c3: "#ffffff25",
    spin: "9s",
    raysOpacity: "0.72",
  },
  Iridescence: {
    c1: "#f7d0ff52",
    c2: "#c0dbff52",
    c3: "#ffffff2f",
    blur: "46px",
  },
  LetterGlitch: { line: "#6b8f7f2f", noiseOpacity: "0.55", bg: "#0a0b0d" },
  LightPillar: {
    c1: "#7cff6757",
    c2: "#5227ff57",
    c3: "#ff9ffc42",
    raysOpacity: "0.68",
  },
  LightRays: {
    c1: "#d4d7ff5f",
    c2: "#ff9ffc58",
    c3: "#7cff6750",
    raysOpacity: "0.78",
    spin: "16s",
  },
  Lightning: { c1: "#d3c3ff66", c2: "#8a63ff66", c3: "#ffffff50", speed: "8s" },
  LineWaves: { line: "#7ea6e055", gridOpacity: "0.24", speed: "11s" },
  LiquidChrome: {
    c1: "#d8d8f250",
    c2: "#8b8fbf4a",
    c3: "#ffffff2f",
    bg: "#04050a",
  },
  LiquidEther: {
    c1: "#5affd54d",
    c2: "#7f75ff50",
    c3: "#ff9ffc40",
    blur: "52px",
  },
  Orb: { c1: "#94a8ff4a", c2: "#ff9ffc4d", c3: "#ffffff3d", spin: "28s" },
  Particles: {
    noiseOpacity: "0.5",
    gridOpacity: "0.12",
    c1: "#5227ff44",
    c2: "#ff9ffc42",
    c3: "#7cff6738",
  },
  PixelBlast: { line: "#ffffff17", noiseOpacity: "0.6", gridSize: "16px" },
  PixelSnow: {
    c1: "#d8efff3d",
    c2: "#ffffff55",
    c3: "#b9d6ff3f",
    bg: "#05070e",
  },
  Plasma: { c1: "#ff7af64e", c2: "#5b7dff4e", c3: "#fff58a3a", speed: "9s" },
  Prism: { c1: "#ff9ffc53", c2: "#7ec1ff4b", c3: "#7cff6742", spin: "18s" },
  PrismaticBurst: {
    c1: "#5227ff66",
    c2: "#ff9ffc66",
    c3: "#7cff6755",
    raysOpacity: "0.82",
  },
  Radar: {
    line: "#78ffb744",
    scan: "#78ffb799",
    gridSize: "34px",
    bg: "#02140d",
  },
  RippleGrid: { gridSize: "28px", line: "#b6c6ff38", speed: "12s" },
  ShapeGrid: { gridSize: "40px", line: "#ffffff24", gridOpacity: "0.36" },
  Silk: { c1: "#7b74814d", c2: "#a698bd4a", c3: "#ffffff22", speed: "16s" },
  SoftAurora: {
    c1: "#87a1ff3f",
    c2: "#ffc6e43f",
    c3: "#d8ffd63f",
    blur: "56px",
    veilOpacity: "0.72",
  },
  Threads: {
    line: "#ffffff20",
    gridOpacity: "0.22",
    c1: "#9f9fff42",
    c2: "#c6a0ff3f",
    c3: "#ffffff20",
  },
  Waves: { c1: "#8db5ff45", c2: "#8effde3f", c3: "#ffffff2a", speed: "15s" },
};

const ReactBitsBackgroundLegacy: React.FC<ReactBitsBackgroundLegacyProps> = ({
  name,
}) => {
  const cssVars = useMemo(() => {
    const preset = {
      ...defaultPreset,
      ...(presetByName[name] ?? {}),
    };

    return {
      "--c1": preset.c1,
      "--c2": preset.c2,
      "--c3": preset.c3,
      "--bg": preset.bg,
      "--line": preset.line,
      "--scan": preset.scan,
      "--blur": preset.blur,
      "--speed": preset.speed,
      "--spin": preset.spin,
      "--grid-size": preset.gridSize,
      "--rot": preset.rot,
      "--grid-opacity": preset.gridOpacity,
      "--rays-opacity": preset.raysOpacity,
      "--veil-opacity": preset.veilOpacity,
      "--noise-opacity": preset.noiseOpacity,
      "--scan-speed": preset.scanSpeed,
    } as CSSProperties;
  }, [name]);

  return (
    <div className={styles.root} style={cssVars} data-legacy-background={name}>
      <div className={styles.veil} />
      <div className={styles.rays} />
      <div className={styles.grid} />
      <div className={styles.scan} />
      <div className={styles.noise} />
    </div>
  );
};

export default ReactBitsBackgroundLegacy;
