import { useCallback, useEffect, useMemo, useState } from "react";
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

import { SpeakRequest, TtsVoice } from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";

import styles from "./TtsVoicePage.module.scss";

interface VoiceItem {
  name: string;
  isBlocked: boolean;
}

interface LinkedVoiceItem {
  userName: string;
  voiceName: string;
}

const TtsVoicePage: React.FC = () => {
  const { showToast } = useToastModal();
  const api = useMemo(() => new TtsVoice(), []);

  const [voices, setVoices] = useState<VoiceItem[]>([]);
  const [linkedVoices, setLinkedVoices] = useState<LinkedVoiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [blockingVoice, setBlockingVoice] = useState<string | null>(null);
  const [resettingUser, setResettingUser] = useState<string | null>(null);
  const [resettingAll, setResettingAll] = useState(false);
  const [error, setError] = useState("");
  const [testMessage, setTestMessage] = useState("Привет, это тест голоса TTS");
  const [selectedVoice, setSelectedVoice] = useState("");
  const [userToReset, setUserToReset] = useState("");

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [installedResult, blockedResult, linkedResult] = await Promise.all([
        api.ttsInstalledList(),
        api.ttsBlockedList(),
        api.ttsLinkedList(),
      ]);

      const installedVoices = Array.isArray(installedResult.data.data)
        ? (installedResult.data.data as string[])
        : [];
      const blockedVoices = Array.isArray(blockedResult.data.data)
        ? (blockedResult.data.data as string[])
        : [];
      const blockedSet = new Set(blockedVoices);

      const voiceNameSet = new Set<string>([
        ...installedVoices,
        ...blockedVoices,
      ]);
      const voiceList = Array.from(voiceNameSet).map(name => ({
        name,
        isBlocked: blockedSet.has(name),
      }));
      voiceList.sort((a, b) => a.name.localeCompare(b.name));
      setVoices(voiceList);

      setSelectedVoice(previous => {
        if (!previous && voiceList.length > 0) {
          return voiceList[0].name;
        }

        if (previous && voiceList.some(v => v.name === previous)) {
          return previous;
        }

        return voiceList.length > 0 ? voiceList[0].name : "";
      });

      const linkedRaw = linkedResult.data.data;
      const linkedDictionary =
        linkedRaw && typeof linkedRaw === "object"
          ? (linkedRaw as Record<string, string>)
          : {};
      const linkedList = Object.entries(linkedDictionary).map(
        ([userName, voiceName]) => ({
          userName,
          voiceName,
        })
      );
      linkedList.sort((a, b) => a.userName.localeCompare(b.userName));
      setLinkedVoices(linkedList);
    } catch (e) {
      const text =
        e instanceof Error ? e.message : "Не удалось загрузить данные TTS";
      setError(text);
      showToast({ success: false, message: text });
    } finally {
      setLoading(false);
    }
  }, [api, showToast]);

  useEffect(() => {
    void loadData();
  }, [loadData]);

  const handleTestVoice = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedVoice) {
      showToast({
        success: false,
        message: "Выберите голос для тестирования",
      });
      return;
    }

    if (!testMessage.trim()) {
      showToast({
        success: false,
        message: "Введите текст для тестирования",
      });
      return;
    }

    setTesting(true);
    setError("");

    try {
      const payload: SpeakRequest = {
        name: "tts_test_voice",
        message: testMessage.trim(),
        voiceName: selectedVoice,
      };

      const result = await api.ttsSpeakCreate(payload);
      showToast(result.data);
    } catch (e) {
      const text =
        e instanceof Error ? e.message : "Не удалось протестировать голос";
      setError(text);
      showToast({ success: false, message: text });
    } finally {
      setTesting(false);
    }
  };

  const handleBlockVoice = async (voiceName: string) => {
    const voice = voices.find(v => v.name === voiceName);
    const action = voice?.isBlocked ? "разблокировать" : "заблокировать";
    const isConfirmed = window.confirm(
      `Вы уверены, что хотите ${action} голос "${voiceName}"?`
    );

    if (!isConfirmed) {
      return;
    }

    setBlockingVoice(voiceName);
    setError("");

    try {
      if (voice?.isBlocked) {
        const result = await api.ttsBlockedDelete(voiceName);
        showToast(result.data);
      } else {
        const payload = { voiceName };
        const result = await api.ttsBlockedCreate(payload);
        showToast(result.data);
      }

      await loadData();
    } catch (e) {
      const text =
        e instanceof Error ? e.message : `Не удалось ${action} голос`;
      setError(text);
      showToast({ success: false, message: text });
    } finally {
      setBlockingVoice(null);
    }
  };

  const handleResetUser = async (event?: React.FormEvent) => {
    event?.preventDefault();
    const userName = userToReset.trim();

    if (!userName) {
      showToast({
        success: false,
        message: "Введите имя пользователя для сброса",
      });
      return;
    }

    setResettingUser(userName);
    setError("");

    try {
      const result = await api.ttsResetCreate(userName);
      showToast(result.data);
      setUserToReset("");
      await loadData();
    } catch (e) {
      const text =
        e instanceof Error
          ? e.message
          : "Не удалось сбросить голос пользователя";
      setError(text);
      showToast({ success: false, message: text });
    } finally {
      setResettingUser(null);
    }
  };

  const handleResetLinkedUser = async (userName: string) => {
    setResettingUser(userName);
    setError("");

    try {
      const result = await api.ttsResetCreate(userName);
      showToast(result.data);
      await loadData();
    } catch (e) {
      const text =
        e instanceof Error
          ? e.message
          : "Не удалось сбросить голос пользователя";
      setError(text);
      showToast({ success: false, message: text });
    } finally {
      setResettingUser(null);
    }
  };

  const handleResetAll = async () => {
    const isConfirmed = window.confirm(
      "Сбросить все пользовательские привязки голосов TTS?"
    );
    if (!isConfirmed) {
      return;
    }

    setResettingAll(true);
    setError("");

    try {
      const result = await api.ttsResetAllCreate();
      showToast(result.data);
      await loadData();
    } catch (e) {
      const text =
        e instanceof Error ? e.message : "Не удалось сбросить все привязки";
      setError(text);
      showToast({ success: false, message: text });
    } finally {
      setResettingAll(false);
    }
  };

  return (
    <Container fluid className={styles.page}>
      <div className={styles.header}>
        <h1>Управление голосами TTS</h1>
        <div className={styles.actionsRight}>
          <Button
            variant="outline-danger"
            onClick={() => void handleResetAll()}
            disabled={resettingAll}
          >
            {resettingAll ? (
              <>
                <Spinner as="span" size="sm" className="me-2" />
                Сброс...
              </>
            ) : (
              "Сбросить все"
            )}
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => void loadData()}
            disabled={loading}
          >
            {loading ? (
              <>
                <Spinner as="span" size="sm" className="me-2" />
                Обновление...
              </>
            ) : (
              "Обновить"
            )}
          </Button>
        </div>
      </div>

      {!!error && (
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
      )}

      <Row className="g-3">
        <Col xl={4}>
          <Card className={styles.card}>
            <Card.Header>
              <h5 className="mb-0">Тестирование голоса</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleTestVoice}>
                <Form.Group className="mb-3">
                  <Form.Label>Выберите голос</Form.Label>
                  <Form.Select
                    value={selectedVoice}
                    onChange={e => setSelectedVoice(e.target.value)}
                    disabled={voices.length === 0}
                  >
                    <option value="">-- Выберите голос --</option>
                    {voices.map(voice => (
                      <option
                        key={voice.name}
                        value={voice.name}
                        disabled={voice.isBlocked}
                      >
                        {voice.name} {voice.isBlocked ? "(заблокирован)" : ""}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Текст для воспроизведения</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={testMessage}
                    onChange={e => setTestMessage(e.target.value)}
                    placeholder="Введите текст для воспроизведения"
                    required
                  />
                </Form.Group>

                <div className={styles.actions}>
                  <Button type="submit" variant="primary" disabled={testing}>
                    {testing ? (
                      <>
                        <Spinner as="span" size="sm" className="me-2" />
                        Воспроизведение...
                      </>
                    ) : (
                      "Тестировать"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={8}>
          <Card className={`${styles.card} mb-3`}>
            <Card.Header>
              <h5 className="mb-0">Сброс голоса пользователя</h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleResetUser}>
                <div className={styles.inlineForm}>
                  <Form.Control
                    placeholder="Имя пользователя"
                    value={userToReset}
                    onChange={e => setUserToReset(e.target.value)}
                  />
                  <Button
                    type="submit"
                    variant="outline-primary"
                    disabled={!userToReset.trim() || !!resettingUser}
                  >
                    {resettingUser && resettingUser === userToReset.trim() ? (
                      <>
                        <Spinner as="span" size="sm" className="me-2" />
                        Сброс...
                      </>
                    ) : (
                      "Сбросить"
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className={styles.card}>
            <Card.Header>
              <h5 className="mb-0">Все доступные голоса ({voices.length})</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className={styles.loading}>
                  <Spinner animation="border" />
                </div>
              ) : voices.length === 0 ? (
                <Alert variant="info">Голоса не найдены</Alert>
              ) : (
                <div className={styles.tableWrap}>
                  <Table responsive hover className="mb-0" size="sm">
                    <thead>
                      <tr>
                        <th>Имя голоса</th>
                        <th>Статус</th>
                        <th className="text-end">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {voices.map(voice => (
                        <tr
                          key={voice.name}
                          className={voice.isBlocked ? styles.blocked : ""}
                        >
                          <td>{voice.name}</td>
                          <td>
                            <span
                              className={`badge ${voice.isBlocked ? "bg-danger" : "bg-success"}`}
                            >
                              {voice.isBlocked ? "Заблокирован" : "Активен"}
                            </span>
                          </td>
                          <td>
                            <div className={styles.actionsRight}>
                              <Button
                                size="sm"
                                variant={
                                  voice.isBlocked
                                    ? "outline-success"
                                    : "outline-warning"
                                }
                                disabled={blockingVoice === voice.name}
                                onClick={() =>
                                  void handleBlockVoice(voice.name)
                                }
                              >
                                {blockingVoice === voice.name ? (
                                  <>
                                    <Spinner
                                      as="span"
                                      size="sm"
                                      className="me-2"
                                    />
                                    Изменение...
                                  </>
                                ) : voice.isBlocked ? (
                                  "Разблокировать"
                                ) : (
                                  "Заблокировать"
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>

          <Card className={`${styles.card} mt-3`}>
            <Card.Header>
              <h5 className="mb-0">
                Пользовательские привязки голосов ({linkedVoices.length})
              </h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className={styles.loading}>
                  <Spinner animation="border" />
                </div>
              ) : linkedVoices.length === 0 ? (
                <Alert variant="info" className="mb-0">
                  Привязки пользователей не найдены
                </Alert>
              ) : (
                <div className={styles.tableWrap}>
                  <Table responsive hover className="mb-0" size="sm">
                    <thead>
                      <tr>
                        <th>Пользователь</th>
                        <th>Голос</th>
                        <th className="text-end">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {linkedVoices.map(linkedVoice => (
                        <tr
                          key={`${linkedVoice.userName}-${linkedVoice.voiceName}`}
                        >
                          <td>{linkedVoice.userName}</td>
                          <td>
                            <Badge bg="secondary">
                              {linkedVoice.voiceName}
                            </Badge>
                          </td>
                          <td>
                            <div className={styles.actionsRight}>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                disabled={
                                  resettingUser === linkedVoice.userName
                                }
                                onClick={() =>
                                  void handleResetLinkedUser(
                                    linkedVoice.userName
                                  )
                                }
                              >
                                {resettingUser === linkedVoice.userName ? (
                                  <>
                                    <Spinner
                                      as="span"
                                      size="sm"
                                      className="me-2"
                                    />
                                    Сброс...
                                  </>
                                ) : (
                                  "Сбросить"
                                )}
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TtsVoicePage;
