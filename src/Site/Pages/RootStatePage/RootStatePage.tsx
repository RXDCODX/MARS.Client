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

import { defaultApiConfig } from "@/shared/api/api-config";
import { RootState } from "@/shared/api/http-clients/RootState";
import type { RootState as RootStateDto } from "@/shared/api/types/data-contracts";
import type { OperationResult } from "@/shared/types/OperationResult";
import { useToastModal } from "@/shared/Utils/ToastModal";

import styles from "./RootStatePage.module.scss";

interface RootStateForm {
  name: string;
  value: string;
  description: string;
  typeDescription: string;
}

const defaultForm: RootStateForm = {
  name: "",
  value: "",
  description: "",
  typeDescription: "",
};

const RootStatePage: React.FC = () => {
  const { showToast } = useToastModal();
  const appConfigurationService = useMemo(
    () => new RootState(defaultApiConfig),
    []
  );

  const [items, setItems] = useState<RootStateDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingName, setDeletingName] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [editingName, setEditingName] = useState<string | null>(null);
  const [form, setForm] = useState<RootStateForm>(defaultForm);

  const loadItems = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await appConfigurationService!.rootStateList();
      const operation = response.data;

      if (operation.success) {
        setItems(Array.isArray(operation.data) ? operation.data : []);
      } else {
        const message = operation.message ?? "Не удалось загрузить RootState";
        setItems([]);
        setError(message);
        showToast(operation);
      }
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Ошибка при загрузке RootState";
      setItems([]);
      setError(message);
      showToast({ success: false, message });
    } finally {
      setLoading(false);
    }
  }, [appConfigurationService, showToast]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  const resetForm = () => {
    setForm(defaultForm);
    setEditingName(null);
  };

  const handleEdit = (item: RootStateDto) => {
    setEditingName(item.name);
    setForm({
      name: item.name,
      value: item.value,
      description: item.description,
      typeDescription: item.typeDescription,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedName = form.name.trim();

    if (!trimmedName) {
      showToast({
        success: false,
        message: "Имя RootState не может быть пустым",
      });
      return;
    }

    setSaving(true);
    setError("");

    try {
      let operation: OperationResult;

      if (editingName) {
        const response =
          await appConfigurationService!.rootStateValuePartialUpdate(
            editingName,
            {
              value: form.value,
            }
          );
        operation = response.data;
      } else {
        const response = await appConfigurationService!.rootStateCreate({
          name: trimmedName,
          value: form.value,
          description: form.description,
          typeDescription: form.typeDescription,
        });
        operation = response.data;
      }

      showToast(operation);

      if (operation.success) {
        resetForm();
        await loadItems();
      }
    } catch (e) {
      const message =
        e instanceof Error
          ? e.message
          : editingName
            ? "Не удалось обновить значение RootState"
            : "Не удалось создать RootState";
      setError(message);
      showToast({ success: false, message });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (name: string) => {
    if (!window.confirm(`Удалить RootState '${name}'?`)) {
      return;
    }

    setDeletingName(name);
    setError("");

    try {
      const response = await appConfigurationService!.rootStateDelete(name);
      const operation = response.data;
      showToast(operation);

      if (operation.success) {
        if (editingName === name) {
          resetForm();
        }
        await loadItems();
      }
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Не удалось удалить RootState";
      setError(message);
      showToast({ success: false, message });
    } finally {
      setDeletingName(null);
    }
  };

  return (
    <Container fluid className={styles.page}>
      <div className={styles.header}>
        <h1 className="mb-0">Управление RootState</h1>
        <Button variant="outline-secondary" onClick={() => void loadItems()}>
          Обновить
        </Button>
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
                {editingName ? "Редактирование значения" : "Создание"}
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Имя</Form.Label>
                  <Form.Control
                    value={form.name}
                    onChange={e =>
                      setForm(state => ({ ...state, name: e.target.value }))
                    }
                    placeholder="Например: feature-toggle"
                    disabled={!!editingName}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Значение</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={form.value}
                    onChange={e =>
                      setForm(state => ({ ...state, value: e.target.value }))
                    }
                    placeholder="Введите значение"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    value={form.description}
                    onChange={e =>
                      setForm(state => ({
                        ...state,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Описание параметра"
                    disabled={!!editingName}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Type Description</Form.Label>
                  <Form.Control
                    value={form.typeDescription}
                    onChange={e =>
                      setForm(state => ({
                        ...state,
                        typeDescription: e.target.value,
                      }))
                    }
                    placeholder="Например: string"
                    disabled={!!editingName}
                    required
                  />
                </Form.Group>

                <div className={styles.actions}>
                  <Button type="submit" variant="primary" disabled={saving}>
                    {saving ? (
                      <>
                        <Spinner as="span" size="sm" className="me-2" />
                        Сохранение...
                      </>
                    ) : editingName ? (
                      "Обновить значение"
                    ) : (
                      "Создать"
                    )}
                  </Button>

                  {editingName && (
                    <Button
                      type="button"
                      variant="outline-secondary"
                      onClick={resetForm}
                    >
                      Отмена
                    </Button>
                  )}
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xl={8}>
          <Card className={styles.card}>
            <Card.Header>
              <h5 className="mb-0">Список RootState</h5>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" />
                </div>
              ) : (
                <div className={styles.tableWrap}>
                  <Table responsive hover className="mb-0" size="sm">
                    <thead>
                      <tr>
                        <th>Имя</th>
                        <th>Значение</th>
                        <th>Описание</th>
                        <th>Тип</th>
                        <th className="text-end">Действия</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map(item => (
                        <tr key={item.name}>
                          <td className={styles.nameCell}>{item.name}</td>
                          <td className={styles.valueCell}>{item.value}</td>
                          <td>{item.description}</td>
                          <td>{item.typeDescription}</td>
                          <td>
                            <div className={styles.actionsRight}>
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => handleEdit(item)}
                              >
                                Изменить
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                disabled={deletingName === item.name}
                                onClick={() => void handleDelete(item.name)}
                              >
                                {deletingName === item.name
                                  ? "Удаление..."
                                  : "Удалить"}
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

export default RootStatePage;
