import { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

import {
  MediaFileInfoTypeEnum,
  MediaMetaInfoPriorityEnum,
  RandomMeme,
} from "@/shared/api";
import { TelegramusHubSignalRContext as SignalRContext } from "@/shared/api";
import { useToastModal } from "@/shared/Utils";
import Announce from "@/shared/Utils/Announce/Announce";

import Alert from "../PyroAlerts/Alert";
import HighPriorityAlert from "../PyroAlerts/HighPriorityAlert";
import RandomMemDetails from "./RandomMemDetails";

export default function PyroAlerts() {
  const [messages, setMessages] = useState<MediaDto[]>([]);
  const [highPriorityQueue, setHighPriorityQueue] = useState<MediaDto[]>([]);
  const [currentHighPriority, setCurrentHighPriority] =
    useState<MediaDto | null>(null);
  const [announced, setAnnounced] = useState(false);

  // UI state
  const [activeKey, setActiveKey] = useState<string>("queue");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [typeFilter, setTypeFilter] = useState<MediaFileInfoTypeEnum | "All">(
    "All"
  );
  const [memeTypes, setMemeTypes] = useState<
    { id: number; name: string; folderPath: string }[]
  >([]);
  const [isLoadingTypes, setIsLoadingTypes] = useState(false);

  const { showToast } = useToastModal();

  const selectedItem = useMemo(
    () => messages.find(m => m.mediaInfo.id === selectedId) || null,
    [messages, selectedId]
  );

  const allTypeOptions: ("All" | MediaFileInfoTypeEnum)[] = useMemo(
    () => [
      "All",
      MediaFileInfoTypeEnum.Image,
      MediaFileInfoTypeEnum.Gif,
      MediaFileInfoTypeEnum.Video,
      MediaFileInfoTypeEnum.Audio,
      MediaFileInfoTypeEnum.Voice,
      MediaFileInfoTypeEnum.TelegramSticker,
    ],
    []
  );

  const filteredMessages = useMemo(() => {
    const byType =
      typeFilter === "All"
        ? messages
        : messages.filter(m => m.mediaInfo.fileInfo.type === typeFilter);

    if (!searchText.trim()) return byType;
    const q = searchText.trim().toLowerCase();
    return byType.filter(m => {
      const a = m.mediaInfo.metaInfo.displayName?.toLowerCase() ?? "";
      const b = m.mediaInfo.textInfo.text?.toLowerCase() ?? "";
      const c = m.mediaInfo.fileInfo.fileName?.toLowerCase?.() ?? "";
      return a.includes(q) || b.includes(q) || c.includes(q);
    });
  }, [messages, typeFilter, searchText]);

  const handleAlert = useCallback(
    (message: MediaDto) => {
      message.mediaInfo.id = uuidv4();

      switch (message.mediaInfo.metaInfo.priority) {
        case MediaMetaInfoPriorityEnum.High: {
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

          setHighPriorityQueue(prev => [...prev, parsedMessage]); // Добавляем в очередь высокоприоритетных
          setMessages([]);
          break;
        }
        case MediaMetaInfoPriorityEnum.Low:
        case MediaMetaInfoPriorityEnum.Normal: {
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

          setMessages(prev => {
            const next = [...prev, coolMessage];
            showToast({
              type: "success",
              title: "Новый мем",
              message:
                coolMessage.mediaInfo.metaInfo.displayName ||
                coolMessage.mediaInfo.fileInfo.fileName,
            });
            return next;
          });
          break;
        }
      }
    },
    [showToast]
  );

  const remove = useCallback(
    (message: MediaDto) => {
      setMessages(prev =>
        prev.filter(m => m.mediaInfo.id !== message.mediaInfo.id)
      );
      if (selectedId === message.mediaInfo.id) {
        setSelectedId(null);
      }
      showToast({
        type: "info",
        title: "Мем удалён",
        message: message.mediaInfo.fileInfo.fileName,
      });
    },
    [selectedId, showToast]
  );

  const removeHighPrior = useCallback(
    (message: MediaDto) => {
      setHighPriorityQueue(prev =>
        prev.filter(m => m.mediaInfo.id !== message.mediaInfo.id)
      );

      const newPriority = highPriorityQueue.some(e => e)
        ? highPriorityQueue[0]
        : null;
      setCurrentHighPriority(newPriority);
    },
    [highPriorityQueue]
  );

  // Эффект для обработки очереди высокоприоритетных алертов
  useEffect(() => {
    if (highPriorityQueue.length > 0 && !currentHighPriority) {
      // Берем первый алерт из очереди
      const nextAlert = highPriorityQueue[0];
      setCurrentHighPriority(nextAlert);

      // Удаляем его из очереди через 2 секунды (время показа)
      const timer = setTimeout(() => {
        setHighPriorityQueue(prev => prev.slice(1));
        setCurrentHighPriority(null);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [highPriorityQueue, currentHighPriority]);

  // Подписки на SignalR события
  SignalRContext.useSignalREffect("RandomMem", handleAlert, [handleAlert]);

  // Load meme types when switching to Types tab (and once on first enter)
  useEffect(() => {
    if (activeKey !== "types") return;
    let ignore = false;
    const load = async () => {
      try {
        setIsLoadingTypes(true);
        const api = new RandomMeme();
        const res = await api.randomMemeTypesList();
        if (!ignore) {
          setMemeTypes(res.data ?? []);
          showToast({
            type: "success",
            title: "Типы мемов",
            message: `Загружено: ${res.data?.length ?? 0}`,
          });
        }
      } catch {
        showToast({
          type: "error",
          title: "Ошибка",
          message: "Не удалось загрузить типы мемов",
        });
      } finally {
        setIsLoadingTypes(false);
      }
    };
    load();
    return () => {
      ignore = true;
    };
  }, [activeKey, showToast]);

  const moveItem = useCallback(
    (id: string, direction: -1 | 1) => {
      setMessages(prev => {
        const index = prev.findIndex(m => m.mediaInfo.id === id);
        if (index < 0) return prev;
        const newIndex = index + direction;
        if (newIndex < 0 || newIndex >= prev.length) return prev;
        const next = [...prev];
        const [item] = next.splice(index, 1);
        next.splice(newIndex, 0, item);
        showToast({
          type: "info",
          title: "Порядок очереди",
          message: `Элемент перемещён на позицию ${newIndex + 1}`,
        });
        return next;
      });
    },
    [showToast]
  );

  return (
    <>
      {!announced && (
        <Announce title={"RandomMem"} callback={() => setAnnounced(true)} />
      )}

      {/* Top-right controls panel */}
      <div
        style={{
          position: "absolute",
          top: 8,
          left: 8,
          zIndex: 10,
          width: 520,
          background: "var(--site-bg-primary)",
          border: "1px solid var(--site-border-secondary)",
          borderRadius: 12,
          padding: 8,
        }}
        onClick={e => e.stopPropagation()}
      >
        <Tabs
          activeKey={activeKey}
          onSelect={k => setActiveKey(k || "queue")}
          id="randommem-tabs"
          justify
        >
          <Tab eventKey="queue" title="Очередь">
            <div style={{ padding: 8 }}>
              <Row className="g-2" style={{ marginBottom: 8 }}>
                <Col xs={7}>
                  <Form.Control
                    size="sm"
                    placeholder="Поиск по имени/тексту/файлу"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                  />
                </Col>
                <Col xs={5}>
                  <Form.Select
                    size="sm"
                    value={typeFilter}
                    onChange={e =>
                      setTypeFilter(
                        e.target.value as MediaFileInfoTypeEnum | "All"
                      )
                    }
                  >
                    {allTypeOptions.map(t => (
                      <option key={t} value={t}>
                        {t === "All" ? "Все типы" : t}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
              </Row>

              <div style={{ maxHeight: 260, overflow: "auto" }}>
                {filteredMessages.length === 0 ? (
                  <div style={{ padding: 8, opacity: 0.7 }}>Очередь пуста</div>
                ) : (
                  filteredMessages.map((m, i) => (
                    <div
                      key={m.mediaInfo.id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: 6,
                        borderRadius: 8,
                        background:
                          selectedId === m.mediaInfo.id
                            ? "var(--site-bg-secondary)"
                            : "transparent",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedId(m.mediaInfo.id);
                      }}
                    >
                      <div
                        style={{ width: 24, textAlign: "right", opacity: 0.7 }}
                      >
                        {i + 1}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {m.mediaInfo.metaInfo.displayName ||
                            m.mediaInfo.fileInfo.fileName}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            opacity: 0.7,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {m.mediaInfo.fileInfo.type} ·{" "}
                          {m.mediaInfo.fileInfo.fileName}
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          disabled={i === 0}
                          onClick={e => {
                            e.stopPropagation();
                            moveItem(m.mediaInfo.id, -1);
                          }}
                        >
                          ▲
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          disabled={i === filteredMessages.length - 1}
                          onClick={e => {
                            e.stopPropagation();
                            moveItem(m.mediaInfo.id, 1);
                          }}
                        >
                          ▼
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={e => {
                            e.stopPropagation();
                            remove(m);
                          }}
                        >
                          Удалить
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </Tab>
          <Tab eventKey="types" title="Типы">
            <div style={{ padding: 8, maxHeight: 320, overflow: "auto" }}>
              {isLoadingTypes ? (
                <div style={{ padding: 8, opacity: 0.7 }}>Загрузка...</div>
              ) : memeTypes.length === 0 ? (
                <div style={{ padding: 8, opacity: 0.7 }}>Типы отсутствуют</div>
              ) : (
                memeTypes.map(
                  (t: { id: number; name: string; folderPath: string }) => (
                    <div
                      key={t.id}
                      style={{
                        padding: 8,
                        marginBottom: 6,
                        border: "1px solid var(--site-border-secondary)",
                        borderRadius: 8,
                        background: "var(--site-bg-secondary)",
                      }}
                    >
                      <div style={{ fontWeight: 600 }}>{t.name}</div>
                      <div style={{ fontSize: 12, opacity: 0.8 }}>
                        {t.folderPath}
                      </div>
                    </div>
                  )
                )
              )}
            </div>
          </Tab>
        </Tabs>
      </div>

      {selectedItem && (
        <RandomMemDetails
          item={selectedItem}
          onClose={() => setSelectedId(null)}
        />
      )}

      {/* Debug info */}
      {selectedId && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "red",
            color: "white",
            padding: "5px",
            zIndex: 1001,
            fontSize: "12px",
          }}
        >
          Selected: {selectedId}
        </div>
      )}

      {/* Render HP alert over everything */}
      {currentHighPriority && (
        <HighPriorityAlert
          key={currentHighPriority.mediaInfo.id}
          message={currentHighPriority}
          type={currentHighPriority.mediaInfo.fileInfo.type}
          callback={() => removeHighPrior(currentHighPriority)}
        />
      )}

      {/* Render normal alerts if no HP playing */}
      {!currentHighPriority &&
        messages.map(messageProps => (
          <Alert
            key={messageProps.mediaInfo.id}
            message={messageProps}
            remove={remove}
          />
        ))}
    </>
  );
}
