import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import {
    ChatMessage,
    ChatMessageNoisyEnum,
    ChatMessageUserTypeEnum,
} from "../../../shared/api/generated/Api";
import { Message } from "./Message";

const meta: Meta<typeof Message> = {
  title: "Chat/ChatHorizontal/Message",
  component: Message,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Отдельное сообщение чата с анимацией движения по экрану.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    message: {
      control: "object",
    },
    callback: {
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

export const Default: Story = {
  args: {
    message: defaultMessage,
    callback: () => console.log("Message removed"),
  },
  play: async ({ canvasElement }) => {
    // Ждем появления компонента
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Проверяем, что компонент отрендерился
    expect(canvasElement).toBeInTheDocument();

    // Проверяем структуру сообщения
    const messageElement = canvasElement.querySelector('[class*="message"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем никнейм
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toBeInTheDocument();
    expect(nickname).toHaveTextContent("TestUser:");

    // Проверяем текст сообщения
    const text = messageElement?.querySelector('[class*="text"]');
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent("Привет всем! 👋");

    // Проверяем стили анимации
    const computedStyle = window.getComputedStyle(messageElement!);
    expect(computedStyle.position).toBe("absolute");
    expect(computedStyle.fontSize).toBeDefined();
  },
};

export const VIPUser: Story = {
  args: {
    message: {
      ...defaultMessage,
      displayName: "VIPUser",
      colorHex: "#00ff00",
      isVip: true,
      message: "VIP сообщение! 💎",
    },
    callback: () => console.log("VIP message removed"),
  },
  play: async ({ canvasElement }) => {
    // Ждем появления компонента
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Проверяем VIP статус
    const messageElement = canvasElement.querySelector('[class*="message"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем никнейм VIP пользователя
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toHaveTextContent("VIPUser:");

    // Проверяем цвет VIP пользователя
    const nicknameStyle = window.getComputedStyle(nickname!);
    expect(nicknameStyle.color).toBe("rgb(0, 255, 0)");

    // Проверяем текст VIP сообщения
    const text = messageElement?.querySelector('[class*="text"]');
    expect(text).toHaveTextContent("VIP сообщение! 💎");

    // Проверяем фон для VIP пользователя
    const messageStyle = window.getComputedStyle(messageElement!);
    expect(messageStyle.background).toContain("linear-gradient");
  },
};

export const Moderator: Story = {
  args: {
    message: {
      ...defaultMessage,
      displayName: "Moderator",
      colorHex: "#0000ff",
      isModerator: true,
      message: "Модераторское сообщение! 🛡️",
    },
    callback: () => console.log("Moderator message removed"),
  },
  play: async ({ canvasElement }) => {
    // Ждем появления компонента
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Проверяем модераторский статус
    const messageElement = canvasElement.querySelector('[class*="message"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем никнейм модератора
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toHaveTextContent("Moderator:");

    // Проверяем цвет модератора
    const nicknameStyle = window.getComputedStyle(nickname!);
    expect(nicknameStyle.color).toBe("rgb(0, 0, 255)");

    // Проверяем текст модераторского сообщения
    const text = messageElement?.querySelector('[class*="text"]');
    expect(text).toHaveTextContent("Модераторское сообщение! 🛡️");

    // Проверяем фон для модератора
    const messageStyle = window.getComputedStyle(messageElement!);
    expect(messageStyle.background).toContain("linear-gradient");
  },
};

export const Broadcaster: Story = {
  args: {
    message: {
      ...defaultMessage,
      displayName: "Broadcaster",
      colorHex: "#ffff00",
      isBroadcaster: true,
      message: "Сообщение от стримера! 🎮",
    },
    callback: () => console.log("Broadcaster message removed"),
  },
  play: async ({ canvasElement }) => {
    // Ждем появления компонента
    await new Promise((resolve) => setTimeout(resolve, 100));

    // Проверяем статус стримера
    const messageElement = canvasElement.querySelector('[class*="message"]');
    expect(messageElement).toBeInTheDocument();

    // Проверяем никнейм стримера
    const nickname = messageElement?.querySelector('[class*="nickname"]');
    expect(nickname).toHaveTextContent("Broadcaster:");

    // Проверяем цвет стримера
    const nicknameStyle = window.getComputedStyle(nickname!);
    expect(nicknameStyle.color).toBe("rgb(255, 255, 0)");

    // Проверяем текст сообщения стримера
    const text = messageElement?.querySelector('[class*="text"]');
    expect(text).toHaveTextContent("Сообщение от стримера! 🎮");

    // Проверяем фон для стримера
    const messageStyle = window.getComputedStyle(messageElement!);
    expect(messageStyle.background).toContain("linear-gradient");
  },
};
