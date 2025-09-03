import { Download, Eye, List, Table as TableIcon } from "lucide-react";
import { useState } from "react";
import { Button, Modal, Spinner, Table } from "react-bootstrap";

import styles from "../LogsPage.module.scss";
import { Log, LogsTableProps } from "../LogsPage.types";

const LogsTable: React.FC<LogsTableProps> = ({
  logs,
  isLoading,
  currentPage,
  pageSize,
  totalPages,
  totalCount,
  onPageChange,
  onPageSizeChange,
}) => {
  const [selectedLog, setSelectedLog] = useState<Log | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [viewMode, setViewMode] = useState<"table" | "text">("table");

  const formatTimestamp = (timestamp: string) =>
    new Date(timestamp).toLocaleString("ru-RU", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZone: "UTC", // Отображаем время в UTC без добавления локального часового пояса
    });

  const formatLogForText = (log: Log) => {
    const timestamp = formatTimestamp(log.whenLogged);
    return `[${log.logLevel}](${timestamp}): ${log.message}`;
  };

  const formatAllLogsAsText = () =>
    logs.map(log => formatLogForText(log)).join("\n");

  const getLogLevelBadge = (level: string) => {
    const levelClass = level.toLowerCase();
    return <span className={`${styles.logLevel} ${levelClass}`}>{level}</span>;
  };

  const handleViewDetails = (log: Log) => {
    setSelectedLog(log);
    setShowDetailsModal(true);
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setSelectedLog(null);
  };

  const handleExportLog = (log: Log) => {
    const logData = {
      timestamp: log.whenLogged,
      level: log.logLevel,
      message: log.message,
      stackTrace: log.stackTrace,
    };

    const blob = new Blob([JSON.stringify(logData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `log-${log.id}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (isLoading) {
    return (
      <div className={styles.logsTableCard}>
        <div className={styles.loadingSpinner}>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Загрузка логов...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  if (logs.length === 0) {
    return (
      <div className={styles.logsTableCard}>
        <div className={styles.emptyState}>
          <div className={styles.icon}>📋</div>
          <h4>Логи не найдены</h4>
          <p>Попробуйте изменить параметры поиска или фильтры</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.logsTableCard}>
        <div className={styles.tableHeader}>
          <div className="d-flex justify-content-between align-items-center">
            <h3>Логи приложения ({totalCount.toLocaleString()})</h3>
            <div className="d-flex gap-2">
              <Button
                variant={viewMode === "table" ? "primary" : "outline-primary"}
                size="sm"
                onClick={() => setViewMode("table")}
                className="d-flex align-items-center gap-1"
              >
                <TableIcon size={16} />
                Таблица
              </Button>
              <Button
                variant={viewMode === "text" ? "primary" : "outline-primary"}
                size="sm"
                onClick={() => setViewMode("text")}
                className="d-flex align-items-center gap-1"
              >
                <List size={16} />
                Текст
              </Button>
            </div>
          </div>
        </div>

        {viewMode === "table" ? (
          <div style={{ overflowX: "auto" }}>
            <Table className={styles.logsTable} responsive>
              <thead>
                <tr>
                  <th>Время</th>
                  <th>Уровень</th>
                  <th>Сообщение</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id}>
                    <td className={styles.timestamp}>
                      {formatTimestamp(log.whenLogged)}
                    </td>
                    <td>{getLogLevelBadge(log.logLevel)}</td>
                    <td className={styles.message}>
                      <div style={{ maxWidth: "400px" }}>
                        {log.message}
                        {log.stackTrace && (
                          <div className="mt-2">
                            <small className="text-muted">
                              Есть стек-трейс
                            </small>
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() => handleViewDetails(log)}
                          title="Просмотреть детали"
                          className="d-flex align-items-center gap-1"
                        >
                          <Eye size={14} />
                          Детали
                        </Button>

                        <Button
                          variant="outline-success"
                          size="sm"
                          onClick={() => handleExportLog(log)}
                          title="Экспортировать лог"
                          className="d-flex align-items-center gap-1"
                        >
                          <Download size={14} />
                          Экспорт
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <div className="p-3">
            <textarea
              className="form-control"
              style={{
                height: "400px",
                fontFamily: "monospace",
                fontSize: "0.9rem",
                backgroundColor: "var(--site-bg-primary)",
                color: "var(--site-text-primary)",
                border: "1px solid var(--site-border-primary)",
              }}
              value={formatAllLogsAsText()}
              readOnly
              placeholder="Логи будут отображены здесь..."
            />
            <div className="mt-2 d-flex justify-content-between align-items-center">
              <small className="text-muted">
                Показано {logs.length} из {totalCount.toLocaleString()} записей
              </small>
              <Button
                variant="outline-success"
                size="sm"
                onClick={() => {
                  const textContent = formatAllLogsAsText();
                  const blob = new Blob([textContent], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `logs-${new Date().toISOString().slice(0, 10)}.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="d-flex align-items-center gap-1"
              >
                <Download size={14} />
                Экспорт в TXT
              </Button>
            </div>
          </div>
        )}

        {/* Пагинация */}
        <div className={styles.paginationContainer}>
          <div className={styles.paginationInfo}>
            Показано {(currentPage - 1) * pageSize + 1} -{" "}
            {Math.min(currentPage * pageSize, totalCount)} из{" "}
            {totalCount.toLocaleString()} записей
          </div>

          <div className="d-flex gap-2 align-items-center">
            <span>Страница:</span>
            <select
              value={currentPage}
              onChange={e => onPageChange(Number(e.target.value))}
              className="form-select form-select-sm"
              style={{ width: "auto" }}
            >
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <option key={page} value={page}>
                  {page}
                </option>
              ))}
            </select>

            <span>из {totalPages}</span>
          </div>

          <div className="d-flex gap-2 align-items-center">
            <span>Записей на странице:</span>
            <select
              value={pageSize}
              onChange={e => onPageSizeChange(Number(e.target.value))}
              className="form-select form-select-sm"
              style={{ width: "auto" }}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>
        </div>
      </div>

      {/* Модальное окно с деталями лога */}
      <Modal
        show={showDetailsModal}
        onHide={handleCloseModal}
        size="lg"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Детали лога</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedLog && (
            <div>
              <div className="row mb-3">
                <div className="col-md-3">
                  <strong>ID:</strong>
                </div>
                <div className="col-md-9">
                  <code>{selectedLog.id}</code>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3">
                  <strong>Время:</strong>
                </div>
                <div className="col-md-9">
                  {formatTimestamp(selectedLog.whenLogged)}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3">
                  <strong>Уровень:</strong>
                </div>
                <div className="col-md-9">
                  {getLogLevelBadge(selectedLog.logLevel)}
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-3">
                  <strong>Сообщение:</strong>
                </div>
                <div className="col-md-9">
                  <div className="p-3 site-bg-secondary rounded">
                    {selectedLog.message}
                  </div>
                </div>
              </div>

              {selectedLog.stackTrace && (
                <div className="row mb-3">
                  <div className="col-md-3">
                    <strong>Стек-трейс:</strong>
                  </div>
                  <div className="col-md-9">
                    <pre className={styles.stackTrace}>
                      {selectedLog.stackTrace}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Закрыть
          </Button>
          {selectedLog && (
            <Button
              variant="success"
              onClick={() => {
                handleExportLog(selectedLog);
                handleCloseModal();
              }}
              className="d-flex align-items-center gap-2"
            >
              <Download size={16} />
              Экспортировать
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default LogsTable;
