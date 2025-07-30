import {
  ChatMessage,
  ChatMessageNoisyEnum,
  ChatMessageUserTypeEnum,
} from "../../shared/api/generated/Api";

/**
 * Создает тестовое сообщение чата с базовыми параметрами
 */
export function createTestMessage(
  id: string,
  message: string,
  displayName: string,
  colorHex: string,
  isVip: boolean = false,
  isModerator: boolean = false,
  isBroadcaster: boolean = false,
): ChatMessage {
  return {
    id,
    message,
    displayName,
    colorHex,
    isVip,
    isModerator,
    isBroadcaster,
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
}

/**
 * Создает набор тестовых сообщений для демонстрации
 */
export function createTestMessageSet(
  prefix: string,
  startIndex: number,
): ChatMessage[] {
  return [
    createTestMessage(
      `${prefix}-${startIndex}`,
      "Привет всем! 👋",
      "User1",
      "#ff0000",
    ),
    createTestMessage(
      `${prefix}-${startIndex + 1}`,
      "Как дела?",
      "User2",
      "#00ff00",
      true,
    ),
    createTestMessage(
      `${prefix}-${startIndex + 2}`,
      "Отличный стрим!",
      "Moderator",
      "#0000ff",
      false,
      true,
    ),
    createTestMessage(
      `${prefix}-${startIndex + 3}`,
      "Спасибо за стрим! 🎮",
      "Broadcaster",
      "#ffff00",
      false,
      false,
      true,
    ),
  ];
}

/**
 * Создает быстрый набор тестовых сообщений
 */
export function createFastTestMessageSet(
  prefix: string,
  startIndex: number,
): ChatMessage[] {
  return [
    createTestMessage(
      `${prefix}-${startIndex}`,
      "Быстрое сообщение! ⚡",
      "FastUser",
      "#ff6600",
    ),
    createTestMessage(
      `${prefix}-${startIndex + 1}`,
      "Еще одно! 🚀",
      "SpeedUser",
      "#ff0066",
      true,
    ),
    createTestMessage(
      `${prefix}-${startIndex + 2}`,
      "Третье сообщение! 🎯",
      "ThirdUser",
      "#00ffff",
      false,
      true,
    ),
  ];
}

/**
 * Создает демо набор тестовых сообщений
 */
export function createDemoTestMessageSet(
  prefix: string,
  startIndex: number,
): ChatMessage[] {
  return [
    createTestMessage(
      `${prefix}-${startIndex}`,
      "Привет всем! 👋",
      "User1",
      "#ff0000",
    ),
    createTestMessage(
      `${prefix}-${startIndex + 1}`,
      "Как дела?",
      "User2",
      "#00ff00",
      true,
    ),
    createTestMessage(
      `${prefix}-${startIndex + 2}`,
      "Отличный стрим!",
      "Moderator",
      "#0000ff",
      false,
      true,
    ),
  ];
}
