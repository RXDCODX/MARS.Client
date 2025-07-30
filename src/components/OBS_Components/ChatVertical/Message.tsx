import { useEffect, useRef, useState } from "react";

import { ChatMessage } from "../../../shared/api/generated/Api";
import anime from "../../../shared/styles/animate.module.scss";
import useTwitchStore from "../../../shared/twitchStore/twitchStore";
import { parseContent, replaceBadges, replaceEmotes } from "../../../shared/Utils";
import GradientText from "../../../shared/Utils/Animations/GradientText";
import { CSS_ANIMATION_CONFIG } from "./animationTimings";
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

export function Message({ message, onRemove }: Props) {
  const [handler, setHandler] = useState(true);
  const badges = useTwitchStore((state) => state.badges);
  const parser = useTwitchStore((state) => state.parser);
  const parserToLink = useTwitchStore((state) => state.parseToLink);
  const [parts] = useState(() => parseContent(message.message));
  const roleColor = getRoleColor(message);
  const msgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(() => {
      if (msgRef.current) {
        msgRef.current.onanimationend = () => {
          setHandler(false);
        };
        msgRef.current.className =
          styles.container + " " + anime.animated + " " + anime.zoomOut;
      }
    }, 30 * 1000);
  }, [onRemove, message]);

  return (
    handler && (
      <div
        ref={msgRef}
        className={`${styles.container} ${anime.animated} ${anime.fadeInUp}`}
        style={{ animationDuration: CSS_ANIMATION_CONFIG.fadeInUp.duration }}
      >
        <div
          className={styles.left}
          style={{ borderRadius: 12, padding: "8px 16px" }}
        >
          <div
            className={styles.role}
            style={{ background: roleColor ?? "white" }}
          >
            <div className={styles.badges}>
              {replaceBadges(badges, message)}
            </div>
            <div
              className={styles.nickname}
              style={{ color: message.colorHex ?? "white" }}
            >
              {message.displayName}
            </div>
          </div>
        </div>
        <div className={styles.right}>
          {parts?.map((part) => {
            if (message.isBroadcaster || message.isVip || message.isModerator) {
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
                  <GradientText
                    key={part.id}
                    speed="very-fast"
                    fontWeight={600}
                  >
                    {emoteContent}
                  </GradientText>
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
                    controls
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
                  <span key={part.id} className={styles.linkStub}>
                    ссылка
                  </span>
                );
              }
              return null;
            } else {
              // Обычные пользователи — белый текст, но с поддержкой смайлов
              if (part.type === "text") {
                return (
                  <span key={part.id} style={{ color: "white" }}>
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
                    controls
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
                  <span key={part.id} className={styles.linkStub}>
                    ссылка
                  </span>
                );
              }
              return null;
            }
          })}
        </div>
      </div>
    )
  );
}
