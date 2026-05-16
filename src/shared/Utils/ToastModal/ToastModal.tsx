/**
 * Компонент ToastModal для отображения уведомлений на основе OperationResult
 */

import { useCallback } from "react";
import { Modal } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";

import { OperationResult } from "@/shared/types/OperationResult";

import { ToastModalContext, useToastModalState } from "./ToastModal.hooks";
import styles from "./ToastModal.module.scss";
import { ToastModalData } from "./ToastModal.types";

interface ToastModalProps {
  /** Данные для отображения */
  data: ToastModalData;
  /** Callback при закрытии */
  onClose?: () => void;
  /** Показывать ли модальное окно */
  show?: boolean;
}

/**
 * Модальное окно для отображения подробностей операции
 */
const ToastModal: React.FC<ToastModalProps> = ({
  data,
  onClose,
  show = false,
}) => {
  const handleClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);

  // Рендер данных из OperationResult.data
  const renderData = () => {
    if (!data.data) return null;

    return (
      <div className={styles.dataSection}>
        <h6>Данные:</h6>
        <pre className={styles.jsonData}>
          {JSON.stringify(data.data, null, 2)}
        </pre>
      </div>
    );
  };

  // Рендер информации об операции
  const renderOperationInfo = () => {
    const { operationResult } = data;

    return (
      <div className={styles.metadataSection}>
        <h6>Информация:</h6>
        <div className={styles.metadataGrid}>
          <div className={styles.metadataItem}>
            <span className={styles.metadataKey}>Статус:</span>
            <span className={styles.metadataValue}>
              {operationResult.success ? "Успешно" : "Ошибка"}
            </span>
          </div>
          <div className={styles.metadataItem}>
            <span className={styles.metadataKey}>Время:</span>
            <span className={styles.metadataValue}>
              {data.timestamp.toLocaleString("ru-RU")}
            </span>
          </div>
        </div>
      </div>
    );
  };

  // Стили заголовка в зависимости от типа
  const getModalHeaderStyle = () =>
    data.type === "success"
      ? { backgroundColor: "#28a745", color: "white" }
      : { backgroundColor: "#dc3545", color: "white" };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header
        closeButton
        style={getModalHeaderStyle()}
        className={styles.modalHeader}
      >
        <Modal.Title>
          {data.type === "success" ? "Успех" : "Ошибка"}
        </Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.modalBody}>
        <p className={styles.message}>{data.message}</p>
        {renderData()}
        {renderOperationInfo()}
      </Modal.Body>

      <Modal.Footer className={styles.modalFooter}>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={handleClose}
        >
          Закрыть
        </button>
      </Modal.Footer>
    </Modal>
  );
};

/**
 * Провайдер для ToastModal
 * Оборачивает приложение и предоставляет функцию showToast
 */
export const ToastModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { modalData, showModal, openModal, closeModal } = useToastModalState();

  /**
   * Показать тост на основе OperationResult
   * Автоматически определяет тип (success/error) на основе result.success
   * result.message - отображается в тосте
   * result.data - отображается в модальном окне при клике
   */
  const showToast = useCallback(
    <TData = unknown,>(result: OperationResult<TData>) => {
      const type = result.success ? "success" : "error";

      const message =
        result.message ||
        (result.success ? "Операция выполнена успешно" : "Произошла ошибка");

      const toastData: ToastModalData<TData> = {
        type,
        message,
        data: result.data,
        timestamp: new Date(),
        operationResult: result,
      };

      const toastOptions = {
        duration: 5000,
        position: "bottom-right" as const,
      };

      // Показываем кастомный тост с поддержкой клика для открытия модального окна
      toast.custom(
        t => (
          <div
            onClick={() => {
              openModal(toastData);
              // закрываем тост после клика
              toast.dismiss(t.id);
            }}
            className={
              type === "success"
                ? `${styles.hotToast} ${styles.hotToastSuccess}`
                : `${styles.hotToast} ${styles.hotToastError}`
            }
          >
            <div className={styles.hotToastMessage}>{message}</div>
          </div>
        ),
        toastOptions
      );
    },
    [openModal]
  );

  const contextValue = {
    modalData,
    showModal,
    openModal,
    closeModal,
    showToast,
  };

  return (
    <ToastModalContext.Provider value={contextValue}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
        }}
      />
      {modalData && (
        <ToastModal data={modalData} show={showModal} onClose={closeModal} />
      )}
    </ToastModalContext.Provider>
  );
};

export default ToastModal;
