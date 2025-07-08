import axios from "axios";
import { useEffect, useState } from "react";
import { Alert, Badge, Button, Card, Spinner, Table } from "react-bootstrap";
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

  useEffect(() => {
    if (!selectedService) {
      const name = searchParams.get("name");
      if (name) setSelectedService(name);
    }
  }, [selectedService, setSelectedService, searchParams]);

  useEffect(() => {
    if (services.length === 0) {
      fetchServices();
    }
  }, [services.length, fetchServices]);

  const info = services.find((s) => s.name === selectedService) || null;

  useEffect(() => {
    if (!selectedService) return;
    setLoading(true);
    setError(null);
    Promise.all([
      axios.get(`/api/ServiceManager/service/${selectedService}/commands`),
      axios.get(`/api/ServiceManager/service/${selectedService}/configuration`),
    ])
      .then(([cmdRes, cfgRes]) => {
        setCommands(cmdRes.data);
        setConfig(cfgRes.data);
      })
      .catch((e) => setError(e.message || "Ошибка загрузки данных"))
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

  if (!selectedService)
    return <Alert variant="warning">Сервис не выбран</Alert>;
  if (!info) return <Alert variant="danger">Нет информации о сервисе</Alert>;
  if (loading)
    return (
      <div className="text-center my-4">
        <Spinner animation="border" /> Загрузка...
      </div>
    );
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Card style={{ maxWidth: 600, margin: "0 auto" }}>
      <Card.Header>
        <b>{info.displayName || info.name}</b>{" "}
        <Badge bg="secondary">{info.status}</Badge>
        <Button
          variant="outline-secondary"
          size="sm"
          style={{ float: "right" }}
          onClick={onClose}
        >
          Закрыть
        </Button>
      </Card.Header>
      <Card.Body>
        <Card.Text>{info.description}</Card.Text>
        <div>
          <b>Время старта:</b>{" "}
          {info.startTime ? new Date(info.startTime).toLocaleString() : "-"}
        </div>
        <div>
          <b>Последняя активность:</b>{" "}
          {info.lastActivity
            ? new Date(info.lastActivity).toLocaleString()
            : "-"}
        </div>
        <div>
          <b>Включен:</b> {info.isEnabled ? "Да" : "Нет"}
        </div>
        <hr />
        <h6>Конфигурация</h6>
        <Table size="sm" bordered>
          <tbody>
            {Object.entries(config).map(([k, v]) => (
              <tr key={k}>
                <td>{k}</td>
                <td>{String(v)}</td>
              </tr>
            ))}
            {Object.keys(config).length === 0 && (
              <tr>
                <td colSpan={2}>Нет данных</td>
              </tr>
            )}
          </tbody>
        </Table>
        <hr />
        <h6>Доступные команды</h6>
        <Table size="sm" bordered>
          <tbody>
            {commands.map((cmd) => (
              <tr key={cmd.name}>
                <td>
                  <b>{cmd.name}</b>
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
                      "Выполнить"
                    )}
                  </Button>
                </td>
              </tr>
            ))}
            {commands.length === 0 && (
              <tr>
                <td colSpan={3}>Нет команд</td>
              </tr>
            )}
          </tbody>
        </Table>
        {execResult && <Alert variant="info">{execResult}</Alert>}
      </Card.Body>
    </Card>
  );
};

export default ServiceDetails;
