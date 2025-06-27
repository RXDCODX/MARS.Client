import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence, Variant } from "framer-motion";
import styles from "../CurrentTrack.module.scss";

interface Props {
  children: React.ReactNode;
  AnimationStart: boolean;
}

type AnimationStage =
  | "idle"
  | "slidesCover"
  | "slidesReveal"
  | "nowPlaying"
  | "slidesCoverFinal"
  | "slidesRevealFinal"
  | "showChildren";

export default function AnimationControl({ children, AnimationStart }: Props) {
  const [animationStage, setAnimationStage] = useState<AnimationStage>("idle");
  const [nowPlayingCount, setNowPlayingCount] = useState(0);

  const startAnimation = useCallback(() => {
    if (!AnimationStart || animationStage !== "idle") return;

    setAnimationStage("slidesCover");
    setNowPlayingCount(0);
  }, [AnimationStart, animationStage]);

  useEffect(() => {
    if (AnimationStart) {
      startAnimation();
    }
  }, [AnimationStart, startAnimation]);

  const handleAnimationComplete = (stage: AnimationStage) => {
    switch (stage) {
      case "slidesCover":
        setTimeout(() => setAnimationStage("slidesReveal"), 300);
        break;
      case "slidesReveal":
        setTimeout(() => setAnimationStage("nowPlaying"), 200);
        break;
      case "nowPlaying":
        if (nowPlayingCount < 2) {
          setTimeout(() => {
            setNowPlayingCount((prev) => prev + 1);
          }, 800);
        } else {
          setTimeout(() => setAnimationStage("slidesCoverFinal"), 200);
        }
        break;
      case "slidesCoverFinal":
        setTimeout(() => setAnimationStage("slidesRevealFinal"), 300);
        break;
      case "slidesRevealFinal":
        setTimeout(() => setAnimationStage("showChildren"), 200);
        break;
      case "showChildren":
        setTimeout(() => setAnimationStage("idle"), 500);
        break;
    }
  };

  // Варианты анимации для слайдов
  const slideVariants: { [key: string]: { [key: string]: Variant } } = {
    top: {
      cover: { y: "0%" },
      reveal: { y: "-100%" },
      idle: { y: "-100%" },
    },
    bottom: {
      cover: { y: "0%" },
      reveal: { y: "100%" },
      idle: { y: "100%" },
    },
  };

  // Варианты для NOW PLAYING текста
  const nowPlayingVariants: { [key: string]: Variant } = {
    hidden: {
      y: -1000, // Начальная позиция выше экрана
      opacity: 0,
    },
    visible: {
      y: 0, // Конечная позиция по центру
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 300,
      },
    },
    exit: {
      y: 200, // Уезжает вниз
      opacity: 0,
      transition: {
        duration: 0.5,
        ease: "easeIn",
      },
    },
  };

  // Варианты для children
  const childrenVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 200,
        delay: 0.2,
      },
    },
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#000",
        zIndex: 1000,
      }}
    >
      {/* Верхний слайд */}
      <motion.div
        className={styles.slide}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "50%",
          zIndex: 10,
        }}
        variants={slideVariants.top}
        animate={
          animationStage === "slidesCover" ||
          animationStage === "slidesCoverFinal"
            ? "cover"
            : animationStage === "slidesReveal" ||
                animationStage === "slidesRevealFinal"
              ? "reveal"
              : "idle"
        }
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        onAnimationComplete={() => {
          if (animationStage === "slidesCover")
            handleAnimationComplete("slidesCover");
          if (animationStage === "slidesReveal")
            handleAnimationComplete("slidesReveal");
          if (animationStage === "slidesCoverFinal")
            handleAnimationComplete("slidesCoverFinal");
          if (animationStage === "slidesRevealFinal")
            handleAnimationComplete("slidesRevealFinal");
        }}
      />

      {/* Нижний слайд */}
      <motion.div
        className={styles.slide}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "50%",
          zIndex: 10,
        }}
        variants={slideVariants.bottom}
        animate={
          animationStage === "slidesCover" ||
          animationStage === "slidesCoverFinal"
            ? "cover"
            : animationStage === "slidesReveal" ||
                animationStage === "slidesRevealFinal"
              ? "reveal"
              : "idle"
        }
        transition={{
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      />

      {/* NOW PLAYING текст */}
      <AnimatePresence mode="wait">
        {animationStage === "nowPlaying" && (
          <motion.div
            key={`now-playing-${nowPlayingCount}`}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 5,
              pointerEvents: "none",
            }}
            variants={nowPlayingVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onAnimationComplete={(definition) => {
              if (definition === "visible") {
                handleAnimationComplete("nowPlaying");
              }
            }}
          >
            <motion.span
              style={{
                fontSize: "clamp(2rem, 8vw, 12rem)",
                fontWeight: "bold",
                color: "#fff",
                fontFamily: "Arial, sans-serif",
                letterSpacing: "0.2em",
                textAlign: "center",
                padding: "0 20px",
              }}
            >
              NOW PLAYING
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Children контент */}
      <motion.div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        variants={childrenVariants}
        animate={
          animationStage === "showChildren"
            ? "visible"
            : animationStage === "slidesCover" ||
                animationStage === "slidesReveal" ||
                animationStage === "slidesRevealFinal" ||
                animationStage === "nowPlaying" ||
                animationStage === "slidesCoverFinal"
              ? "hidden"
              : "visible"
        }
        onAnimationComplete={(definition) => {
          if (definition === "visible" && animationStage === "showChildren") {
            handleAnimationComplete("showChildren");
          }
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
