import { AlertCircle } from "lucide-react";
import { Alert, Container } from "react-bootstrap";

import {
  LogsFilters,
  LogsModeToggle,
  LogsPageHeader,
  LogsStatistics as LogsStatisticsComponent,
  LogsTable,
  LogsTestButtons,
} from "./components";
import { useLogsData } from "./hooks";
import styles from "./LogsPage.module.scss";

const LogsPage: React.FC = () => {
  const {
    state,
    filters,
    isRealtime,
    updateState,
    updateFilters,
    loadLogs,
    handlePageChange,
    handlePageSizeChange,
    handleSearch,
    handleResetFilters,
    handleModeChange,
  } = useLogsData();

  return (
    <div className={styles.logsPage}>
      <Container fluid>
        {/* Заголовок страницы */}
        <LogsPageHeader />

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

        {/* Тестовые кнопки */}
        <LogsTestButtons onLogsRefresh={loadLogs} disabled={state.isLoading} />

        {/* Статистика */}
        <LogsStatisticsComponent
          statistics={state.statistics}
          isLoading={state.isLoadingStats}
        />

        {/* Переключатель режима отображения */}
        <LogsModeToggle
          isRealtime={isRealtime}
          onModeChange={handleModeChange}
          disabled={state.isLoading}
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
