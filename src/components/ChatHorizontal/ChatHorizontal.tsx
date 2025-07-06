import { useCallback, useState } from "react";

import { SignalRContext } from "../../app";
import { ChatMessage } from "../../shared/api/generated/baza";
import Announce from "../../shared/Utils/Announce/Announce";
import { Message } from "./Message";

interface ChatHorizontalProps {
  messages?: ChatMessage[];
  onRemoveMessage?: (id: string) => void;
}

export default function ChatHorizontal({
  messages: externalMessages,
  onRemoveMessage,
}: ChatHorizontalProps) {
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

  // SignalR эффекты только если не переданы внешние сообщения
  if (!externalMessages) {
    SignalRContext.useSignalREffect(
      "newmessage",
      (id: string, message: ChatMessage) => {
        message.id ??= id;
        setInternalMessages((prev) => {
          while (prev.length >= 50) {
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

    SignalRContext.useSignalREffect(
      "deletemessage",
      (id: string) => {
        setInternalMessages((prev) => prev.filter((m) => m.id !== id));
      },
      [],
    );
  }

  const remove = useCallback(
    (message: ChatMessage) => {
      handleRemove(message.id!);
    },
    [handleRemove],
  );

  return (
    <>
      {!announced && (
        <Announce
          title={"Chat Horizontal"}
          callback={() => setAnnounced(true)}
        />
      )}
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          callback={() => remove(message)}
        />
      ))}
    </>
  );
}
