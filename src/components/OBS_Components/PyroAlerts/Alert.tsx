import { useCallback } from "react";

import { EnumMediaFileInfoType, MediaDto } from "@/shared/api";

import { Audio, Image, Video, Voice } from "./Primitive";
import TelegramSticker from "./Primitive/TelegramSticker";

interface Props {
  message?: MediaDto;
  remove: (message: MediaDto) => void;
}

export default function Alert(messageProps: Props) {
  const message = messageProps.message;

  if (!message) {
    throw new Error("Message is required");
  }

  const { fileInfo } = message.mediaInfo;
  const callback = useCallback(
    () => messageProps.remove(message),
    [message, messageProps]
  );

  switch (fileInfo.type) {
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
        />
      );
    case EnumMediaFileInfoType.Audio:
      return (
        <Audio
          key={message.mediaInfo.id}
          mediaInfo={message}
          callback={callback}
        />
      );
    case EnumMediaFileInfoType.Voice:
      return (
        <Voice
          key={message.mediaInfo.id}
          mediaInfo={message}
          callback={callback}
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
