import type { HubConnection } from "@microsoft/signalr";
import { useCallback, useEffect, useRef, useState } from "react";

import { LogMessageDto, Logs } from "@/shared/api";
import { LoggerHubSignalRConnectionBuilder } from "@/shared/api";
import {
  Log,
  LogLogLevelEnum,
  LogResponse,
  LogsListParamsLogLevelEnum,
  LogsStatistics,
} from "@/shared/api";
import { useToastModal } from "@/shared/Utils/ToastModal";

import { LogsFilters, LogsPageState } from "../LogsPage.types";

export const useLogsData = () => {
  const { showToast } = useToastModal();
  const [logsService] = useState(() => new Logs());
  const [isRealtime, setIsRealtime] = useState(false); // TODO: Починить режим реального времени - логгер логирует информацию о передаче данных по хабу

  // Состояние страницы
  const [state, setState] = useState<LogsPageState>({
    logs: [],
    statistics: null,
    isLoading: false,
    isLoadingStats: false,
    error: "",
    currentPage: 1,
    pageSize: 25,
    totalPages: 0,
    totalCount: 0,
  });

  // Фильтры для поиска
  const [filters, setFilters] = useState<LogsFilters>({
    logLevel: "",
    fromDate: "",
    toDate: "",
    searchText: "",
    sortBy: "whenlogged",
    sortDescending: true,
  });

  // Обновление состояния
  const updateState = useCallback((updates: Partial<LogsPageState>) => {
    setState(prev => ({ ...prev, ...updates }));
  }, []);

  // Обновление фильтров
  const updateFilters = useCallback((updates: Partial<LogsFilters>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  }, []);

  // Загрузка логов
  const loadLogs = useCallback(async () => {
    try {
      updateState({ isLoading: true, error: "" });

      const query: {
        page: number;
        pageSize: number;
        sortBy: string;
        sortDescending: boolean;
        logLevel?: LogsListParamsLogLevelEnum;
        fromDate?: string;
        toDate?: string;
        searchText?: string;
      } = {
        page: state.currentPage,
        pageSize: state.pageSize,
        sortBy: filters.sortBy,
        sortDescending: filters.sortDescending,
      };

      // Добавляем только те параметры, которые имеют значения
      if (filters.logLevel) {
        query.logLevel = filters.logLevel as LogsListParamsLogLevelEnum;
      }
      if (filters.fromDate) {
        query.fromDate = filters.fromDate;
      }
      if (filters.toDate) {
        query.toDate = filters.toDate;
      }
      if (filters.searchText) {
        query.searchText = filters.searchText;
      }

      console.log("Запрос логов с параметрами:", query);

      const response = await logsService.logsList(
        query as Parameters<typeof logsService.logsList>[0]
      );
      const logResponse: LogResponse = response.data.data ?? {
        logs: [],
        totalCount: 0,
        page: 1,
        pageSize: 10,
        totalPages: 0,
      };

      console.log("Ответ от сервера:", logResponse);

      updateState({
        logs: logResponse.logs || [],
        totalPages: logResponse.totalPages || 0,
        totalCount: logResponse.totalCount || 0,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Неизвестная ошибка";
      updateState({
        error: `Ошибка при загрузке логов: ${errorMessage}`,
        isLoading: false,
      });

      showToast({
        success: false,
        message: "Не удалось загрузить логи приложения",
      });
    }
  }, [
    logsService,
    state.currentPage,
    state.pageSize,
    filters,
    updateState,
    showToast,
  ]);

  // Загрузка статистики
  const loadStatistics = useCallback(async () => {
    try {
      updateState({ isLoadingStats: true });

      const response = await logsService.logsStatisticsList();
      const stats: LogsStatistics = response.data.data ?? {
        totalLogs: 0,
        warningLogs: 0,
        errorLogs: 0,
        criticalLogs: 0,
      };

      updateState({
        statistics: stats,
        isLoadingStats: false,
      });
    } catch (error) {
      console.error("Ошибка при загрузке статистики:", error);
      updateState({ isLoadingStats: false });
    }
  }, [logsService, updateState]);

  // Обработчик изменения страницы
  const handlePageChange = useCallback(
    (page: number) => {
      updateState({ currentPage: page });
    },
    [updateState]
  );

  // Обработчик изменения размера страницы
  const handlePageSizeChange = useCallback(
    (size: number) => {
      updateState({
        pageSize: size,
        currentPage: 1, // Сбрасываем на первую страницу при изменении размера
      });
    },
    [updateState]
  );

  // Обработчик поиска
  const handleSearch = useCallback(() => {
    updateState({ currentPage: 1 }); // Сбрасываем на первую страницу при поиске
    loadLogs();
  }, [loadLogs, updateState]);

  // Обработчик сброса фильтров
  const handleResetFilters = useCallback(() => {
    setFilters({
      logLevel: "",
      fromDate: "",
      toDate: "",
      searchText: "",
      sortBy: "whenlogged",
      sortDescending: true,
    });
    updateState({ currentPage: 1 });
  }, [updateState]);

  // Обработчик изменения режима
  const handleModeChange = useCallback(
    (newIsRealtime: boolean) => {
      setIsRealtime(newIsRealtime);
      if (!newIsRealtime) {
        // При переходе на режим запросов обновим данные сразу
        loadLogs();
        loadStatistics();
      }
    },
    [loadLogs, loadStatistics]
  );

  // Загрузка данных при изменении фильтров или пагинации
  useEffect(() => {
    if (!isRealtime) {
      loadLogs();
    }
  }, [isRealtime, loadLogs]);

  // Загрузка статистики при монтировании компонента
  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  // Автоматическое обновление каждые 30 секунд в режиме REST
  useEffect(() => {
    if (isRealtime) return;
    const interval = setInterval(() => {
      if (!state.isLoading) {
        loadLogs();
        loadStatistics();
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [isRealtime, loadLogs, loadStatistics, state.isLoading]);

  // Управление прямым подключением к LoggerHub в режиме real-time
  const connectionRef = useRef<HubConnection | null>(null);

  useEffect(() => {
    // При выключении realtime — останавливаем соединение, если оно есть
    if (!isRealtime) {
      if (connectionRef.current) {
        connectionRef.current.stop().catch(() => undefined);
        connectionRef.current = null;
      }
      return;
    }

    const connection = LoggerHubSignalRConnectionBuilder.build();
    connectionRef.current = connection;

    const onLog = (logMessage: LogMessageDto) => {
      setState(prev => {
        const newLog: Log = {
          id: String(logMessage.id),
          whenLogged: new Date(logMessage.timestamp).toISOString(),
          message: logMessage.message,
          stackTrace:
            logMessage.stackTrace || logMessage.exception || undefined,
          logLevel: logMessage.logLevel as LogLogLevelEnum,
        };

        const updatedLogs = [newLog, ...prev.logs];
        const sliced = updatedLogs.slice(0, prev.pageSize);

        return {
          ...prev,
          logs: sliced,
          totalCount: prev.totalCount + 1,
        };
      });

      loadStatistics();
    };

    connection.on("Log", onLog);

    connection.start().catch(error => {
      showToast({
        success: false,
        message:
          "Не удалось установить соединение для получения логов в реальном времени! " +
          error.message,
      });
    });

    return () => {
      connection.off("Log", onLog);
      connection.stop().catch(() => undefined);
      if (connectionRef.current === connection) connectionRef.current = null;
    };
  }, [isRealtime, loadStatistics, showToast]);

  return {
    // Состояние
    state,
    filters,
    isRealtime,

    // Действия
    updateState,
    updateFilters,
    loadLogs,
    loadStatistics,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    handleResetFilters,
    handleModeChange,
  };
};
