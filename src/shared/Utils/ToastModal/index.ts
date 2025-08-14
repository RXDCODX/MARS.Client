export { default as ToastModal } from "./ToastModal";
export { ToastModalProvider } from "./ToastModal";

// Хуки
export { useToastModal, useToastModalState } from "./ToastModal.hooks";

// Утилиты для создания тостов
export {
  createToastData,
  createUserToast,
  createApiToast,
  createErrorToast,
  createSuccessToast,
  createWarningToast,
  createInfoToast,
  createToastWithFormattedTimestamp,
  createProgressToast,
  createValidationToast,
  formatDataForModal,
  isValidToastData,
  normalizeToastData,
} from "./ToastModal.utils";

// Типы
export type {
  ToastModalData,
  ToastType,
  ToastMetadata,
  ToastModalProps,
  UseToastModalReturn,
  ToastModalProviderProps,
  ShowToastWithModalFunction,
  ToastCustomizationOptions,
  ModalConfig,
  ToastModalConfig,
} from "./ToastModal.types";

// Примеры использования
export { default as ToastModalExamples } from "./ToastModal.examples";
