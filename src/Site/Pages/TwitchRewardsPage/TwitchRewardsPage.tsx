import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
  Spinner,
} from "react-bootstrap";

import {
  CreateCustomRewardsRequest,
  CustomReward,
  UpdateCustomRewardRequest,
} from "@/shared/api/http-clients/data-contracts";
import { TwitchRewards } from "@/shared/api/http-clients/TwitchRewards";
import {
  createErrorToast,
  createSuccessToast,
  useToastModal,
} from "@/shared/Utils/ToastModal";

import styles from "./TwitchRewardsPage.module.scss";

interface RewardFormState {
  title: string;
  prompt: string;
  cost: number;
  isEnabled: boolean;
  backgroundColor: string;
  isUserInputRequired: boolean;
  isMaxPerStreamEnabled: boolean;
  maxPerStream?: number;
  isMaxPerUserPerStreamEnabled: boolean;
  maxPerUserPerStream?: number;
  isGlobalCooldownEnabled: boolean;
  globalCooldownSeconds?: number;
  shouldRedemptionsSkipRequestQueue: boolean;
}

const defaultForm: RewardFormState = {
  title: "",
  prompt: "",
  cost: 100,
  isEnabled: true,
  backgroundColor: "#9146FF",
  isUserInputRequired: false,
  isMaxPerStreamEnabled: false,
  maxPerStream: undefined,
  isMaxPerUserPerStreamEnabled: false,
  maxPerUserPerStream: undefined,
  isGlobalCooldownEnabled: false,
  globalCooldownSeconds: undefined,
  shouldRedemptionsSkipRequestQueue: false,
};

