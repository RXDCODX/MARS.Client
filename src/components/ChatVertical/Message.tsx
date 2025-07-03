import { useEffect, useRef, useState } from "react";
import { replaceBadges } from "../../shared/Utils";
import GradientText from "../../shared/Utils/Animations/GradientText";
import { ChatMessage } from "../../shared/api/generated/baza";
import anime from "../../shared/styles/animate.module.scss";
import useTwitchStore from "../../shared/twitchStore/twitchStore";
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
  const [content] = useState(
    message.message
      ? [{ id: "0", type: "text" as const, content: message.message }]
      : [],
  );
  const roleColor = getRoleColor(message);
  const msgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTimeout(
      () => {
        msgRef.current!.onanimationend = () => {
          setHandler(false);
        };
        msgRef.current!.className =
          styles.container + " " + anime.animated + " " + anime.zoomOut;
      },
      import.meta.env.DEV ? 30 * 100000 : 30 * 1000,
    );
  }, [onRemove, message]);

  return (
    handler && (
      <div
        ref={msgRef}
        className={`${styles.container} ${anime.animated} ${anime.fadeInUp}`}
        style={{ animationDuration: "1s" }}
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
            <div className={styles.nickname}>{message.displayName}</div>
          </div>
        </div>
        <div className={styles.right}>
          {content.map((part) => (
            <GradientText
              key={part.id}
              text={typeof part.content === "string" ? part.content : ""}
              fontWeight={600}
            />
          ))}
        </div>
      </div>
    )
  );
}
