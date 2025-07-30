import {
  faBolt,
  faCheckCircle,
  faClock,
  faExclamationTriangle,
  faEyeSlash,
  faList,
  faPlay,
  faRedo,
  faRefresh,
  faSearch,
  faStop,
  faSyncAlt,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useMemo } from "react";
import {
  Alert,
  Badge,
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  InputGroup,
  Offcanvas,
  OverlayTrigger,
  ProgressBar,
  Row,
  Spinner,
  Table,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Switch from "react-switch";

import { useServiceStore } from "../../../shared/serviceStore";
import LogViewer from "./LogViewer";
import ServiceDetails from "./ServiceDetails";

const statusColors: Record<string, string> = {
  Running: "#198754",
  Stopped: "#6c757d",
  Starting: "#0dcaf0",
  Stopping: "#ffc107",
  Error: "#dc3545",
  Unknown: "#343a40",
};

const statusOrder = [
  "Running",
  "Stopped",
  "Starting",
  "Stopping",
  "Error",
  "Unknown",
];

function ServerViewerUI() {
  const {
    services,
    loading,
    error,
    actionLoading,
    logs,
    logsService,
    logsLoading,
    statusFilter,
    search,
    autoRefresh,
    progress,
    fetchServices,
    handleAction,
    handleShowLogs,
    handleCloseLogs,
    setStatusFilter,
    setSearch,
    setAutoRefresh,
    setProgress,
    showLogs,
    // --- add for details selection ---
    selectedService,
    setSelectedService,
    clearSelectedService,
  } = useServiceStore();

  const navigate = useNavigate();

  // const [detailsService, setDetailsService] = useState<string | null>(null);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let progressInt: NodeJS.Timeout;
    if (autoRefresh) {
      interval = setInterval(fetchServices, 5000);
      let p = 0;
      progressInt = setInterval(() => {
        p = (p + 20) % 100;
        setProgress(p);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
      if (progressInt) clearInterval(progressInt);
      setProgress(0);
    };
  }, [autoRefresh, fetchServices, setProgress]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const filteredServices = useMemo(
    () =>
      services.filter(
        (s) =>
          (!statusFilter || s.status === statusFilter) &&
          (!search ||
            s.displayName.toLowerCase().includes(search.toLowerCase()) ||
            s.name.toLowerCase().includes(search.toLowerCase())),
      ),
    [services, statusFilter, search],
  );

  return (
    <Container fluid className="py-4" style={{ position: "relative" }}>
      <Row className="align-items-center mb-3">
        <Col>
          <h2>
            <FontAwesomeIcon icon={faList} /> Service Manager
          </h2>
        </Col>
        <Col xs="auto">
          <Button
            variant={autoRefresh ? "success" : "outline-secondary"}
            onClick={() => setAutoRefresh(!autoRefresh)}
            title={
              autoRefresh
                ? "Автообновление включено"
                : "Включить автообновление"
            }
          >
            <FontAwesomeIcon icon={faSyncAlt} spin={autoRefresh} />
            {autoRefresh ? " Автообновление" : " Вручную"}
          </Button>{" "}
          <Button
            variant="primary"
            onClick={fetchServices}
            title="Обновить сейчас"
          >
            <FontAwesomeIcon icon={faRefresh} /> Обновить
          </Button>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6} className="mb-2 mb-md-0">
          <InputGroup>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
              placeholder="Поиск по имени..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </InputGroup>
        </Col>
        <Col md={6} className="d-flex justify-content-end align-items-center">
          <ButtonGroup>
            <Button
              size="sm"
              variant={statusFilter === "" ? "primary" : "outline-secondary"}
              onClick={() => setStatusFilter("")}
            >
              Все
            </Button>
            {statusOrder.map((st) => (
              <Button
                key={st}
                size="sm"
                variant={statusFilter === st ? "primary" : "outline-secondary"}
                onClick={() => setStatusFilter(st)}
                style={{ minWidth: 90, textTransform: "none" }}
              >
                {st}
              </Button>
            ))}
          </ButtonGroup>
        </Col>
      </Row>
      {error && <Alert variant="danger">{error}</Alert>}
      {autoRefresh && (
        <ProgressBar now={progress} style={{ height: 3, marginBottom: 8 }} />
      )}
      <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
        <Table
          bordered
          hover
          responsive
          size="sm"
          className="bg-white shadow-sm table-sm"
          style={{ marginBottom: 0 }}
        >
          <thead
            className="table-light"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 2,
              background: "#f8f9fa",
            }}
          >
            <tr>
              <th>Имя</th>
              <th>Описание</th>
              <th>Статус</th>
              <th>Время старта</th>
              <th>Последняя активность</th>
              <th>Включен</th>
              <th>Действия</th>
              <th>Логи</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.map((s) => (
              <tr
                key={s.name}
                style={{ fontWeight: "normal", textShadow: "none" }}
              >
                <td>
                  <Button
                    variant="link"
                    style={{ padding: 0, fontWeight: 500 }}
                    onClick={() => {
                      setSelectedService(s.name);
                      navigate(
                        `/services/details?name=${encodeURIComponent(s.name)}`,
                      );
                    }}
                  >
                    {s.displayName || s.name}
                  </Button>
                </td>
                <td>{s.description}</td>
                <td>
                  <Badge
                    style={{ background: statusColors[s.status] || "#6c757d" }}
                    pill
                  >
                    <FontAwesomeIcon
                      icon={
                        s.status === "Running"
                          ? faCheckCircle
                          : s.status === "Error"
                            ? faExclamationTriangle
                            : s.status === "Stopped"
                              ? faTimesCircle
                              : s.status === "Starting"
                                ? faClock
                                : s.status === "Stopping"
                                  ? faBolt
                                  : faEyeSlash
                      }
                    />{" "}
                    {s.status}
                  </Badge>
                </td>
                <td>
                  {s.startTime ? new Date(s.startTime).toLocaleString() : "-"}
                </td>
                <td>
                  {s.lastActivity
                    ? new Date(s.lastActivity).toLocaleString()
                    : "-"}
                </td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>
                        {s.isEnabled ? "Отключить сервис" : "Включить сервис"}
                      </Tooltip>
                    }
                  >
                    <span>
                      <Switch
                        onChange={() => handleAction(s.name, "toggle")}
                        checked={s.isEnabled}
                        checkedIcon={false}
                        uncheckedIcon={false}
                        onColor="#198754"
                        offColor="#adb5bd"
                        height={22}
                        width={44}
                        disabled={actionLoading === s.name + "toggle"}
                      />
                    </span>
                  </OverlayTrigger>
                </td>
                <td>
                  <ButtonGroup>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Старт</Tooltip>}
                    >
                      <Button
                        size="sm"
                        variant="outline-success"
                        disabled={actionLoading === s.name + "start"}
                        onClick={() => handleAction(s.name, "start")}
                      >
                        <FontAwesomeIcon icon={faPlay} />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Стоп</Tooltip>}
                    >
                      <Button
                        size="sm"
                        variant="outline-danger"
                        disabled={actionLoading === s.name + "stop"}
                        onClick={() => handleAction(s.name, "stop")}
                      >
                        <FontAwesomeIcon icon={faStop} />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                      placement="top"
                      overlay={<Tooltip>Рестарт</Tooltip>}
                    >
                      <Button
                        size="sm"
                        variant="outline-warning"
                        disabled={actionLoading === s.name + "restart"}
                        onClick={() => handleAction(s.name, "restart")}
                      >
                        <FontAwesomeIcon icon={faRedo} />
                      </Button>
                    </OverlayTrigger>
                  </ButtonGroup>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant="info"
                    onClick={() => handleShowLogs(s.name)}
                  >
                    <FontAwesomeIcon icon={faList} />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        {loading && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              right: 0,
              bottom: 0,
              background: "rgba(255,255,255,0.6)",
              zIndex: 10,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Spinner animation="border" variant="primary" />
          </div>
        )}
      </div>
      <Offcanvas
        show={!!selectedService}
        onHide={clearSelectedService}
        placement="end"
        backdrop="static"
        scroll={true}
        style={{ width: 600 }}
      >
        <Offcanvas.Body style={{ padding: 0 }}>
          {selectedService && <ServiceDetails onClose={clearSelectedService} />}
        </Offcanvas.Body>
      </Offcanvas>
      <Offcanvas
        show={showLogs}
        onHide={handleCloseLogs}
        placement="end"
        backdrop="static"
        scroll={true}
        style={{ width: 500 }}
      >
        <Offcanvas.Body style={{ padding: 0 }}>
          <LogViewer
            logs={logs}
            loading={logsLoading}
            onClose={handleCloseLogs}
            serviceName={logsService || undefined}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default ServerViewerUI;
