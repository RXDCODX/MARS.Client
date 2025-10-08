import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { TelegramusHubSignalRContext as SignalRContext } from "@/shared/api";
import { ChatMessage } from "@/shared/api";
import Announce from "@/shared/Utils/Announce/Announce";

import { MOTION, SCROLL_CONFIG, SCROLL_TIMEOUT } from "./animationTimings";
import styles from "./ChatVertical.module.scss";
import { Message } from "./Message";

type ChatMessageWithPending = ChatMessage & { _pendingRemove?: boolean };

interface ChatVerticalProps {
  messages?: ChatMessage[];
  onRemoveMessage?: (id: string) => void;
}

export default function ChatVertical({
  messages: externalMessages,
  onRemoveMessage,
}: ChatVerticalProps) {
  const [internalMessages, setInternalMessages] = useState<ChatMessage[]>([]);
  const [announced, setAnnounced] = useState(false);

  // Используем внешние сообщения или внутренние
  const messages =
    externalMessages !== undefined ? externalMessages : internalMessages;
  const handleRemove =
    onRemoveMessage ||
    ((id: string) => {
      setInternalMessages(prev => prev.filter(m => m.id !== id));
    });

  // ScrollToBottom после появления нового сообщения (и анимации)
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Ждём завершения всех анимаций (время берется из animationTimings.ts)
    const timeout = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollIntoView(SCROLL_CONFIG);
      }
    }, SCROLL_TIMEOUT);
    return () => clearTimeout(timeout);
  }, [messages.length]);

  SignalRContext.useSignalREffect(
    "NewMessage",
    (id: string, message: ChatMessage) => {
      if (externalMessages) {
        return null;
      }
      message.id ??= id;
      setInternalMessages(prev => {
        while (prev.length >= 15) {
          prev.pop();
        }
        if (prev.find(m => m.id === message.id)) {
          return prev;
        } else {
          return [message, ...prev];
        }
      });
    },
    []
  );

  SignalRContext.useSignalREffect(
    "deletemessage",
    (id: string) => {
      // Удаляем сообщение, framer-motion проиграет exit-анимацию
      setInternalMessages(prev => prev.filter(m => m.id !== id));
    },
    []
  );

  return (
    <>
      {!announced && (
        <Announce title={"Chat Vertical"} callback={() => setAnnounced(true)} />
      )}
      <div className={styles.chatContainer}>
        <AnimatePresence initial={false} mode="popLayout">
          {internalMessages.map((message: ChatMessageWithPending) => (
            <motion.div
              key={message.id}
              layout="position"
              initial={{ opacity: 0, x: `-${MOTION.ENTRY.OFFSCREEN_PERCENT}%` }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: `${MOTION.EXIT.OFFSCREEN_PERCENT}%` }}
              transition={{
                layout: { duration: MOTION.LAYOUT.DURATION_MS / 1000 },
                type: "tween",
                x: {
                  type: "tween",
                  ease: "easeOut",
                  duration: MOTION.ENTRY.DURATION_MS / 1000,
                  delay:
                    message === internalMessages[0]
                      ? MOTION.ENTRY.DELAY_MS / 1000
                      : 0,
                },
                opacity: {
                  duration: MOTION.OPACITY_DURATION_MS / 1000,
                  ease: "easeOut",
                },
              }}
            >
              <Message
                message={message}
                onRemove={() => handleRemove(message.id!)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div ref={scrollRef} />
    </>
  );
}
