/* eslint-disable react-hooks/rules-of-hooks */
import parse from "html-react-parser";

import { EmoteFetcher, EmoteParser } from "@mkody/twitch-emoticons";
import { HelixChatBadgeSet } from "@twurple/api";
import { ChatMessage, MediaInfo } from "../api/generated/baza";
import { ChatMessage as TwitchChatMessage } from "@twurple/chat";
import { HighliteMessageProps } from "../../components/HighliteMessage/Message";
import React from "react";
import { v4 as randomUUID } from "uuid";

export { BigTextBlockForAudio } from "./BigTexts/BigTextBlockForAudio";
export { BigTextBlockForVoice } from "./BigTexts/BigTextBlockForVoice";
export { FullText } from "./FullText/FullText";

export function replaceEmotes({
  text,
  parser,
  fetcher,
}: {
  text?: string | ChatMessage;
  parser: EmoteParser;
  fetcher: EmoteFetcher;
}) {
  debugger;
  if (!text) {
    return undefined;
  }

  let resultText: string = "";

  if (typeof text === "string") {
    resultText = text;
    if (text) {
      if (parser) {
        resultText = parser.parse(text, 3);
        // text = text.replaceAll(new RegExp("https", "g"), "http");
      }
    }
  } else if ("message" in text && typeof text.message === "string") {
    var message = text as ChatMessage;

    if (message.message === undefined) {
      return undefined;
    }

    resultText = message.message;

    message.emoteSet?.emotes?.forEach((emote) => {
      if (
        emote.name === undefined ||
        emote.imageUrl === undefined ||
        message.message === undefined
      ) {
        return undefined;
      }

      resultText = message.message.replace(
        emote.name,
        `<img class="emote" src="${emote.imageUrl}" />`,
      );
    });

    var newParser = new EmoteParser(fetcher, {
      template:
        '<img class="emote" crossorigin="anonymous" alt="{name}" src="{link}" />',
      match: /(?<!<[^>]*)(\w+)(?![^<]*>)/g,
    });

    resultText = newParser.parse(resultText, 4);
  } else {
    throw new Error("Invalid message type");
  }

  if (!text) {
    return undefined;
  }

  const result = parse(resultText);

  return result;
}

export function AddBorderToElement(info: MediaInfo): React.CSSProperties {
  return {
    border: `6px solid ${info.textInfo.keyWordsColor}`,
    borderRadius: "50px",
  };
}

export function getRandomInt(min: number, max: number): number {
  if (min >= -1 && max <= 1) {
    function getRandomInRange(min: number, max: number): number {
      // Проверяем, что min и max находятся в допустимом диапазоне
      if (min < -1 || max > 1) {
        throw new Error("min must be >= -1 and max must be <= 1");
      }

      // Генерируем случайное число в диапазоне [min, max)
      const randomValue = Math.random() * (max - min) + min;

      // Округляем до 3 знаков после запятой
      return Math.round(randomValue * 1000) / 1000;
    }

    return getRandomInRange(min, max);
  }

  // Создаем буфер для одного 32-битного беззнакового целого числа
  const buffer = new Uint32Array(1);
  window.crypto.getRandomValues(buffer);
  const randomNumber = buffer[0] / (0xffffffff + 1); // Преобразовываем в число от 0 до 1 (включительно)

  // Преобразуем в число в заданном диапазоне
  return Math.floor(randomNumber * (max - min + 1)) + min;
}

