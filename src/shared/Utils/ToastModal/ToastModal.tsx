/**
 * Компонент ToastModal для отображения уведомлений на основе OperationResult
 */

import "react-toastify/dist/ReactToastify.css";

import { useCallback } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast, ToastContainer, ToastOptions } from "react-toastify";

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
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
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
    // eslint-disable-next-line prettier/prettier
    <TData = unknown>(result: OperationResult<TData>) => {
      // Определяем тип тоста на основе result.success
      const type = result.success ? "success" : "error";

      // Сообщение из result.message или дефолтное
      const message =
        result.message ||
        (result.success ? "Операция выполнена успешно" : "Произошла ошибка");

      // Формируем данные для тоста
      const toastData: ToastModalData<TData> = {
        type,
        message,
        data: result.data,
        timestamp: new Date(),
        operationResult: result,
      };

      // Настройки тоста
      const toastOptions: ToastOptions = {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        onClick: () => {
          // При клике на toast открываем модальное окно с подробностями
          openModal(toastData);
        },
      };

      // Показываем тост в зависимости от типа
      if (type === "success") {
        toast.success(message, toastOptions);
      } else {
        toast.error(message, toastOptions);
      }
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {modalData && (
        <ToastModal data={modalData} show={showModal} onClose={closeModal} />
      )}
    </ToastModalContext.Provider>
  );
};

export default ToastModal;
