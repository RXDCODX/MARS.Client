import { MikuModule, TwitchUser } from "@/shared/api";

export interface MikuModuleAlertProps {
  mikuModule: MikuModule;
  twitchUser: TwitchUser;
  color?: string;
}

export function getMikuModuleText(message: MikuModuleAlertProps) {
  return `теперь у тебя костюм ${message.mikuModule.japaneseName ?? message.mikuModule.title}`;
}
