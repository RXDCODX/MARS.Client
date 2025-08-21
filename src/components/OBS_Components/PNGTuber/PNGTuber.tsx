import { type CSSProperties, type FC, useEffect, useMemo, useRef } from "react";

import { FireOutlineCanvas } from "./FireShader";
import mouth0Url from "./png/ebalo0.png";
import mouth1Url from "./png/EBALO1.png";
import mouth2Url from "./png/EBALO2.png";
import mouth3Url from "./png/EBALO3.png";
import mouth4Url from "./png/EBALO4.png";
import mouth5Url from "./png/EBALO5.png";

export type PNGTuberProps = {
  // Size of the avatar container in pixels
  size?: number;
  // Provide external MediaStream if you already have one; if omitted, mic will be requested
  mediaStream?: MediaStream | null;
  // Overall sensitivity to input volume (higher → more mouth opening)
  sensitivity?: number; // default 1.0
  // Minimum volume required to start opening the mouth (0..1)
  voiceThreshold?: number; // default 0.02
  // Smoothing factor for amplitude envelope (0..1). Higher = smoother, slower response
  attackSmoothing?: number; // default 0.5
  releaseSmoothing?: number; // default 0.6
  // Max mouth frame index (inclusive). We have 0..5 available by default
  maxMouthIndex?: number; // default 5
  // Target frames per second for visual updates
  fps?: number; // default 30
  // Enable gentle floating motion of the avatar
  enableFloating?: boolean; // default true
  // Radius (px) of the floating motion bounds
  floatingRadiusPx?: number; // default 8
  className?: string;
  style?: CSSProperties;
};

