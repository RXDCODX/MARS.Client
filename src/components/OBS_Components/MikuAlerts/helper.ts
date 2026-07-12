import { MikuModule, TwitchUser } from "@/shared/api";

export interface MikuAlertProps {
  mikuModule: MikuModule;
  twitchUser: TwitchUser;
  color?: string;
  collectedCount?: number;
  totalCount?: number;
}

export function getMikuText(message: MikuAlertProps) {
  return `теперь у тебя костюм ${message.mikuModule.japaneseName ?? message.mikuModule.title}`;
}
