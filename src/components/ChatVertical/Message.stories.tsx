import type { Meta, StoryObj } from "@storybook/react";
import { expect } from "@storybook/test";
import {
  ChatMessage,
  ChatMessageNoisyEnum,
  ChatMessageUserTypeEnum,
} from "../../shared/api/generated/baza";
import { Message } from "./Message";

const meta: Meta<typeof Message> = {
  title: "Chat/ChatVerticalMessage",
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
