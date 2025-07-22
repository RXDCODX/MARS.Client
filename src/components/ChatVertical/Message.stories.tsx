import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect } from "storybook/test";

import {
  ChatMessage,
  ChatMessageNoisyEnum,
  ChatMessageUserTypeEnum,
} from "../../shared/api/generated/baza";
import { Message } from "./Message";

const meta: Meta<typeof Message> = {
  title: "Chat/ChatVertical/Message",
  component: Message,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Отдельное сообщение вертикального чата с анимацией появления.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "object",
    },
    onRemove: {
      action: "message removed",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultMessage: ChatMessage = {
  id: "1",
  message: "Привет всем! 👋",
  displayName: "TestUser",
  colorHex: "#ff0000",
  isVip: false,
  isModerator: false,
  isBroadcaster: false,
  badgeInfo: undefined,
  badges: undefined,
  bits: 0,
  bitsInDollars: 0,
  botUsername: undefined,
  channel: undefined,
  chatReply: undefined,
  cheerBadge: undefined,
  color: {
    a: 255,
    b: 0,
    g: 0,
    r: 255,
    isEmpty: false,
    isKnownColor: true,
    isNamedColor: false,
    isSystemColor: false,
    name: "Red",
  },
  customRewardId: undefined,
  emoteReplacedMessage: undefined,
  emoteSet: undefined,
  isFirstMessage: false,
  isHighlighted: false,
  isMe: false,
  isPartner: false,
  isSkippingSubMode: false,
  isStaff: false,
  isSubscriber: false,
  isTurbo: false,
  noisy: ChatMessageNoisyEnum.False,
  rawIrcMessage: undefined,
  roomId: undefined,
  subscribedMonthCount: 0,
  tmiSentTs: undefined,
  userId: undefined,
  userType: ChatMessageUserTypeEnum.Viewer,
  username: undefined,
};

// Генератор случайных сообщений
function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const COLORS = [
  "#ff0000",
  "#00ff00",
  "#0000ff",
  "#ffff00",
  "#ff00ff",
  "#00ffff",
  "#ffa500",
  "#800080",
  "#008000",
  "#000000",
];
const NICKNAMES = [
  "Alice",
  "Bob",
  "Charlie",
  "Diana",
  "Eve",
  "Frank",
  "Grace",
  "Heidi",
  "Ivan",
  "Judy",
  "Mallory",
  "Niaj",
  "Olivia",
  "Peggy",
  "Rupert",
  "Sybil",
  "Trent",
  "Victor",
  "Walter",
  "Zara",
];
const MESSAGES = [
  "Привет!",
  "Как дела?",
  "Это тестовое сообщение.",
  "Всем хорошего дня!",
  "Проверка связи.",
  "Случайный текст.",
  "Вау, круто!",
  "Что нового?",
  "Погода отличная!",
  "Ура!",
  "Тестируем чат.",
  "Смайлик 😊",
  "Ссылка: https://twitch.tv/rxdcodx",
  "VIP тут!",
  "Модератор на месте.",
  "Бот активен.",
  "Пользователь подключился.",
  "Проверка цвета.",
  "Случайный ник.",
  "Рандомный текст.",
  "Последнее сообщение!",
];

function generateRandomMessages(count: number): ChatMessage[] {
  return Array.from({ length: count }, (_, i) => {
    const isVip = Math.random() < 0.2;
    const isModerator = !isVip && Math.random() < 0.2;
    const isBroadcaster = !isVip && !isModerator && Math.random() < 0.1;
    const colorHex = COLORS[getRandomInt(0, COLORS.length - 1)];
    const displayName =
      NICKNAMES[getRandomInt(0, NICKNAMES.length - 1)] + (i + 1);
    const message = MESSAGES[getRandomInt(0, MESSAGES.length - 1)];
    return {
      ...defaultMessage,
      id: `${Date.now()}_${i}_${Math.random().toString(36).slice(2, 8)}`,
      message,
      displayName,
      colorHex,
      isVip,
      isModerator,
      isBroadcaster,
      userType: isBroadcaster
        ? ChatMessageUserTypeEnum.Broadcaster
        : isModerator
          ? ChatMessageUserTypeEnum.Moderator
          : isVip
            ? ChatMessageUserTypeEnum.Viewer
            : ChatMessageUserTypeEnum.Viewer,
      color: {
        ...defaultMessage.color,
        r: parseInt(colorHex.slice(1, 3), 16),
        g: parseInt(colorHex.slice(3, 5), 16),
        b: parseInt(colorHex.slice(5, 7), 16),
      },
    };
  });
}

export const Default: Story = {
  args: {
    message: defaultMessage,
    onRemove: () => console.log("Message removed"),
  },
  play: async ({ canvasElement }) => {
    // Ждем появления компонента
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем структуру сообщения
    const messageElement = canvasElement.querySelector('[class*="container"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем левую часть (никнейм и бейджи)
    const leftPart = messageElement?.querySelector('[class*="left"]');
    expect(leftPart).toBeInTheDocument();

    // Проверяем правую часть (текст сообщения)
    const rightPart = messageElement?.querySelector('[class*="right"]');
    expect(rightPart).toBeInTheDocument();

    // Проверяем никнейм
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toBeInTheDocument();
    expect(nickname).toHaveTextContent("TestUser");

    // Проверяем цвет никнейма
    const nicknameStyle = window.getComputedStyle(nickname!);
    expect(nicknameStyle.color).toBe("rgb(255, 0, 0)");

    // Проверяем стили контейнера
    const containerStyle = window.getComputedStyle(messageElement!);
    expect(containerStyle.display).toBe("flex");
    expect(containerStyle.minHeight).toBe("60px");

    // Проверяем, что элемент имеет нужные классы
    expect(messageElement!.className).toContain("container");
    expect(messageElement!.className).toContain("animated");
  },
};

export const Generator: Story = {
  render: () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const handleGenerate = () => {
      setMessages(generateRandomMessages(20));
    };
    const handleRemove = (id: string) => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    };
    return (
      <div style={{ position: "relative", width: "100%", minHeight: 300 }}>
        <button
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 1000,
            padding: "10px 20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
          onClick={handleGenerate}
        >
          Сгенерировать 20 сообщений
        </button>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
            marginTop: 60,
          }}
        >
          {messages.map((msg) => (
            <Message
              key={msg.id}
              message={msg}
              onRemove={() => handleRemove(msg.id!)}
            />
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Генератор 20 случайных сообщений с разными параметрами. Кнопка в правом верхнем углу генерирует новые сообщения.",
      },
    },
  },
};
