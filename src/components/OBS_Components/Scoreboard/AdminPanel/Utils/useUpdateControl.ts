import { useCallback, useRef } from "react";

export interface UpdateControl {
  isUpdating: boolean;
  lastUpdateTime: number;
  pendingUpdates: Set<string>;
  startUpdate: (updateId?: string) => boolean;
  finishUpdate: (updateId?: string) => void;
  shouldIgnoreUpdate: (timestamp: number) => boolean;
  generateUpdateId: () => string;
}

export const useUpdateControl = (): UpdateControl => {
  const isUpdatingRef = useRef<boolean>(false);
  const lastUpdateTimeRef = useRef<number>(0);
  const pendingUpdatesRef = useRef<Set<string>>(new Set());

  const generateUpdateId = useCallback(() => {
    return `update_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const startUpdate = useCallback((updateId?: string): boolean => {
    // Проверяем, не отправляем ли мы уже обновление
    if (isUpdatingRef.current) {
      console.log("Update already in progress, skipping");
      return false;
    }

    // Устанавливаем флаг обновления
    isUpdatingRef.current = true;
    lastUpdateTimeRef.current = Date.now();
    
    if (updateId) {
      pendingUpdatesRef.current.add(updateId);
    }

    console.log(`Starting update${updateId ? `: ${updateId}` : ""}`);
    return true;
  }, []);

  const finishUpdate = useCallback((updateId?: string) => {
    // Сбрасываем флаг через задержку для предотвращения рекурсии
    setTimeout(() => {
      isUpdatingRef.current = false;
      if (updateId) {
        pendingUpdatesRef.current.delete(updateId);
      }
      console.log(`Finished update${updateId ? `: ${updateId}` : ""}`);
    }, 300);
  }, []);

  const shouldIgnoreUpdate = useCallback((timestamp: number): boolean => {
    // Игнорируем обновления, если мы сами отправляем данные на сервер
    if (isUpdatingRef.current) {
      console.log("Ignoring server update while local update is in progress");
      return true;
    }

    // Игнорируем обновления, которые пришли слишком быстро после нашего обновления
    if (timestamp - lastUpdateTimeRef.current < 500) {
      console.log("Ignoring server update - too soon after local update");
      return true;
    }

    return false;
  }, []);

  return {
    isUpdating: isUpdatingRef.current,
    lastUpdateTime: lastUpdateTimeRef.current,
    pendingUpdates: pendingUpdatesRef.current,
    startUpdate,
    finishUpdate,
    shouldIgnoreUpdate,
    generateUpdateId,
  };
}; 