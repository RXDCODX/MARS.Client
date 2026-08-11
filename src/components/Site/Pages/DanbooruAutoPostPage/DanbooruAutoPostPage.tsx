import {
    Alert,
    Badge,
    Button,
    Card,
    DatePicker,
    Input,
    InputNumber,
    Modal,
    Select,
    Space,
    Spin,
    Tag,
    Tooltip,
} from "antd";
import {
    CalendarClock,
    Check,
    Edit3,
    Hash,
    Layers,
    MessageCircle,
    Play,
    Plus,
    Send,
    Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";

import type {
    DanbooruAutoPostBatchCreateRequest,
    DanbooruAutoPostConfigDto,
    DanbooruAutoPostCreateRequest,
    DanbooruAutoPostUpdateRequest,
    DiscordChannelOptionDto,
    TelegramChannelOptionDto,
} from "@/shared/api";
import { defaultApiConfig } from "@/shared/api/api-config";
import { DanbooruAutoPost } from "@/shared/api/http-clients/DanbooruAutoPost";
import {
    DanbooruAutoPostBatchCreateRequestTargetPlatformEnum,
    DanbooruAutoPostConfigDtoTargetPlatformEnum,
    DanbooruAutoPostCreateRequestTargetPlatformEnum,
    DanbooruAutoPostUpdateRequestTargetPlatformEnum,
} from "@/shared/api/types/data-contracts";
import { useToastModal } from "@/shared/Utils/ToastModal";

import styles from "./DanbooruAutoPostPage.module.scss";

type Platform = "Discord" | "Telegram";
type PublishType = "cron" | "deferred";
type FilterTab = "all" | "discord" | "telegram";

interface FormState {
    targetPlatform: Platform;
    discordChannelId: string;
    telegramChannelId: string;
    tags: string[];
    cronExpression: string;
    publishType: PublishType;
    scheduledAt: string;
}

const defaultForm: FormState = {
    targetPlatform: "Discord",
    discordChannelId: "",
    telegramChannelId: "",
    tags: [],
    cronExpression: "",
    publishType: "cron",
    scheduledAt: "",
};

interface BatchFormState {
    targetPlatform: Platform;
    discordChannelId: string;
    telegramChannelId: string;
    tags: string[];
    count: number;
    intervalHours: number;
    startAt: string;
}

const defaultBatchForm: BatchFormState = {
    targetPlatform: "Discord",
    discordChannelId: "",
    telegramChannelId: "",
    tags: [],
    count: 5,
    intervalHours: 2,
    startAt: "",
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

const DanbooruAutoPostPage: React.FC = () => {
    const { showToast } = useToastModal();
    const api = useMemo(() => new DanbooruAutoPost(defaultApiConfig), []);

    const [configs, setConfigs] = useState<DanbooruAutoPostConfigDto[]>([]);
    const [discordChannels, setDiscordChannels] = useState<
        DiscordChannelOptionDto[]
    >([]);
    const [telegramChannels, setTelegramChannels] = useState<
        TelegramChannelOptionDto[]
    >([]);
    const [form, setForm] = useState<FormState>({ ...defaultForm });
    const [batchForm, setBatchForm] = useState<BatchFormState>({
        ...defaultBatchForm,
    });
    const [loading, setLoading] = useState(true);
    const [loadingDiscord, setLoadingDiscord] = useState(false);
    const [loadingTelegram, setLoadingTelegram] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showBatchModal, setShowBatchModal] = useState(false);
    const [editingId, setEditingId] = useState<string | undefined>(undefined);
    const [filter, setFilter] = useState("");
    const [filterTab, setFilterTab] = useState<FilterTab>("all");
    const [processingIds, setProcessingIds] = useState<Record<string, boolean>>(
        {},
    );
    const [error, setError] = useState("");
    const [showChannelPicker, setShowChannelPicker] = useState(false);
    const [channelPickerType, setChannelPickerType] =
        useState<Platform>("Discord");
    const [channelSearch, setChannelSearch] = useState("");
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
        [cronParts],
    );

    const discordChannelMap = useMemo(
        () =>
            new Map(
                discordChannels.map(ch => [
                    String(ch.id),
                    `${ch.guildName} / #${ch.name}`,
                ]),
            ),
        [discordChannels],
    );

    const telegramChannelMap = useMemo(
        () => new Map(telegramChannels.map(ch => [String(ch.id), ch.title])),
        [telegramChannels],
    );

    const filteredPickerChannels = useMemo(() => {
        const query = channelSearch.trim().toLowerCase();
        if (channelPickerType === "Discord") {
            if (!query) return discordChannels;
            return discordChannels.filter(
                ch =>
                    ch.name.toLowerCase().includes(query) ||
                    ch.guildName.toLowerCase().includes(query) ||
                    String(ch.id).includes(query),
            );
        }
        if (!query) return telegramChannels;
        return telegramChannels.filter(
            ch =>
                ch.title.toLowerCase().includes(query) ||
                String(ch.id).includes(query),
        );
    }, [discordChannels, telegramChannels, channelSearch, channelPickerType]);

    const filteredConfigs = useMemo(() => {
        let result = configs;

        if (filterTab === "discord") {
            result = result.filter(
                c =>
                    c.targetPlatform ===
                    DanbooruAutoPostConfigDtoTargetPlatformEnum.Discord,
            );
        } else if (filterTab === "telegram") {
            result = result.filter(
                c =>
                    c.targetPlatform ===
                    DanbooruAutoPostConfigDtoTargetPlatformEnum.Telegram,
            );
        }

        const query = filter.trim().toLowerCase();
        if (query) {
            result = result.filter(config => {
                const channelId = String(
                    config.discordChannelId ?? config.telegramChannelId ?? "",
                );
                const channelName = getChannelDisplayName(config).toLowerCase();
                const tags = (config.tags ?? "").toLowerCase();
                const cron = (config.cronExpression ?? "").toLowerCase();

                return (
                    channelId.includes(query) ||
                    channelName.includes(query) ||
                    tags.includes(query) ||
                    cron.includes(query)
                );
            });
        }

        return result;
    }, [configs, filterTab, filter]);

    const getChannelDisplayName = useCallback(
        (config: DanbooruAutoPostConfigDto) => {
            if (
                config.targetPlatform ===
                DanbooruAutoPostConfigDtoTargetPlatformEnum.Telegram
            ) {
                return (
                    telegramChannelMap.get(
                        String(config.telegramChannelId ?? ""),
                    ) ?? "Неизвестный канал"
                );
            }
            return (
                discordChannelMap.get(String(config.discordChannelId)) ??
                "Неизвестный канал"
            );
        },
        [discordChannelMap, telegramChannelMap],
    );

    const loadConfigs = useCallback(async () => {
        setLoading(true);
        setError("");

        try {
            const result = await api.danbooruAutoPostConfigsList();
            setConfigs(
                Array.isArray(result.data.data) ? result.data.data : [],
            );
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
        setLoadingDiscord(true);

        try {
            const result = await api.danbooruAutoPostDiscordChannelsList();
            setDiscordChannels(
                Array.isArray(result.data.data) ? result.data.data : [],
            );
        } catch (error_) {
            const message =
                error_ instanceof Error
                    ? error_.message
                    : "Не удалось загрузить Discord каналы";
            showToast({ success: false, message });
        } finally {
            setLoadingDiscord(false);
        }
    }, [api, showToast]);

    const loadTelegramChannels = useCallback(async () => {
        setLoadingTelegram(true);

        try {
            const result = await api.danbooruAutoPostTelegramChannelsList();
            setTelegramChannels(
                Array.isArray(result.data.data) ? result.data.data : [],
            );
        } catch (error_) {
            const message =
                error_ instanceof Error
                    ? error_.message
                    : "Не удалось загрузить Telegram каналы";
            showToast({ success: false, message });
        } finally {
            setLoadingTelegram(false);
        }
    }, [api, showToast]);

    useEffect(() => {
        void loadConfigs();
    }, [loadConfigs]);

    useEffect(() => {
        void loadDiscordChannels();
    }, [loadDiscordChannels]);

    useEffect(() => {
        void loadTelegramChannels();
    }, [loadTelegramChannels]);

    useEffect(() => {
        if (showModal && form.publishType === "cron") {
            setForm(previous => ({
                ...previous,
                cronExpression:
                    cronMode === "visual"
                        ? cronExpression
                        : previous.cronExpression,
            }));
        }
    }, [cronExpression, cronMode, showModal, form.publishType]);

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

    const openBatchModal = useCallback(() => {
        setBatchForm({ ...defaultBatchForm });
        setShowBatchModal(true);
    }, []);

    const openEditModal = useCallback((config: DanbooruAutoPostConfigDto) => {
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

        const isTelegram =
            config.targetPlatform ===
            DanbooruAutoPostConfigDtoTargetPlatformEnum.Telegram;

        setForm({
            targetPlatform: isTelegram ? "Telegram" : "Discord",
            discordChannelId: isTelegram ? "" : String(config.discordChannelId),
            telegramChannelId: isTelegram
                ? String(config.telegramChannelId ?? "")
                : "",
            tags,
            cronExpression: config.cronExpression ?? "",
            publishType: config.scheduledAtUtc ? "deferred" : "cron",
            scheduledAt: config.scheduledAtUtc ?? "",
        });
        setEditingId(config.id);
        setCronMode("visual");
        setShowModal(true);
    }, []);

    const openChannelPicker = useCallback(
        (type: Platform) => {
            setChannelPickerType(type);
            setChannelSearch("");
            setShowChannelPicker(true);
        },
        [],
    );

    const handleSubmit = useCallback(
        async (event: React.FormEvent) => {
            event.preventDefault();
            setSubmitting(true);
            setError("");

            const isTelegram = form.targetPlatform === "Telegram";

            if (isTelegram && !form.telegramChannelId) {
                const message = "Выберите Telegram канал";
                setError(message);
                showToast({ success: false, message });
                setSubmitting(false);
                return;
            }

            if (!isTelegram && !form.discordChannelId) {
                const message = "Выберите Discord канал";
                setError(message);
                showToast({ success: false, message });
                setSubmitting(false);
                return;
            }

            const finalCron =
                cronMode === "visual" ? cronExpression : form.cronExpression;
            const hasCron =
                form.publishType === "cron" && finalCron.trim().length > 0;
            const hasScheduled =
                form.publishType === "deferred" &&
                form.scheduledAt.length > 0;

            if (!hasCron && !hasScheduled) {
                const message =
                    "Укажите CRON выражение или дату отложенной публикации";
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
                const targetPlatform = isTelegram
                    ? DanbooruAutoPostCreateRequestTargetPlatformEnum.Telegram
                    : DanbooruAutoPostCreateRequestTargetPlatformEnum.Discord;

                const baseData = {
                    targetPlatform,
                    discordChannelId: isTelegram
                        ? 0
                        : Number(form.discordChannelId),
                    telegramChannelId: isTelegram
                        ? Number(form.telegramChannelId)
                        : undefined,
                    tags: form.tags.join(" ").trim(),
                    cronExpression: hasCron ? finalCron.trim() : "",
                    scheduledAtUtc: hasScheduled
                        ? new Date(form.scheduledAt).toISOString()
                        : undefined,
                };

                if (editingId) {
                    const updateData: DanbooruAutoPostUpdateRequest = {
                        ...baseData,
                        id: editingId,
                    };
                    const result = await api.danbooruAutoPostConfigsUpdate(
                        editingId,
                        updateData,
                    );
                    showToast(result.data);
                } else {
                    const createData: DanbooruAutoPostCreateRequest = baseData;
                    const result =
                        await api.danbooruAutoPostConfigsCreate(createData);
                    showToast(result.data);
                }

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
        [
            api,
            form,
            editingId,
            showToast,
            loadConfigs,
            cronMode,
            cronExpression,
        ],
    );

    const handleBatchSubmit = useCallback(
        async (event: React.FormEvent) => {
            event.preventDefault();
            setSubmitting(true);
            setError("");

            const isTelegram = batchForm.targetPlatform === "Telegram";

            if (isTelegram && !batchForm.telegramChannelId) {
                const message = "Выберите Telegram канал";
                setError(message);
                showToast({ success: false, message });
                setSubmitting(false);
                return;
            }

            if (!isTelegram && !batchForm.discordChannelId) {
                const message = "Выберите Discord канал";
                setError(message);
                showToast({ success: false, message });
                setSubmitting(false);
                return;
            }

            if (batchForm.count < 1 || batchForm.count > 50) {
                const message = "Количество постов должно быть от 1 до 50";
                setError(message);
                showToast({ success: false, message });
                setSubmitting(false);
                return;
            }

            if (batchForm.intervalHours <= 0) {
                const message = "Интервал должен быть больше 0";
                setError(message);
                showToast({ success: false, message });
                setSubmitting(false);
                return;
            }

            if (batchForm.tags.length > 2) {
                const message = "Максимум 2 тега (ограничение платформы)";
                setError(message);
                showToast({ success: false, message });
                setSubmitting(false);
                return;
            }

            try {
                const requestData: DanbooruAutoPostBatchCreateRequest = {
                    targetPlatform: isTelegram
                        ? DanbooruAutoPostBatchCreateRequestTargetPlatformEnum.Telegram
                        : DanbooruAutoPostBatchCreateRequestTargetPlatformEnum.Discord,
                    discordChannelId: isTelegram
                        ? 0
                        : Number(batchForm.discordChannelId),
                    telegramChannelId: isTelegram
                        ? Number(batchForm.telegramChannelId)
                        : undefined,
                    tags: batchForm.tags.join(" ").trim(),
                    count: batchForm.count,
                    intervalHours: batchForm.intervalHours,
                    startAtUtc: batchForm.startAt
                        ? new Date(batchForm.startAt).toISOString()
                        : undefined,
                };

                const result =
                    await api.danbooruAutoPostConfigsBatchCreate(requestData);
                showToast(result.data);

                setBatchForm({ ...defaultBatchForm });
                setShowBatchModal(false);
                await loadConfigs();
            } catch (error_) {
                const message =
                    error_ instanceof Error
                        ? error_.message
                        : "Не удалось создать пакет";
                setError(message);
                showToast({ success: false, message });
            } finally {
                setSubmitting(false);
            }
        },
        [api, batchForm, showToast, loadConfigs],
    );

    const handleDelete = useCallback(
        async (id: string) => {
            setProcessingIds(previous => ({ ...previous, [id]: true }));
            try {
                const result = await api.danbooruAutoPostConfigsDelete(id);
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
        [api, loadConfigs, showToast],
    );

    const handleToggleEnabled = useCallback(
        async (config: DanbooruAutoPostConfigDto) => {
            setProcessingIds(previous => ({
                ...previous,
                [config.id]: true,
            }));
            try {
                const result = await api.danbooruAutoPostConfigsEnabledUpdate(
                    config.id,
                    { isEnabled: !config.isEnabled },
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
                setProcessingIds(previous => ({
                    ...previous,
                    [config.id]: false,
                }));
            }
        },
        [api, loadConfigs, showToast],
    );

    const handleTriggerNow = useCallback(
        async (id: string) => {
            setProcessingIds(previous => ({ ...previous, [id]: true }));
            try {
                const result =
                    await api.danbooruAutoPostConfigsTriggerCreate(id);
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
        [api, showToast],
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

    const renderConfigCard = (config: DanbooruAutoPostConfigDto) => {
        const isProcessing = Object.hasOwn(processingIds, config.id);
        const channelName = getChannelDisplayName(config);
        const isTelegram =
            config.targetPlatform ===
            DanbooruAutoPostConfigDtoTargetPlatformEnum.Telegram;
        const isDeferred = !!config.scheduledAtUtc;

        return (
            <Card
                key={config.id}
                className={styles.configCard}
                data-testid={`card-${config.id}`}
                hoverable
            >
                <div className={styles.cardHeader}>
                    <div className={styles.cardChannel}>
                        <div
                            className={`${styles.platformIcon} ${isTelegram ? styles.platformTelegram : styles.platformDiscord}`}
                        >
                            {isTelegram ? (
                                <Send size={14} />
                            ) : (
                                <MessageCircle size={14} />
                            )}
                        </div>
                        <div className={styles.channelInfo}>
                            <span className={styles.channelName}>
                                {channelName}
                            </span>
                            <span className={styles.channelId}>
                                {isTelegram
                                    ? `ID: ${config.telegramChannelId}`
                                    : `ID: ${config.discordChannelId}`}
                            </span>
                        </div>
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
                        {isDeferred ? (
                            <div className={styles.scheduledBadge}>
                                <CalendarClock size={14} />
                                {new Date(
                                    config.scheduledAtUtc!,
                                ).toLocaleString()}
                            </div>
                        ) : (
                            <code className={styles.cronValue}>
                                {config.cronExpression || "—"}
                            </code>
                        )}
                    </div>

                    <div className={styles.cardField}>
                        <span className={styles.fieldLabel}>
                            Последний запуск
                        </span>
                        <span className={styles.fieldValue}>
                            {config.lastExecutedAtUtc
                                ? new Date(
                                      config.lastExecutedAtUtc,
                                  ).toLocaleString()
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
                            disabled={isProcessing || isDeferred}
                            onClick={() => void handleTriggerNow(config.id)}
                            data-testid={`button-trigger-${config.id}`}
                            icon={<Play size={14} />}
                        />
                    </Tooltip>
                    <Button
                        size="small"
                        type={config.isEnabled ? "default" : "primary"}
                        disabled={isProcessing}
                        onClick={() => void handleToggleEnabled(config)}
                        data-testid={`button-toggle-${config.id}`}
                    >
                        {config.isEnabled ? "Выключить" : "Включить"}
                    </Button>
                    <Tooltip title="Редактировать">
                        <Button
                            size="small"
                            type="default"
                            disabled={isProcessing}
                            onClick={() => openEditModal(config)}
                            data-testid={`button-edit-${config.id}`}
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
                            data-testid={`button-delete-${config.id}`}
                            icon={<Trash2 size={14} />}
                        />
                    </Tooltip>
                </div>
            </Card>
        );
    };

    const renderChannelPickerModal = () => {
        const isTelegram = channelPickerType === "Telegram";
        const isLoading = isTelegram ? loadingTelegram : loadingDiscord;

        return (
            <Modal
                open={showChannelPicker}
                onCancel={() => setShowChannelPicker(false)}
                title={`Выберите ${isTelegram ? "Telegram" : "Discord"} канал`}
                footer={undefined}
                centered
                width={560}
                data-testid="modal-channel-picker"
            >
                <Input
                    placeholder={
                        isTelegram
                            ? "Поиск по названию канала"
                            : "Поиск по названию канала или сервера"
                    }
                    value={channelSearch}
                    onChange={event_ =>
                        setChannelSearch(event_.target.value)
                    }
                    style={{ marginBottom: 12 }}
                    allowClear
                    data-testid="input-channel-search"
                />
                {isLoading ? (
                    <div style={{ textAlign: "center", padding: 24 }}>
                        <Spin />
                    </div>
                ) : filteredPickerChannels.length === 0 ? (
                    <Alert
                        type="info"
                        message="Каналы не найдены"
                        data-testid="empty-channels"
                    />
                ) : (
                    <div
                        className={styles.channelGrid}
                        data-testid="channel-grid"
                    >
                        {filteredPickerChannels.map(ch => {
                            const channelId = String(ch.id);

                            if (isTelegram) {
                                const tgCh =
                                    ch as TelegramChannelOptionDto;
                                const isSelected =
                                    form.telegramChannelId === channelId;
                                return (
                                    <div
                                        key={tgCh.id}
                                        className={`${styles.channelCard} ${isSelected ? styles.channelCardSelected : ""}`}
                                        onClick={() => {
                                            setForm(previous => ({
                                                ...previous,
                                                telegramChannelId: channelId,
                                            }));
                                            setShowChannelPicker(false);
                                        }}
                                        data-testid={`channel-card-${tgCh.id}`}
                                    >
                                        <div
                                            className={styles.channelCardHeader}
                                        >
                                            <span
                                                className={
                                                    styles.telegramChannelTitle
                                                }
                                            >
                                                {tgCh.title}
                                            </span>
                                            {isSelected && (
                                                <Check size={16} />
                                            )}
                                        </div>
                                        <div className={styles.channelCardId}>
                                            ID: {tgCh.id}
                                        </div>
                                    </div>
                                );
                            }

                            const dcCh = ch as DiscordChannelOptionDto;
                            const isSelected =
                                form.discordChannelId === channelId;
                            return (
                                <div
                                    key={dcCh.id}
                                    className={`${styles.channelCard} ${isSelected ? styles.channelCardSelected : ""}`}
                                    onClick={() => {
                                        setForm(previous => ({
                                            ...previous,
                                            discordChannelId: channelId,
                                        }));
                                        setShowChannelPicker(false);
                                    }}
                                    data-testid={`channel-card-${dcCh.id}`}
                                >
                                    <div className={styles.channelCardHeader}>
                                        <span className={styles.channelCardGuild}>
                                            {dcCh.guildName}
                                        </span>
                                        {isSelected && <Check size={16} />}
                                    </div>
                                    <div className={styles.channelCardName}>
                                        <Hash size={14} />
                                        {dcCh.name}
                                    </div>
                                    <div className={styles.channelCardId}>
                                        ID: {dcCh.id}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </Modal>
        );
    };

    const renderPlatformSelector = (
        value: Platform,
        onChange: (p: Platform) => void,
    ) => (
        <div className={styles.platformSelector}>
            <button
                type="button"
                className={`${styles.platformButton} ${styles.platformButtonDiscord} ${value === "Discord" ? styles.platformButtonActive : ""}`}
                onClick={() => onChange("Discord")}
                data-testid="platform-discord"
            >
                <MessageCircle size={16} />
                Discord
            </button>
            <button
                type="button"
                className={`${styles.platformButton} ${styles.platformButtonTelegram} ${value === "Telegram" ? styles.platformButtonActive : ""}`}
                onClick={() => onChange("Telegram")}
                data-testid="platform-telegram"
            >
                <Send size={16} />
                Telegram
            </button>
        </div>
    );

    const renderCronBuilder = () => (
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
                    data-testid="cron-minute"
                />
            </div>
            <div className={styles.cronRow}>
                <span className={styles.cronLabel}>Час</span>
                <Select
                    value={cronParts.hour}
                    onChange={value =>
                        setCronParts(previous => ({
                            ...previous,
                            hour: value,
                        }))
                    }
                    options={cronHours.map(o => ({
                        value: o.value,
                        label: `${o.value} — ${o.label}`,
                    }))}
                    style={{ flex: 1 }}
                    disabled={submitting}
                    data-testid="cron-hour"
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
                    data-testid="cron-day"
                />
            </div>
            <div className={styles.cronRow}>
                <span className={styles.cronLabel}>Месяц</span>
                <Select
                    value={cronParts.month}
                    onChange={value =>
                        setCronParts(previous => ({
                            ...previous,
                            month: value,
                        }))
                    }
                    options={cronMonths.map(o => ({
                        value: o.value,
                        label: o.label,
                    }))}
                    style={{ flex: 1 }}
                    disabled={submitting}
                    data-testid="cron-month"
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
                    data-testid="cron-weekday"
                />
            </div>
            <div className={styles.cronPreview}>
                <code>{cronExpression}</code>
            </div>
        </div>
    );

    const selectedChannelDisplay = useMemo(() => {
        if (form.targetPlatform === "Telegram") {
            if (!form.telegramChannelId) return "Выберите Telegram канал";
            return (
                telegramChannelMap.get(form.telegramChannelId) ??
                "Выберите Telegram канал"
            );
        }
        if (!form.discordChannelId) return "Выберите Discord канал";
        return (
            discordChannelMap.get(form.discordChannelId) ??
            "Выберите Discord канал"
        );
    }, [
        form.targetPlatform,
        form.discordChannelId,
        form.telegramChannelId,
        discordChannelMap,
        telegramChannelMap,
    ]);

    const batchSelectedChannelDisplay = useMemo(() => {
        if (batchForm.targetPlatform === "Telegram") {
            if (!batchForm.telegramChannelId) return "Выберите Telegram канал";
            return (
                telegramChannelMap.get(batchForm.telegramChannelId) ??
                "Выберите Telegram канал"
            );
        }
        if (!batchForm.discordChannelId) return "Выберите Discord канал";
        return (
            discordChannelMap.get(batchForm.discordChannelId) ??
            "Выберите Discord канал"
        );
    }, [
        batchForm.targetPlatform,
        batchForm.discordChannelId,
        batchForm.telegramChannelId,
        discordChannelMap,
        telegramChannelMap,
    ]);

    const batchPreview = useMemo(() => {
        const { count, intervalHours } = batchForm;
        const totalHours = (count - 1) * intervalHours;
        const days = Math.floor(totalHours / 24);
        const hours = Math.round(totalHours % 24);

        let timeDesc = "";
        if (days > 0) timeDesc += `${days}д `;
        if (hours > 0) timeDesc += `${hours}ч`;
        if (!timeDesc) timeDesc = "сразу";

        return `${count} постов, каждый ${intervalHours}ч. Всего: ${timeDesc}`;
    }, [batchForm]);

    return (
        <div className={styles.page} data-testid="danbooru-auto-post-page">
            <div className={styles.pageHeader}>
                <h1 className={styles.pageTitle}>Danbooru автопостинг</h1>
                <div className={styles.headerActions}>
                    <Button
                        onClick={openBatchModal}
                        data-testid="button-batch"
                        icon={<Layers size={14} />}
                    >
                        Пакет
                    </Button>
                    <Button
                        type="primary"
                        onClick={openCreateModal}
                        data-testid="button-create"
                        icon={<Plus size={14} />}
                    >
                        Добавить
                    </Button>
                </div>
            </div>

            {!!error && (
                <Alert
                    type="error"
                    title={error}
                    style={{ marginBottom: 12 }}
                    closable
                    onClose={() => setError("")}
                    data-testid="error-alert"
                />
            )}

            {/* Create/Edit Modal */}
            <Modal
                open={showModal}
                onCancel={() => {
                    setShowModal(false);
                    setEditingId(undefined);
                }}
                title={
                    editingId
                        ? "Редактировать"
                        : "Добавить конфигурацию"
                }
                footer={false}
                centered
                width={600}
                data-testid="modal-config-form"
            >
                <form onSubmit={event_ => void handleSubmit(event_)}>
                    {renderPlatformSelector(form.targetPlatform, p =>
                        setForm(previous => ({
                            ...previous,
                            targetPlatform: p,
                        })),
                    )}

                    <div className={styles.formField}>
                        <label className={styles.formLabel}>
                            {form.targetPlatform === "Telegram"
                                ? "Telegram канал"
                                : "Discord канал"}
                        </label>
                        <Button
                            block
                            disabled={submitting}
                            onClick={() =>
                                openChannelPicker(form.targetPlatform)
                            }
                            data-testid="button-open-channel-picker"
                        >
                            {selectedChannelDisplay}
                        </Button>
                    </div>

                    <div className={styles.formField}>
                        <label className={styles.formLabel}>
                            Теги Danbooru
                        </label>
                        <Select
                            mode="tags"
                            value={form.tags}
                            onChange={(values: string[]) =>
                                setForm(previous => ({
                                    ...previous,
                                    tags: values.slice(0, 2),
                                }))
                            }
                            placeholder="Введите тег и нажмите Enter"
                            disabled={submitting}
                            style={{ width: "100%" }}
                            data-testid="input-tags"
                            tokenSeparators={[" "]}
                            maxCount={2}
                            maxTagCount="responsive"
                        />
                        <div className={styles.cronHint}>
                            Примеры: 1girl, solo, landscape, anime, scenery
                        </div>
                    </div>

                    <div className={styles.formField}>
                        <label className={styles.formLabel}>
                            Тип публикации
                        </label>
                        <div className={styles.publishTypeSelector}>
                            <button
                                type="button"
                                className={`${styles.publishTypeButton} ${form.publishType === "cron" ? styles.publishTypeActive : ""}`}
                                onClick={() =>
                                    setForm(previous => ({
                                        ...previous,
                                        publishType: "cron",
                                    }))
                                }
                                data-testid="publish-type-cron"
                            >
                                По расписанию
                            </button>
                            <button
                                type="button"
                                className={`${styles.publishTypeButton} ${form.publishType === "deferred" ? styles.publishTypeActive : ""}`}
                                onClick={() =>
                                    setForm(previous => ({
                                        ...previous,
                                        publishType: "deferred",
                                    }))
                                }
                                data-testid="publish-type-deferred"
                            >
                                Отложенная
                            </button>
                        </div>
                    </div>

                    {form.publishType === "cron" ? (
                        <div className={styles.formField}>
                            <label className={styles.formLabel}>
                                Расписание (CRON)
                            </label>
                            <Space style={{ marginBottom: 8 }}>
                                <Button
                                    size="small"
                                    type={
                                        cronMode === "visual"
                                            ? "primary"
                                            : "default"
                                    }
                                    onClick={() => setCronMode("visual")}
                                    data-testid="cron-mode-visual"
                                >
                                    Конструктор
                                </Button>
                                <Button
                                    size="small"
                                    type={
                                        cronMode === "manual"
                                            ? "primary"
                                            : "default"
                                    }
                                    onClick={() => setCronMode("manual")}
                                    data-testid="cron-mode-manual"
                                >
                                    Вручную
                                </Button>
                            </Space>

                            {cronMode === "visual" ? (
                                renderCronBuilder()
                            ) : (
                                <Input
                                    value={form.cronExpression}
                                    onChange={event_ =>
                                        setForm(previous => ({
                                            ...previous,
                                            cronExpression:
                                                event_.target.value,
                                        }))
                                    }
                                    placeholder="*/30 * * * *"
                                    disabled={submitting}
                                    data-testid="input-cron"
                                />
                            )}
                        </div>
                    ) : (
                        <div className={styles.formField}>
                            <label className={styles.formLabel}>
                                Дата и время публикации
                            </label>
                            <DatePicker
                                showTime
                                format="DD.MM.YYYY HH:mm"
                                placeholder="Выберите дату и время"
                                disabled={submitting}
                                style={{ width: "100%" }}
                                value={
                                    form.scheduledAt
                                        ? (form.scheduledAt as any)
                                        : undefined
                                }
                                onChange={(_, dateString) =>
                                    setForm(previous => ({
                                        ...previous,
                                        scheduledAt:
                                            typeof dateString === "string"
                                                ? dateString
                                                : "",
                                    }))
                                }
                                data-testid="input-scheduled-at"
                            />
                        </div>
                    )}

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
                            data-testid="button-cancel"
                        >
                            Отмена
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={submitting}
                            data-testid="button-submit"
                        >
                            {submitting ? (
                                <>
                                    <Spin
                                        size="small"
                                        style={{ marginRight: 8 }}
                                    />
                                    {editingId
                                        ? "Сохранение..."
                                        : "Создание..."}
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

            {/* Batch Create Modal */}
            <Modal
                open={showBatchModal}
                onCancel={() => setShowBatchModal(false)}
                title="Пакетное создание"
                footer={false}
                centered
                width={500}
                data-testid="modal-batch-form"
            >
                <form onSubmit={event_ => void handleBatchSubmit(event_)}>
                    {renderPlatformSelector(batchForm.targetPlatform, p =>
                        setBatchForm(previous => ({
                            ...previous,
                            targetPlatform: p,
                        })),
                    )}

                    <div className={styles.formField}>
                        <label className={styles.formLabel}>Канал</label>
                        <Button
                            block
                            disabled={submitting}
                            onClick={() => {
                                setChannelPickerType(batchForm.targetPlatform);
                                setChannelSearch("");
                                setShowChannelPicker(true);
                            }}
                            data-testid="button-batch-channel"
                        >
                            {batchSelectedChannelDisplay}
                        </Button>
                    </div>

                    <div className={styles.formField}>
                        <label className={styles.formLabel}>
                            Теги Danbooru
                        </label>
                        <Select
                            mode="tags"
                            value={batchForm.tags}
                            onChange={(values: string[]) =>
                                setBatchForm(previous => ({
                                    ...previous,
                                    tags: values.slice(0, 2),
                                }))
                            }
                            placeholder="Введите тег и нажмите Enter"
                            disabled={submitting}
                            style={{ width: "100%" }}
                            data-testid="input-batch-tags"
                            tokenSeparators={[" "]}
                            maxCount={2}
                            maxTagCount="responsive"
                        />
                    </div>

                    <div className={styles.formField}>
                        <label className={styles.formLabel}>
                            Количество постов
                        </label>
                        <InputNumber
                            min={1}
                            max={50}
                            value={batchForm.count}
                            onChange={value =>
                                setBatchForm(previous => ({
                                    ...previous,
                                    count: value ?? 5,
                                }))
                            }
                            disabled={submitting}
                            style={{ width: "100%" }}
                            data-testid="input-batch-count"
                        />
                    </div>

                    <div className={styles.formField}>
                        <label className={styles.formLabel}>
                            Интервал (часов)
                        </label>
                        <InputNumber
                            min={0.5}
                            max={168}
                            step={0.5}
                            value={batchForm.intervalHours}
                            onChange={value =>
                                setBatchForm(previous => ({
                                    ...previous,
                                    intervalHours: value ?? 2,
                                }))
                            }
                            disabled={submitting}
                            style={{ width: "100%" }}
                            data-testid="input-batch-interval"
                        />
                    </div>

                    <div className={styles.formField}>
                        <label className={styles.formLabel}>
                            Начать с (необязательно)
                        </label>
                        <DatePicker
                            showTime
                            format="DD.MM.YYYY HH:mm"
                            placeholder="Сейчас"
                            disabled={submitting}
                            style={{ width: "100%" }}
                            value={
                                batchForm.startAt
                                    ? (batchForm.startAt as any)
                                    : undefined
                            }
                            onChange={(_, dateString) =>
                                setBatchForm(previous => ({
                                    ...previous,
                                    startAt:
                                        typeof dateString === "string"
                                            ? dateString
                                            : "",
                                }))
                            }
                            data-testid="input-batch-start"
                        />
                    </div>

                    <div className={styles.batchPreview}>{batchPreview}</div>

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
                            onClick={() => setShowBatchModal(false)}
                            disabled={submitting}
                            data-testid="button-batch-cancel"
                        >
                            Отмена
                        </Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={submitting}
                            data-testid="button-batch-submit"
                        >
                            {submitting ? (
                                <>
                                    <Spin
                                        size="small"
                                        style={{ marginRight: 8 }}
                                    />
                                    Создание...
                                </>
                            ) : (
                                "Создать пакет"
                            )}
                        </Button>
                    </div>
                </form>
            </Modal>

            {renderChannelPickerModal()}

            <Card>
                <div className={styles.toolbar}>
                    <h5 style={{ marginBottom: 0 }}>Конфигурации</h5>
                    <div className={styles.filterTabs}>
                        <Button
                            size="small"
                            type={filterTab === "all" ? "primary" : "default"}
                            onClick={() => setFilterTab("all")}
                            data-testid="filter-all"
                        >
                            Все
                        </Button>
                        <Button
                            size="small"
                            type={
                                filterTab === "discord"
                                    ? "primary"
                                    : "default"
                            }
                            onClick={() => setFilterTab("discord")}
                            data-testid="filter-discord"
                            icon={<MessageCircle size={12} />}
                        >
                            Discord
                        </Button>
                        <Button
                            size="small"
                            type={
                                filterTab === "telegram"
                                    ? "primary"
                                    : "default"
                            }
                            onClick={() => setFilterTab("telegram")}
                            data-testid="filter-telegram"
                            icon={<Send size={12} />}
                        >
                            Telegram
                        </Button>
                    </div>
                    <Input
                        className={styles.searchBar}
                        placeholder="Поиск: канал, теги, CRON"
                        value={filter}
                        onChange={event_ => setFilter(event_.target.value)}
                        style={{ width: 300 }}
                        data-testid="input-search"
                    />
                </div>
                <div className={styles.cardsWrap}>
                    {loading ? (
                        <div
                            style={{ textAlign: "center", padding: "16px 0" }}
                            data-testid="loading-spinner"
                        >
                            <Spin />
                        </div>
                    ) : filteredConfigs.length === 0 ? (
                        <Alert
                            type="info"
                            title={
                                filterTab !== "all" || filter
                                    ? "Конфигурации не найдены"
                                    : "Нет конфигураций. Создайте первую!"
                            }
                            style={{ marginBottom: 0, marginTop: 12 }}
                            data-testid="empty-state"
                        />
                    ) : (
                        <div className={styles.cardsGrid}>
                            {filteredConfigs.map(config =>
                                renderConfigCard(config),
                            )}
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
};

export default DanbooruAutoPostPage;
