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
  Tag,
  Tooltip,
} from "antd";
import { Edit3, Play, Plus, Trash2 } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import type {
  DiscordChannelOptionDto,
  NSFWBooruAutoPostConfigDto,
} from "@/shared/api";
import { NsfwBooruAutoPost } from "@/shared/api";
import { defaultApiConfig } from "@/shared/api/api-config";
import { useToastModal } from "@/shared/Utils/ToastModal";

import styles from "./NSFWBooruAutoPostPage.module.scss";

interface FormState {
  discordChannelId: string;
  tags: string[];
  cronExpression: string;
  message: string;
}

const defaultForm: FormState = {
  discordChannelId: [],
  tags: [],
  cronExpression: "",
  message: "",
};

interface CronField {
  label: string;
  value: string;
}

const cronMinutes: CronField[] = [
  { label: "каждую минуту", value: "*" },
  { label: "каждые 5 мин", value: "*/5" },
  { label: "каждые 10 мин", value: "*/10" },
  { label: "каждые 15 мин", value: "*/15" },
  { label: "каждые 30 мин", value: "*/30" },
  { label: "0", value: "0" },
  { label: "15", value: "15" },
  { label: "30", value: "30" },
  { label: "45", value: "45" },
];

const cronHours: CronField[] = [
  { label: "каждый час", value: "*" },
  { label: "каждые 2 часа", value: "*/2" },
  { label: "каждые 3 часа", value: "*/3" },
  { label: "каждые 6 часов", value: "*/6" },
  { label: "каждые 12 часов", value: "*/12" },
  ...Array.from({ length: 24 }, (_, index) => ({
    label: String(index).padStart(2, "0"),
    value: String(index),
  })),
];

const cronDaysOfMonth: CronField[] = [
  { label: "каждый день", value: "*" },
  ...Array.from({ length: 31 }, (_, index) => ({
    label: String(index + 1),
    value: String(index + 1),
  })),
];

const cronMonths: CronField[] = [
  { label: "каждый месяц", value: "*" },
  { label: "янв", value: "1" },
  { label: "фев", value: "2" },
  { label: "мар", value: "3" },
  { label: "апр", value: "4" },
  { label: "май", value: "5" },
  { label: "июн", value: "6" },
  { label: "июл", value: "7" },
  { label: "авг", value: "8" },
  { label: "сен", value: "9" },
  { label: "окт", value: "10" },
  { label: "ноя", value: "11" },
  { label: "дек", value: "12" },
];

const cronDaysOfWeek: CronField[] = [
  { label: "любой день", value: "*" },
  { label: "будни", value: "1-5" },
  { label: "выходные", value: "0,6" },
  { label: "пн", value: "1" },
  { label: "вт", value: "2" },
  { label: "ср", value: "3" },
  { label: "чт", value: "4" },
  { label: "пт", value: "5" },
  { label: "сб", value: "6" },
  { label: "вс", value: "0" },
];

