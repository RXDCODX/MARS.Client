import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

import styles from "./AddTrackModal.module.scss";

interface AddTrackModalProps {
  show: boolean;
  onClose: () => void;
  onSubmit: (query: string) => Promise<void>;
}

export function AddTrackModal({ show, onClose, onSubmit }: AddTrackModalProps) {
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(query.trim());
      setQuery("");
      onClose();
    } catch (error) {
      console.error("Ошибка при добавлении трека:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setQuery("");
      onClose();
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Добавить трек</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Введите название трека или ссылку</Form.Label>
            <Form.Control
              type="text"
              placeholder="Например: Rick Astley - Never Gonna Give You Up"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              disabled={isSubmitting}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button 
            className={`${styles.modalButton} ${styles.secondary}`}
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Отмена
          </Button>
          <Button 
            className={`${styles.modalButton} ${styles.primary}`}
            type="submit"
            disabled={!query.trim() || isSubmitting}
          >
            {isSubmitting ? "Добавление..." : "Добавить"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

