import { Waifu } from "../../shared/api/generated/baza";

export function shuffleArray<T>(array: T[]): T[] {
  // Копируем исходный массив, чтобы не изменять его
  const shuffledArray = [...array];

  // Перемешиваем массив
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

export function getText(message: WaifuAlertProps) {
  let text: string;
  if (message.waifu.isAdded) {
    text = "ты добавил";
  } else if (message.waifu.isMerged) {
    text = "поженился с";
  } else {
    text = "тебе выпал(-а)";
  }

  return text + " " + message.waifu.name;
}

export function getTitle(message: WaifuAlertProps) {
  if (message.waifu.anime) {
    return `из аниме ${message.waifu.anime}`;
  } else {
    return `из манги ${message.waifu.manga}`;
  }
}

export interface WaifuAlertProps {
  waifu: Waifu;
  displayName: string;
  color?: string;
  avatarUrl?: string;
}
