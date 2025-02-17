import "./Announce.module.scss";

import { CSSProperties, useEffect, useRef, useState } from "react";
import { Textfit } from "react-textfit";

interface Props {
  title: string;
  callback: () => void;
}

const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default function Announce({ title, callback }: Props) {
  const nodeRef = useRef(null);

  const backgroundColor = getRandomColor();

  const defaultStyle: CSSProperties = {
    position: "absolute" /* Абсолютное позиционирование */,
    top: "50%" /* Центрирование по вертикали */,
    left: "50%" /* Центрирование по горизонтали */,
    transform:
      "translate(-50%, -50%)" /* Сдвиг на половину ширины и высоты элемента для центрирования */,
    display: "flex",
    flexDirection: "column" /* Размещение элементов в колонку */,
    justifyContent: "center" /* Центрирование содержимого по вертикали */,
    alignItems: "center" /* Центрирование содержимого по горизонтали */,
    height: "30%" /* Высота блока будет зависеть от содержимого */,
    width: "80%" /* Ширина блока будет 80% от ширины экрана */,
    padding: "20px" /* Добавление отступов внутри блока */,
    backgroundColor: backgroundColor,
  };

  interface FadeOutProps {
    duration: number;
    delay: number;
    children: React.ReactNode;
    callback: () => void;
  }

  const FadeOut: React.FC<FadeOutProps> = ({
    duration,
    delay,
    children,
    callback,
  }) => {
    const elementRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
      const element = elementRef.current;
      if (element) {
        const delayTimer = setTimeout(() => {
          if (element) {
            element.style.transition = `opacity ${duration}ms`;
            element.style.opacity = "0";

            const fadeOutTimer = setTimeout(() => {
              setIsVisible(false);
              callback();
            }, duration);

            return () => {
              clearTimeout(fadeOutTimer);
            };
          }
        }, delay);

        return () => {
          clearTimeout(delayTimer);
        };
      }
    }, [duration, delay, callback]);

    return isVisible ? <div ref={elementRef}>{children}</div> : null;
  };

  return (
    <FadeOut duration={2000} delay={3000} callback={callback}>
      <div ref={nodeRef} style={defaultStyle} className="announce">
        <Textfit
          id="announce"
          forceSingleModeWidth
          min={1}
          max={1500}
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            display: "flex",
            justifySelf: "center",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {title}
        </Textfit>
      </div>
    </FadeOut>
  );
}
