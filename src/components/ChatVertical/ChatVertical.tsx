import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { SignalRContext } from "../../app";
import { ChatMessage } from "../../shared/api/generated/baza";
import Announce from "../../shared/Utils/Announce/Announce";
import {
  FRAMER_MOTION_CONFIG,
  SCROLL_CONFIG,
  SCROLL_TIMEOUT,
} from "./animationTimings";
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
      setInternalMessages((prev) => prev.filter((m) => m.id !== id));
    });

  // Для jump-анимации всех сообщений
  const [jumpKey, setJumpKey] = useState(0);

  // Когда появляется новое сообщение — обновляем jumpKey
  useEffect(() => {
    if (messages.length > 0) {
      setJumpKey((k) => k + 1);
    }
  }, [messages.length]);

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
      setInternalMessages((prev) => {
        while (prev.length >= 15) {
          prev.pop();
        }
        if (prev.find((m) => m.id === message.id)) {
          return prev;
        } else {
          return [message, ...prev];
        }
      });
    },
    [],
  );

  // Плавное удаление: сначала помечаем _pendingRemove, потом реально удаляем
  const handleDeleteMessage = (id: string) => {
    setInternalMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, _pendingRemove: true } : m)),
    );
  };

  SignalRContext.useSignalREffect(
    "deletemessage",
    (id: string) => {
      handleDeleteMessage(id);
    },
    [],
  );

  return (
    <>
      {!announced && (
        <Announce title={"Chat Vertical"} callback={() => setAnnounced(true)} />
      )}
      <div className={styles.chatContainer}>
        <AnimatePresence initial={false}>
          {internalMessages.map((message: ChatMessageWithPending) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{
                opacity: 1,
                y: 0,
                // jump-эффект для всех сообщений при появлении нового
                scale: jumpKey ? [1, 1.05, 1] : 1,
              }}
              exit={{ opacity: 0, y: -40 }}
              transition={FRAMER_MOTION_CONFIG}
              layout
            >
              <Message
                message={message}
                onRemove={
                  (message as { _pendingRemove?: boolean })._pendingRemove
                    ? () => handleRemove(message.id!)
                    : undefined
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div ref={scrollRef} />
    </>
  );
}
