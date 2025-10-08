import { useEffect, useRef, useState } from "react";
import GradientText from "react-bits/src/ts-default/TextAnimations/GradientText/GradientText";

import catisaVideo from "@/assets/catisa.mp4";
import { ChatMessage } from "@/shared/api";
import anime from "@/shared/styles/animate.module.scss";
import useTwitchStore from "@/shared/twitchStore/twitchStore";
import { parseContent, replaceBadges, replaceEmotes } from "@/shared/Utils";

import commonStyles from "../OBSCommon.module.scss";
import { ANIMATION_TIMINGS, CSS_ANIMATION_CONFIG } from "./animationTimings";
import styles from "./Message.module.scss";

interface Props {
  message: ChatMessage;
  onRemove?: () => void;
}

function getRoleColor(message: ChatMessage) {
  if (message.isVip) return "#e005b9"; // pink
  if (message.isBroadcaster) return "#e10d00"; // red
  if (message.isModerator) return "#00ad03"; // green
  return "transparent";
}

// В DEV окружении сообщения живут 10 минут, в production - 30 секунд
const messageLifetime = import.meta.env.DEV
  ? ANIMATION_TIMINGS.MESSAGE_LIFETIME.DEV
  : ANIMATION_TIMINGS.MESSAGE_LIFETIME.PRODUCTION;

export function Message({ message, onRemove }: Props) {
  const [handler, setHandler] = useState(true);
  const badges = useTwitchStore(state => state.badges);
  const parser = useTwitchStore(state => state.parser);
  const parserToLink = useTwitchStore(state => state.parseToLink);
  const [parts] = useState(() => parseContent(message.message));
  const roleColor = getRoleColor(message);
  const msgRef = useRef<HTMLDivElement>(null);

  // Проверка на catisa-триггер
  const isCatisa =
    typeof message.message === "string" &&
    (/^!catisa/i.test(message.message.trim()) ||
      /^!катиса/i.test(message.message.trim()));

  useEffect(() => {
    setTimeout(() => {
      if (msgRef.current) {
        msgRef.current.onanimationend = () => {
          setHandler(false);
        };
        msgRef.current.className =
          styles.container + " " + anime.animated + " " + anime.zoomOut;
      }
    }, messageLifetime);
  }, [onRemove, message]);

  return (
    <>
      {handler && (
        <div
          ref={msgRef}
          className={`${styles.container} ${anime.animated} ${anime.fadeInUp}`}
          style={{
            animationDuration: CSS_ANIMATION_CONFIG.fadeInUp.duration,
          }}
        >
          <span
            className={styles.userInfo}
            style={{ backgroundColor: roleColor ?? "transparent" }}
          >
            <div className={styles.badges}>
              {replaceBadges(badges, message)}
            </div>
            <div
              className={`${styles.nickname} ${commonStyles.textStrokeShadow}`}
              style={{
                color: message.colorHex ?? "white",
              }}
            >
              {message.displayName}:
            </div>
          </span>
          <span className={styles.message}>
            {isCatisa ? (
              <video
                src={catisaVideo}
                autoPlay
                loop
                muted
                controls={false}
                style={{
                  maxWidth: "180px",
                  maxHeight: "120px",
                  margin: "0 4px",
                  borderRadius: 12,
                  background: "black",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              />
            ) : (
              parts?.map(part => {
                if (
                  message.isBroadcaster ||
                  message.isVip ||
                  message.isModerator
                ) {
                  // Особые пользователи — всегда градиент
                  if (part.type === "text") {
                    // Получаем результат с эмодзи
                    const emoteContent =
                      parser && parserToLink
                        ? replaceEmotes({
                            text: part.content,
                            parser,
                            newParser: parserToLink,
                          })
                        : part.content;
                    // Если это строка — старый способ, если массив/ReactNode — новый
                    return (
                      <span key={part.id}>
                        <GradientText>{emoteContent}</GradientText>
                      </span>
                    );
                  }
                  if (part.type === "image") {
                    return (
                      <img
                        key={part.id}
                        src={part.content}
                        alt="image"
                        style={{
                          maxWidth: "120px",
                          maxHeight: "120px",
                          margin: "0 4px",
                        }}
                      />
                    );
                  }
                  if (part.type === "video") {
                    return (
                      <video
                        key={part.id}
                        src={part.content}
                        controls={false}
                        autoPlay
                        muted
                        style={{
                          maxWidth: "180px",
                          maxHeight: "120px",
                          margin: "0 4px",
                        }}
                      />
                    );
                  }
                  if (part.type === "link") {
                    return (
                      <span
                        key={part.id}
                        className={`${styles.linkStub} ${commonStyles.textStrokeShadow}`}
                      >
                        ссылка
                      </span>
                    );
                  }
                  return null;
                } else {
                  // Обычные пользователи — белый текст, но с поддержкой смайлов
                  if (part.type === "text") {
                    return (
                      <span
                        key={part.id}
                        style={{ color: "white" }}
                        className={commonStyles.textStrokeShadow}
                      >
                        {parser && parserToLink
                          ? replaceEmotes({
                              text: part.content,
                              parser,
                              newParser: parserToLink,
                            })
                          : part.content}
                      </span>
                    );
                  }
                  if (
                    part.type === "link" ||
                    part.type === "video" ||
                    part.type === "image"
                  ) {
                    return (
                      <span
                        key={part.id}
                        className={`${styles.linkStub} ${commonStyles.textStrokeShadow}`}
                      >
                        ссылка
                      </span>
                    );
                  }
                  return null;
                }
              })
            )}
          </span>
        </div>
      )}
    </>
  );
}
