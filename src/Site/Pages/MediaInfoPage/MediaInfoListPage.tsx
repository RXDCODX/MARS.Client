import "./MediaInfoPage.scss";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { ApiMediaInfo, MediaInfoApi } from "@/shared/api";

// Типы для фильтров и сортировки
interface FilterOptions {
  type: string;
  priority: string;
  isLocalFile: boolean | null;
}

interface SortOptions {
  field:
    | keyof ApiMediaInfo
    | "metaInfo.displayName"
    | "metaInfo.duration"
    | "metaInfo.priority"
    | "fileInfo.type"
    | "fileInfo.filePath";
  direction: "asc" | "desc";
}

export const MediaInfoListPage: React.FC = () => {
  const [alerts, setAlerts] = useState<ApiMediaInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Состояния для поиска, фильтров и сортировки
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    type: "",
    priority: "",
    isLocalFile: null,
  });
  const [sortOptions, setSortOptions] = useState<SortOptions>({
    field: "metaInfo.displayName",
    direction: "asc",
  });
  const [itemsPerRow, setItemsPerRow] = useState(3); // 2, 3, 4 в ряд

  // Создаем экземпляр API
  const mediaInfoApi = useMemo(() => new MediaInfoApi(), []);

  const loadAlerts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await mediaInfoApi.mediaInfoApiList();
      setAlerts(data.data as ApiMediaInfo[]);
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Произошла ошибка при загрузке медиафайлов"
      );
    } finally {
      setLoading(false);
    }
  }, [mediaInfoApi]);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  // Фильтрация и поиск
  const filteredAlerts = useMemo(
    () =>
      alerts.filter(alert => {
        // Поиск по тексту
        const searchLower = searchQuery.toLowerCase();
        const matchesSearch =
          alert.metaInfo.displayName?.toLowerCase().includes(searchLower) ||
          alert.fileInfo.fileName?.toLowerCase().includes(searchLower) ||
          alert.fileInfo.filePath?.toLowerCase().includes(searchLower) ||
          alert.textInfo.triggerWord?.toLowerCase().includes(searchLower);

        if (!matchesSearch) return false;

        // Фильтр по типу
        if (filters.type && alert.fileInfo.type !== filters.type) return false;

        // Фильтр по приоритету
        if (filters.priority && alert.metaInfo.priority !== filters.priority)
          return false;

        // Фильтр по локальности файла
        if (
          filters.isLocalFile !== null &&
          alert.fileInfo.isLocalFile !== filters.isLocalFile
        )
          return false;

        return true;
      }),
    [alerts, searchQuery, filters]
  );

  // Сортировка
  const sortedAlerts = useMemo(
    () =>
      [...filteredAlerts].sort((a, b) => {
        let aValue: unknown, bValue: unknown;

        // Получаем значения для сортировки
        if (sortOptions.field === "metaInfo.displayName") {
          aValue = a.metaInfo.displayName || "";
          bValue = b.metaInfo.displayName || "";
        } else if (sortOptions.field === "metaInfo.duration") {
          aValue = a.metaInfo.duration || 0;
          bValue = b.metaInfo.duration || 0;
        } else if (sortOptions.field === "metaInfo.priority") {
          aValue = a.metaInfo.priority || "";
          bValue = b.metaInfo.priority || "";
        } else if (sortOptions.field === "fileInfo.type") {
          aValue = a.fileInfo.type || "";
          bValue = b.fileInfo.type || "";
        } else if (sortOptions.field === "fileInfo.filePath") {
          aValue = a.fileInfo.filePath || "";
          bValue = b.fileInfo.filePath || "";
        } else {
          aValue = a[sortOptions.field as keyof ApiMediaInfo];
          bValue = b[sortOptions.field as keyof ApiMediaInfo];
        }

        // Сравниваем значения
        if (typeof aValue === "string" && typeof bValue === "string") {
          aValue = aValue.toLowerCase();
          bValue = bValue.toLowerCase();
        }

        // Безопасное сравнение с проверкой типов
        if (typeof aValue === "string" && typeof bValue === "string") {
          if (aValue < bValue) return sortOptions.direction === "asc" ? -1 : 1;
          if (aValue > bValue) return sortOptions.direction === "asc" ? 1 : -1;
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          if (aValue < bValue) return sortOptions.direction === "asc" ? -1 : 1;
          if (aValue > bValue) return sortOptions.direction === "asc" ? 1 : -1;
        } else {
          // Для других типов используем строковое представление
          const aStr = String(aValue);
          const bStr = String(bValue);
          if (aStr < bStr) return sortOptions.direction === "asc" ? -1 : 1;
          if (aStr > bStr) return sortOptions.direction === "asc" ? 1 : -1;
        }
        return 0;
      }),
    [filteredAlerts, sortOptions]
  );

  const handleDeleteAlert = async (id: string) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот файл?")) {
      return;
    }

    try {
      await mediaInfoApi.mediaInfoApiDelete(id);
      setAlerts(prev => prev.filter(alert => alert.id !== id));
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка при удалении файла"
      );
    }
  };

  const handleSort = (field: SortOptions["field"]) => {
    setSortOptions(prev => ({
      field,
      direction:
        prev.field === field && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const clearFilters = () => {
    setSearchQuery("");
    setFilters({
      type: "",
      priority: "",
      isLocalFile: null,
    });
  };

  const getSortIcon = (field: SortOptions["field"]) => {
    if (sortOptions.field !== field) return "↕️";
    return sortOptions.direction === "asc" ? "↑" : "↓";
  };

  if (loading) {
    return (
      <div className="media-info-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Загрузка медиафайлов...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="media-info-page">
      <div className="page-header">
        <div className="header-content">
          <h1>📁 Управление медиафайлами</h1>
          <p className="header-subtitle">
            Всего файлов: {alerts.length} | Отфильтровано:{" "}
            {filteredAlerts.length}
          </p>
        </div>
        <div className="header-actions">
          <Link to="/media-info/create" className="btn btn-primary">
            <span>➕</span> Добавить новый файл
          </Link>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger">
          <div className="alert-icon">⚠️</div>
          <div className="alert-content">
            <strong>Ошибка:</strong> {error}
          </div>
          <button className="btn-close" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}

      {/* Панель управления */}
      <div className="control-panel">
        <div className="search-section">
          <div className="search-input-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Поиск по названию, пути к файлу, триггеру..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery("")}
                title="Очистить поиск"
              >
                ×
              </button>
            )}
          </div>
        </div>

        <div className="filters-section">
          <div className="filter-group">
            <label>Тип файла:</label>
            <select
              value={filters.type}
              onChange={e =>
                setFilters(prev => ({ ...prev, type: e.target.value }))
              }
              className="filter-select"
            >
              <option value="">Все типы</option>
              <option value="Image">Изображения</option>
              <option value="Audio">Аудио</option>
              <option value="Video">Видео</option>
              <option value="Gif">GIF</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Приоритет:</label>
            <select
              value={filters.priority}
              onChange={e =>
                setFilters(prev => ({ ...prev, priority: e.target.value }))
              }
              className="filter-select"
            >
              <option value="">Все приоритеты</option>
              <option value="Low">Низкий</option>
              <option value="Normal">Обычный</option>
              <option value="High">Высокий</option>
              <option value="Critical">Критический</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Локальность:</label>
            <select
              value={
                filters.isLocalFile === null
                  ? ""
                  : filters.isLocalFile.toString()
              }
              onChange={e => {
                const value = e.target.value;
                setFilters(prev => ({
                  ...prev,
                  isLocalFile: value === "" ? null : value === "true",
                }));
              }}
              className="filter-select"
            >
              <option value="">Все файлы</option>
              <option value="true">Локальные</option>
              <option value="false">Внешние</option>
            </select>
          </div>

          <button
            className="clear-filters-btn"
            onClick={clearFilters}
            title="Очистить все фильтры"
          >
            🗑️ Очистить
          </button>
        </div>

        <div className="display-settings">
          <div className="items-per-row">
            <label>Алертов в ряд:</label>
            <div className="row-buttons">
              {[2, 3, 4].map(num => (
                <button
                  key={num}
                  className={`row-btn ${itemsPerRow === num ? "active" : ""}`}
                  onClick={() => setItemsPerRow(num)}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Заголовки таблицы для сортировки */}
      <div className="table-headers">
        <div
          className="header-cell sortable"
          onClick={() => handleSort("fileInfo.filePath")}
        >
          Путь к файлу {getSortIcon("fileInfo.filePath")}
        </div>
        <div
          className="header-cell sortable"
          onClick={() => handleSort("fileInfo.type")}
        >
          Тип {getSortIcon("fileInfo.type")}
        </div>
        <div
          className="header-cell sortable"
          onClick={() => handleSort("metaInfo.duration")}
        >
          Длительность {getSortIcon("metaInfo.duration")}
        </div>
        <div
          className="header-cell sortable"
          onClick={() => handleSort("metaInfo.priority")}
        >
          Приоритет {getSortIcon("metaInfo.priority")}
        </div>
        <div className="header-cell">Действия</div>
      </div>

      <div className={`alerts-grid items-per-row-${itemsPerRow}`}>
        {sortedAlerts.length === 0 ? (
          <div className="no-results">
            <p>🔍 Файлы не найдены</p>
            {searchQuery ||
              (Object.values(filters).some(f => f !== "" && f !== null) && (
                <button
                  className="btn btn-outline-primary"
                  onClick={clearFilters}
                >
                  Очистить фильтры
                </button>
              ))}
          </div>
        ) : (
          sortedAlerts.map(alert => (
            <div key={alert.id} className="alert-card">
              <div className="alert-header">
                <h3>{alert.fileInfo.filePath || "Без пути"}</h3>

                <div className="alert-actions">
                  <Link
                    to={`/media-info/edit/${alert.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    ✏️ Редактировать
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteAlert(alert.id)}
                  >
                    🗑️ Удалить
                  </button>
                </div>
              </div>

              <div className="alert-details">
                <div className="detail-row">
                  <strong>Название:</strong>
                  {alert.metaInfo.displayName || "Не указано"}
                </div>
                <div className="detail-row">
                  <strong>Тип файла:</strong>
                  <span
                    className={`type-badge type-${alert.fileInfo.type.toLowerCase()}`}
                  >
                    {alert.fileInfo.type}
                  </span>
                </div>
                <div className="detail-row">
                  <strong>Имя файла:</strong> {alert.fileInfo.fileName}
                </div>
                <div className="detail-row">
                  <strong>Триггер:</strong>{" "}
                  {alert.textInfo.triggerWord || "Не указан"}
                </div>
                <div className="detail-row">
                  <strong>Длительность:</strong> {alert.metaInfo.duration}с
                </div>
                <div className="detail-row">
                  <strong>Приоритет:</strong>
                  <span
                    className={`priority-badge priority-${alert.metaInfo.priority.toLowerCase()}`}
                  >
                    {alert.metaInfo.priority}
                  </span>
                </div>
                <div className="detail-row">
                  <strong>Файл:</strong>
                  <span
                    className={`file-badge ${alert.fileInfo.isLocalFile ? "local" : "external"}`}
                  >
                    {alert.fileInfo.isLocalFile ? "Локальный" : "Внешний"}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
