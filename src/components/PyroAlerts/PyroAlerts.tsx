import { useCallback, useEffect, useState } from "react";
import { SignalRContext } from "../../app";
import Announce from "../../shared/Utils/Announce/Announce";
import { Audio, Image, Video, Voice } from "./Primitive";
import TelegramSticker from "./Primitive/TelegramSticker";
import {
  MediaDto,
  MediaFileInfoTypeEnum,
  MediaMetaInfoPriorityEnum,
} from "../../shared/api/generated/baza";
import { v4 as uuidv4 } from "uuid";

interface MessageProps {
  message: MediaDto;
  isHighPriority: boolean;
}

export default function PyroAlerts() {
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [highPriorityQueue, setHighPriorityQueue] = useState<MediaDto[]>([]);
  const [currentHighPriority, setCurrentHighPriority] =
    useState<MediaDto | null>(null);
  const [blockMessages, setBlockMessages] = useState<boolean>(false);
  const [announced, setAnnounced] = useState(false);

  // Обработчик для обычных алертов
  const handleRegularAlert = useCallback(
    (message: MediaDto) => {
      if (blockMessages) return;

      const parsedMessage: MediaDto = {
        ...message,
        mediaInfo: {
          ...message.mediaInfo,
          fileInfo: {
            ...message.mediaInfo.fileInfo,
            filePath: message.mediaInfo.fileInfo.isLocalFile
              ? import.meta.env.VITE_BASE_PATH +
                message.mediaInfo.fileInfo.filePath
              : message.mediaInfo.fileInfo.filePath,
          },
        },
      };

      setMessages((prev) => [
        ...prev,
        { message: parsedMessage, isHighPriority: false },
      ]);
    },
    [blockMessages],
  );

  // Обработчик для высокоприоритетных алертов
  const handleHighPriorityAlert = useCallback((message: MediaDto) => {
    const parsedMessage: MediaDto = {
      ...message,
      mediaInfo: {
        ...message.mediaInfo,
        fileInfo: {
          ...message.mediaInfo.fileInfo,
          filePath: message.mediaInfo.fileInfo.isLocalFile
            ? import.meta.env.VITE_BASE_PATH +
              message.mediaInfo.fileInfo.filePath
            : message.mediaInfo.fileInfo.filePath,
        },
      },
    };

    setBlockMessages(true);
    setMessages([]); // Очищаем все обычные алерты
    setHighPriorityQueue((prev) => [...prev, parsedMessage]); // Добавляем в очередь высокоприоритетных
  }, []);

  const handleAlert = useCallback(
    (message: MediaDto) => {
      message.mediaInfo.id = uuidv4();
      if (
        message.mediaInfo.metaInfo.priority === MediaMetaInfoPriorityEnum.High
      ) {
        handleHighPriorityAlert(message);
      } else {
        handleRegularAlert(message);
      }
    },
    [handleHighPriorityAlert, handleRegularAlert],
  );

  // Эффект для обработки очереди высокоприоритетных алертов
  useEffect(() => {
    if (highPriorityQueue.length > 0 && !currentHighPriority) {
      // Берем первый алерт из очереди
      const nextAlert = highPriorityQueue[0];
      setCurrentHighPriority(nextAlert);

      // Удаляем его из очереди через 2 секунды (время показа)
      const timer = setTimeout(() => {
        setHighPriorityQueue((prev) => prev.slice(1));
        setCurrentHighPriority(null);
      }, 2000);

      return () => clearTimeout(timer);
    } else if (highPriorityQueue.length === 0 && currentHighPriority === null) {
      // Когда очередь пуста, снимаем блокировку
      setBlockMessages(false);
    }
  }, [highPriorityQueue, currentHighPriority]);

  // Подписки на SignalR события
  SignalRContext.useSignalREffect("alert", handleAlert, [handleAlert]);
  SignalRContext.useSignalREffect(
    "alerts",
    (messages: MediaDto[]) => messages.forEach(handleAlert),
    [handleAlert],
  );

  const remove = useCallback((message: MediaDto) => {
    setMessages((prev) =>
      prev.filter((m) => m.message.mediaInfo.id !== message.mediaInfo.id),
    );
  }, []);

  const removeHighPrior = useCallback((message: MediaDto) => {
    SignalRContext.invoke("UnmuteSessions");
    setHighPriorityQueue((prev) =>
      prev.filter((m) => m.mediaInfo.id !== message.mediaInfo.id),
    );

    const newPriority = highPriorityQueue.some((e) => e)
      ? highPriorityQueue[0]
      : null;
    setCurrentHighPriority(newPriority);
  }, []);

  const HighPriorityAlert = useCallback(
    ({
      message,
      type,
      callback,
    }: {
      message: MediaDto;
      type: MediaFileInfoTypeEnum;
      callback: () => void;
    }) => {
      switch (type) {
        case MediaFileInfoTypeEnum.Image:
        case MediaFileInfoTypeEnum.Gif:
          return (
            <Image
              key={message.mediaInfo.id}
              mediaInfo={message}
              callBack={() => callback()}
            />
          );
        case MediaFileInfoTypeEnum.Video:
          return (
            <Video
              key={message.mediaInfo.id}
              MediaInfo={message}
              callback={() => callback()}
            />
          );
        case MediaFileInfoTypeEnum.Audio:
          return (
            <Audio
              key={message.mediaInfo.id}
              mediaInfo={message}
              callback={() => callback()}
            />
          );
        case MediaFileInfoTypeEnum.Voice:
          return (
            <Voice
              key={message.mediaInfo.id}
              mediaInfo={message}
              callback={() => callback()}
            />
          );
        case MediaFileInfoTypeEnum.TelegramSticker:
          return (
            <TelegramSticker
              key={message.mediaInfo.id}
              mediaInfo={message}
              callBack={() => callback()}
            />
          );
        default:
          return null;
      }
    },
    [],
  );

  return (
    <>
      {!announced && (
        <Announce title={"PyroAlerts"} callback={() => setAnnounced(true)} />
      )}

      {/* Рендерим текущий высокоприоритетный алерт */}
      {currentHighPriority && (
        <HighPriorityAlert
          message={currentHighPriority}
          type={currentHighPriority.mediaInfo.fileInfo.type}
          callback={() => removeHighPrior(currentHighPriority)}
        />
      )}

      {/* Рендерим обычные алерты, если нет высокоприоритетных */}
      {!currentHighPriority &&
        messages.map((messageProps) => {
          const message = messageProps.message;
          if (!message) return null;

          const { fileInfo } = message.mediaInfo;
          const callback = () => remove(message);

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
        })}
    </>
  );
}
