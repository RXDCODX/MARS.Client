import { Fumo } from "@/shared/api";

export interface FumoAlertProps {
  fumo: Fumo;
  displayName: string;
  color?: string;
}

export function getFumoText(message: FumoAlertProps) {
  return `тебе выпал(-а) ${message.fumo.character}`;
}

export function getFumoTitle(message: FumoAlertProps) {
  return `Fumo ${message.fumo.character}`;
}
