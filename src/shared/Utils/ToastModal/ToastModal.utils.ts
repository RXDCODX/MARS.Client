/* eslint-disable @typescript-eslint/no-explicit-any */
import { isValidElement } from "react";

import { ToastModalData, ToastType } from "./ToastModal.types";

/**
 * Утилиты для работы с ToastModal
 */

/**
 * Создает базовый объект данных для тоста
 */
export function createToastData(
  message: string,
  type: ToastType = "info",
  title?: string
): ToastModalData {
  return {
    message,
    type,
    title: title || getDefaultTitle(type),
    timestamp: new Date(),
  };
}

/**
 * Создает тост с данными пользователя
 */
export function createUserToast(
  message: string,
  userData: unknown,
  type: ToastType = "info",
  title?: string
): ToastModalData {
  return {
    ...createToastData(message, type, title),
    data: userData,
    metadata: {
      source: "User",
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Создает тост с данными API запроса
 */
export function createApiToast(
  message: string,
  apiData: unknown,
  type: ToastType = "info",
  title?: string,
  requestId?: string
): ToastModalData {
  return {
    ...createToastData(message, type, title),
    data: apiData,
    metadata: {
      source: "API",
      requestId: requestId || generateRequestId(),
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Создает тост с ошибкой
 */
export function createErrorToast(
  message: string,
  error: Error | unknown,
  title?: string
): ToastModalData {
  const errorData =
    error instanceof Error
      ? { message: error.message, stack: error.stack, name: error.name }
      : error;

  return {
    ...createToastData(message, "error", title),
    data: errorData,
    metadata: {
      source: "Error",
      timestamp: new Date().toISOString(),
      errorType: error instanceof Error ? "Error" : typeof error,
    },
  };
}

/**
 * Создает тост с успешной операцией
 */
export function createSuccessToast(
  message: string,
  data?: unknown,
  title?: string
): ToastModalData {
  return {
    ...createToastData(message, "success", title),
    data,
    metadata: {
      source: "Success",
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Создает тост с предупреждением
 */
export function createWarningToast(
  message: string,
  data?: unknown,
  title?: string
): ToastModalData {
  return {
    ...createToastData(message, "warning", title),
    data,
    metadata: {
      source: "Warning",
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Создает тост с информацией
 */
export function createInfoToast(
  message: string,
  data?: unknown,
  title?: string
): ToastModalData {
  return {
    ...createToastData(message, "info", title),
    data,
    metadata: {
      source: "Info",
      timestamp: new Date().toISOString(),
    },
  };
}

/**
 * Получает заголовок по умолчанию для типа тоста
 */
function getDefaultTitle(type: ToastType): string {
  const titles = {
    info: "Информация",
    success: "Успех",
    warning: "Предупреждение",
    error: "Ошибка",
  };
  return titles[type];
}

/**
 * Генерирует уникальный ID для запроса
 */
function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Форматирует данные для отображения в модальном окне
 */
export function formatDataForModal(data: unknown): string {
  if (typeof data === "string") {
    return data;
  }

  if (typeof data === "object" && data !== null) {
    try {
      return JSON.stringify(data, null, 2);
    } catch {
      return String(data);
    }
  }

  return String(data);
}

/**
 * Проверяет, является ли объект валидными данными для тоста
 */
export function isValidToastData(data: any): data is ToastModalData {
  return (
    data &&
    typeof data === "object" &&
    (typeof data.message === "string" || isValidElement(data.message)) &&
    (!data.type || ["info", "success", "warning", "error"].includes(data.type))
  );
}

/**
 * Валидирует и нормализует данные тоста
 */
export function normalizeToastData(data: any): ToastModalData {
  if (!isValidToastData(data)) {
    throw new Error("Invalid toast data provided");
  }

  return {
    type: "info",
    timestamp: new Date(),
    ...data,
  };
}

/**
 * Создает тост с временной меткой в определенном формате
 */
export function createToastWithFormattedTimestamp(
  message: string,
  type: ToastType = "info",
  title?: string,
  dateFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
): ToastModalData {
  const timestamp = new Date();
  const formattedDate = timestamp.toLocaleDateString("ru-RU", dateFormat);

  return {
    message: `${message} (${formattedDate})`,
    type,
    title: title || getDefaultTitle(type),
    timestamp,
    metadata: {
      formattedDate,
      timestamp: timestamp.toISOString(),
    },
  };
}

/**
 * Создает тост с прогрессом операции
 */
export function createProgressToast(
  message: string,
  progress: number,
  title?: string
): ToastModalData {
  const progressPercent = Math.round(progress * 100);

  return {
    message: `${message} - ${progressPercent}%`,
    type: "info",
    title: title || "Прогресс",
    data: { progress, progressPercent },
    timestamp: new Date(),
    metadata: {
      source: "Progress",
      progressType: "percentage",
    },
  };
}

/**
 * Создает тост с результатом валидации
 */
export function createValidationToast(
  message: string,
  validationErrors: string[],
  title?: string
): ToastModalData {
  return {
    message,
    type: "error",
    title: title || "Ошибка валидации",
    data: { errors: validationErrors, errorCount: validationErrors.length },
    timestamp: new Date(),
    metadata: {
      source: "Validation",
      errorCount: validationErrors.length,
    },
  };
}
