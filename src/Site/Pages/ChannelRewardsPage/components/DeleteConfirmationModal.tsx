import { Button, Modal } from "react-bootstrap";

import { DeleteConfirmationModalProps } from "../ChannelRewardsPage.types";

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  reward,
  isDeleting,
  onConfirm,
  onCancel,
}) => {
  const handleConfirm = async () => {
    await onConfirm();
  };

  if (!reward) {
    return null;
  }

  return (
    <Modal show={isOpen} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Подтверждение удаления</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          Вы уверены, что хотите удалить награду{" "}
          <strong>"{reward.title}"</strong>?
        </p>
        <p className="text-muted">
          Это действие нельзя отменить. Награда будет удалена из системы.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel} disabled={isDeleting}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleConfirm} disabled={isDeleting}>
          {isDeleting ? "Удаление..." : "Удалить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
