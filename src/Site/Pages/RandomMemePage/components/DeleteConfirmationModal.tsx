import React from "react";
import { Button, Modal, Spinner } from "react-bootstrap";
import { AlertTriangle, Trash2 } from "lucide-react";

import { DeleteConfirmationModalProps } from "../RandomMemePage.types";

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  itemType,
  itemName,
  isDeleting,
  onConfirm,
  onCancel,
}) => {
  const handleConfirm = async () => {
    try {
      await onConfirm();
    } catch (error) {
      console.error("Ошибка при удалении:", error);
    }
  };

  const getItemTypeText = () => {
    return itemType === "type" ? "тип мема" : "заказ мема";
  };

  const getItemTypeTextAccusative = () => {
    return itemType === "type" ? "тип мема" : "заказ мема";
  };

  return (
    <Modal show={isOpen} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title className="d-flex align-items-center gap-2">
          <AlertTriangle size={20} className="text-warning" />
          Подтверждение удаления
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="text-center mb-4">
          <Trash2 size={48} className="text-danger mb-3" />
          <h5 className="mb-3">Вы уверены?</h5>
          <p className="text-muted mb-0">
            Вы собираетесь удалить {getItemTypeText()} <strong>"{itemName}"</strong>.
            <br />
            Это действие нельзя отменить.
          </p>
        </div>

        {itemType === "type" && (
          <div className="alert alert-warning">
            <strong>Внимание!</strong> При удалении типа мема будут также удалены все связанные с ним заказы.
          </div>
        )}

        <div className="d-flex gap-2 justify-content-end">
          <Button
            variant="outline-secondary"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Отмена
          </Button>

          <Button
            variant="danger"
            onClick={handleConfirm}
            disabled={isDeleting}
            className="d-flex align-items-center gap-2"
          >
            {isDeleting ? (
              <>
                <Spinner animation="border" size="sm" />
                Удаление...
              </>
            ) : (
              <>
                <Trash2 size={16} />
                Удалить {getItemTypeTextAccusative()}
              </>
            )}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteConfirmationModal;
