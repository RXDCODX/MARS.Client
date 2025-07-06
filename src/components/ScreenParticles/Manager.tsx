import { useCallback, useState } from "react";

import { SignalRContext } from "../../app";
import {
  ChatMessage,
  MakeScreenParticlesCreateParamsParticlesEnum,
} from "../../shared/api/generated/baza";
import { Confettyv2 } from "./Confetty";
import EmojiParticles from "./EmojiParticles";
import Firework from "./Firework";

interface base {
  id: number;
}

interface particles extends base {
  type: MakeScreenParticlesCreateParamsParticlesEnum;
}

interface emojis extends base {
  input: string | ChatMessage;
}

export default function Manager() {
  const [count, setCount] = useState<number>(0);
  const [messages, setMessages] = useState<particles[]>([]);
  const [emojis, setEmojis] = useState<emojis[]>([]);

  SignalRContext.useSignalREffect(
    "MakeScreenParticles",
    (type: MakeScreenParticlesCreateParamsParticlesEnum) => {
      const newMessage = { type: type, id: count };
      setCount(count + 1);
      setMessages((prev) => [...prev, newMessage]);
    },
    [],
  );

  SignalRContext.useSignalREffect(
    "MakeScreenEmojisParticles",
    (mediaDto: ChatMessage) => {
      const newMessage = { input: mediaDto, id: count };
      setCount(count + 1);
      setEmojis((prev) => [...prev, newMessage]);
    },
    [],
  );

  const removeMessage = useCallback((id: number) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  }, []);

  return (
    <>
      {messages.length > 0 &&
        messages.map((message) => {
          switch (message.type) {
            case MakeScreenParticlesCreateParamsParticlesEnum.Confetty:
              return (
                <Confettyv2
                  key={message.id}
                  callback={() => removeMessage(message.id)}
                />
              );
            case MakeScreenParticlesCreateParamsParticlesEnum.Fireworks:
              return (
                <Firework
                  key={message.id}
                  callback={() => removeMessage(message.id)}
                />
              );
          }
        })}
      {emojis.length > 0 &&
        emojis.map((message) => (
          <EmojiParticles key={message.id} input={message.input} />
        ))}
    </>
  );
}
