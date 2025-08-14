import "react-toastify/dist/ReactToastify.css";

import { useCallback } from "react";
import { Button, Modal } from "react-bootstrap";
import { toast, ToastContainer, ToastOptions } from "react-toastify";

import { ToastModalContext, useToastModalState } from "./ToastModal.hooks";
import styles from "./ToastModal.module.scss";
import { ToastModalData } from "./ToastModal.types";

interface ToastModalProps {
  data: ToastModalData;
  onClose?: () => void;
  show?: boolean;
}

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

  const renderContent = () => {
    if (typeof data.message === "string") {
      return <p className={styles.message}>{data.message}</p>;
    }
    return <div className={styles.message}>{data.message}</div>;
  };

  const renderData = () => {
    if (!data.data) return null;

    if (typeof data.data === "object") {
      return (
        <div className={styles.dataSection}>
          <h6>Данные:</h6>
          <pre className={styles.jsonData}>
            {JSON.stringify(data.data, null, 2)}
          </pre>
        </div>
      );
    }

    return (
      <div className={styles.dataSection}>
        <h6>Данные:</h6>
        <div className={styles.dataContent}>{String(data.data)}</div>
      </div>
    );
  };

  const renderMetadata = () => {
    if (!data.metadata || Object.keys(data.metadata).length === 0) return null;

    return (
      <div className={styles.metadataSection}>
        <h6>Метаданные:</h6>
        <div className={styles.metadataGrid}>
          {Object.entries(data.metadata).map(([key, value]) => (
            <div key={key} className={styles.metadataItem}>
              <span className={styles.metadataKey}>{key}:</span>
              <span className={styles.metadataValue}>
                {typeof value === "object"
                  ? JSON.stringify(value)
                  : String(value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Определяем цвета для разных типов модальных окон
  const getModalHeaderStyle = () => {
    switch (data.type) {
      case "success":
        return { backgroundColor: "#28a745", color: "white" };
      case "error":
        return { backgroundColor: "#dc3545", color: "white" };
      case "warning":
        return { backgroundColor: "#ffc107", color: "black" };
      case "info":
      default:
        return { backgroundColor: "#17a2b8", color: "white" };
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header
        closeButton
        style={getModalHeaderStyle()}
        className={styles.modalHeader}
      >
        <Modal.Title>{data.title || "Уведомление"}</Modal.Title>
      </Modal.Header>

      <Modal.Body className={styles.modalBody}>
        {renderContent()}
        {renderData()}
        {renderMetadata()}
      </Modal.Body>

      <Modal.Footer className={styles.modalFooter}>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Компонент-обертка для интеграции с существующим приложением
export const ToastModalProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { modalData, showModal, openModal, closeModal } = useToastModalState();

  // Функция для показа toast с возможностью открытия модального окна при клике
  const showToast = useCallback(
    (data: ToastModalData) => {
      const toastOptions: ToastOptions = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClick: () => {
          // При клике на toast открываем модальное окно
          openModal(data);
        },
      };

      switch (data.type) {
        case "success":
          toast.success(data.message || "Успешно!", toastOptions);
          break;
        case "warning":
          toast.warning(data.message || "Предупреждение!", toastOptions);
          break;
        case "error":
          toast.error(data.message || "Ошибка!", toastOptions);
          break;
        default:
          toast.info(data.message || "Информация!", toastOptions);
          break;
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
