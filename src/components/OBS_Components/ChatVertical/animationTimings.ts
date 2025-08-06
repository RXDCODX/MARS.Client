/**
 * Константы таймингов анимаций для ChatVertical компонента
 */

// Время анимаций в миллисекундах
export const ANIMATION_TIMINGS = {
  // Framer Motion spring анимация (зависит от stiffness/damping)
  FRAMER_MOTION_SPRING: {
    MIN: 500,
    MAX: 800,
    RECOMMENDED: 600, // Рекомендуемое время ожидания
  },

  // CSS fadeInUp анимация
  CSS_FADE_IN_UP: 1000, // 1 секунда

  // Jump-эффект для всех сообщений
  JUMP_EFFECT: 300,

  // Общее время для завершения всех анимаций
  TOTAL_ANIMATION_TIME: 1200, // 1.2 секунды

  // Дополнительный буфер для гарантии завершения
  SAFETY_BUFFER: 200,
} as const;

// Вычисляемое время ожидания для скролла
export const SCROLL_TIMEOUT =
  Math.max(
    ANIMATION_TIMINGS.FRAMER_MOTION_SPRING.MAX,
    ANIMATION_TIMINGS.CSS_FADE_IN_UP,
    ANIMATION_TIMINGS.JUMP_EFFECT
  ) + ANIMATION_TIMINGS.SAFETY_BUFFER;

// Настройки Framer Motion
export const FRAMER_MOTION_CONFIG = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  scale: { duration: 0.3 },
} as const;

// Настройки CSS анимаций
export const CSS_ANIMATION_CONFIG = {
  fadeInUp: {
    duration: "1s",
    className: "fadeInUp",
  },
  zoomOut: {
    duration: "1s",
    className: "zoomOut",
  },
} as const;

// Настройки скролла
export const SCROLL_CONFIG = {
  behavior: "smooth" as ScrollBehavior,
  block: "end" as ScrollLogicalPosition,
  inline: "nearest" as ScrollLogicalPosition,
} as const;
