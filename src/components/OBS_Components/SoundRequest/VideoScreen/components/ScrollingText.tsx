import { memo, useEffect, useRef, useState } from "react";

import styles from "./ScrollingText.module.scss";

interface Props {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Компонент для текста с автоматической бегущей строкой
 * Если текст не умещается - становится бегущей строкой
 * Если умещается - отображается статично
 */
function ScrollingTextComponent({ text, className, style }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (!containerRef.current || !textRef.current) {
        return;
      }

      const containerWidth = containerRef.current.offsetWidth;
      const textWidth = textRef.current.scrollWidth;

      setIsOverflowing(textWidth > containerWidth);
    };

    // Проверяем при монтировании и изменении текста
    checkOverflow();

    // Проверяем при изменении размера окна
    window.addEventListener("resize", checkOverflow);

    return () => {
      window.removeEventListener("resize", checkOverflow);
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${className || ""}`}
      style={style}
    >
      <span
        ref={textRef}
        className={`${styles.text} ${isOverflowing ? styles.scrolling : ""}`}
      >
        {text}
      </span>
      {/* Дублируем текст для плавной бесконечной анимации */}
      {isOverflowing && (
        <span className={`${styles.text} ${styles.scrolling}`}>{text}</span>
      )}
    </div>
  );
}

export const ScrollingText = memo(ScrollingTextComponent);