const NSFWBooruAutoPostPage: React.FC = () => {
  const { showToast } = useToastModal();
  const api = useMemo(() => new NsfwBooruAutoPost(defaultApiConfig), []);

  const [configs, setConfigs] = useState<NSFWBooruAutoPostConfigDto[]>([]);
  const [discordChannels, setDiscordChannels] = useState<
    DiscordChannelOptionDto[]
  >([]);
  const [form, setForm] = useState<FormState>({ ...defaultForm });
  const [loading, setLoading] = useState(true);
  const [loadingChannels, setLoadingChannels] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | undefined>(undefined);
  const [filter, setFilter] = useState("");
  const [processingIds, setProcessingIds] = useState<Record<string, boolean>>(
    {}
  );
  const [error, setError] = useState("");
  const [cronMode, setCronMode] = useState<"visual" | "manual">("visual");
  const [cronParts, setCronParts] = useState({
    minute: "0",
    hour: "*",
    dayOfMonth: "*",
    month: "*",
    dayOfWeek: "*",
  });

  const cronExpression = useMemo(
    () =>
      `${cronParts.minute} ${cronParts.hour} ${cronParts.dayOfMonth} ${cronParts.month} ${cronParts.dayOfWeek}`,
    [cronParts]
  );

  const discordChannelMap = useMemo(
    () =>
      new Map(
        discordChannels.map(ch => [
          String(ch.id),
          `${ch.guildName} / #${ch.name}`,
        ])
      ),
    [discordChannels]
  );

  const filteredConfigs = useMemo(() => {
    const query = filter.trim().toLowerCase();
    if (!query) {
      return configs;
    }

    return configs.filter(config => {
      const channelId = String(config.discordChannelId ?? "");
      const channelName = (
        discordChannelMap.get(String(config.discordChannelId)) ?? ""
      ).toLowerCase();
      const tags = (config.tags ?? "").toLowerCase();
      const cron = (config.cronExpression ?? "").toLowerCase();

      return (
        channelId.includes(query) ||
        channelName.includes(query) ||
        tags.includes(query) ||
        cron.includes(query)
      );
    });
  }, [configs, discordChannelMap, filter]);

  const loadConfigs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await api.nsfwBooruAutoPostConfigsList();
      setConfigs(Array.isArray(result.data.data) ? result.data.data : []);
    } catch (error_) {
      const message =
        error_ instanceof Error
          ? error_.message
          : "Не удалось загрузить конфигурации";
      setError(message);
      showToast({ success: false, message });
    } finally {
      setLoading(false);
    }
  }, [api, showToast]);

  const loadDiscordChannels = useCallback(async () => {
    setLoadingChannels(true);

    try {
      const result = await api.nsfwBooruAutoPostDiscordChannelsList();
      setDiscordChannels(
        Array.isArray(result.data.data) ? result.data.data : []
      );
    } catch (error_) {
      const message =
        error_ instanceof Error
          ? error_.message
          : "Не удалось загрузить Discord каналы";
      setError(message);
      showToast({ success: false, message });
    } finally {
      setLoadingChannels(false);
    }
  }, [api, showToast]);

  useEffect(() => {
    void loadConfigs();
  }, [loadConfigs]);

  useEffect(() => {
    void loadDiscordChannels();
  }, [loadDiscordChannels]);

  useEffect(() => {
    if (showModal) {
      setForm(previous => ({
        ...previous,
        cronExpression:
          cronMode === "visual" ? cronExpression : previous.cronExpression,
      }));
    }
  }, [cronExpression, cronMode, showModal]);

  const openCreateModal = useCallback(() => {
    setForm({ ...defaultForm });
    setEditingId(undefined);
    setCronMode("visual");
    setCronParts({
      minute: "0",
      hour: "*",
      dayOfMonth: "*",
      month: "*",
      dayOfWeek: "*",
    });
    setShowModal(true);
  }, []);

  const openEditModal = useCallback((config: NSFWBooruAutoPostConfigDto) => {
    const tags = (config.tags ?? "").split(/\s+/).filter(Boolean);
    const parts = (config.cronExpression ?? "").split(/\s+/);
    const parsed = {
      minute: parts[0] ?? "0",
      hour: parts[1] ?? "*",
      dayOfMonth: parts[2] ?? "*",
      month: parts[3] ?? "*",
      dayOfWeek: parts[4] ?? "*",
    };
    setCronParts(parsed);
    setForm({
      discordChannelId: String(config.discordChannelId),
      tags,
      cronExpression: config.cronExpression ?? "",
      message: config.message ?? "",
    });
    setEditingId(config.id);
    setCronMode("visual");
    setShowModal(true);
  }, []);

  const handleSubmit = useCallback(
    async (event: React.FormEvent) => {
      event.preventDefault();
      setSubmitting(true);
      setError("");

      if (!form.discordChannelId) {
        const message = "Выберите Discord канал";
        setError(message);
        showToast({ success: false, message });
        setSubmitting(false);
        return;
      }

      const finalCron =
        cronMode === "visual" ? cronExpression : form.cronExpression;
      if (!finalCron.trim()) {
        const message = "Укажите CRON выражение";
        setError(message);
        showToast({ success: false, message });
        setSubmitting(false);
        return;
      }

      if (form.tags.length > 2) {
        const message = "Максимум 2 тега (ограничение платформы)";
        setError(message);
        showToast({ success: false, message });
        setSubmitting(false);
        return;
      }

      try {
        const requestData = {
          discordChannelId: form.discordChannelId,
          tags: form.tags.join(" ").trim(),
          cronExpression: finalCron.trim(),
          message: form.message,
        };
        const result = editingId
          ? await api.nsfwBooruAutoPostConfigsUpdate(editingId, {
              ...requestData,
              id: editingId,
            })
          : await api.nsfwBooruAutoPostConfigsCreate(requestData);
        showToast(result.data);

        setForm({ ...defaultForm });
        setShowModal(false);
        setEditingId(undefined);
        await loadConfigs();
      } catch (error_) {
        const message =
          error_ instanceof Error
            ? error_.message
            : "Не удалось сохранить конфигурацию";
        setError(message);
        showToast({ success: false, message });
      } finally {
        setSubmitting(false);
      }
    },
    [api, form, editingId, showToast, loadConfigs, cronMode, cronExpression]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      setProcessingIds(previous => ({ ...previous, [id]: true }));
      try {
        const result = await api.nsfwBooruAutoPostConfigsDelete(id);
        showToast(result.data);
        await loadConfigs();
      } catch (error_) {
        const message =
          error_ instanceof Error
            ? error_.message
            : "Не удалось удалить конфигурацию";
        setError(message);
        showToast({ success: false, message });
      } finally {
        setProcessingIds(previous => ({ ...previous, [id]: false }));
      }
    },
    [api, loadConfigs, showToast]
  );

  const handleToggleEnabled = useCallback(
    async (config: NSFWBooruAutoPostConfigDto) => {
      setProcessingIds(previous => ({ ...previous, [config.id]: true }));
      try {
        const result = await api.nsfwBooruAutoPostConfigsEnabledUpdate(
          config.id,
          { isEnabled: !config.isEnabled }
        );
        showToast(result.data);
        await loadConfigs();
      } catch (error_) {
        const message =
          error_ instanceof Error
            ? error_.message
            : "Не удалось обновить статус";
        setError(message);
        showToast({ success: false, message });
      } finally {
        setProcessingIds(previous => ({ ...previous, [config.id]: false }));
      }
    },
    [api, loadConfigs, showToast]
  );

  const handleTriggerNow = useCallback(
    async (id: string) => {
      setProcessingIds(previous => ({ ...previous, [id]: true }));
      try {
        const result = await api.nsfwBooruAutoPostConfigsTriggerCreate(id);
        showToast(result.data);
      } catch (error_) {
        const message =
          error_ instanceof Error
            ? error_.message
            : "Не удалось выполнить триггер";
        setError(message);
        showToast({ success: false, message });
      } finally {
        setProcessingIds(previous => ({ ...previous, [id]: false }));
      }
    },
    [api, showToast]
  );

  const renderTags = (tagsString: string) => {
    if (!tagsString) {
      return <span style={{ color: "#999" }}>—</span>;
    }
    const tags = tagsString.split(/\s+/).filter(Boolean);
    return (
      <Space size={[4, 4]} wrap>
        {tags.map(tag => (
          <Tag key={tag} color="blue">
            {tag}
          </Tag>
        ))}
      </Space>
    );
  };

  const renderConfigCard = (config: NSFWBooruAutoPostConfigDto) => {
    const isProcessing = Object.hasOwn(processingIds, config.id);
    const channelName =
      discordChannelMap.get(String(config.discordChannelId)) ??
      "Неизвестный канал";

    return (
      <Card
        key={config.id}
        className={styles.configCard}
        data-testid={`nsfw-booru-card-${config.id}`}
        hoverable
      >
        <div className={styles.cardHeader}>
          <div className={styles.cardChannel}>
            <span className={styles.channelName}>{channelName}</span>
            <span className={styles.channelId}>
              ({config.discordChannelId})
            </span>
          </div>
          <Badge
            color={config.isEnabled ? "green" : "default"}
            text={config.isEnabled ? "Включён" : "Выключен"}
          />
        </div>

        <div className={styles.cardBody}>
          <div className={styles.cardField}>
            <span className={styles.fieldLabel}>Теги</span>
            <div>{renderTags(config.tags ?? "")}</div>
          </div>

          <div className={styles.cardField}>
            <span className={styles.fieldLabel}>Расписание</span>
            <code className={styles.cronValue}>{config.cronExpression}</code>
          </div>

          {config.message && (
            <div className={styles.cardField}>
              <span className={styles.fieldLabel}>Сообщение</span>
              <span className={styles.fieldValue}>{config.message}</span>
            </div>
          )}

          <div className={styles.cardField}>
            <span className={styles.fieldLabel}>Последний запуск</span>
            <span className={styles.fieldValue}>
              {config.lastExecutedAtUtc
                ? new Date(config.lastExecutedAtUtc).toLocaleString()
                : "—"}
            </span>
          </div>
        </div>

        <div className={styles.cardActions}>
          <Tooltip title="Триггер сейчас">
            <Button
              size="small"
              type="primary"
              ghost
              disabled={isProcessing}
              onClick={() => void handleTriggerNow(config.id)}
              data-testid={`nsfw-booru-button-trigger-${config.id}`}
              icon={<Play size={14} />}
            />
          </Tooltip>
          <Button
            size="small"
            type={config.isEnabled ? "default" : "primary"}
            disabled={isProcessing}
            onClick={() => void handleToggleEnabled(config)}
            data-testid={`nsfw-booru-button-toggle-${config.id}`}
          >
            {config.isEnabled ? "Выключить" : "Включить"}
          </Button>
          <Tooltip title="Редактировать">
            <Button
              size="small"
              type="default"
              disabled={isProcessing}
              onClick={() => openEditModal(config)}
              data-testid={`nsfw-booru-button-edit-${config.id}`}
              icon={<Edit3 size={14} />}
            />
          </Tooltip>
          <Tooltip title="Удалить">
            <Button
              size="small"
              danger
              ghost
              disabled={isProcessing}
              onClick={() => void handleDelete(config.id)}
              data-testid={`nsfw-booru-button-delete-${config.id}`}
              icon={<Trash2 size={14} />}
            />
          </Tooltip>
        </div>
      </Card>
    );
  };

  const discordOptions = discordChannels.map(ch => ({
    value: String(ch.id),
    label: `${ch.guildName} / #${ch.name} (${ch.id})`,
  }));

  return (
    <div className={styles.page} data-testid="nsfw-booru-auto-post-page">
      <Flex justify="space-between" align="center" style={{ marginBottom: 12 }}>
        <h1>NSFWBooru автопостинг</h1>
        <Button
          type="primary"
          onClick={openCreateModal}
          data-testid="nsfw-booru-button-create"
          icon={<Plus size={14} />}
        >
          Добавить
        </Button>
      </Flex>

      {!!error && (
        <Alert
          type="error"
          title={error}
          style={{ marginBottom: 12 }}
          data-testid="nsfw-booru-error-alert"
        />
      )}

      <Modal
        open={showModal}
        onCancel={() => {
          setShowModal(false);
          setEditingId(undefined);
        }}
        title={editingId ? "Редактировать" : "Добавить конфигурацию"}
        footer={false}
        centered
        width={600}
        data-testid="nsfw-booru-modal-config-form"
      >
        {loadingChannels && (
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

        <form onSubmit={event_ => void handleSubmit(event_)}>
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                marginBottom: 4,
                fontWeight: 500,
              }}
            >
              Discord канал
            </label>
            <Select
              value={form.discordChannelId || undefined}
              onChange={value =>
                setForm(previous => ({ ...previous, discordChannelId: value }))
              }
              options={discordOptions}
              placeholder="Выберите Discord канал"
              disabled={loadingChannels || submitting}
              style={{ width: "100%" }}
              data-testid="nsfw-booru-select-discord-channel"
              showSearch
              filterOption={(input, option) =>
                (option?.label as string)
                  ?.toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                marginBottom: 4,
                fontWeight: 500,
              }}
            >
              Теги NSFWBooru
            </label>
            <Select
              mode="tags"
              value={form.tags}
              onChange={(values: string[]) =>
                setForm(previous => ({ ...previous, tags: values.slice(0, 2) }))
              }
              placeholder="Введите тег и нажмите Enter"
              disabled={submitting}
              style={{ width: "100%" }}
              data-testid="nsfw-booru-input-tags"
              tokenSeparators={[" "]}
              maxCount={2}
              maxTagCount="responsive"
            />
            <div className={styles.cronHint}>
              Примеры: 1girl, solo, landscape, anime, scenery (макс. 2 тега)
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: "block",
                marginBottom: 4,
                fontWeight: 500,
              }}
            >
              Расписание (CRON)
            </label>
            <Space style={{ marginBottom: 8 }}>
              <Button
                size="small"
                type={cronMode === "visual" ? "primary" : "default"}
                onClick={() => setCronMode("visual")}
                data-testid="nsfw-booru-cron-mode-visual"
              >
                Конструктор
              </Button>
              <Button
                size="small"
                type={cronMode === "manual" ? "primary" : "default"}
                onClick={() => setCronMode("manual")}
                data-testid="nsfw-booru-cron-mode-manual"
              >
                Вручную
              </Button>
            </Space>

            {cronMode === "visual" ? (
              <div className={styles.cronBuilder}>
                <div className={styles.cronRow}>
                  <span className={styles.cronLabel}>Минута</span>
                  <Select
                    value={cronParts.minute}
                    onChange={value =>
                      setCronParts(previous => ({
                        ...previous,
                        minute: value,
                      }))
                    }
                    options={cronMinutes.map(o => ({
                      value: o.value,
                      label: `${o.value} — ${o.label}`,
                    }))}
                    style={{ flex: 1 }}
                    disabled={submitting}
                    data-testid="nsfw-booru-cron-minute"
                  />
                </div>
                <div className={styles.cronRow}>
                  <span className={styles.cronLabel}>Час</span>
                  <Select
                    value={cronParts.hour}
                    onChange={value =>
                      setCronParts(previous => ({ ...previous, hour: value }))
                    }
                    options={cronHours.map(o => ({
                      value: o.value,
                      label: `${o.value} — ${o.label}`,
                    }))}
                    style={{ flex: 1 }}
                    disabled={submitting}
                    data-testid="nsfw-booru-cron-hour"
                    showSearch
                  />
                </div>
                <div className={styles.cronRow}>
                  <span className={styles.cronLabel}>День месяца</span>
                  <Select
                    value={cronParts.dayOfMonth}
                    onChange={value =>
                      setCronParts(previous => ({
                        ...previous,
                        dayOfMonth: value,
                      }))
                    }
                    options={cronDaysOfMonth.map(o => ({
                      value: o.value,
                      label: o.label,
                    }))}
                    style={{ flex: 1 }}
                    disabled={submitting}
                    data-testid="nsfw-booru-cron-day"
                  />
                </div>
                <div className={styles.cronRow}>
                  <span className={styles.cronLabel}>Месяц</span>
                  <Select
                    value={cronParts.month}
                    onChange={value =>
                      setCronParts(previous => ({ ...previous, month: value }))
                    }
                    options={cronMonths.map(o => ({
                      value: o.value,
                      label: o.label,
                    }))}
                    style={{ flex: 1 }}
                    disabled={submitting}
                    data-testid="nsfw-booru-cron-month"
                  />
                </div>
                <div className={styles.cronRow}>
                  <span className={styles.cronLabel}>День недели</span>
                  <Select
                    value={cronParts.dayOfWeek}
                    onChange={value =>
                      setCronParts(previous => ({
                        ...previous,
                        dayOfWeek: value,
                      }))
                    }
                    options={cronDaysOfWeek.map(o => ({
                      value: o.value,
                      label: `${o.value} — ${o.label}`,
                    }))}
                    style={{ flex: 1 }}
                    disabled={submitting}
                    data-testid="nsfw-booru-cron-weekday"
                  />
                </div>
                <div className={styles.cronPreview}>
                  <code>{cronExpression}</code>
                </div>
              </div>
            ) : (
              <Input
                value={form.cronExpression}
                onChange={event_ =>
                  setForm(previous => ({
                    ...previous,
                    cronExpression: event_.target.value,
                  }))
                }
                placeholder="*/30 * * * *"
                disabled={submitting}
                data-testid="nsfw-booru-input-cron"
              />
            )}
          </div>

          <div className={styles.formField}>
            <label className={styles.formLabel}>Сообщение (капшн)</label>
            <Input.TextArea
              value={form.message}
              onChange={event_ =>
                setForm(previous => ({
                  ...previous,
                  message: event_.target.value,
                }))
              }
              placeholder="Текст сообщения. Переменные: {tags}, {id}, {rating}, {score}, {width}, {height}"
              disabled={submitting}
              rows={3}
              data-testid="nsfw-booru-input-message"
            />
            <div className={styles.cronHint}>
              Используйте переменные: {"{tags}"} {"{id}"} {"{rating}"}{" "}
              {"{score}"} {"{width}"} {"{height}"}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 16,
              gap: 8,
            }}
          >
            <Button
              type="default"
              onClick={() => {
                setShowModal(false);
                setEditingId(undefined);
              }}
              disabled={submitting}
              data-testid="nsfw-booru-button-cancel"
            >
              Отмена
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              disabled={submitting}
              data-testid="nsfw-booru-button-submit"
            >
              {submitting ? (
                <>
                  <Spin size="small" style={{ marginRight: 8 }} />
                  {editingId ? "Сохранение..." : "Создание..."}
                </>
              ) : editingId ? (
                "Сохранить"
              ) : (
                "Создать"
              )}
            </Button>
          </div>
        </form>
      </Modal>

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
          <h5 style={{ marginBottom: 0 }}>Конфигурации</h5>
          <Input
            className={styles.searchBar}
            placeholder="Поиск: канал, теги, CRON"
            value={filter}
            onChange={event_ => setFilter(event_.target.value)}
            style={{ width: 300 }}
            data-testid="nsfw-booru-input-search"
          />
        </div>
        <div className={styles.cardsWrap}>
          {loading ? (
            <div
              style={{ textAlign: "center", padding: "16px 0" }}
              data-testid="nsfw-booru-loading-spinner"
            >
              <Spin />
            </div>
          ) : filteredConfigs.length === 0 ? (
            <Alert
              type="info"
              title="Конфигурации не найдены"
              style={{ marginBottom: 0, marginTop: 12 }}
              data-testid="nsfw-booru-empty-state"
            />
          ) : (
            <div className={styles.cardsGrid}>
              {filteredConfigs.map(config => renderConfigCard(config))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default NSFWBooruAutoPostPage;
