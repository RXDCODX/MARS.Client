import { Host, Waifu } from "../../shared/api/generated/baza";
import { getRandomInt } from "../../shared/Utils";

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
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

const startWords: string[] = [
  "Кстати",
  "К слову",
  "Между прочим",
  "Кстати сказать",
  "В самом деле",
  "Во всяком случае",
  "Фактически",
];

export function getHusbandText(message: WaifuAlertProps) {
  if (
    !message.waifuHusband ||
    !message.waifu.isPrivated ||
    !message.waifuHusband.whenPrivated
  ) {
    return "";
  }

  // Если вайфу приватная, считаем время с момента приватизации
  const privatedDate = new Date(message.waifuHusband.whenPrivated);
  const now = new Date();
  const timeDiff = now.getTime() - privatedDate.getTime();

  const span = {
    days: Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((timeDiff % (1000 * 60)) / 1000),
  };

  debugger;
  const timeText = getTimeSpanText(span, message.waifu);
  const randomIndex = getRandomInt(0, startWords.length - 1);
  const startWord = startWords[randomIndex];

  return ` ${startWord}, ${timeText}`;
}

function getTimeSpanText(span: TimeSpan, waifu: Waifu): string {
  const totalDays = span.days;

  // Calculate years, months, weeks and remaining days
  const years = Math.floor(totalDays / 365);
  let remainingDays = totalDays % 365;

  const months = Math.floor(remainingDays / 30);
  remainingDays %= 30;

  const weeks = Math.floor(remainingDays / 7);
  remainingDays %= 7;

  // Form strings only for non-zero values
  const parts = [
    years > 0
      ? `${years} ${getCorrectForm(years, "год", "года", "лет")}`
      : null,
    months > 0
      ? `${months} ${getCorrectForm(months, "месяц", "месяца", "месяцев")}`
      : null,
    weeks > 0
      ? `${weeks} ${getCorrectForm(weeks, "неделя", "недели", "недель")}`
      : null,
    remainingDays > 0
      ? `${remainingDays} ${getCorrectForm(remainingDays, "день", "дня", "дней")}`
      : null,
    span.hours > 0
      ? `${span.hours} ${getCorrectForm(span.hours, "час", "часа", "часов")}`
      : null,
    span.minutes > 0
      ? `${span.minutes} ${getCorrectForm(span.minutes, "минута", "минуты", "минут")}`
      : null,
    span.seconds > 0
      ? `${span.seconds} ${getCorrectForm(span.seconds, "секунда", "секунды", "секунд")}`
      : null,
  ].filter(Boolean);

  const title = waifu.anime?.trim()
    ? " из аниме " + waifu.anime
    : " из манги " + waifu.manga;

  return `ты в браке с ${waifu.name}${title} уже ${parts.join(", ")}!`;
}

function getCorrectForm(
  number: number,
  form1: string,
  form2: string,
  form5: string,
): string {
  number = Math.abs(number) % 100;
  const remainder = number % 10;

  if (number > 10 && number < 20) return form5;
  if (remainder > 1 && remainder < 5) return form2;
  if (remainder === 1) return form1;
  return form5;
}

export interface WaifuAlertProps {
  waifu: Waifu & { isPrivated?: boolean };
  displayName: string;
  waifuHusband?: Host & { whenPrivated?: string };
  color?: string;
  avatarUrl?: string;
}

interface TimeSpan {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
