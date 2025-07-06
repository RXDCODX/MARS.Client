import { useState } from "react";

import { ChatMessage } from "../../shared/api/generated/baza";
import { createTestMessageSet } from "../../shared/Utils/testMessageUtils";

interface MessageManagerProps {
  children: (
    messages: ChatMessage[],
    removeMessage: (id: string) => void,
  ) => React.ReactNode;
}

export function MessageManager({ children }: MessageManagerProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageCount, setMessageCount] = useState(0);

  const generateMessages = () => {
    const newMessages = createTestMessageSet("demo", messageCount);

    newMessages.forEach((msg, index) => {
      setTimeout(() => {
        setMessages((prev) => {
          while (prev.length >= 15) {
            prev.pop();
          }
          if (prev.find((m) => m.id === msg.id)) {
            return prev;
          } else {
            return [msg, ...prev];
          }
        });
      }, index * 300);
    });

    setMessageCount((prev) => prev + newMessages.length);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <button
        onClick={generateMessages}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 1000,
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Generate Messages
      </button>
      {children(messages, removeMessage)}
    </div>
  );
}
