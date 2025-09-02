import { Filter, RotateCcw, Search } from "lucide-react";
import { Button, Form } from "react-bootstrap";

import styles from "../LogsPage.module.scss";
import {
  LogsFilters as LogsFiltersType,
  LogsFiltersProps,
} from "../LogsPage.types";

const LogsFilters: React.FC<LogsFiltersProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  onReset,
  isLoading,
}) => {
  const handleInputChange = (
    field: keyof LogsFiltersType,
    value: string | boolean
  ) => {
    onFiltersChange({ [field]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch();
  };

  const handleReset = () => {
    onFiltersChange({
      logLevel: "",
      fromDate: "",
      toDate: "",
      searchText: "",
      sortBy: "whenlogged",
      sortDescending: true,
    });
    onReset();
  };

  const logLevels = [
    { value: "", label: "Все уровни" },
    { value: "Info", label: "Информация" },
    { value: "Warning", label: "Предупреждение" },
    { value: "Error", label: "Ошибка" },
    { value: "Critical", label: "Критическая ошибка" },
    { value: "Debug", label: "Отладка" },
  ];

  const sortOptions = [
    { value: "whenlogged", label: "По времени" },
    { value: "logLevel", label: "По уровню" },
    { value: "message", label: "По сообщению" },
  ];

  return (
    <div className={styles.controlsCard}>
      <form onSubmit={handleSubmit}>
        {/* Фильтры */}
        <div className={styles.controlsGrid}>
          {/* Поиск по тексту */}
          <div className={styles.controlGroup}>
            <label htmlFor="searchText">Поиск по тексту</label>
            <div className={styles.searchBox}>
              <Search size={20} className={styles.searchIcon} />
              <Form.Control
                type="text"
                id="searchText"
                placeholder="Поиск в сообщениях логов..."
                value={filters.searchText}
                onChange={e => handleInputChange("searchText", e.target.value)}
              />
            </div>
          </div>

          {/* Уровень логирования */}
          <div className={styles.controlGroup}>
            <label htmlFor="logLevel">Уровень логирования</label>
            <Form.Select
              id="logLevel"
              value={filters.logLevel}
              onChange={e => handleInputChange("logLevel", e.target.value)}
            >
              {logLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </Form.Select>
          </div>

          {/* Дата начала */}
          <div className={styles.controlGroup}>
            <label htmlFor="fromDate">Дата начала</label>
            <Form.Control
              type="datetime-local"
              id="fromDate"
              value={filters.fromDate}
              onChange={e => handleInputChange("fromDate", e.target.value)}
            />
          </div>

          {/* Дата окончания */}
          <div className={styles.controlGroup}>
            <label htmlFor="toDate">Дата окончания</label>
            <Form.Control
              type="datetime-local"
              id="toDate"
              value={filters.toDate}
              onChange={e => handleInputChange("toDate", e.target.value)}
            />
          </div>

          {/* Сортировка */}
          <div className={styles.controlGroup}>
            <label htmlFor="sortBy">Сортировка</label>
            <Form.Select
              id="sortBy"
              value={filters.sortBy}
              onChange={e => handleInputChange("sortBy", e.target.value)}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </div>

          {/* Направление сортировки */}
          <div className={styles.controlGroup}>
            <label htmlFor="sortDescending">Направление</label>
            <Form.Select
              id="sortDescending"
              value={filters.sortDescending ? "desc" : "asc"}
              onChange={e =>
                handleInputChange("sortDescending", e.target.value === "desc")
              }
            >
              <option value="desc">По убыванию</option>
              <option value="asc">По возрастанию</option>
            </Form.Select>
          </div>
        </div>

        {/* Кнопки управления - отдельный row */}
        <div className={styles.buttonsRow}>
          <div className={styles.buttonsGroup}>
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              className="d-flex align-items-center gap-2"
            >
              <Search size={16} />
              {isLoading ? "Поиск..." : "Найти логи"}
            </Button>

            <Button
              type="button"
              variant="outline-secondary"
              onClick={handleReset}
              disabled={isLoading}
              className="d-flex align-items-center gap-2"
            >
              <RotateCcw size={16} />
              Сбросить
            </Button>

            <Button
              type="button"
              variant="outline-info"
              onClick={() => {
                const now = new Date();
                const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);

                onFiltersChange({
                  fromDate: yesterday.toISOString().slice(0, 16),
                  toDate: now.toISOString().slice(0, 16),
                });
              }}
              disabled={isLoading}
              className="d-flex align-items-center gap-2"
            >
              <Filter size={16} />
              Последние 24 часа
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LogsFilters;
