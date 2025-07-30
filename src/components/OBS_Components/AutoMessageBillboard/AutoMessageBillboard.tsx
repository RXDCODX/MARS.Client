import { AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { SignalRContext } from "../../../app";
import Announce from "../../../shared/Utils/Announce/Announce";
import AutoMessageAlert from "./AutoMessageAlert";

interface AutoMessageData {
  id: string;
  message: string;
  timestamp: number;
}

interface AutoMessageBillboardProps {
  messages?: string[];
}

export default function AutoMessageBillboard({
  messages: externalMessages,
}: AutoMessageBillboardProps) {
  const [messageQueue, setMessageQueue] = useState<AutoMessageData[]>([]);
  const [currentMessage, setCurrentMessage] = useState<AutoMessageData | null>(
    null,
  );
  const [isAnounced, setAnounced] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isProcessingRef = useRef(false);

  // Инициализация с внешними сообщениями (для Storybook)
  useEffect(() => {
    if (externalMessages && externalMessages.length > 0) {
      const initialQueue = externalMessages.map((msg) => ({
        id: uuidv4(),
        message: msg,
        timestamp: Date.now(),
      }));
      setMessageQueue(initialQueue);
    }
  }, [externalMessages]);

  // Обработка очереди сообщений
  const processNextMessage = useCallback(() => {
    if (isProcessingRef.current) {
      return;
    }

    setMessageQueue((prevQueue) => {
      if (prevQueue.length === 0) {
        return prevQueue;
      }

      isProcessingRef.current = true;
      const nextMessage = prevQueue[0];

      // Устанавливаем текущее сообщение
      setCurrentMessage(nextMessage);

      // Через 8 секунд переходим к следующему сообщению
      timeoutRef.current = setTimeout(() => {
        setCurrentMessage(null);
        isProcessingRef.current = false;

        // Задержка 2 секунды перед следующим сообщением
        setTimeout(() => {
          processNextMessage();
        }, 2000);
      }, 8000);

      // Возвращаем очередь без первого элемента
      return prevQueue.slice(1);
    });
  }, []);

  // Запускаем обработку очереди при изменении
  useEffect(() => {
    if (
      messageQueue.length > 0 &&
      !currentMessage &&
      !isProcessingRef.current
    ) {
      processNextMessage();
    }
  }, [messageQueue.length, currentMessage, processNextMessage]);

  const handleAutoMessage = useCallback(
    (message: string) => {
      // Если переданы внешние сообщения, игнорируем SignalR
      if (externalMessages) {
        return;
      }

      const newMessage: AutoMessageData = {
        id: uuidv4(),
        message,
        timestamp: Date.now(),
      };

      // Ограничиваем очередь максимум 10 сообщениями
      setMessageQueue((prev) => {
        const updatedQueue = [...prev, newMessage];
        // Если очередь больше 10 сообщений, удаляем самые старые
        if (updatedQueue.length > 10) {
          return updatedQueue.slice(-10);
        }
        return updatedQueue;
      });
    },
    [externalMessages],
  );

  const removeMessage = useCallback(() => {
    setCurrentMessage(null);
    isProcessingRef.current = false;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    // Переходим к следующему сообщению
    setTimeout(() => {
      processNextMessage();
    }, 2000);
  }, [processNextMessage]);

  // Подписка на SignalR события
  SignalRContext.useSignalREffect("AutoMessage", handleAutoMessage, [
    handleAutoMessage,
  ]);

  // Очистка таймаутов при размонтировании
  useEffect(
    () => () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  return (
    <>
      {!isAnounced && (
        <Announce title={"AutoMessage"} callback={() => setAnounced(true)} />
      )}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 1000,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          {currentMessage && (
            <AutoMessageAlert
              key={currentMessage.id}
              message={currentMessage.message}
              onComplete={removeMessage}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
