import { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { SignalRContext } from "../../app";
import {
  MediaDto,
  MediaMetaInfoPriorityEnum,
} from "../../shared/api/generated/baza";
import Announce from "../../shared/Utils/Announce/Announce";
import Alert from "../PyroAlerts/Alert";
import HighPriorityAlert from "../PyroAlerts/HighPriorityAlert";

export default function PyroAlerts() {
  const [messages, setMessages] = useState<MediaDto[]>([]);
  const [highPriorityQueue, setHighPriorityQueue] = useState<MediaDto[]>([]);
  const [currentHighPriority, setCurrentHighPriority] =
    useState<MediaDto | null>(null);
  const [announced, setAnnounced] = useState(false);

  const handleAlert = useCallback((message: MediaDto) => {
    message.mediaInfo.id = uuidv4();

    switch (message.mediaInfo.metaInfo.priority) {
      case MediaMetaInfoPriorityEnum.High:
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

        setHighPriorityQueue((prev) => [...prev, parsedMessage]); // Добавляем в очередь высокоприоритетных
        setMessages([]);
        break;
      case MediaMetaInfoPriorityEnum.Low:
      case MediaMetaInfoPriorityEnum.Normal:
        const coolMessage: MediaDto = {
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

        setMessages((prev) => [...prev, coolMessage]);
        break;
    }
  }, []);

  const remove = useCallback((message: MediaDto) => {
    setMessages((prev) =>
      prev.filter((m) => m.mediaInfo.id !== message.mediaInfo.id),
    );
  }, []);

  const removeHighPrior = useCallback((message: MediaDto) => {
    setHighPriorityQueue((prev) =>
      prev.filter((m) => m.mediaInfo.id !== message.mediaInfo.id),
    );

    const newPriority = highPriorityQueue.some((e) => e)
      ? highPriorityQueue[0]
      : null;
    setCurrentHighPriority(newPriority);
  }, []);

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
    }
  }, [highPriorityQueue, currentHighPriority]);

  // Подписки на SignalR события
  SignalRContext.useSignalREffect("RandomMem", handleAlert, [handleAlert]);

  return (
    <>
      {!announced && (
        <Announce title={"RandomMem"} callback={() => setAnnounced(true)} />
      )}

      {/* Рендерим текущий высокоприоритетный алерт */}
      {currentHighPriority && (
        <HighPriorityAlert
          key={currentHighPriority.mediaInfo.id}
          message={currentHighPriority}
          type={currentHighPriority.mediaInfo.fileInfo.type}
          callback={() => removeHighPrior(currentHighPriority)}
        />
      )}

      {/* Рендерим обычные алерты, если нет высокоприоритетных */}
      {!currentHighPriority &&
        messages.map((messageProps) => (
          <Alert
            key={messageProps.mediaInfo.id}
            message={messageProps}
            remove={remove}
          />
        ))}
    </>
  );
}
