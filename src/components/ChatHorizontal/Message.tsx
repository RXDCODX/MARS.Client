import { useEffect, useRef, useState } from "react";
import styles from "./Message.module.css";
import {
  getNotWhiteColor,
  getRandomInt,
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
  callback?: () => void;
}

export const Message = ({ message, callback }: Props) => {
  const [handler, setHandler] = useState(true);
  const divRef = useRef<HTMLDivElement>(null);
  const parser = useTwitchStore((state) => state.parser);
  const parserToLink = useTwitchStore((state) => state.parseToLink);
  if (!parser || !parserToLink) return null;

  const [text] = useState(parseContent(message.message));
  const [fontSize, _] = useState(getRandomInt(10, 40));
  const [duration, __] = useState(fontSize * 0.7);
  const [opacity, ___] = useState(getRandomInt(0.4, 0.6));
  const [mainColor, ____] = useState(
    isWhiteColor(message.colorHex ?? "white")
      ? getNotWhiteColor(opacity)
      : (message.colorHex ?? "white"),
  );
  const [bg, _________] = useState(
    `linear-gradient(125deg, ${mainColor} , transparent 75%) border-box`,
  );
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
        onAnimationEnd={callback}
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
                return replaceEmotes({
                  text: message,
                  parser,
                  newParser: parserToLink,
                });
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
