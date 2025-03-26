import { useCallback, useState } from "react";

import { SignalRContext } from "../../app";
import Announce from "../../shared/Utils/Announce/Announce";
import { Audio, Image, Video, Voice } from "./Primitive";
import TelegramSticker from "./Primitive/TelegramSticker";
import {
  MediaDto,
  MediaFileInfoTypeEnum,
} from "../../shared/api/generated/baza";

export default function PyroAlerts() {
  document.title = "PyroAlerts";

  const [messages, setMessages] = useState<MediaDto[]>([]);
  const [announced, setAnnounced] = useState(false);

  SignalRContext.useSignalREffect(
    "alert",
    (message: MediaDto) => {
      const parsedMessage: MediaDto = { ...message };
      parsedMessage.mediaInfo.fileInfo.filePath = parsedMessage.mediaInfo
        .fileInfo.isLocalFile
        ? import.meta.env.VITE_BASE_PATH +
          parsedMessage.mediaInfo.fileInfo.filePath
        : parsedMessage.mediaInfo.fileInfo.filePath;

      console.log(parsedMessage);
      setMessages((prev) => [...prev, parsedMessage]);
    },
    [],
  );

  SignalRContext.useSignalREffect(
    "alerts",
    (messages: MediaDto[]) => {
      messages.forEach((m) => {
        const parsedMessage: MediaDto = { ...m };
        parsedMessage.mediaInfo.fileInfo.filePath = parsedMessage.mediaInfo
          .fileInfo.isLocalFile
          ? import.meta.env.VITE_BASE_PATH +
            parsedMessage.mediaInfo.fileInfo.filePath
          : parsedMessage.mediaInfo.fileInfo.filePath;

        console.log(parsedMessage);
        setMessages((prev) => [...prev, parsedMessage]);
      });
    },
    [],
  );

  const remove = useCallback((message: MediaDto) => {
    setMessages((prev) =>
      prev.filter((m) => m.mediaInfo.id !== message.mediaInfo.id),
    );
  }, []);

  return (
    <>
      {!announced && (
        <Announce title={"PyroAlerts"} callback={() => setAnnounced(true)} />
      )}
      {messages.map((message) => {
        if (!message) return null;

        const { fileInfo } = message.mediaInfo;
        const callback = () => remove(message);

        switch (fileInfo.type) {
          case MediaFileInfoTypeEnum.Image || MediaFileInfoTypeEnum.Gif:
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
        }
      })}
    </>
  );
}