export function getCoordinates(
  ref: HTMLImageElement | HTMLVideoElement,
  info: MediaInfo,
): React.CSSProperties {
  let returnObj: React.CSSProperties = {};

  if (info?.positionInfo.randomCoordinates) {
    if (!ref?.width) {
      ref.width = info.positionInfo.width;
      ref.height = info.positionInfo.height;
    }

    const getXLong = window.innerWidth - ref.width;
    const getYLong = window.innerHeight - ref.height;
    const randomX = getRandomInt(
      0,
      isNaN(getXLong) ? window.innerWidth : getXLong,
    );
    const randomY = getRandomInt(
      0,
      isNaN(getYLong) ? window.innerHeight : getYLong,
    );

    returnObj.left = `${randomX >= 1 ? randomX : 0}px`;
    returnObj.top = `${randomY >= 1 ? randomY : 0}px`;
  } else {
    if (
      info?.positionInfo.isHorizontalCenter &&
      info?.positionInfo.isVerticallCenter
    ) {
      returnObj = {
        ...returnObj,
        margin: 0,
        position: "absolute",
        top: "50%",
        left: "50%",
        msTransform: "translate(-50%, -50%)",
        transform: "translate(-50%, -50%)",
      };
    } else if (info?.positionInfo.isHorizontalCenter) {
      returnObj = {
        ...returnObj,
        margin: 0,
        position: "absolute",
        left: "50%",
        msTransform: "translateX(-50%)",
        transform: "translateX(-50%)",
        top: info.positionInfo.yCoordinate + "px",
      };
    } else if (info?.positionInfo.isVerticallCenter) {
      returnObj = {
        ...returnObj,
        margin: 0,
        position: "absolute",
        top: "50%",
        msTransform: "translateY(-50%)",
        transform: "translateY(-50%)",
        left: info.positionInfo.xCoordinate + "px",
      };
    }
  }

  return returnObj;
}

export function getFileExtensionWithoutDot(extension: string | null) {
  const result = extension?.startsWith(".")
    ? extension.substring(1)
    : extension;

  return result;
}

export function getRandomRotation(mediaInfo: MediaInfo) {
  const returnObj: React.CSSProperties = {};

  if (mediaInfo?.positionInfo.isRotated) {
    returnObj.transform = `rotate(${getRandomInt(mediaInfo.positionInfo.rotation * -1, mediaInfo.positionInfo.rotation)}deg)`;
  }

  return returnObj;
}

