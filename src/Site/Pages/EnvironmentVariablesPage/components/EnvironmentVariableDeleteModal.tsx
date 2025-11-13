import { Button, Modal, Spinner } from "react-bootstrap";

import { useToastModal } from "@/shared/Utils/ToastModal";

import { useEnvironmentVariablesStore } from "../store/useEnvironmentVariablesStore";

const EnvironmentVariableDeleteModal: React.FC = () => {
  const { showToast } = useToastModal();
  const confirmDeleteKey = useEnvironmentVariablesStore(
    state => state.confirmDeleteKey
  );
  const closeDeleteConfirm = useEnvironmentVariablesStore(
    state => state.closeDeleteConfirm
  );
  const deleteVariable = useEnvironmentVariablesStore(
    state => state.deleteVariable
  );
  const isDeleting = useEnvironmentVariablesStore(state => state.isDeleting);

  const handleDelete = async () => {
    const result = await deleteVariable();
    if (result) {
      showToast(result);
    }
  };

  return (
    <Modal show={Boolean(confirmDeleteKey)} onHide={closeDeleteConfirm}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление переменной</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Вы уверены, что хотите удалить переменную{" "}
        <strong>{confirmDeleteKey}</strong>? Действие нельзя отменить.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeDeleteConfirm}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={isDeleting}>
          {isDeleting ? (
            <Spinner animation="border" size="sm" className="me-2" />
          ) : null}
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EnvironmentVariableDeleteModal;
