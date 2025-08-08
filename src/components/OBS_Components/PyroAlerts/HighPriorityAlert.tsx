import { useCallback } from "react";

import { EnumMediaFileInfoType, MediaDto } from "@/shared/api";

import { Audio, Image, Video, Voice } from "./Primitive";
import TelegramSticker from "./Primitive/TelegramSticker";

export interface AlertDestination {
  message: MediaDto;
  type: EnumMediaFileInfoType;
  callback: () => void;
}

export default function HighPriorityAlert(alert: AlertDestination) {
  const message = alert.message;
  const callback = useCallback(() => alert.callback(), [alert]);

  switch (alert.type) {
    case EnumMediaFileInfoType.Image:
    case EnumMediaFileInfoType.Gif:
      return (
        <Image
          key={message.mediaInfo.id}
          mediaInfo={message}
          callBack={callback}
        />
      );
    case EnumMediaFileInfoType.Video:
      return (
        <Video
          key={message.mediaInfo.id}
          MediaInfo={message}
          callback={callback}
          isHighPrior
        />
      );
    case EnumMediaFileInfoType.Audio:
      return (
        <Audio
          key={message.mediaInfo.id}
          mediaInfo={message}
          callback={callback}
          isHighPrior
        />
      );
    case EnumMediaFileInfoType.Voice:
      return (
        <Voice
          key={message.mediaInfo.id}
          mediaInfo={message}
          callback={callback}
          isHighPrior
        />
      );
    case EnumMediaFileInfoType.TelegramSticker:
      return (
        <TelegramSticker
          key={message.mediaInfo.id}
          mediaInfo={message}
          callBack={callback}
        />
      );
    default:
      return null;
  }
}