export const getRandomColor = (opacity: number = 1): string => {
  // Генерируем случайные значения для красного, зеленого и синего каналов
  const r = Math.floor(Math.random() * 256); // Случайное число от 0 до 255
  const g = Math.floor(Math.random() * 256); // Случайное число от 0 до 255
  const b = Math.floor(Math.random() * 256); // Случайное число от 0 до 255

  // Возвращаем цвет в формате rgba
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export function replaceBadges(
  badges: HelixChatBadgeSet[],
  chatMessage: ChatMessage | TwitchChatMessage,
) {
  var text: string | undefined = "";
  var sub = "";

  if (chatMessage instanceof TwitchChatMessage) {
    text = chatMessage.text;

    chatMessage.userInfo.badges.forEach((_, k) => {
      const set = badges.find((e) => e.id == k);
      const lastVersion = set?.versions?.slice(-1);

      if (!lastVersion) {
        return undefined;
      }

      const link = lastVersion[0].getImageUrl(4);
      sub = sub + `<img class="badge" src="${link}" type="image/png">\n`;
    });
  } else if (chatMessage.badges !== undefined) {
    text = chatMessage.message;

    chatMessage.badges.forEach((b) => {
      const set = badges.find((e) => e.id == b.key);
      const lastVersion = set?.versions?.slice(-1);

      if (!lastVersion) {
        return undefined;
      }

      const link = lastVersion[0].getImageUrl(4);
      sub = sub + `<img class="badge" src="${link}" type="image/png">\n`;
    });
  }

  if (!text) {
    return undefined;
  }

  const result = parse(sub);

  if (typeof result === "string") {
    return undefined;
  }

  return result;
}

export function getEmojisSrcFromText(
  text: string | ChatMessage,
  fetcher: EmoteFetcher,
) {
  debugger;
  if (typeof text === "string") {
    const client = new EmoteParser(fetcher, {
      template: "{link}",
      match: /(\w+)+?/g,
    });
    const messages = text.split(" ");
    const result = messages.map((message) => {
      return client.parse(message);
    });
    return result;
  } else if ("message" in text && typeof text.message === "string") {
    var message = text as ChatMessage;

    if (
      message.message === undefined ||
      message.emoteSet === undefined ||
      message.emoteSet.emotes === undefined
    ) {
      return undefined;
    }

    const urls = message.emoteSet.emotes.map((emote) => {
      return emote.imageUrl;
    });

    const newParser = new EmoteParser(fetcher, {
      template: "{link}",
      match: /(?<!<[^>]*)(\w+)(?![^<]*>)/g,
    });

    const newMEssages = message.message.split(" ");

    newMEssages.forEach((message) => {
      urls.push(newParser.parse(message, 3));
    });

    return urls.filter((url) => url !== undefined);
  } else {
    throw new Error("text must be string or ChatMessage");
  }
}

export const isWhiteColor = (color: string) => {
  if (color === "white") {
    return true;
  }

  if (color === "#ffffff") {
    return true;
  }

  if (color === "rgb(255, 255, 255)") {
    return true;
  }
};

export const getNotWhiteColor = (opacity?: number) => {
  while (true) {
    const color: string = getRandomColor(opacity);

    if (!isWhiteColor(color)) {
      return color;
    }
  }
};

export const isVideo = (currentMessage: HighliteMessageProps) =>
  (currentMessage?.faceImage.url?.includes(".mp4") ||
    currentMessage?.faceImage.url?.includes(".webm")) ??
  false;

/**
 * Конвертирует цвет из hex в rgba.
 * @param hex - Цвет в формате hex (например, "#FF5733").
 * @param opacity - Прозрачность (от 0 до 1).
 * @returns Цвет в формате rgba (например, "rgba(255, 87, 51, 0.7)").
 */
export const hexToRgba = (hex: string, opacity: number = 1): string => {
  // Удаляем символ #, если он есть
  hex = hex.replace("#", "");

  // Преобразуем hex в RGB
  let r: number, g: number, b: number;

  if (hex.length === 3) {
    // Если hex в сокращенном формате (например, "#F53")
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    // Если hex в полном формате (например, "#FF5733")
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    throw new Error('Неверный формат hex. Используйте "#FFF" или "#FFFFFF".');
  }

  // Возвращаем цвет в формате rgba
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export interface ContentPart {
  id: string;
  type: "text" | "image" | "video" | "link";
  source?: string; // только для image, video, link
  content: string; // исходный текст или URL
}

export function parseContent(text?: string): ContentPart[] | undefined {
  if (!text) return undefined;

  text = text.trim();

  const result: ContentPart[] = [];
  let currentText: string[] = [];

  // Улучшенное разбиение с очисткой невидимых символов
  const parts = text
    .replace(/[\u{E0000}-\u{E007F}]/gu, "")
    .split(/\s+/)
    .filter((part) => part.trim().length > 0);

  for (const part of parts) {
    if (part.startsWith("https://") || part.startsWith("http://")) {
      // Добавляем накопленный текст
      if (currentText.length > 0) {
        result.push({
          type: "text",
          content: currentText.join(" "),
          id: randomUUID(),
        });
        currentText = [];
      }

      // Определяем тип контента
      if (
        part.includes(".mp4") ||
        part.includes(".webm") ||
        part.includes(".ogg")
      ) {
        result.push({
          id: randomUUID(),

          type: "video",
          source: part,
          content: part,
        });
      } else if (
        part.includes(".jpeg") ||
        part.includes(".jpg") ||
        part.includes(".png") ||
        part.includes(".gif") ||
        part.includes(".svg") ||
        part.includes(".webp")
      ) {
        result.push({
          id: randomUUID(),

          type: "image",
          source: part,
          content: part,
        });
      } else {
        result.push({
          id: randomUUID(),

          type: "link",
          source: part,
          content: part,
        });
      }
    } else {
      if (!!part) {
        currentText.push(part);
      }
    }
  }

  // Добавляем оставшийся текст
  if (currentText.length > 0) {
    result.push({
      id: randomUUID(),

      type: "text",
      content: currentText.join(" "),
    });
  }

  return result;
}
