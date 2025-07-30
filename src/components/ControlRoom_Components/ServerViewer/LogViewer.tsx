import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, ButtonGroup, Form, Spinner } from "react-bootstrap";

export interface LogViewerProps {
  logs: {
    timestamp: string;
    level: string;
    message: string;
    exception?: string;
  }[];
  loading: boolean;
  onClose: () => void;
  serviceName?: string;
}

const levelOptions = [
  { value: "", label: "Все" },
  { value: "Error", label: "Error" },
  { value: "Warning", label: "Warning" },
  { value: "Info", label: "Info" },
];

const LogViewer: React.FC<LogViewerProps> = ({
  logs,
  loading,
  onClose,
  serviceName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");

  // Автоскролл к концу при новых логах
  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  // Скролл к началу
  const scrollToTop = () => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
    setAutoScroll(false);
  };
  // Скролл к концу
  const scrollToBottom = () => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    setAutoScroll(true);
  };
  // Отключать автоскролл если пользователь скроллит вверх
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight - scrollTop - clientHeight > 50) setAutoScroll(false);
    else setAutoScroll(true);
  };

  // Фильтрация логов
  const filteredLogs = useMemo(
    () =>
      logs.filter(
        (log) =>
          (!level || log.level === level) &&
          (!search ||
            log.message.toLowerCase().includes(search.toLowerCase()) ||
            (log.exception &&
              log.exception.toLowerCase().includes(search.toLowerCase()))),
      ),
    [logs, level, search],
  );

  return (
    <div
      style={{
        background: "#222",
        color: "#eee",
        fontFamily: "monospace",
        fontSize: 14,
        height: 600,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 8,
          borderBottom: "1px solid #444",
        }}
      >
        <b>Логи сервиса: {serviceName}</b>
        <Button variant="secondary" size="sm" onClick={onClose}>
          Закрыть
        </Button>
      </div>
      <div
        style={{ display: "flex", gap: 8, alignItems: "center", padding: 8 }}
      >
        <Form.Control
          size="sm"
          placeholder="Поиск по сообщению или exception..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 220 }}
        />
        <Form.Select
          size="sm"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{ maxWidth: 120 }}
        >
          {levelOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Form.Select>
      </div>
      <ButtonGroup style={{ margin: 8 }}>
        <Button size="sm" variant="outline-light" onClick={scrollToTop}>
          В начало
        </Button>
        <Button size="sm" variant="outline-light" onClick={scrollToBottom}>
          В конец
        </Button>
        <Button
          size="sm"
          variant={autoScroll ? "success" : "outline-secondary"}
          onClick={() => setAutoScroll((v) => !v)}
        >
          {autoScroll ? "Автоскролл" : "Без автоскролла"}
        </Button>
      </ButtonGroup>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{ flex: 1, overflowY: "auto", padding: 8, background: "#222" }}
      >
        {loading ? (
          <div className="text-center my-4">
            <Spinner animation="border" variant="light" /> Загрузка логов...
          </div>
        ) : filteredLogs.length === 0 ? (
          <div>Нет логов</div>
        ) : (
          filteredLogs.map((log, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.2 }}
              style={{ marginBottom: 8 }}
            >
              <span
                style={{
                  color:
                    log.level === "Error"
                      ? "#ff6b6b"
                      : log.level === "Warning"
                        ? "#ffd166"
                        : "#6bcf6b",
                }}
              >
                [{new Date(log.timestamp).toLocaleTimeString()}] {log.level}:
              </span>{" "}
              {log.message}
              {log.exception && (
                <div style={{ color: "#ffbaba" }}>
                  Exception: {log.exception}
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default LogViewer;