const TwitchRewardsPage: React.FC = () => {
  const { showToast } = useToastModal();
  const api = useMemo(() => new TwitchRewards(), []);

  const [rewards, setRewards] = useState<CustomReward[]>([]);
  const [onlyManageable, setOnlyManageable] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");
  const [form, setForm] = useState<RewardFormState>({ ...defaultForm });
  const [creating, setCreating] = useState(false);
  const [filter, setFilter] = useState("");

  const loadRewards = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      // API метод возвращает void по сгенерированным типам, но сервер должен выдавать список.
      // Предположим, что ответ доступен как data или придёт ошибка — поддержим обе ситуации.
      const res = await api.twitchRewardsList({ onlyManageable });
      const base = res.data as unknown as { data: CustomReward[] };
      const data = Array.isArray(base.data) ? base.data : [];
      setRewards(data);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Не удалось загрузить награды";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [api, onlyManageable]);

  useEffect(() => {
    loadRewards();
  }, [loadRewards]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError("");

    const payload: CreateCustomRewardsRequest = {
      title: form.title,
      prompt: form.prompt,
      cost: Number(form.cost) || 0,
      isEnabled: form.isEnabled,
      backgroundColor: form.backgroundColor || undefined,
      isUserInputRequired: form.isUserInputRequired,
      isMaxPerStreamEnabled: form.isMaxPerStreamEnabled,
      maxPerStream: form.isMaxPerStreamEnabled ? form.maxPerStream : undefined,
      isMaxPerUserPerStreamEnabled: form.isMaxPerUserPerStreamEnabled,
      maxPerUserPerStream: form.isMaxPerUserPerStreamEnabled
        ? form.maxPerUserPerStream
        : undefined,
      isGlobalCooldownEnabled: form.isGlobalCooldownEnabled,
      globalCooldownSeconds: form.isGlobalCooldownEnabled
        ? form.globalCooldownSeconds
        : undefined,
      shouldRedemptionsSkipRequestQueue: form.shouldRedemptionsSkipRequestQueue,
    };

    try {
      const res = await api.twitchRewardsCreate(payload);
      const created = (res as unknown as { data?: CustomReward })?.data;
      if (created) {
        showToast(
          createSuccessToast(
            "Награда создана",
            created,
            "Создание награды Twitch"
          )
        );
        setForm({ ...defaultForm });
        await loadRewards();
      } else {
        throw new Error("Сервер не вернул созданную награду");
      }
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Не удалось создать награду";
      showToast(createErrorToast(msg, e, "Ошибка создания"));
      setError(msg);
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (rewardId?: string) => {
    if (!rewardId) return;
    try {
      await api.twitchRewardsDelete(rewardId);
      showToast(
        createSuccessToast(
          "Награда удалена",
          { rewardId },
          "Удаление Twitch награды"
        )
      );
      await loadRewards();
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Не удалось удалить награду";
      showToast(createErrorToast(msg, e, "Ошибка удаления"));
      setError(msg);
    }
  };

  const handleRecreate = async (reward: CustomReward) => {
    try {
      // Простая стратегия "пересоздать через API": удалить по id и создать снова с теми же свойствами
      if (reward.id) {
        await api.twitchRewardsDelete(reward.id);
      }

      const recreatePayload: CreateCustomRewardsRequest = {
        title: reward.title || "",
        prompt: reward.prompt || "",
        cost: reward.cost ?? 0,
        isEnabled: reward.isEnabled,
        backgroundColor: reward.backgroundColor,
        isUserInputRequired: reward.isUserInputRequired,
        isMaxPerStreamEnabled: !!reward.maxPerStreamSetting?.isEnabled,
        maxPerStream: reward.maxPerStreamSetting?.maxPerStream,
        isMaxPerUserPerStreamEnabled:
          !!reward.maxPerUserPerStreamSetting?.isEnabled,
        maxPerUserPerStream:
          reward.maxPerUserPerStreamSetting?.maxPerUserPerStream,
        isGlobalCooldownEnabled: !!reward.globalCooldownSetting?.isEnabled,
        globalCooldownSeconds:
          reward.globalCooldownSetting?.globalCooldownSeconds,
        shouldRedemptionsSkipRequestQueue: reward.shouldRedemptionsSkipQueue,
      };

      const res = await api.twitchRewardsCreate(recreatePayload);
      const created = (res as unknown as { data?: CustomReward })?.data;
      showToast(
        createSuccessToast(
          "Награда пересоздана",
          { oldId: reward.id, new: created },
          "Пересоздание Twitch награды"
        )
      );
      await loadRewards();
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Не удалось пересоздать награду";
      showToast(createErrorToast(msg, e, "Ошибка пересоздания"));
      setError(msg);
    }
  };

  const handleQuickDisable = async (reward: CustomReward) => {
    if (!reward.id) return;
    try {
      const payload: UpdateCustomRewardRequest = { isEnabled: false };
      await api.twitchRewardsPartialUpdate(reward.id, payload);
      showToast(
        createSuccessToast(
          "Награда отключена",
          { id: reward.id },
          "Обновление Twitch награды"
        )
      );
      await loadRewards();
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Не удалось обновить награду";
      showToast(createErrorToast(msg, e, "Ошибка обновления"));
      setError(msg);
    }
  };

  const filteredRewards = useMemo(() => {
    if (!filter.trim()) return rewards;
    const q = filter.toLowerCase();
    return rewards.filter(r =>
      [r.title, r.prompt, r.id].some(v => (v || "").toLowerCase().includes(q))
    );
  }, [rewards, filter]);

  return (
    <Container className={styles.page}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1>Твич награды</h1>
        <div className="d-flex align-items-center gap-2">
          <Form.Check
            type="switch"
            id="manageableSwitch"
            label="Только управляемые"
            checked={onlyManageable}
            onChange={e => setOnlyManageable(e.target.checked)}
          />
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={loadRewards}
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

      <Card className={`mb-4 ${styles.card}`}>
        <Card.Header>
          <h5 className="mb-0">Создать награду</h5>
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleCreate}>
            <Row className="g-3">
              <Col md={8}>
                <div className={styles.formGrid}>
                  <Form.Control
                    placeholder="Заголовок"
                    value={form.title}
                    onChange={e =>
                      setForm(s => ({ ...s, title: e.target.value }))
                    }
                    required
                  />
                  <Form.Control
                    placeholder="Описание (prompt)"
                    value={form.prompt}
                    onChange={e =>
                      setForm(s => ({ ...s, prompt: e.target.value }))
                    }
                  />
                  <Form.Control
                    type="number"
                    min={1}
                    placeholder="Стоимость"
                    value={form.cost}
                    onChange={e =>
                      setForm(s => ({ ...s, cost: Number(e.target.value) }))
                    }
                  />
                  <InputGroup>
                    <InputGroup.Text>Цвет</InputGroup.Text>
                    <Form.Control
                      type="text"
                      placeholder="#9146FF"
                      value={form.backgroundColor}
                      onChange={e =>
                        setForm(s => ({
                          ...s,
                          backgroundColor: e.target.value,
                        }))
                      }
                    />
                  </InputGroup>
                </div>
              </Col>
              <Col md={4}>
                <div className="d-flex flex-column gap-2">
                  <Form.Check
                    type="switch"
                    label="Включена"
                    checked={form.isEnabled}
                    onChange={e =>
                      setForm(s => ({ ...s, isEnabled: e.target.checked }))
                    }
                  />
                  <Form.Check
                    type="switch"
                    label="Требует ввод пользователя"
                    checked={form.isUserInputRequired}
                    onChange={e =>
                      setForm(s => ({
                        ...s,
                        isUserInputRequired: e.target.checked,
                      }))
                    }
                  />
                  <Form.Check
                    type="switch"
                    label="Лимит на стрим"
                    checked={form.isMaxPerStreamEnabled}
                    onChange={e =>
                      setForm(s => ({
                        ...s,
                        isMaxPerStreamEnabled: e.target.checked,
                      }))
                    }
                  />
                  {form.isMaxPerStreamEnabled && (
                    <Form.Control
                      type="number"
                      min={1}
                      placeholder="maxPerStream"
                      value={form.maxPerStream ?? 1}
                      onChange={e =>
                        setForm(s => ({
                          ...s,
                          maxPerStream: Number(e.target.value),
                        }))
                      }
                    />
                  )}
                  <Form.Check
                    type="switch"
                    label="Лимит на пользователя"
                    checked={form.isMaxPerUserPerStreamEnabled}
                    onChange={e =>
                      setForm(s => ({
                        ...s,
                        isMaxPerUserPerStreamEnabled: e.target.checked,
                      }))
                    }
                  />
                  {form.isMaxPerUserPerStreamEnabled && (
                    <Form.Control
                      type="number"
                      min={1}
                      placeholder="maxPerUserPerStream"
                      value={form.maxPerUserPerStream ?? 1}
                      onChange={e =>
                        setForm(s => ({
                          ...s,
                          maxPerUserPerStream: Number(e.target.value),
                        }))
                      }
                    />
                  )}
                  <Form.Check
                    type="switch"
                    label="Глобальный кулдаун"
                    checked={form.isGlobalCooldownEnabled}
                    onChange={e =>
                      setForm(s => ({
                        ...s,
                        isGlobalCooldownEnabled: e.target.checked,
                      }))
                    }
                  />
                  {form.isGlobalCooldownEnabled && (
                    <Form.Control
                      type="number"
                      min={1}
                      placeholder="cooldownSeconds"
                      value={form.globalCooldownSeconds ?? 60}
                      onChange={e =>
                        setForm(s => ({
                          ...s,
                          globalCooldownSeconds: Number(e.target.value),
                        }))
                      }
                    />
                  )}
                  <Form.Check
                    type="switch"
                    label="Пропуск очереди"
                    checked={form.shouldRedemptionsSkipRequestQueue}
                    onChange={e =>
                      setForm(s => ({
                        ...s,
                        shouldRedemptionsSkipRequestQueue: e.target.checked,
                      }))
                    }
                  />
                </div>
              </Col>
            </Row>

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

      <Card className={styles.card}>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Список наград</h5>
            <Form.Control
              className={styles.searchBar}
              placeholder="Поиск по названию, описанию, id"
              value={filter}
              onChange={e => setFilter(e.target.value)}
            />
          </div>
        </Card.Header>
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Загрузка...</span>
              </Spinner>
            </div>
          ) : filteredRewards.length === 0 ? (
            <Alert variant="info">Награды не найдены</Alert>
          ) : (
            <Row xs={1} sm={2} md={3} lg={4} className="g-3">
              {filteredRewards.map(r => (
                <Col key={r.id || r.title}>
                  <Card className={styles.card}>
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="mb-1">{r.title}</h6>
                          <div className="text-muted small">{r.prompt}</div>
                        </div>
                        <Badge bg={r.isEnabled ? "success" : "secondary"}>
                          {r.isEnabled ? "Включена" : "Выключена"}
                        </Badge>
                      </div>
                      <div className="mt-2 d-flex justify-content-between align-items-center">
                        <div className={styles.badgeRow}>
                          <Badge bg="primary">{r.cost} pts</Badge>
                          {r.backgroundColor && (
                            <Badge bg="dark">{r.backgroundColor}</Badge>
                          )}
                          {r.isUserInputRequired && (
                            <Badge bg="warning" text="dark">
                              Требует ввод
                            </Badge>
                          )}
                          {r.maxPerStreamSetting?.isEnabled && (
                            <Badge bg="info">
                              max/stream: {r.maxPerStreamSetting.maxPerStream}
                            </Badge>
                          )}
                          {r.maxPerUserPerStreamSetting?.isEnabled && (
                            <Badge bg="info">
                              max/user:{" "}
                              {r.maxPerUserPerStreamSetting.maxPerUserPerStream}
                            </Badge>
                          )}
                          {r.globalCooldownSetting?.isEnabled && (
                            <Badge bg="secondary">
                              cd:{" "}
                              {r.globalCooldownSetting.globalCooldownSeconds}s
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className={`mt-3 ${styles.actionsRow}`}>
                        <Button
                          size="sm"
                          variant="outline-primary"
                          onClick={() => handleRecreate(r)}
                        >
                          Пересоздать
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-secondary"
                          onClick={() => handleQuickDisable(r)}
                          disabled={!r.isEnabled}
                        >
                          Выключить
                        </Button>
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(r.id)}
                        >
                          Удалить
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TwitchRewardsPage;
