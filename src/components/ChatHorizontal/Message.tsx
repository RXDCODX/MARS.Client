import { useEffect, useRef, useState } from "react";
import styles from "./Message.module.css";
import {
  getNotWhiteColor,
  getRandomInt,
  hexToRgba,
  isWhiteColor,
  parseContent,
  replaceEmotes,
} from "../../shared/Utils";
import { ChatMessage } from "../../shared/api/generated/baza";
import animateStyles from "../../shared/styles/animate.module.scss";
import { useAnimate } from "react-simple-animate";
import useTwitchStore from "../../shared/twitchStore/twitchStore";

interface Props {
  message: ChatMessage;
}

export const Message = ({ message }: Props) => {
  const [handler, setHandler] = useState(true);
  const divRef = useRef<HTMLDivElement>(null);
  const parser = useTwitchStore((state) => state.parser);
  const fetcher = useTwitchStore((state) => state.fetcher);

  if (!parser || !fetcher) return null;

  const [text] = useState(parseContent(message.message));
  const [fontSize, _] = useState(getRandomInt(25, 72));
  const [duration, __] = useState(fontSize * 0.35);
  const [opacity, ___] = useState(getRandomInt(0.4, 0.6));
  const [mainColor, ____] = useState(
    isWhiteColor(message.colorHex ?? "white")
      ? getNotWhiteColor(opacity)
      : "white",
  );
  const [subColor, _____] = useState(
    hexToRgba(message.colorHex ?? "#ffffff", opacity),
  );
  const [bg, _________] = useState(
    `linear-gradient(${getRandomInt(0, 360)}deg, ${mainColor} , ${subColor}) border-box`,
  );
  console.log(mainColor, subColor, bg);
  const [baseStyles, setBaseStyles] = useState<React.CSSProperties>({
    visibility: "hidden",
    fontSize: fontSize + "px", // Случайный размер шрифта
    position: "absolute",
    background:
      message.isVip || message.isModerator || message.isBroadcaster
        ? bg
        : undefined,
    margin: fontSize / 10 + "px",
  });
  const [divOffset, setDivOffset] = useState(0);
  const { play, style } = useAnimate({
    duration: duration,
    start: {
      ...baseStyles,
      left: window.outerWidth + divOffset + "px",
    },
    end: {
      ...baseStyles,
      left: divOffset * -1 - 100 + "px",
    },
    onComplete: () => {
      setHandler(false);
    },
  });

  useEffect(() => {
    const elem = divRef.current!;
    const randPosY = Math.floor(
      Math.random() * (window.innerHeight - elem.offsetHeight),
    );

    // Устанавливаем анимацию через inline-стили
    setBaseStyles({
      ...baseStyles,
      top: randPosY + "px",
      visibility: "visible",
      left: window.outerWidth + "px",
    });
  }, [message.id]);

  useEffect(() => {
    if (divRef.current && divRef.current.offsetWidth) {
      setDivOffset(divRef.current.offsetWidth);

      setBaseStyles((prev) => ({
        ...prev,
        left: window.outerWidth + divOffset + "px",
      }));
    }

    if (divOffset !== 0) {
      play(true);
    }
  }, [divRef.current?.offsetWidth]);

  return (
    handler && (
      <div
        ref={divRef}
        key={message.id}
        style={style}
        className={styles.message + " " + animateStyles.animated}
      >
        <div
          id={`${message.id}_nickname`}
          className={styles.nickname}
          style={{ color: message.colorHex }}
        >
          {message.displayName}:
        </div>
        <div
          className={styles.text}
          style={{ color: "white", marginLeft: "10px" }}
        >
          {text?.map((part) => {
            switch (part.type) {
              case "text":
                return replaceEmotes({ text: part.content, parser, fetcher });
              case "image":
                return <span>Ссылка</span>;
              case "link":
                return <span>Ссылка</span>;
              case "video":
                return <span>Ссылка</span>;
            }
          })}
        </div>
      </div>
    )
  );
};
