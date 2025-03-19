import { useState } from "react";
import { SignalRContext } from "../../app";
import { TelegramusHubMakeScreenParticlesCreateParamsParticlesEnum } from "../../shared/api/generated/baza";
import Confetty from "./Confetty";
import Firework from "./Firework";
import EmojiParticles from "./EmojiParticles";

interface base {
  id: number;
}

interface particles extends base {
  type: TelegramusHubMakeScreenParticlesCreateParamsParticlesEnum;
}

interface emojis extends base {
  input: string;
}

export default function Manager() {
  const [count, setCount] = useState<number>(0);
  const [messages, setMessages] = useState<particles[]>([]);
  const [emojis, setEmojis] = useState<emojis[]>([]);

  SignalRContext.useSignalREffect(
    "MakeScreenParticles",
    (type: TelegramusHubMakeScreenParticlesCreateParamsParticlesEnum) => {
      const newMessage = { type: type, id: count };
      setCount(count + 1);
      setMessages((prev) => [...prev, newMessage]);
    },
    [],
  );

  SignalRContext.useSignalREffect(
    "MakeScreenEmojisParticles",
    (emojiInput: string) => {
      const newMessage = { input: emojiInput, id: count };
      setCount(count + 1);
      setEmojis((prev) => [...prev, newMessage]);
    },
    [],
  );

  return (
    <>
      {messages.length > 0 &&
        messages.map((message) => {
          switch (message.type) {
            case TelegramusHubMakeScreenParticlesCreateParamsParticlesEnum.Confetty:
              return <Confetty key={message.id} />;
            case TelegramusHubMakeScreenParticlesCreateParamsParticlesEnum.Fireworks:
              return <Firework key={message.id} />;
          }
        })}
      {emojis.length > 0 &&
        emojis.map((message) => {
          return <EmojiParticles key={message.id} input={message.input} />;
        })}
    </>
  );
}
