import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Container,
  Form,
  Modal,
  Spinner,
  Table,
} from "react-bootstrap";

import type {
  DiscordChannelOptionDto,
  TelegramChannelOptionDto,
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
  const [telegramChannels, setTelegramChannels] = useState<
    TelegramChannelOptionDto[]
  >([]);
  const [discordChannels, setDiscordChannels] = useState<
    DiscordChannelOptionDto[]
  >([]);
  const [form, setForm] = useState<BindingFormState>({ ...defaultForm });
  const [loading, setLoading] = useState(true);
  const [loadingChannelOptions, setLoadingChannelOptions] = useState(false);
  const [creating, setCreating] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState("");
  const [statesFilter, setStatesFilter] = useState("");
  const [processingIds, setProcessingIds] = useState<Record<string, boolean>>(
    {}
  );
  const [error, setError] = useState("");

  const telegramChannelMap = useMemo(
    () => new Map(telegramChannels.map(channel => [channel.id, channel.title])),
    [telegramChannels]
  );

  const discordChannelMap = useMemo(
    () =>
      new Map(
        discordChannels.map(channel => [
          String(channel.id),
          `${channel.guildName} / #${channel.name}`,
        ])
      ),
    [discordChannels]
  );

  const filteredBindings = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) {
      return bindings;
    }

    return bindings.filter(binding => {
      const telegramId = String(binding.telegramChannelId ?? "");
      const discordId = String(binding.discordChannelId ?? "");
      const telegramName = (
        telegramChannelMap.get(binding.telegramChannelId) ?? ""
      ).toLowerCase();
      const discordName = (
        discordChannelMap.get(String(binding.discordChannelId)) ?? ""
      ).toLowerCase();

      return (
        telegramId.includes(query) ||
        discordId.includes(query) ||
        telegramName.includes(query) ||
        discordName.includes(query)
      );
    });
  }, [bindings, discordChannelMap, filter, telegramChannelMap]);

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
          : "Не удалось загрузить данные моста Telegram ↔ Discord";
      setError(message);
      showToast({ success: false, message });
    } finally {
      setLoading(false);
    }
  }, [api, showToast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadChannelOptions = useCallback(async () => {
    setLoadingChannelOptions(true);

    try {
      const [telegramChannelsResult, discordChannelsResult] = await Promise.all(
        [
          api.telegramDiscordBridgeTelegramChannelsList(),
          api.telegramDiscordBridgeDiscordChannelsList(),
        ]
      );

      setTelegramChannels(
        Array.isArray(telegramChannelsResult.data.data)
          ? telegramChannelsResult.data.data
          : []
      );
      setDiscordChannels(
        Array.isArray(discordChannelsResult.data.data)
          ? discordChannelsResult.data.data
          : []
      );
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Не удалось загрузить списки каналов";
      setError(message);
      showToast({ success: false, message });
    } finally {
      setLoadingChannelOptions(false);
    }
  }, [api, showToast]);

  useEffect(() => {
    if (
      showCreateModal &&
      telegramChannels.length === 0 &&
      discordChannels.length === 0
    ) {
      loadChannelOptions();
    }
  }, [
    showCreateModal,
    loadChannelOptions,
    telegramChannels.length,
    discordChannels.length,
  ]);

  useEffect(() => {
    loadChannelOptions();
  }, [loadChannelOptions]);

  const handleCreateBinding = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setCreating(true);
      setError("");

      const telegramChannelId = Number(form.telegramChannelId);
      const discordChannelId = Number(form.discordChannelId);
      const isValidIds =
        Number.isFinite(telegramChannelId) &&
        Number.isFinite(discordChannelId) &&
        telegramChannelId !== 0 &&
        discordChannelId > 0;

      if (!isValidIds) {
        const message =
          "Не удалось создать привязку: выберите корректные Telegram и Discord каналы";
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
          setShowCreateModal(false);
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
    },
    [api, form, showToast, loadData]
  );

  const handleDelete = useCallback(
    async (id?: string) => {
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
    },
    [api, loadData, showToast]
  );

  const handleToggleEnabled = useCallback(
    async (binding: TelegramDiscordBindingDto) => {
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
          e instanceof Error
            ? e.message
            : "Не удалось обновить статус привязки";
        setError(message);
        showToast({ success: false, message });
      } finally {
        setProcessingIds(prev => ({ ...prev, [binding.id]: false }));
      }
    },
    [api, loadData, showToast]
  );

  return (
    <Container className={styles.page}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Мост Telegram ↔ Discord</h1>
        <div className="d-flex align-items-center gap-2">
          <Button
            variant="primary"
            onClick={() => {
              setError("");
              setShowCreateModal(true);
            }}
          >
            Создать мост
          </Button>
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
      </div>

      {!!error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      <Modal
        show={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Создать привязку</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loadingChannelOptions && (
            <div className="d-flex align-items-center gap-2 mb-3">
              <Spinner animation="border" size="sm" />
              <span>Загрузка каналов...</span>
            </div>
          )}

          <Form onSubmit={handleCreateBinding}>
            <div className={styles.grid}>
              <Form.Select
                value={form.telegramChannelId}
                onChange={e =>
                  setForm(previous => ({
                    ...previous,
                    telegramChannelId: e.target.value,
                  }))
                }
                disabled={loadingChannelOptions || creating}
                required
              >
                <option value="">Выберите Telegram-канал</option>
                {telegramChannels.map(channel => (
                  <option key={channel.id} value={String(channel.id)}>
                    {channel.title} ({channel.id})
                  </option>
                ))}
              </Form.Select>

              <Form.Select
                value={form.discordChannelId}
                onChange={e =>
                  setForm(previous => ({
                    ...previous,
                    discordChannelId: e.target.value,
                  }))
                }
                disabled={loadingChannelOptions || creating}
                required
              >
                <option value="">Выберите Discord-канал</option>
                {discordChannels.map(channel => (
                  <option key={channel.id} value={String(channel.id)}>
                    {channel.guildName} / #{channel.name} ({channel.id})
                  </option>
                ))}
              </Form.Select>
            </div>

            <div className="d-flex justify-content-end mt-3 gap-2">
              <Button
                variant="outline-secondary"
                onClick={() => setShowCreateModal(false)}
                disabled={creating}
              >
                Отмена
              </Button>
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
        </Modal.Body>
      </Modal>

      <Card className="mb-4">
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center gap-2 flex-wrap">
            <h5 className="mb-0">Привязки</h5>
            <Form.Control
              className={styles.searchBar}
              placeholder="Поиск: ID, название Telegram, сервер/канал Discord"
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
                  <th>Канал Telegram</th>
                  <th>Канал Discord</th>
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
                      <td>
                        {telegramChannelMap.get(binding.telegramChannelId) ??
                          "Неизвестный канал"}{" "}
                        ({binding.telegramChannelId})
                      </td>
                      <td>
                        {discordChannelMap.get(
                          String(binding.discordChannelId)
                        ) ?? "Неизвестный канал"}{" "}
                        ({binding.discordChannelId})
                      </td>
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
            <h5 className="mb-0">Состояние каналов</h5>
            <Form.Control
              className={styles.searchBar}
              placeholder="Поиск по ID Telegram-канала"
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
                  <th>ID Telegram-канала</th>
                  <th>ID последнего обработанного сообщения</th>
                  <th>Последнее обновление</th>
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
