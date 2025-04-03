import { MediaDto, MediaFileInfoTypeEnum } from "../../shared/api/generated/baza";
import { Audio, Image, Video, Voice } from "./Primitive";
import TelegramSticker from "./Primitive/TelegramSticker";

interface Props {
  message?: MediaDto;
  remove: (message: MediaDto) => void;
}

export default function Alert(messageProps: Props) {
  const message = messageProps.message;
  if (!message) return null;

  const { fileInfo } = message.mediaInfo;
  const callback = () => messageProps.remove(message);

  switch (fileInfo.type) {
    case MediaFileInfoTypeEnum.Image:
    case MediaFileInfoTypeEnum.Gif:
      return (
        <Image
          key={message.mediaInfo.id}
          mediaInfo={message}
          callBack={callback}
        />
      );
    case MediaFileInfoTypeEnum.Video:
      return (
        <Video
          key={message.mediaInfo.id}
          MediaInfo={message}
          callback={callback}
        />
      );
    case MediaFileInfoTypeEnum.Audio:
      return (
        <Audio
          key={message.mediaInfo.id}
          mediaInfo={message}
          callback={callback}
        />
      );
    case MediaFileInfoTypeEnum.Voice:
      return (
        <Voice
          key={message.mediaInfo.id}
          mediaInfo={message}
          callback={callback}
        />
      );
    case MediaFileInfoTypeEnum.TelegramSticker:
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