type CleanupHandles = {
  audioContext?: AudioContext | null;
  mediaStream?: MediaStream | null;
  mediaStreamOwnedByComponent: boolean;
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const PNGTuber: FC<PNGTuberProps> = ({
  size = 256,
  mediaStream = null,
  sensitivity = 20,
  voiceThreshold = 0.02,
  attackSmoothing = 0.5,
  releaseSmoothing = 0.6,
  maxMouthIndex = 5,
  fps = 60,
  enableFloating = true,
  floatingRadiusPx = 10,
  className,
  style,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const cleanupRef = useRef<CleanupHandles>({
    audioContext: null,
    mediaStream: null,
    mediaStreamOwnedByComponent: false,
  });

  // Preload images once
  const mouthFrames = useMemo(() => {
    const urls = [
      mouth0Url,
      mouth1Url,
      mouth2Url,
      mouth3Url,
      mouth4Url,
      mouth5Url,
    ];
    const imgs = urls.map(url => {
      const img = new Image();
      img.src = url as unknown as string;
      return img;
    });
    return imgs;
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const start = async () => {
      try {
        // Use provided stream or request mic access
        let stream = mediaStream;
        const ownedByComponent = !stream;
        if (!stream) {
          stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false,
          });
        }

        if (isCancelled || !stream) return;

        const AudioContextCtor: typeof AudioContext =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext?: typeof AudioContext })
            .webkitAudioContext!;
        const audioContext = new AudioContextCtor();
        const source = audioContext.createMediaStreamSource(stream);
        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 1024; // Small for low latency amplitude tracking
        analyser.smoothingTimeConstant = 0.2;
        source.connect(analyser);

        const timeData = new Float32Array(analyser.fftSize);
        let envelope = 0;
        let lastFrameTime = 0;
        const minFrameInterval = 1000 / fps;

        // Consonant closure scheduling
        let nextClosureAt = performance.now() + 150 + Math.random() * 200;
        let closureUntil = 0;

        // Gentle floating using a combination of sine waves
        const basePhaseX = Math.random() * Math.PI * 2;
        const basePhaseY = Math.random() * Math.PI * 2;
        const freqX = 0.3 + Math.random() * 0.2; // Hz
        const freqY = 0.25 + Math.random() * 0.25; // Hz

        const update = (now: number) => {
          if (isCancelled) return;
          rafRef.current = requestAnimationFrame(update);

          if (now - lastFrameTime < minFrameInterval) {
            return;
          }
          lastFrameTime = now;

          analyser.getFloatTimeDomainData(timeData);
          // Compute RMS as amplitude proxy
          let sumSquares = 0;
          for (let i = 0; i < timeData.length; i++) {
            const v = timeData[i];
            sumSquares += v * v;
          }
          const rms = Math.sqrt(sumSquares / timeData.length);

          // Envelope follower with attack/release
          const target = rms;
          const isIncreasing = target > envelope;
          envelope = isIncreasing
            ? envelope + (target - envelope) * clamp(attackSmoothing, 0, 0.95)
            : envelope + (target - envelope) * clamp(releaseSmoothing, 0, 0.95);

          // Normalize and apply sensitivity
          const level = clamp(
            (envelope - voiceThreshold) * (2.5 * sensitivity),
            0,
            1
          );

          // Determine if speaking
          const speaking = level > 0.01;

          // Schedule random brief closures to mimic consonants while speaking
          if (speaking && now >= nextClosureAt) {
            closureUntil = now + (40 + Math.random() * 60);
            nextClosureAt = now + (120 + Math.random() * 260);
          }

          let frameIndex: number;
          if (now < closureUntil) {
            frameIndex = 0; // forced closure during consonant
          } else {
            frameIndex = Math.round(level * maxMouthIndex);
          }

          frameIndex = clamp(
            frameIndex,
            0,
            Math.min(maxMouthIndex, mouthFrames.length - 1)
          );

          const imgEl = imageRef.current;
          if (imgEl) {
            const currentSrc = imgEl.getAttribute("data-src") || "";
            const nextSrc = mouthFrames[frameIndex].src;
            if (currentSrc !== nextSrc) {
              imgEl.src = nextSrc;
              imgEl.setAttribute("data-src", nextSrc);
            }
          }

          // Apply gentle floating transform
          if (enableFloating && containerRef.current) {
            const t = now / 1000;
            const dx =
              Math.sin(basePhaseX + t * 2 * Math.PI * freqX) * floatingRadiusPx;
            const dy =
              Math.sin(basePhaseY + t * 2 * Math.PI * freqY) * floatingRadiusPx;
            const transformValue = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
            containerRef.current.style.transform = transformValue;
          }
        };

        rafRef.current = requestAnimationFrame(update);

        cleanupRef.current.audioContext = audioContext;
        cleanupRef.current.mediaStream = stream;
        cleanupRef.current.mediaStreamOwnedByComponent = ownedByComponent;
      } catch (err) {
        // Fail gracefully to avoid crashing the UI; consider surfacing a toast elsewhere
        console.error("[PNGTuber] Failed to initialize audio:", err);
      }
    };

    start();

    // Capture a stable reference to the cleanup object
    const cleanup = cleanupRef.current;
    return () => {
      isCancelled = true;
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      const audioContextLocal = cleanup.audioContext;
      const mediaStreamLocal = cleanup.mediaStream;
      const mediaStreamOwnedByComponentLocal =
        cleanup.mediaStreamOwnedByComponent;
      if (audioContextLocal) {
        try {
          audioContextLocal.close();
        } catch (e) {
          console.warn("[PNGTuber] AudioContext close failed:", e);
        }
        cleanup.audioContext = null;
      }
      if (mediaStreamLocal && mediaStreamOwnedByComponentLocal) {
        for (const track of mediaStreamLocal.getTracks()) {
          try {
            track.stop();
          } catch (e) {
            console.warn("[PNGTuber] Stopping MediaStreamTrack failed:", e);
          }
        }
        cleanup.mediaStream = null;
      }
    };
    // We intentionally do not include many dependencies to avoid restarting the audio graph unnecessarily
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    mediaStream,
    fps,
    sensitivity,
    voiceThreshold,
    attackSmoothing,
    releaseSmoothing,
    enableFloating,
    floatingRadiusPx,
    maxMouthIndex,
  ]);

  const containerStyle: CSSProperties = useMemo(
    () => ({
      width: size,
      height: size,
      willChange: "transform",
      contain: "layout paint size style",
      transform: "translate(0, 0)",
      overflow: "hidden",
      imageRendering: "pixelated",
      ...style,
    }),
    [size, style]
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ ...containerStyle, position: "relative" }}
    >
      <img
        ref={imageRef}
        alt="PNGTuber"
        src={mouthFrames[0]?.src}
        data-src={mouthFrames[0]?.src}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          display: "block",
          userSelect: "none",
          pointerEvents: "none",
        }}
      />
      {mouthFrames[0]?.src && (
        <div style={{ position: "absolute", inset: 0 }}>
          <FireOutlineCanvas
            width={size}
            height={size}
            maskUrl={mouthFrames[0].src}
            radiusPx={Math.max(6, Math.floor(size * 0.04))}
            intensity={1}
            speed={1}
          />
        </div>
      )}
    </div>
  );
};

export default PNGTuber;
