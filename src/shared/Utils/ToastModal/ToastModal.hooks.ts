import { createContext, useCallback, useContext, useState } from "react";

import { ToastModalData } from "./ToastModal.types";

// Создаем контекст для модального окна
const ToastModalContext = createContext<{
  modalData: ToastModalData | null;
  showModal: boolean;
  openModal: (data: ToastModalData) => void;
  closeModal: () => void;
  showToast: (data: ToastModalData) => void;
} | null>(null);

// Хук для использования контекста модального окна
export const useToastModal = () => {
  const context = useContext(ToastModalContext);
  if (!context) {
    throw new Error(
      "useToastModal должен использоваться внутри ToastModalProvider"
    );
  }
  return context;
};

// Хук для управления состоянием модального окна
export const useToastModalState = () => {
  const [modalData, setModalData] = useState<ToastModalData | null>(null);
  const [showModal, setShowModal] = useState(false);

  const openModal = useCallback((data: ToastModalData) => {
    setModalData(data);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setModalData(null);
  }, []);

  return {
    modalData,
    showModal,
    openModal,
    closeModal,
  };
};

// Экспортируем контекст для использования в провайдере
export { ToastModalContext };
