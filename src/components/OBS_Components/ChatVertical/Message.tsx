import { useEffect, useRef, useState } from "react";
import ElectricBorder from "react-bits/src/content/Animations/ElectricBorder/ElectricBorder";
import GradientText from "react-bits/src/ts-default/TextAnimations/GradientText/GradientText";

import catisaVideo from "@/assets/catisa.mp4";
import { ChatMessage } from "@/shared/api";
import useTwitchStore from "@/shared/twitchStore/twitchStore";
import { parseContent, replaceBadges, replaceEmotes } from "@/shared/Utils";

import commonStyles from "../OBSCommon.module.scss";
import { ANIMATION_TIMINGS } from "./animationTimings";
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
  const badges = useTwitchStore(state => state.badges);
  const parser = useTwitchStore(state => state.parser);
  const parserToLink = useTwitchStore(state => state.parseToLink);
  const [parts] = useState(() => parseContent(message.message));
  const roleColor = getRoleColor(message);
  const msgRef = useRef<HTMLDivElement>(null);

  // Появление/исчезновение управляется фреймером (в родителе)

  // Проверка на catisa-триггер
  const isCatisa =
    typeof message.message === "string" &&
    (/^!catisa/i.test(message.message.trim()) ||
      /^!катиса/i.test(message.message.trim()));

  useEffect(() => {
    const timer = setTimeout(() => onRemove && onRemove(), messageLifetime);
    return () => clearTimeout(timer);
  }, [onRemove, message]);

  return (
    <>
      <div className={styles.wrapper}>
        <ElectricBorder
          color={roleColor ?? "transparent"}
          thickness={2}
          chaos={0.6}
          speed={1.2}
        >
          <div style={{display: "block", padding: "3px 15px"}}>
            <div ref={msgRef} className={styles.container}>
              <div
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
                  {message.displayName}
                </div>
              </div>
              <div className={styles.message}>
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
                            <GradientText
                              colors={[
                                "#ff00cc",
                                "#ff0088",
                                "#ff0044",
                                "#ff0088",
                                "#ff00cc",
                                "#cc00ff",
                                "#8800ff",
                                "#4400ff",
                                "#8800ff",
                                "#cc00ff",
                                "#9900ff",
                                "#6600ff",
                                "#3300ff",
                                "#6600ff",
                                "#9900ff",
                                "#0066ff",
                                "#0088ff",
                                "#00aaff",
                                "#0088ff",
                                "#0066ff",
                                "#00ccff",
                                "#00eeff",
                                "#00ffff",
                                "#00eeff",
                                "#00ccff",
                                "#00ffcc",
                                "#00ffaa",
                                "#00ff88",
                                "#00ffaa",
                                "#00ffcc",
                                "#00ff99",
                                "#00ff77",
                                "#00ff55",
                                "#00ff77",
                                "#00ff99",
                                "#00ff66",
                                "#00ff44",
                                "#00ff22",
                                "#00ff44",
                                "#00ff66",
                                "#ccff00",
                                "#eeff00",
                                "#ffff00",
                                "#eeff00",
                                "#ccff00",
                                "#ffcc00",
                                "#ffee00",
                                "#ffff00",
                                "#ffee00",
                                "#ffcc00",
                                "#ff9900",
                                "#ffbb00",
                                "#ffdd00",
                                "#ffbb00",
                                "#ff9900",
                                "#ff6600",
                                "#ff8800",
                                "#ffaa00",
                                "#ff8800",
                                "#ff6600",
                                "#ff3300",
                                "#ff5500",
                                "#ff7700",
                                "#ff5500",
                                "#ff3300",
                              ]}
                              animationSpeed={15}
                            >
                              {emoteContent}
                            </GradientText>
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
              </div>
            </div>
          </div>
        </ElectricBorder>
      </div>
    </>
  );
}
