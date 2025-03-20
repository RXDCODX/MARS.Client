/* eslint-disable react-hooks/rules-of-hooks */
import parse from "html-react-parser";

import { EmoteFetcher, EmoteParser } from "@mkody/twitch-emoticons";
import { HelixChatBadgeSet } from "@twurple/api";
import { ChatMessage, MediaInfo } from "../api/generated/baza";

export { BigTextBlockForAudio } from "./BigTexts/BigTextBlockForAudio";
export { BigTextBlockForVoice } from "./BigTexts/BigTextBlockForVoice";
export { FullText } from "./FullText/FullText";

export function replaceEmotes({
  text,
  parser,
  fetcher,
}: {
  text?: string;
  parser: EmoteParser;
  fetcher: EmoteFetcher;
}) {
  if (text) {
    if (parser) {
      console.log(fetcher?.emotes);
      text = parser.parse(text, 3);
      // text = text.replaceAll(new RegExp("https", "g"), "http");
    }
  }

  if (!text) {
    return undefined;
  }

  const result = parse(text);

  return result;
}

export function AddBorderToElement(info: MediaInfo): React.CSSProperties {
  return {
    border: `6px solid ${info.textInfo.keyWordsColor}`,
    borderRadius: "50px",
  };
}

export function getRandomInt(min: number, max: number): number {
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

  console.log(returnObj);
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

export const getRandomColor = (): string => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export function replaceBadges(
  badges: HelixChatBadgeSet[],
  chatMessage: ChatMessage,
) {
  let sub = "";
  const text = chatMessage.message;

  chatMessage.badges?.forEach((b) => {
    const set = badges.find((e) => e.id == b.key);
    const lastVersion = set?.versions?.slice(-1);

    if (!lastVersion) {
      return undefined;
    }

    const link = lastVersion[0].getImageUrl(1);
    sub = sub + `<img class="badge" src="${link}" type="image/png">\n`;
  });

  if (!text) {
    return undefined;
  }

  const result = parse(sub);

  if (typeof result === "string") {
    return undefined;
  }

  return result;
}

export function getEmojisSrcFromText(text: string, fetcher: EmoteFetcher) {
  if (!fetcher) {
    return undefined;
  }

  const client = new EmoteParser(fetcher, {
    template: "{link}",
    match: /(\w+)+?/g,
  });
  const messages = text.split(" ");
  const result = messages.map((message) => {
    return client.parse(message);
  });

  return result;
}
