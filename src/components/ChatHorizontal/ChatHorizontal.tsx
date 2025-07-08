import { useEffect, useRef, useState } from "react";

import { SignalRContext } from "../../app";
import { ChatMessage } from "../../shared/api/generated/baza";
import Announce from "../../shared/Utils/Announce/Announce";
import { Message } from "./Message";

interface ChatHorizontalProps {
  messages?: ChatMessage[];
  onRemoveMessage?: (id: string) => void;
}

export default function ChatHorizontal({
  messages: externalMessages,
  onRemoveMessage,
}: ChatHorizontalProps) {
  const [internalMessages, setInternalMessages] = useState<ChatMessage[]>([]);
  const [announced, setAnnounced] = useState(false);

  // --- SLOT SYSTEM ---
  const SLOT_HEIGHT = 60; // px, можно скорректировать под среднюю высоту сообщения
  const [slots, setSlots] = useState<(string | null)[]>([]); // id сообщения или null
  const [queue, setQueue] = useState<ChatMessage[]>([]);
  const slotCountRef = useRef(0);

  // Вычисляем количество слотов при монтировании/изменении размера окна
  useEffect(() => {
    const updateSlots = () => {
      const count = Math.max(1, Math.floor(window.innerHeight / SLOT_HEIGHT));
      slotCountRef.current = count;
      setSlots((prev) => {
        if (prev.length === count) return prev;
        // Если увеличилось — добавляем null, если уменьшилось — обрезаем
        if (prev.length < count)
          return [...prev, ...Array(count - prev.length).fill(null)];
        return prev.slice(0, count);
      });
    };
    updateSlots();
    window.addEventListener("resize", updateSlots);
    return () => window.removeEventListener("resize", updateSlots);
  }, []);

  // Используем внешние сообщения или внутренние
  const messages =
    externalMessages !== undefined ? externalMessages : internalMessages;
  const handleRemove =
    onRemoveMessage ||
    ((id: string) => {
      setInternalMessages((prev) => prev.filter((m) => m.id !== id));
    });

  // SignalR эффекты только если не переданы внешние сообщения
  SignalRContext.useSignalREffect(
    "NewMessage",
    (id: string, message: ChatMessage) => {
      if (externalMessages) {
        return;
      }
      message.id ??= id;
      setInternalMessages((prev) => {
        while (prev.length >= 50) {
          prev.pop();
        }
        if (prev.find((m) => m.id === message.id)) {
          return prev;
        } else {
          return [message, ...prev];
        }
      });
    },
    [],
  );

  SignalRContext.useSignalREffect(
    "deletemessage",
    (id: string) => {
      setInternalMessages((prev) => prev.filter((m) => m.id !== id));
    },
    [],
  );

  // --- SLOT LOGIC ---
  // Сопоставление id сообщения -> индекс слота
  const [messageSlotMap, setMessageSlotMap] = useState<Record<string, number>>(
    {},
  );

  // Когда приходит новое сообщение — пытаемся положить в свободный слот или в очередь
  useEffect(() => {
    // Берем только новые сообщения, которых нет в слотах и очереди
    const activeIds = new Set([
      ...(slots.filter(Boolean) as string[]),
      ...queue.map((m) => m.id!),
    ]);
    const newMessages = messages.filter((m) => !activeIds.has(m.id!));
    if (newMessages.length === 0) return;
    setQueue((prev) => [...prev, ...newMessages]);
  }, [messages, slots, queue]);

  // Когда есть свободные слоты и очередь — размещаем сообщения
  useEffect(() => {
    if (queue.length === 0) return;
    setSlots((prevSlots) => {
      const newSlots = [...prevSlots];
      let changed = false;
      const newMessageSlotMap = { ...messageSlotMap };
      queue.forEach((msg) => {
        const freeIdx = newSlots.findIndex((s) => s === null);
        if (freeIdx !== -1) {
          newSlots[freeIdx] = msg.id!;
          newMessageSlotMap[msg.id!] = freeIdx;
          changed = true;
        }
      });
      if (changed) {
        setMessageSlotMap(newMessageSlotMap);
        // Удаляем из очереди те, что заняли слот
        setQueue((prevQueue) =>
          prevQueue.filter((msg) => !newSlots.includes(msg.id!)),
        );
        return newSlots;
      }
      return prevSlots;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queue, slots]);

  // Когда сообщение завершает анимацию — освобождаем слот
  const removeFromSlot = (message: ChatMessage) => {
    const slotIdx = messageSlotMap[message.id!];
    setSlots((prev) => {
      const newSlots = [...prev];
      if (slotIdx !== undefined) newSlots[slotIdx] = null;
      return newSlots;
    });
    setMessageSlotMap((prev) => {
      const copy = { ...prev };
      delete copy[message.id!];
      return copy;
    });
    handleRemove(message.id!);
  };

  // ---
  return (
    <>
      {!announced && (
        <Announce
          title={"Chat Horizontal"}
          callback={() => setAnnounced(true)}
        />
      )}
      {slots.map((msgId, slotIdx) => {
        if (!msgId) return null;
        const msg = messages.find((m) => m.id === msgId);
        if (!msg) return null;
        return (
          <Message
            key={msg.id}
            message={msg}
            callback={() => removeFromSlot(msg)}
            slotTop={slotIdx * SLOT_HEIGHT}
          />
        );
      })}
    </>
  );
}
