import { useCallback, useEffect, useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { FileText, AlertCircle } from "lucide-react";

import { Logs } from "@/shared/api";
import { LogResponse, LogsStatistics } from "@/shared/api/http-clients/data-contracts";
import { createErrorToast, useToastModal } from "@/shared/Utils/ToastModal";
import { useSiteColors } from "@/shared/Utils/useSiteColors";

import { LogsFilters, LogsStatistics as LogsStatisticsComponent, LogsTable } from "./components";
import { LogsPageState, LogsFilters as LogsFiltersType } from "./LogsPage.types";

import styles from "./LogsPage.module.scss";

const LogsPage: React.FC = () => {
  const colors = useSiteColors();
  const { showToast } = useToastModal();
  const [logsService] = useState(() => new Logs());

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
  const [filters, setFilters] = useState<LogsFiltersType>({
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
  const updateFilters = useCallback((updates: Partial<LogsFiltersType>) => {
    setFilters(prev => ({ ...prev, ...updates }));
  }, []);

  // Загрузка логов
  const loadLogs = useCallback(async () => {
    try {
      updateState({ isLoading: true, error: "" });

      const query: any = {
        page: state.currentPage,
        pageSize: state.pageSize,
        sortBy: filters.sortBy,
        sortDescending: filters.sortDescending,
      };

      // Добавляем фильтры только если они заполнены
      if (filters.logLevel) query.logLevel = filters.logLevel;
      if (filters.fromDate) query.fromDate = filters.fromDate;
      if (filters.toDate) query.toDate = filters.toDate;
      if (filters.searchText) query.searchText = filters.searchText;

      const response = await logsService.logsList(query);
      const logResponse: LogResponse = response.data;

      updateState({
        logs: logResponse.logs || [],
        totalPages: logResponse.totalPages || 0,
        totalCount: logResponse.totalCount || 0,
        isLoading: false,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";
      updateState({
        error: `Ошибка при загрузке логов: ${errorMessage}`,
        isLoading: false,
      });

      showToast(createErrorToast(
        "Ошибка загрузки логов",
        error,
        "Не удалось загрузить логи приложения"
      ));
    }
  }, [logsService, state.currentPage, state.pageSize, filters, updateState, showToast]);

  // Загрузка статистики
  const loadStatistics = useCallback(async () => {
    try {
      updateState({ isLoadingStats: true });

      const response = await logsService.logsStatisticsList();
      const stats: LogsStatistics = response.data;

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
  const handlePageChange = useCallback((page: number) => {
    updateState({ currentPage: page });
  }, [updateState]);

  // Обработчик изменения размера страницы
  const handlePageSizeChange = useCallback((size: number) => {
    updateState({ 
      pageSize: size, 
      currentPage: 1, // Сбрасываем на первую страницу при изменении размера
    });
  }, [updateState]);

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

  // Загрузка данных при изменении фильтров или пагинации
  useEffect(() => {
    loadLogs();
  }, [loadLogs]);

  // Загрузка статистики при монтировании компонента
  useEffect(() => {
    loadStatistics();
  }, [loadStatistics]);

  // Автоматическое обновление каждые 30 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      if (!state.isLoading) {
        loadLogs();
        loadStatistics();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [loadLogs, loadStatistics, state.isLoading]);

  return (
    <div className={styles.logsPage}>
      <Container fluid>
        {/* Заголовок страницы */}
        <div className={styles.pageHeader}>
          <h1 style={colors.utils.getTextStyle("primary")}>
            <FileText size={32} className="me-3" />
            Логи приложения
          </h1>
          <p style={colors.utils.getTextStyle("secondary")}>
            Просмотр и анализ логов системы MARS в реальном времени
          </p>
        </div>

        {/* Ошибки */}
        {state.error && (
          <Alert
            variant="danger"
            className={styles.errorAlert}
            dismissible
            onClose={() => updateState({ error: "" })}
          >
            <AlertCircle size={20} className="me-2" />
            {state.error}
          </Alert>
        )}

        {/* Фильтры */}
        <LogsFilters
          filters={filters}
          onFiltersChange={updateFilters}
          onSearch={handleSearch}
          onReset={handleResetFilters}
          isLoading={state.isLoading}
        />

        {/* Статистика */}
        <LogsStatisticsComponent
          statistics={state.statistics}
          isLoading={state.isLoadingStats}
        />

        {/* Таблица логов */}
        <LogsTable
          logs={state.logs}
          isLoading={state.isLoading}
          currentPage={state.currentPage}
          pageSize={state.pageSize}
          totalPages={state.totalPages}
          totalCount={state.totalCount}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      </Container>
    </div>
  );
};

export default LogsPage;
