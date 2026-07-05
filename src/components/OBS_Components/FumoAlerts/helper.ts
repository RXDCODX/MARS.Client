import { Fumo, TwitchUser } from "@/shared/api";

export interface FumoAlertProps {
  fumo: Fumo;
  twitchUser: TwitchUser;
  color?: string;
}

export function getFumoText(message: FumoAlertProps) {
  return `тебе выпал(-а) ${message.fumo.characterTranslit ?? message.fumo.character}`;
}
