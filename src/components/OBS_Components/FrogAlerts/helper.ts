import { Frog, TwitchUser } from "@/shared/api";

export interface FrogAlertProps {
  frog: Frog;
  twitchUser: TwitchUser;
  color?: string;
}

export function getFrogText(message: FrogAlertProps) {
  return `тебе выпал(-а) ${message.frog.russianName ?? message.frog.commonName}`;
}
