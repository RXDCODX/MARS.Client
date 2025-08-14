import { ToastOptions } from "react-toastify";

/**
 * Основные типы тостов
 */
export type ToastType = "info" | "success" | "warning" | "error";

/**
 * Метаданные для тоста
 */
export interface ToastMetadata {
  [key: string]: unknown;
}

/**
 * Основные данные для тоста и модального окна
 */
export interface ToastModalData {
  /** Заголовок модального окна */
  title?: string;

  /** Сообщение тоста (может быть строкой или React компонентом) */
  message?: string | React.ReactNode;

  /** Данные для отображения в модальном окне */
  data?: unknown;

  /** Тип тоста */
  type?: ToastType;

  /** Временная метка */
  timestamp?: Date;

  /** Дополнительные метаданные */
  metadata?: ToastMetadata;
}

/**
 * Пропсы для компонента ToastModal
 */
export interface ToastModalProps {
  /** Данные для отображения */
  data: ToastModalData;

  /** Callback при закрытии модального окна */
  onClose?: () => void;

  /** Показывать ли модальное окно */
  show?: boolean;
}

/**
 * Возвращаемые значения хука useToastModal
 */
export interface UseToastModalReturn {
  /** Данные для модального окна */
  modalData: ToastModalData | null;

  /** Состояние видимости модального окна */
  showModal: boolean;

  /** Функция для открытия модального окна */
  openModal: (data: ToastModalData) => void;

  /** Функция для закрытия модального окна */
  closeModal: () => void;
}

/**
 * Пропсы для ToastModalProvider
 */
export interface ToastModalProviderProps {
  /** Дочерние компоненты */
  children: React.ReactNode;
}

/**
 * Функция для показа тоста с возможностью открытия модального окна
 */
export type ShowToastWithModalFunction = (
  data: ToastModalData,
  onToastClick?: (data: ToastModalData) => void,
  toastOptions?: ToastOptions
) => void;

/**
 * Настройки для кастомизации тостов
 */
export interface ToastCustomizationOptions {
  /** Позиция тоста */
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";

  /** Автоматическое закрытие в миллисекундах */
  autoClose?: number | false;

  /** Скрыть прогресс бар */
  hideProgressBar?: boolean;

  /** Закрывать при клике */
  closeOnClick?: boolean;

  /** Пауза при наведении */
  pauseOnHover?: boolean;

  /** Возможность перетаскивания */
  draggable?: boolean;

  /** Тема (светлая/темная) */
  theme?: "light" | "dark" | "colored";
}

/**
 * Конфигурация для модального окна
 */
export interface ModalConfig {
  /** Размер модального окна */
  size?: "sm" | "lg" | "xl";

  /** Центрировать ли модальное окно */
  centered?: boolean;

  /** Показывать ли кнопку закрытия в заголовке */
  showCloseButton?: boolean;

  /** Кастомные стили для заголовка */
  headerStyle?: React.CSSProperties;

  /** Кастомные стили для тела */
  bodyStyle?: React.CSSProperties;

  /** Кастомные стили для футера */
  footerStyle?: React.CSSProperties;
}

/**
 * Полная конфигурация для компонента
 */
export interface ToastModalConfig {
  /** Настройки тостов */
  toast?: ToastCustomizationOptions;

  /** Настройки модального окна */
  modal?: ModalConfig;

  /** Локализация */
  locale?: {
    /** Текст кнопки закрытия */
    closeButton?: string;

    /** Текст для метаданных */
    metadataLabel?: string;

    /** Текст для данных */
    dataLabel?: string;

    /** Текст для временной метки */
    timestampLabel?: string;
  };
}
