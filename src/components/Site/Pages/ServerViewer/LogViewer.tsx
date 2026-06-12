import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Input, Select, Space, Spin } from "antd";

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

  useEffect(() => {
    if (autoScroll && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs, autoScroll]);

  const scrollToTop = () => {
    if (containerRef.current) containerRef.current.scrollTop = 0;
    setAutoScroll(false);
  };
  const scrollToBottom = () => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    setAutoScroll(true);
  };
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight - scrollTop - clientHeight > 50) setAutoScroll(false);
    else setAutoScroll(true);
  };

  const filteredLogs = useMemo(
    () =>
      logs.filter(
        log =>
          (!level || log.level === level) &&
          (!search ||
            log.message.toLowerCase().includes(search.toLowerCase()) ||
            (log.exception &&
              log.exception.toLowerCase().includes(search.toLowerCase())))
      ),
    [logs, level, search]
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
        <Button size="small" onClick={onClose}>
          Закрыть
        </Button>
      </div>
      <div
        style={{ display: "flex", gap: 8, alignItems: "center", padding: 8 }}
      >
        <Input
          size="small"
          placeholder="Поиск по сообщению или exception..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 220 }}
        />
        <Select
          size="small"
          value={level}
          onChange={val => setLevel(val)}
          options={levelOptions}
          style={{ maxWidth: 120 }}
        />
      </div>
      <Space style={{ margin: 8 }}>
        <Button size="small" onClick={scrollToTop}>
          В начало
        </Button>
        <Button size="small" onClick={scrollToBottom}>
          В конец
        </Button>
        <Button
          size="small"
          type={autoScroll ? "primary" : "default"}
          onClick={() => setAutoScroll(v => !v)}
        >
          {autoScroll ? "Автоскролл" : "Без автоскролла"}
        </Button>
      </Space>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        style={{ flex: 1, overflowY: "auto", padding: 8, background: "#222" }}
      >
        {loading ? (
          <div style={{ textAlign: "center", margin: "16px 0" }}>
            <Spin /> Загрузка логов...
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
