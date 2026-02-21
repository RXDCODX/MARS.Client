import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Form,
  Spinner,
  Table,
} from "react-bootstrap";

import {
  TelegramDiscordBindingCreateRequest,
  TelegramDiscordBindingDto,
  TelegramDiscordChannelStateDto,
} from "@/shared/api";
import { TelegramDiscordBridge } from "@/shared/api/http-clients/TelegramDiscordBridge";
import { useToastModal } from "@/shared/Utils/ToastModal";

import styles from "./TelegramDiscordBridgePage.module.scss";

interface BindingFormState {
  telegramChannelId: string;
  discordChannelId: string;
}

const defaultForm: BindingFormState = {
  telegramChannelId: "",
  discordChannelId: "",
};

const TelegramDiscordBridgePage: React.FC = () => {
  const { showToast } = useToastModal();
  const api = useMemo(() => new TelegramDiscordBridge(), []);

  const [bindings, setBindings] = useState<TelegramDiscordBindingDto[]>([]);
  const [states, setStates] = useState<TelegramDiscordChannelStateDto[]>([]);
  const [form, setForm] = useState<BindingFormState>({ ...defaultForm });
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState("");
  const [statesFilter, setStatesFilter] = useState("");
  const [processingIds, setProcessingIds] = useState<Record<string, boolean>>(
    {}
  );
  const [error, setError] = useState("");

  const filteredBindings = useMemo(() => {
    const query = filter.trim();
    if (!query) {
      return bindings;
    }

    return bindings.filter(binding => {
      const telegramId = String(binding.telegramChannelId ?? "");
      const discordId = String(binding.discordChannelId ?? "");
      return telegramId.includes(query) || discordId.includes(query);
    });
  }, [bindings, filter]);

  const filteredStates = useMemo(() => {
    const query = statesFilter.trim();
    if (!query) {
      return states;
    }

    return states.filter(state =>
      String(state.telegramChannelId ?? "").includes(query)
    );
  }, [states, statesFilter]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [bindingsResult, statesResult] = await Promise.all([
        api.telegramDiscordBridgeBindingsList(),
        api.telegramDiscordBridgeStatesList(),
      ]);

      setBindings(
        Array.isArray(bindingsResult.data.data) ? bindingsResult.data.data : []
      );
      setStates(
        Array.isArray(statesResult.data.data) ? statesResult.data.data : []
      );
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : "Не удалось загрузить Telegram/Discord bridge";
      setError(message);
      showToast({ success: false, message });
    } finally {
      setLoading(false);
    }
  }, [api, showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleCreateBinding = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);
    setError("");

    const telegramChannelId = Number(form.telegramChannelId);
    const discordChannelId = Number(form.discordChannelId);
    const isValidIds =
      Number.isFinite(telegramChannelId) &&
      Number.isFinite(discordChannelId) &&
      telegramChannelId > 0 &&
      discordChannelId > 0;

    if (!isValidIds) {
      const message = "Укажи корректные числовые ID каналов";
      setError(message);
      showToast({ success: false, message });
      setCreating(false);
    } else {
      const payload: TelegramDiscordBindingCreateRequest = {
        telegramChannelId,
        discordChannelId,
      };

      try {
        const result = await api.telegramDiscordBridgeBindingsCreate(payload);
        showToast(result.data);
        setForm({ ...defaultForm });
        await loadData();
      } catch (e) {
        const message =
          e instanceof Error ? e.message : "Не удалось создать привязку";
        setError(message);
        showToast({ success: false, message });
      } finally {
        setCreating(false);
      }
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) {
      return;
    }

    setProcessingIds(prev => ({ ...prev, [id]: true }));
    try {
      const result = await api.telegramDiscordBridgeBindingsDelete(id);
      showToast(result.data);
      await loadData();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Не удалось удалить привязку";
      setError(message);
      showToast({ success: false, message });
    } finally {
      setProcessingIds(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleToggleEnabled = async (binding: TelegramDiscordBindingDto) => {
    if (!binding.id) {
      return;
    }

    setProcessingIds(prev => ({ ...prev, [binding.id]: true }));
    try {
      const result = await api.telegramDiscordBridgeBindingsEnabledUpdate(
        binding.id,
        {
          isEnabled: !binding.isEnabled,
        }
      );
      showToast(result.data);
      await loadData();
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Не удалось обновить статус привязки";
      setError(message);
      showToast({ success: false, message });
    } finally {
      setProcessingIds(prev => ({ ...prev, [binding.id]: false }));
    }
  };

  return (
    <Container className={styles.page}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Telegram ↔ Discord Bridge</h1>
        <Button
          variant="outline-secondary"
          size="sm"
          onClick={loadData}
          disabled={loading}
        >
          {loading ? (
            <Spinner as="span" size="sm" animation="border" />
          ) : (
            <i className="bi bi-arrow-clockwise" />
          )}
        </Button>
      </div>

      {!!error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">Создать привязку</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleCreateBinding}>
            <div className={styles.grid}>
              <Form.Control
                type="number"
                min={1}
                placeholder="Telegram Channel ID"
                value={form.telegramChannelId}
                onChange={e =>
                  setForm(previous => ({
                    ...previous,
                    telegramChannelId: e.target.value,
                  }))
                }
                required
              />
              <Form.Control
                type="number"
                min={1}
                placeholder="Discord Channel ID"
                value={form.discordChannelId}
                onChange={e =>
                  setForm(previous => ({
                    ...previous,
                    discordChannelId: e.target.value,
                  }))
                }
                required
              />
            </div>

            <div className="d-flex justify-content-end mt-3">
              <Button type="submit" disabled={creating}>
                {creating ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      className="me-2"
                    />
                    Создание...
                  </>
                ) : (
                  "Создать"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <h5 className="mb-0">Bindings</h5>
            <Form.Control
              className={styles.searchBar}
              placeholder="Поиск по Telegram/Discord ID"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
        </Card.Header>
        <Card.Body className={styles.tableWrap}>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" role="status" />
            </div>
          ) : filteredBindings.length === 0 ? (
            <Alert variant="info" className="mb-0">
              Привязки по фильтру не найдены
            </Alert>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              className="mb-0 align-middle"
            >
              <thead>
                <tr>
                  <th>Telegram</th>
                  <th>Discord</th>
                  <th>Статус</th>
                  <th>Обновлено</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredBindings.map(binding => {
                  const isProcessing =
                    !!binding.id && !!processingIds[binding.id];
                  return (
                    <tr key={binding.id}>
                      <td>{binding.telegramChannelId}</td>
                      <td>{binding.discordChannelId}</td>
                      <td>
                        <Badge bg={binding.isEnabled ? "success" : "secondary"}>
                          {binding.isEnabled ? "Включена" : "Выключена"}
                        </Badge>
                      </td>
                      <td>{new Date(binding.updatedAtUtc).toLocaleString()}</td>
                      <td>
                        <div className={styles.actions}>
                          <Button
                            size="sm"
                            variant="outline-primary"
                            disabled={isProcessing}
                            onClick={() => handleToggleEnabled(binding)}
                          >
                            {binding.isEnabled ? "Выключить" : "Включить"}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline-danger"
                            disabled={isProcessing}
                            onClick={() => handleDelete(binding.id)}
                          >
                            Удалить
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <h5 className="mb-0">Channel States</h5>
            <Form.Control
              className={styles.searchBar}
              placeholder="Поиск по Telegram Channel ID"
              value={statesFilter}
              onChange={e => setStatesFilter(e.target.value)}
            />
          </div>
        </Card.Header>
        <Card.Body className={styles.tableWrap}>
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" role="status" />
            </div>
          ) : filteredStates.length === 0 ? (
            <Alert variant="info" className="mb-0">
              Состояния по фильтру не найдены
            </Alert>
          ) : (
            <Table
              striped
              bordered
              hover
              responsive
              className="mb-0 align-middle"
            >
              <thead>
                <tr>
                  <th>Telegram Channel ID</th>
                  <th>Last Processed Message ID</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredStates.map(state => (
                  <tr
                    key={`${state.telegramChannelId}-${state.lastProcessedMessageId}`}
                  >
                    <td>{state.telegramChannelId}</td>
                    <td>{state.lastProcessedMessageId}</td>
                    <td>{new Date(state.lastUpdatedUtc).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TelegramDiscordBridgePage;
