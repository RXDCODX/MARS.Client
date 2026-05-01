import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";

import {
  AutoMessageDto,
  AutoMessages,
  CreateAutoMessageRequest,
  UpdateAutoMessageRequest,
} from "@/shared/api";
import { defaultApiConfig } from "@/shared/api/api-config";
import { useToastModal } from "@/shared/Utils/ToastModal";

import styles from "./AutoMessagesPage.module.scss";

const emptyMessage = "";

const AutoMessagesPage: React.FC = () => {
  const BootstrapButton = Button as any;
  const { showToast } = useToastModal();
  const api = useMemo(() => new AutoMessages(defaultApiConfig), []);

  const [items, setItems] = useState<AutoMessageDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [message, setMessage] = useState(emptyMessage);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await api.autoMessagesList();
      const data = Array.isArray(result.data.data) ? result.data.data : [];
      setItems(data);
    } catch (e) {
      const text =
        e instanceof Error ? e.message : "Не удалось загрузить автосообщения";
      setError(text);
      showToast({ success: false, message: text });
    } finally {
      setLoading(false);
    }
  }, [api, showToast]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const resetForm = () => {
    setMessage(emptyMessage);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      showToast({
        success: false,
        message: "Текст сообщения не может быть пустым",
      });
      return;
    }

    setSaving(true);
    setError("");

    try {
      if (editingId) {
        const payload: UpdateAutoMessageRequest = { message: message.trim() };
        const result = await api.autoMessagesUpdate(editingId, payload);
        showToast(result.data);
      } else {
        const payload: CreateAutoMessageRequest = { message: message.trim() };
        const result = await api.autoMessagesCreate(payload);
        showToast(result.data);
      }

      resetForm();
      await loadItems();
    } catch (e) {
      const text =
        e instanceof Error
          ? e.message
          : editingId
            ? "Не удалось обновить автосообщение"
            : "Не удалось создать автосообщение";
      setError(text);
      showToast({ success: false, message: text });
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: AutoMessageDto) => {
    setEditingId(item.id);
    setMessage(item.message || emptyMessage);
  };

  const handleDelete = async (id: string) => {
    const isConfirmed = window.confirm("Удалить это автосообщение?");
    if (!isConfirmed) {
      return;
    }

    setDeletingId(id);
    setError("");

    try {
      const result = await api.autoMessagesDelete(id);
      showToast(result.data);

      if (editingId === id) {
        resetForm();
      }

      await loadItems();
    } catch (e) {
      const text =
        e instanceof Error ? e.message : "Не удалось удалить автосообщение";
      setError(text);
      showToast({ success: false, message: text });
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <Container fluid className={styles.page}>
      <div className={styles.header}>
        <h1>Управление автосообщениями</h1>
        <BootstrapButton
          variant="outline-secondary"
          onClick={() => void loadItems()}
        >
          Обновить
        </BootstrapButton>
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
              <h5 className="mb-0">
                {editingId ? "Редактирование" : "Создание"}
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Текст сообщения</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Введите текст автосообщения"
                    required
                  />
                </Form.Group>

                <div className={styles.actions}>
                  <BootstrapButton
                    type="submit"
                    variant="primary"
                    disabled={saving}
                  >
                    {saving ? (
                      <>
                        <Spinner as="span" size="sm" className="me-2" />
                        Сохранение...
                      </>
                    ) : editingId ? (
                      "Сохранить"
                    ) : (
                      "Создать"
                    )}
                  </BootstrapButton>

                  {editingId && (
                    <BootstrapButton
                      variant="outline-secondary"
                      onClick={resetForm}
                    >
                      Отмена
                    </BootstrapButton>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={8}>
          <Card className={styles.card}>
            <Card.Header>
              <h5 className="mb-0">Список автосообщений</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className={styles.loading}>
                  <Spinner animation="border" />
                </div>
              ) : (
                <div className={styles.tableWrap}>
                  <Table responsive hover className="mb-0" size="sm">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Сообщение</th>
                        <th className="text-end">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(item => (
                        <tr key={item.id}>
                          <td className={styles.idCol}>{item.id}</td>
                          <td>{item.message}</td>
                          <td>
                            <div className={styles.actionsRight}>
                              <BootstrapButton
                                size="sm"
                                variant="outline-primary"
                                onClick={() => handleEdit(item)}
                              >
                                Изменить
                              </BootstrapButton>
                              <BootstrapButton
                                size="sm"
                                variant="outline-danger"
                                disabled={deletingId === item.id}
                                onClick={() => void handleDelete(item.id)}
                              >
                                {deletingId === item.id
                                  ? "Удаление..."
                                  : "Удалить"}
                              </BootstrapButton>
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

export default AutoMessagesPage;
