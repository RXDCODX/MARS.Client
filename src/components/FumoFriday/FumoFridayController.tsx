import { useCallback, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { SignalRContext } from "../../app";
import { Cirno } from "./Cirno";
import { Reimu } from "./Reimu";

export interface Message {
  id: string;
  message: string;
  color?: string;
}

export function FumoFridayController() {
  const [_, setMessages] = useState<Message[]>([]);
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

  return (
    <>
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
