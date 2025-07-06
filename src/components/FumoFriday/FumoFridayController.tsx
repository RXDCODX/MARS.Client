import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { SignalRContext } from "../../app";
import { Cirno } from "./Cirno";
import { Reimu } from "./Reimu";
import styles from "./Styles.module.scss";

export interface Message {
  id: string;
  message: string;
  color?: string;
}

export function FumoFridayController() {
  const [, setMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState<Message | undefined>(
    undefined,
  );
  const [switcher, setSwitcher] = useState(false);

  SignalRContext.useSignalREffect(
    "fumofriday",
    (message, color) => {
      const id = uuidv4();
      const newMessage: Message = { id: id, message: message, color: color };
      handleAddEvent(newMessage);
    },
    [],
  );

  const handleAddEvent = useCallback(
    (message: Message) => {
      setMessages((prevMessages) => {
        if (!currentMessage) {
          setCurrentMessage(message);
          return prevMessages;
        }
        return [...prevMessages, message];
      });
    },
    [currentMessage],
  );

  const changeSwitcher = useCallback(() => {
    setSwitcher((prevSwitcher) => !prevSwitcher);
  }, []);

  const handleRemoveEvent = useCallback(
    (message: Message) => {
      setMessages((prevMessages) => {
        const newMessages = prevMessages.filter((msg) => msg.id !== message.id);
        setCurrentMessage(newMessages[0]);
        return newMessages;
      });
      changeSwitcher();
    },
    [changeSwitcher],
  );

  // Экспортируем функцию play для внешнего использования
  const play = useCallback(() => {
    const testMessage: Message = {
      id: uuidv4(),
      message: "Test User",
      color: "#ff6b6b",
    };
    handleAddEvent(testMessage);
  }, [handleAddEvent]);

  // Делаем функцию play доступной глобально для тестирования
  (window as unknown as { testFumoFriday: typeof play }).testFumoFriday = play;

  return (
    <>
      <div className={styles.testControls}>
        <button
          onClick={play}
          className={styles.testButton}
          disabled={!!currentMessage}
        >
          Test FumoFriday Alert
        </button>
      </div>

      {currentMessage && switcher && (
        <Reimu
          key={currentMessage.id}
          callback={() => handleRemoveEvent(currentMessage)}
          displayName={currentMessage}
        />
      )}
      {currentMessage && !switcher && (
        <Cirno
          key={currentMessage.id}
          callback={() => handleRemoveEvent(currentMessage)}
          displayName={currentMessage}
        />
      )}
    </>
  );
}
