import { Message } from "./Message";
import { SignalRContext } from "../../app";
import { ChatMessage } from "../../shared/api/generated/baza";
import { useCallback, useState } from "react";
import Announce from "../../shared/Utils/Announce/Announce";

export default function ChatHorizontal() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [announced, setAnnounced] = useState(false);

  SignalRContext.useSignalREffect(
    "newmessage",
    (id: string, message: ChatMessage) => {
      message.id ??= id;
      setMessages((prev) => [...(prev?.slice(0, 49) || []), message]);
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

  const remove = useCallback((message: ChatMessage) => {
    setMessages((prev) => prev.filter((m) => m.id !== message.id));
  }, []);

  return (
    <>
      {!announced && (
        <Announce
          title={"Chat Horizontal"}
          callback={() => setAnnounced(true)}
        />
      )}
      {messages.map((message) => {
        return (
          <Message
            key={message.id}
            message={message}
            callback={() => remove(message)}
          />
        );
      })}
    </>
  );
}
