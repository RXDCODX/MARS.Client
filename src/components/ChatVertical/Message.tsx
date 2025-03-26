import { useEffect, useRef, useState } from "react";
import { ChatMessage } from "../../shared/api/generated/baza";
import styles from "./Message.module.scss";
import { parseContent, replaceBadges, replaceEmotes } from "../../shared/Utils";
import useTwitchStore from "../../shared/twitchStore/twitchStore";
import { Textfit } from "react-textfit";
import "./badge.css";
import anime from "../../shared/styles/animate.module.scss";

interface Props {
  message: ChatMessage;
}



export function Message({ message }: Props) {
  const [handler, setHandler] = useState(true);
  const badges = useTwitchStore((state) => state.badges);
  const [color, setColor] = useState<string>("");
  const msgRef = useRef<HTMLDivElement>(null);
  const emoteParser = useTwitchStore((state) => state.parser);
  const emoteFetcher = useTwitchStore((state) => state.fetcher);
  if (!emoteParser || !emoteFetcher) return null;
  const [content] = useState(parseContent(message.message));

  useEffect(() => {
    if (message.isVip) {
      setColor("#e005b9"); //pink
    } else if (message.isBroadcaster) {
      setColor("#e10d00"); // red
    } else if (message.isModerator) {
      setColor("#00ad03"); //green
    } else {
      setColor("transparent");
    }

    setTimeout(() => {
      msgRef.current!.onanimationend = () => {
        setHandler(false);
      };
      msgRef.current!.className =
        styles.container + " " + anime.animated + " " + anime.slideOutLeft;
    }, 30 * 1000);
  }, []);

  // Message component
  return (
    handler && (
      <div
        ref={msgRef}
        className={`${styles.container} ${anime.animated} ${anime.slideInLeft}`}
        style={{
          background: `linear-gradient(135deg, ${color}, transparent) border-box`,
        }}
      >
        {/* Header section with badges and nickname */}
        <div className={styles.head}>
          <div className={styles.badgesAndNickname}>
            <div className={styles.badges}>
              {replaceBadges(badges, message)}
            </div>
            <Textfit
              forceSingleModeWidth
              mode="single"
              className={styles.nickname}
              min={40}
              style={{
                color: message.colorHex ?? "white",
              }}
            >
              {message.displayName}
            </Textfit>
          </div>
        </div>
        {/* Message content */}
        <div className={styles.messageWrapper}>
          {content &&
            content.map((part) => {
              switch (part.type) {
                case "text":
                  const text = replaceEmotes({
                    text: part.content,
                    parser: emoteParser,
                    fetcher: emoteFetcher,
                  });
                  return (
                    <Textfit
                      min={10}
                      max={10000}
                      mode="multi"
                      className={styles.message}
                    >
                      {text}
                    </Textfit>
                  );
                case "image":
                  return (
                    <div
                      className={styles.message}
                      style={{ maxHeight: 100 / content.length + "%" }}
                    >
                      <img src={part.content} className="image"></img>
                    </div>
                  );
                case "video":
                  return (
                    <div
                      className={styles.message}
                      style={{ maxHeight: 100 / content.length + "%" }}
                    >
                      <video src={part.content} className="video"></video>
                    </div>
                  );
                case "link":
                  return (
                    <div
                      className={styles.message}
                      style={{ maxHeight: 100 / content.length + "%" }}
                    >
                      <span
                        style={{
                          color: "rgb(51, 255, 0);",
                          textDecoration: "underline;",
                          textDecorationColor: "rgb(38, 0, 255);",
                        }}
                      >
                        Ссылка
                      </span>
                    </div>
                  );
              }
            })}
        </div>
      </div>
    )
  );
}
