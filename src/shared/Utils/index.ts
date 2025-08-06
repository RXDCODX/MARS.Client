import emoticons from "@mkody/twitch-emoticons";
import { HelixChatBadgeSet } from "@twurple/api";
import { ChatMessage as TwitchChatMessage } from "@twurple/chat";
import parse from "html-react-parser";
import { v4 as randomUUID } from "uuid";

import { HighliteMessageProps } from "@/components/OBS_Components/HighliteMessage/Message";

import { ChatMessage, MediaInfo } from "../api/generated/Api";
import { addMimeTypesToImgTags } from "../MIME_types";

export { BigTextBlockForAudio } from "./BigTexts/BigTextBlockForAudio";
export { BigTextBlockForVoice } from "./BigTexts/BigTextBlockForVoice";
export { FullText } from "./FullText/FullText";

// Экспорт утилит для цветовых переменных сайта
export { useSiteColors } from "./useSiteColors";
export type * from "./siteColors.types";

export function replaceEmotes({
  text,
  parser,
  newParser,
}: {
  text?: string | ChatMessage;
  parser: emoticons.EmoteParser;
  newParser: emoticons.EmoteParser;
}) {
  if (!text) {
    return undefined;
  }

  let resultText: string = "";

  if (typeof text === "string") {
    resultText = text.replace(/[\u{E0000}-\u{E007F}]/gu, "");
    if (text) {
      if (parser) {
        resultText = parser.parse(text, 1);
        // text = text.replaceAll(new RegExp("https", "g"), "http");
      }
    }
  } else if ("message" in text && typeof text.message === "string") {
    const message = text as ChatMessage;

    if (message.message === undefined) {
      return undefined;
    }

    resultText = message.message.replace(/[\u{E0000}-\u{E007F}]/gu, "");

    message.emoteSet?.emotes?.forEach(emote => {
      if (
        emote.name === undefined ||
        emote.imageUrl === undefined ||
        message.message === undefined
      ) {
        return undefined;
      }

      resultText = resultText.replaceAll(
        new RegExp(`(?<!<[^>]*)${escapeRegExp(emote.name)}(?![^<]*>)`, "g"),
        `<img class="emote"
        srcset="//static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/1.0 1x, //static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/light/2.0 2x, //static-cdn.jtvnw.net/emoticons/v2/${emote.id}/default/dark/4.0 4x" alt="${emote.name}" 
        loading="lazy"
        decoding="async" />`
      );
    });

    function escapeRegExp(string: string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }

    const parsedText = newParser.parse(resultText);
    resultText = addMimeTypesToImgTags(parsedText);
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
  ref: HTMLImageElement | HTMLVideoElement | HTMLDivElement,
  info: MediaInfo,
  isInWindow: boolean = true
): React.CSSProperties {
  const returnObj: React.CSSProperties = {};
  const { positionInfo } = info;

  // Получаем размеры элемента в зависимости от его типа
  let elementWidth: number;
  let elementHeight: number;

  // Для div и других элементов используем offsetWidth/offsetHeight
  elementWidth = ref.offsetWidth || positionInfo.width || 0;
  elementHeight = ref.offsetHeight || positionInfo.height || 0;

  // Если размеры не определены, устанавливаем из positionInfo
  if (!elementWidth && positionInfo.width) {
    elementWidth = positionInfo.width;
  }
  if (!elementHeight && positionInfo.height) {
    elementHeight = positionInfo.height;
  }

  // Случайный вариант позиционирования
  if (positionInfo.randomCoordinates) {
    const maxX = Math.max(0, window.innerWidth - elementWidth);
    const maxY = Math.max(0, window.innerHeight - elementHeight);
    let left = getRandomInt(0, maxX);
    let top = getRandomInt(0, maxY);
    if (!isInWindow) {
      left = getRandomInt(0, window.innerWidth);
      top = getRandomInt(0, window.innerHeight);
    }
    returnObj.left = `${left}px`;
    returnObj.top = `${top}px`;
    returnObj.position = "absolute";
    return returnObj;
  }

  // Центрирование
  if (positionInfo.isHorizontalCenter && positionInfo.isVerticallCenter) {
    let style: React.CSSProperties = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    };
    if (isInWindow) {
      // Проверяем, не выходит ли элемент за границы окна
      style = {
        ...style,
        maxWidth: `${window.innerWidth}px`,
        maxHeight: `${window.innerHeight}px`,
      };
    }
    return style;
  }

  if (positionInfo.isHorizontalCenter) {
    let top =
      positionInfo.yCoordinate !== undefined ? positionInfo.yCoordinate : 0;
    // Если явно задан yCoordinate, не учитываем isInWindow
    if (positionInfo.yCoordinate === undefined && isInWindow) {
      // Корректируем top, чтобы элемент не выходил за границы
      if (top + elementHeight / 2 > window.innerHeight) {
        top = window.innerHeight - elementHeight / 2;
      }
      if (top - elementHeight / 2 < 0) {
        top = elementHeight / 2;
      }
    }
    returnObj.position = "absolute";
    returnObj.left = "50%";
    returnObj.transform = "translateX(-50%)";
    returnObj.top = `${top}px`;
    return returnObj;
  }

  if (positionInfo.isVerticallCenter) {
    let left =
      positionInfo.xCoordinate !== undefined ? positionInfo.xCoordinate : 0;
    // Если явно задан xCoordinate, не учитываем isInWindow
    if (positionInfo.xCoordinate === undefined && isInWindow) {
      // Корректируем left, чтобы элемент не выходил за границы
      if (left + elementWidth / 2 > window.innerWidth) {
        left = window.innerWidth - elementWidth / 2;
      }
      if (left - elementWidth / 2 < 0) {
        left = elementWidth / 2;
      }
    }
    returnObj.position = "absolute";
    returnObj.top = "50%";
    returnObj.transform = "translateY(-50%)";
    returnObj.left = `${left}px`;
    return returnObj;
  }

  // Явное задание координат (без центрирования)
  if (positionInfo.xCoordinate !== undefined) {
    let left = positionInfo.xCoordinate;
    if (isInWindow) {
      if (left + elementWidth > window.innerWidth) {
        left = window.innerWidth - elementWidth;
      }
      if (left < 0) left = 0;
    }
    returnObj.left = `${left}px`;
    returnObj.position = "absolute";
  }
  if (positionInfo.yCoordinate !== undefined) {
    let top = positionInfo.yCoordinate;
    if (isInWindow) {
      if (top + elementHeight > window.innerHeight) {
        top = window.innerHeight - elementHeight;
      }
      if (top < 0) top = 0;
    }
    returnObj.top = `${top}px`;
    returnObj.position = "absolute";
  }

  // Если координаты заданы (явно или через центрирование) - добавляем absolute
  if (returnObj.left !== undefined || returnObj.top !== undefined) {
    returnObj.position = "absolute";
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
  chatMessage: ChatMessage | TwitchChatMessage
) {
  let text: string | undefined = "";
  let sub = "";

  if (chatMessage instanceof TwitchChatMessage) {
    text = chatMessage.text;

    chatMessage.userInfo.badges.forEach((v, k) => {
      const set = badges.find(e => e.id == k);
      const lastVersion = set?.versions.find(e => e.id == v);

      if (!lastVersion) {
        return undefined;
      }

      const link = lastVersion.getImageUrl(4);
      sub = sub + `<img class="badge_pa" src="${link}" type="image/png">\n`;
    });
  } else if (chatMessage.badges !== undefined) {
    text = chatMessage.message;

    chatMessage.badges.forEach(b => {
      const set = badges.find(e => e.id == b.key);
      const lastVersion = set?.versions?.find(e => e.id == b.value);

      if (!lastVersion) {
        return undefined;
      }

      const link = lastVersion.getImageUrl(4);
      sub = sub + `<img class="badge_pa" src="${link}" type="image/png">\n`;
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
  client: emoticons.EmoteParser,
  newParser: emoticons.EmoteParser
) {
  if (typeof text === "string") {
    text = text.replace(/[\u{E0000}-\u{E007F}]/gu, "");
    const messages = text.split(" ");
    const result = messages.map(message => client.parse(message, 1));
    return result;
  } else if ("message" in text && typeof text.message === "string") {
    const message = text as ChatMessage;

    if (
      message.message === undefined ||
      message.emoteSet === undefined ||
      message.emoteSet.emotes === undefined
    ) {
      return undefined;
    }

    message.message = message.message.replace(/[\u{E0000}-\u{E007F}]/gu, "");

    const urls = message.emoteSet.emotes.map(emote => {
      if (emote.name !== undefined) {
        message.message = message.message?.replace(emote.name, "");
      }
      return emote.imageUrl;
    });

    const newMEssages = message.message.trim().split(" ");

    newMEssages.forEach(message => {
      urls.push(newParser.parse(message, 1));
    });

    return urls.filter(url => url !== undefined);
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
    .filter(part => part.trim().length > 0);

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
      if (part) {
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

export function arrayExcept<T>(
  arr1: T[],
  arr2: T[],
  comparer?: (a: T, b: T) => boolean
): T[] {
  // Если есть функция сравнения
  if (comparer) {
    const inArr1Only = arr1.filter(
      item1 => !arr2.some(item2 => comparer(item1, item2))
    );
    const inArr2Only = arr2.filter(
      item2 => !arr1.some(item1 => comparer(item1, item2))
    );
    return [...inArr1Only, ...inArr2Only];
  }

  // Оптимизация с использованием Set для простого сравнения
  const set1 = new Set(arr1);
  const set2 = new Set(arr2);

  const result: T[] = [];

  // Добавляем элементы из arr1, которых нет в arr2
  for (const item of arr1) {
    if (!set2.has(item)) {
      result.push(item);
    }
  }

  // Добавляем элементы из arr2, которых нет в arr1
  for (const item of arr2) {
    if (!set1.has(item)) {
      result.push(item);
    }
  }

  return result;
}

/**
 * Корректирует координаты left/top так, чтобы элемент с заданными width/height не выходил за пределы окна.
 */
export function clampToViewport(
  left: number,
  top: number,
  width: number,
  height: number
): { left: number; top: number } {
  const maxLeft = Math.max(0, window.innerWidth - width);
  const maxTop = Math.max(0, window.innerHeight - height);
  return {
    left: Math.max(0, Math.min(left, maxLeft)),
    top: Math.max(0, Math.min(top, maxTop)),
  };
}
