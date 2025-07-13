import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { useSearchParams } from "react-router-dom";

import { useServiceStore } from "../../shared/serviceStore";

const ServiceDetails: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { selectedService, services, setSelectedService, fetchServices } =
    useServiceStore();
  const [searchParams] = useSearchParams();
  const [commands, setCommands] = useState<
    { name: string; description: string }[]
  >([]);
  const [config, setConfig] = useState<Record<string, object>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [execResult, setExecResult] = useState<string | null>(null);
  const [execLoading, setExecLoading] = useState<string | null>(null);
  const [toggleLoading, setToggleLoading] = useState(false);

  // Состояния для логов
  const [logs, setLogs] = useState<string[]>([]);
  const [logsLoading, setLogsLoading] = useState(false);
  const [logsError, setLogsError] = useState<string | null>(null);
  const [logFilter, setLogFilter] = useState("");
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [logLevel, setLogLevel] = useState<string>("all");

  // Отладочная информация
  console.log("ServiceDetails render:", {
    selectedService,
    servicesCount: services.length,
    searchParams: searchParams.get("name"),
    loading,
    error,
  });

  useEffect(() => {
    const name = searchParams.get("name");
    console.log("ServiceDetails useEffect - name from params:", name);
    if (name && name !== selectedService) {
      console.log("Setting selected service:", name);
      setSelectedService(name);
    }
  }, [searchParams, selectedService, setSelectedService]);

  useEffect(() => {
    // Загружаем сервисы, если их нет
    if (services.length === 0) {
      console.log("Fetching services...");
      fetchServices();
    }
  }, [services.length, fetchServices]);

  const info = services.find((s) => s.name === selectedService) || null;

  useEffect(() => {
    if (!selectedService) return;
    console.log("Loading service details for:", selectedService);
    setLoading(true);
    setError(null);
    Promise.all([
      axios.get(`/api/ServiceManager/service/${selectedService}/commands`),
      axios.get(`/api/ServiceManager/service/${selectedService}/configuration`),
    ])
      .then(([cmdRes, cfgRes]) => {
        console.log("Service details loaded successfully");
        setCommands(cmdRes.data);
        setConfig(cfgRes.data);
      })
      .catch((e) => {
        console.error("Error loading service details:", e);
        setError(e.message || "Ошибка загрузки данных");
      })
      .finally(() => setLoading(false));
  }, [selectedService]);

  const handleExecute = async (cmd: string) => {
    if (!selectedService) return;
    setExecLoading(cmd);
    setExecResult(null);
    try {
      const res = await axios.post(
        `/api/ServiceManager/service/${selectedService}/execute`,
        { command: cmd },
      );
      setExecResult(
        res.data === true
          ? `Команда '${cmd}' выполнена успешно`
          : `Ошибка выполнения команды '${cmd}'`,
      );
    } catch {
      setExecResult(`Ошибка выполнения команды '${cmd}'`);
    } finally {
      setExecLoading(null);
    }
  };

  const handleToggleService = async () => {
    if (!selectedService || !info) return;
    setToggleLoading(true);
    try {
      const action = info.isEnabled ? "stop" : "start";
      await axios.post(
        `/api/ServiceManager/service/${selectedService}/${action}`,
      );
      // Обновляем список сервисов после изменения состояния
      await fetchServices();
      setExecResult(
        `Сервис ${info.isEnabled ? "остановлен" : "запущен"} успешно`,
      );
    } catch {
      setExecResult(
        `Ошибка ${info.isEnabled ? "остановки" : "запуска"} сервиса`,
      );
    } finally {
      setToggleLoading(false);
    }
  };

  // Функция загрузки логов
  const fetchLogs = useCallback(async () => {
    if (!selectedService) return;
    setLogsLoading(true);
    setLogsError(null);
    try {
      const params = new URLSearchParams();
      if (logLevel !== "all") {
        params.append("level", logLevel);
      }
      const res = await axios.get(
        `/api/ServiceManager/service/${selectedService}/logs?${params}`,
      );
      setLogs(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error loading logs:", error);
      setLogsError("Ошибка загрузки логов");
    } finally {
      setLogsLoading(false);
    }
  }, [selectedService, logLevel]);

  // Автообновление логов
  useEffect(() => {
    if (!autoRefresh || !selectedService) return;

    const interval = setInterval(fetchLogs, 5000); // Обновляем каждые 5 секунд
    return () => clearInterval(interval);
  }, [autoRefresh, selectedService, logLevel, fetchLogs]);

  // Загружаем логи при изменении сервиса или уровня логирования
  useEffect(() => {
    if (selectedService) {
      fetchLogs();
    }
  }, [selectedService, logLevel, fetchLogs]);

  // Фильтрация логов
  const filteredLogs = logs.filter(
    (log) =>
      logFilter === "" || log.toLowerCase().includes(logFilter.toLowerCase()),
  );

  // Показываем загрузку, если сервис не выбран или данные загружаются
  if (!selectedService) {
    return (
      <Container
        fluid
        className="h-100 d-flex align-items-center justify-content-center"
      >
        <div className="text-center">
          <Spinner animation="border" size="sm" />
          <div className="mt-3">Загрузка информации о сервисе...</div>
          <div className="mt-2 text-muted">
            Параметр name: {searchParams.get("name") || "не указан"}
          </div>
        </div>
      </Container>
    );
  }

  // Показываем загрузку, если данные еще загружаются
  if (loading) {
    return (
      <Container
        fluid
        className="h-100 d-flex align-items-center justify-content-center"
      >
        <div className="text-center">
          <Spinner animation="border" size="sm" />
          <div className="mt-3">Загрузка деталей сервиса...</div>
          <div className="mt-2 text-muted">Сервис: {selectedService}</div>
        </div>
      </Container>
    );
  }

  // Показываем ошибку, если она есть
  if (error) {
    return (
      <Container
        fluid
        className="h-100 d-flex align-items-center justify-content-center"
      >
        <Alert variant="danger" style={{ maxWidth: "600px" }}>
          <Alert.Heading>Ошибка загрузки</Alert.Heading>
          <p>{error}</p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={onClose} variant="outline-danger">
              Закрыть
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  // Показываем ошибку, если сервис не найден
  if (!info) {
    return (
      <Container
        fluid
        className="h-100 d-flex align-items-center justify-content-center"
      >
        <Alert variant="warning" style={{ maxWidth: "600px" }}>
          <Alert.Heading>Сервис не найден</Alert.Heading>
          <p>
            Сервис "{selectedService}" не найден в списке доступных сервисов.
          </p>
          <p className="text-muted">
            Доступные сервисы: {services.map((s) => s.name).join(", ") || "нет"}
          </p>
          <hr />
          <div className="d-flex justify-content-end">
            <Button onClick={onClose} variant="outline-warning">
              Закрыть
            </Button>
          </div>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="h-100 p-4">
      <Row className="h-100">
        <Col>
          {/* Заголовок */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="mb-1">{info.displayName || info.name}</h2>
              <div className="d-flex align-items-center gap-3">
                <Badge
                  bg={info.isEnabled ? "success" : "secondary"}
                  className="fs-6 px-3 py-2"
                >
                  {info.status}
                </Badge>
                <span className="text">
                  {info.isEnabled ? "Активен" : "Неактивен"}
                </span>
              </div>
            </div>
            <Button variant="outline-secondary" size="lg" onClick={onClose}>
              ✕ Закрыть
            </Button>
          </div>

          {/* Основная информация */}
          <Row className="mb-4">
            <Col md={8}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">Информация о сервисе</h5>
                </Card.Header>
                <Card.Body>
                  <p className="text-muted mb-4">{info.description}</p>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <strong>Время старта:</strong>
                        <div className="text-muted">
                          {info.startTime
                            ? new Date(info.startTime).toLocaleString()
                            : "-"}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <strong>Последняя активность:</strong>
                        <div className="text-muted">
                          {info.lastActivity
                            ? new Date(info.lastActivity).toLocaleString()
                            : "-"}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Кнопки управления сервисом */}
                  <div className="mt-4">
                    <Button
                      variant={info.isEnabled ? "warning" : "success"}
                      size="lg"
                      onClick={handleToggleService}
                      disabled={toggleLoading}
                      className="me-3"
                    >
                      {toggleLoading ? (
                        <>
                          <Spinner
                            size="sm"
                            animation="border"
                            className="me-2"
                          />
                          Обработка...
                        </>
                      ) : info.isEnabled ? (
                        "⏹ Остановить сервис"
                      ) : (
                        "▶ Запустить сервис"
                      )}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="h-100">
                <Card.Header className="bg-light">
                  <h5 className="mb-0">Конфигурация</h5>
                </Card.Header>
                <Card.Body style={{ maxHeight: "400px", overflowY: "auto" }}>
                  {Object.keys(config).length > 0 ? (
                    <div className="table-responsive">
                      <Table size="sm" borderless>
                        <tbody>
                          {Object.entries(config).map(([k, v]) => (
                            <tr key={k}>
                              <td className="fw-bold text-muted">{k}:</td>
                              <td className="text-break">{String(v)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center text-muted py-4">
                      <div>📄</div>
                      <div>Нет данных конфигурации</div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Команды */}
          <Row className="mb-4">
            <Col>
              <Card>
                <Card.Header className="bg-light">
                  <h5 className="mb-0">Доступные команды</h5>
                </Card.Header>
                <Card.Body style={{ maxHeight: "300px", overflowY: "auto" }}>
                  {Array.isArray(commands) && commands.length > 0 ? (
                    <div className="table-responsive">
                      <Table hover>
                        <thead className="table-light">
                          <tr>
                            <th>Команда</th>
                            <th>Описание</th>
                            <th>Действие</th>
                          </tr>
                        </thead>
                        <tbody>
                          {commands.map((cmd) => (
                            <tr key={cmd.name}>
                              <td>
                                <code className="bg-light px-2 py-1 rounded">
                                  {cmd.name}
                                </code>
                              </td>
                              <td>{cmd.description}</td>
                              <td>
                                <Button
                                  size="sm"
                                  variant="primary"
                                  onClick={() => handleExecute(cmd.name)}
                                  disabled={execLoading === cmd.name}
                                >
                                  {execLoading === cmd.name ? (
                                    <Spinner size="sm" animation="border" />
                                  ) : (
                                    "▶ Выполнить"
                                  )}
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center text-muted py-4">
                      <div>⚙️</div>
                      <div>Нет доступных команд</div>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Логи */}
          <Row>
            <Col>
              <Card>
                <Card.Header className="bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">📋 Логи сервиса</h5>
                    <div className="d-flex gap-2 align-items-center">
                      <Form.Select
                        size="sm"
                        style={{ width: "auto" }}
                        value={logLevel}
                        onChange={(e) => setLogLevel(e.target.value)}
                      >
                        <option value="all">Все уровни</option>
                        <option value="debug">Debug</option>
                        <option value="info">Info</option>
                        <option value="warning">Warning</option>
                        <option value="error">Error</option>
                      </Form.Select>
                      <Form.Check
                        type="switch"
                        id="auto-refresh"
                        label="Автообновление"
                        checked={autoRefresh}
                        onChange={(e) => setAutoRefresh(e.target.checked)}
                      />
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={fetchLogs}
                        disabled={logsLoading}
                      >
                        {logsLoading ? (
                          <Spinner size="sm" animation="border" />
                        ) : (
                          "🔄 Обновить"
                        )}
                      </Button>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body>
                  {/* Фильтр логов */}
                  <div className="mb-3">
                    <Form.Control
                      type="text"
                      placeholder="🔍 Фильтр логов..."
                      value={logFilter}
                      onChange={(e) => setLogFilter(e.target.value)}
                      size="sm"
                    />
                  </div>

                  {/* Содержимое логов */}
                  <div
                    style={{
                      maxHeight: "400px",
                      overflowY: "auto",
                      backgroundColor: "#f8f9fa",
                      border: "1px solid #dee2e6",
                      borderRadius: "0.375rem",
                      padding: "1rem",
                      fontFamily: "monospace",
                      fontSize: "0.875rem",
                    }}
                  >
                    {logsError ? (
                      <div className="text-danger">❌ {logsError}</div>
                    ) : logsLoading ? (
                      <div className="text-center">
                        <Spinner size="sm" animation="border" />
                        <span className="ms-2">Загрузка логов...</span>
                      </div>
                    ) : filteredLogs.length > 0 ? (
                      <div>
                        {filteredLogs.map((log, index) => (
                          <div
                            key={index}
                            className="mb-1"
                            style={{
                              borderBottom:
                                index < filteredLogs.length - 1
                                  ? "1px solid #e9ecef"
                                  : "none",
                              paddingBottom:
                                index < filteredLogs.length - 1
                                  ? "0.5rem"
                                  : "0",
                            }}
                          >
                            {log}
                          </div>
                        ))}
                        <div className="text-muted mt-2">
                          Показано {filteredLogs.length} из {logs.length}{" "}
                          записей
                          {logFilter && ` (отфильтровано по "${logFilter}")`}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-muted py-4">
                        <div>📝</div>
                        <div>
                          {logFilter
                            ? "Нет логов, соответствующих фильтру"
                            : "Нет доступных логов"}
                        </div>
                      </div>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {/* Результат выполнения */}
          {execResult && (
            <Row className="mt-3">
              <Col>
                <Alert
                  variant="info"
                  dismissible
                  onClose={() => setExecResult(null)}
                >
                  {execResult}
                </Alert>
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceDetails;
