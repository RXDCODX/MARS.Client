import { memo, useCallback, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useShallow } from "zustand/react/shallow";

import styles from "./AddTrackModal.module.scss";
import { useAddTrackModal } from "./hooks";
import { useAddTrackModalStore } from "./stores/useAddTrackModalStore";

/**
 * Модальное окно для добавления трека в очередь
 * Управляет своим состоянием через Zustand store
 */
function AddTrackModalComponent() {
  const { isOpen, close } = useAddTrackModalStore(
    useShallow(state => ({
      isOpen: state.isOpen,
      close: state.close,
    }))
  );
  const { addTrack } = useAddTrackModal();
  const [query, setQuery] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!query.trim()) {
        return;
      }

      setIsSubmitting(true);
      try {
        const success = await addTrack(query);
        if (success) {
          setQuery("");
          close();
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [query, addTrack, close]
  );

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      setQuery("");
      close();
    }
  }, [isSubmitting, close]);

  return (
    <Modal show={isOpen} onHide={handleClose} centered>
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
              onChange={e => setQuery(e.target.value)}
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

// Экспортируем мемоизированную версию для оптимизации
export const AddTrackModal = memo(AddTrackModalComponent);
