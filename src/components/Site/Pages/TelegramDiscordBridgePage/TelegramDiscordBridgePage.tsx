import {
  Alert,
  Badge,
  Button,
  Card,
  Flex,
  Input,
  Modal,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";

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
        setProcessingIds(prev => ({ ...prev, [binding.id!]: false }));
      }
    },
    [api, loadData, showToast]
  );

  const bindingColumns = [
    {
      title: "Канал Telegram",
      key: "telegram",
      render: (_: unknown, record: TelegramDiscordBindingDto) => (
        <>
          {telegramChannelMap.get(record.telegramChannelId) ??
            "Неизвестный канал"}{" "}
          ({record.telegramChannelId})
        </>
      ),
    },
    {
      title: "Канал Discord",
      key: "discord",
      render: (_: unknown, record: TelegramDiscordBindingDto) => (
        <>
          {discordChannelMap.get(String(record.discordChannelId)) ??
            "Неизвестный канал"}{" "}
          ({record.discordChannelId})
        </>
      ),
    },
    {
      title: "Статус",
      key: "status",
      render: (_: unknown, record: TelegramDiscordBindingDto) => (
        <Badge color={record.isEnabled ? "green" : "default"}>
          {record.isEnabled ? "Включена" : "Выключена"}
        </Badge>
      ),
    },
    {
      title: "Обновлено",
      dataIndex: "updatedAtUtc",
      key: "updatedAtUtc",
      render: (text: string) => new Date(text).toLocaleString(),
    },
    {
      title: "Действия",
      key: "actions",
      render: (_: unknown, record: TelegramDiscordBindingDto) => {
        const isProcessing = !!record.id && !!processingIds[record.id];
        return (
          <Space>
            <Button
              size="small"
              type="primary"
              ghost
              disabled={isProcessing}
              onClick={() => handleToggleEnabled(record)}
            >
              {record.isEnabled ? "Выключить" : "Включить"}
            </Button>
            <Button
              size="small"
              danger
              ghost
              disabled={isProcessing}
              onClick={() => handleDelete(record.id)}
            >
              Удалить
            </Button>
          </Space>
        );
      },
    },
  ];

  const stateColumns = [
    {
      title: "ID Telegram-канала",
      dataIndex: "telegramChannelId",
      key: "telegramChannelId",
    },
    {
      title: "ID последнего обработанного сообщения",
      dataIndex: "lastProcessedMessageId",
      key: "lastProcessedMessageId",
    },
    {
      title: "Последнее обновление",
      dataIndex: "lastUpdatedUtc",
      key: "lastUpdatedUtc",
      render: (text: string) => new Date(text).toLocaleString(),
    },
  ];

  const telegramOptions = telegramChannels.map(channel => ({
    value: String(channel.id),
    label: `${channel.title} (${channel.id})`,
  }));

  const discordOptions = discordChannels.map(channel => ({
    value: String(channel.id),
    label: `${channel.guildName} / #${channel.name} (${channel.id})`,
  }));

  return (
    <div className={styles.page}>
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <h1>Мост Telegram ↔ Discord</h1>
        <Space>
          <Button
            type="primary"
            onClick={() => {
              setError("");
              setShowCreateModal(true);
            }}
          >
            Создать мост
          </Button>
          <Button
            type="default"
            size="small"
            onClick={loadData}
            disabled={loading}
          >
            {loading ? (
              <Spin size="small" />
            ) : (
              <i className="bi bi-arrow-clockwise" />
            )}
          </Button>
        </Space>
      </Flex>

      {!!error && (
        <Alert type="error" message={error} style={{ marginBottom: 12 }} />
      )}

      <Modal
        open={showCreateModal}
        onCancel={() => setShowCreateModal(false)}
        title="Создать привязку"
        footer={null}
        centered
      >
        {loadingChannelOptions && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              marginBottom: 12,
            }}
          >
            <Spin size="small" />
            <span>Загрузка каналов...</span>
          </div>
        )}

        <form onSubmit={handleCreateBinding}>
          <div className={styles.grid}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>
                Telegram-канал
              </label>
              <Select
                value={form.telegramChannelId || undefined}
                onChange={val =>
                  setForm(previous => ({
                    ...previous,
                    telegramChannelId: val,
                  }))
                }
                options={telegramOptions}
                placeholder="Выберите Telegram-канал"
                disabled={loadingChannelOptions || creating}
                style={{ width: "100%" }}
              />
            </div>

            <div style={{ marginBottom: 12 }}>
              <label style={{ display: "block", marginBottom: 4 }}>
                Discord-канал
              </label>
              <Select
                value={form.discordChannelId || undefined}
                onChange={val =>
                  setForm(previous => ({
                    ...previous,
                    discordChannelId: val,
                  }))
                }
                options={discordOptions}
                placeholder="Выберите Discord-канал"
                disabled={loadingChannelOptions || creating}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 12,
              gap: 8,
            }}
          >
            <Button
              type="default"
              onClick={() => setShowCreateModal(false)}
              disabled={creating}
            >
              Отмена
            </Button>
            <Button type="primary" htmlType="submit" disabled={creating}>
              {creating ? (
                <>
                  <Spin size="small" style={{ marginRight: 8 }} />
                  Создание...
                </>
              ) : (
                "Создать"
              )}
            </Button>
          </div>
        </form>
      </Modal>

      <Card style={{ marginBottom: 16 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            padding: "12px 16px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <h5 style={{ marginBottom: 0 }}>Привязки</h5>
          <Input
            className={styles.searchBar}
            placeholder="Поиск: ID, название Telegram, сервер/канал Discord"
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{ width: 300 }}
          />
        </div>
        <div className={styles.tableWrap} style={{ padding: "0 16px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <Spin />
            </div>
          ) : filteredBindings.length === 0 ? (
            <Alert
              type="info"
              message="Привязки по фильтру не найдены"
              style={{ marginBottom: 0, marginTop: 12 }}
            />
          ) : (
            <Table
              columns={bindingColumns}
              dataSource={filteredBindings}
              rowKey="id"
              bordered
              pagination={false}
              style={{ marginBottom: 0 }}
            />
          )}
        </div>
      </Card>

      <Card>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 8,
            flexWrap: "wrap",
            padding: "12px 16px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <h5 style={{ marginBottom: 0 }}>Состояние каналов</h5>
          <Input
            className={styles.searchBar}
            placeholder="Поиск по ID Telegram-канала"
            value={statesFilter}
            onChange={e => setStatesFilter(e.target.value)}
            style={{ width: 300 }}
          />
        </div>
        <div className={styles.tableWrap} style={{ padding: "0 16px" }}>
          {loading ? (
            <div style={{ textAlign: "center", padding: "16px 0" }}>
              <Spin />
            </div>
          ) : filteredStates.length === 0 ? (
            <Alert
              type="info"
              message="Состояния по фильтру не найдены"
              style={{ marginBottom: 0, marginTop: 12 }}
            />
          ) : (
            <Table
              columns={stateColumns}
              dataSource={filteredStates}
              rowKey={record =>
                `${record.telegramChannelId}-${record.lastProcessedMessageId}`
              }
              bordered
              pagination={false}
              style={{ marginBottom: 0 }}
            />
          )}
        </div>
      </Card>
    </div>
  );
};

export default TelegramDiscordBridgePage;
