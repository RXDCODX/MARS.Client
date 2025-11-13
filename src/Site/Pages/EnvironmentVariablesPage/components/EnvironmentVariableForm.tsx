import { Save, Trash2 } from "lucide-react";
import {
  Badge,
  Button,
  CloseButton,
  Form,
  Modal,
  Spinner,
} from "react-bootstrap";

import { useToastModal } from "@/shared/Utils/ToastModal";

import styles from "../EnvironmentVariablesPage.module.scss";
import { useEnvironmentVariablesStore } from "../store/useEnvironmentVariablesStore";
import { formatDateTime } from "../utils/formatDateTime";

const EnvironmentVariableForm: React.FC = () => {
  const { showToast } = useToastModal();

  const showForm = useEnvironmentVariablesStore(state => state.showForm);
  const formMode = useEnvironmentVariablesStore(state => state.formMode);
  const formValues = useEnvironmentVariablesStore(state => state.formValues);
  const isSubmitting = useEnvironmentVariablesStore(
    state => state.isSubmitting
  );
  const selectedKey = useEnvironmentVariablesStore(state => state.selectedKey);
  const selectedVariable = useEnvironmentVariablesStore(state =>
    state.variables.find(variable => variable.key === state.selectedKey)
  );

  const updateFormField = useEnvironmentVariablesStore(
    state => state.updateFormField
  );
  const cancelForm = useEnvironmentVariablesStore(state => state.cancelForm);
  const submitForm = useEnvironmentVariablesStore(state => state.submitForm);
  const openDeleteConfirm = useEnvironmentVariablesStore(
    state => state.openDeleteConfirm
  );

  const handleSubmit = async () => {
    const result = await submitForm();
    if (result) {
      showToast(result);
    }
  };

  const handleDelete = () => {
    openDeleteConfirm();
  };

  if (!showForm) {
    return null;
  }

  return (
    <Modal
      show={showForm}
      onHide={cancelForm}
      centered
      contentClassName={styles.formModal}
    >
      <Modal.Header className={styles.formModalHeader}>
        <div className={styles.formModalTitle}>
          <Modal.Title as="h3">
            {formMode === "create"
              ? "Создание переменной"
              : "Редактирование переменной"}
          </Modal.Title>
          {formMode === "edit" && selectedKey && selectedVariable && (
            <Badge bg="secondary" className={styles.formModalBadge}>
              Обновлено {formatDateTime(selectedVariable.updatedAt)}
            </Badge>
          )}
        </div>
        <CloseButton onClick={cancelForm} className={styles.formModalClose} />
      </Modal.Header>

      <Modal.Body className={styles.formModalBody}>
        <div className={styles.formFields}>
          <Form.Group>
            <Form.Label>Ключ</Form.Label>
            <Form.Control
              value={formValues.key}
              onChange={event => updateFormField("key", event.target.value)}
              placeholder="Например: Api:BaseUrl"
              disabled={formMode === "edit" && Boolean(selectedKey)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Значение</Form.Label>
            <Form.Control
              as="textarea"
              value={formValues.value}
              onChange={event => updateFormField("value", event.target.value)}
              placeholder="Введите значение переменной"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              value={formValues.description}
              onChange={event =>
                updateFormField("description", event.target.value)
              }
              placeholder="Добавьте описание для удобства"
            />
          </Form.Group>
        </div>
      </Modal.Body>

      <Modal.Footer className={styles.formModalFooter}>
        {formMode === "edit" && (
          <div className="d-flex align-items-center gap-2">
            <Button variant="outline-danger" size="sm" onClick={handleDelete}>
              <Trash2 size={16} className="me-2" />
              Удалить
            </Button>
          </div>
        )}

        <div className={styles.formModalActions}>
          <Button variant="outline-secondary" size="sm" onClick={cancelForm}>
            Закрыть
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <Spinner animation="border" size="sm" className="me-2" />
            ) : (
              <Save size={16} className="me-2" />
            )}
            Сохранить
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default EnvironmentVariableForm;
