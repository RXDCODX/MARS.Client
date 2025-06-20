import { Message } from "./Message";
import { SignalRContext } from "../../app";
import { ChatMessage } from "../../shared/api/generated/baza";
import { useEffect, useRef, useState } from "react";
import Announce from "../../shared/Utils/Announce/Announce";
import styles from "./ChatVertical.module.scss";

export default function ChatVertical() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [announced, setAnnounced] = useState(false);

  SignalRContext.useSignalREffect(
    "newmessage",
    (id: string, message: ChatMessage) => {
      message.id ??= id;
      setMessages((prev) => [message, ...(prev?.slice(-49) || [])]); // Изменено: добавляем в конец
    },
    [],
  );

  SignalRContext.useSignalREffect(
    "deletemessage",
    (id: string) => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    },
    [],
  );

  return (
    <>
      {!announced && (
        <Announce title={"Chat Vertical"} callback={() => setAnnounced(true)} />
      )}
      <div className={styles.chatContainer}>
        {messages.map((message, index) => (
          <Message key={message.id} message={message} index={index} />
        ))}
      </div>
      <ScrollToBottom />
    </>
  );
}

function ScrollToBottom() {
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => elementRef.current!.scrollIntoView());
  return <div ref={elementRef} />;
}
