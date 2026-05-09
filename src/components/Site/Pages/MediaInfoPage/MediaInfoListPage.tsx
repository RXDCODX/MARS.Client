import "./MediaInfoPage.scss";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { ApiMediaInfo, MediaInfoApi } from "@/shared/api";

import {
  formatMediaDuration,
  formatMediaRewardId,
  mediaInfoFileTypes,
  mediaInfoPriorities,
} from "./mediaInfoPageHelpers";

type MediaInfoSortField =
  | "metaInfo.displayName"
  | "fileInfo.filePath"
  | "fileInfo.type"
  | "metaInfo.duration"
  | "metaInfo.priority"
  | "metaInfo.twitchPointsCost";

type MediaInfoFilters = {
  search: string;
  type: string;
  priority: string;
  localFile: string;
  rewardState: string;
};

const defaultFilters: MediaInfoFilters = {
  search: "",
  type: "",
  priority: "",
  localFile: "",
  rewardState: "",
};

const columnLabels: Record<MediaInfoSortField, string> = {
  "metaInfo.displayName": "Название",
  "fileInfo.filePath": "Путь",
  "fileInfo.type": "Тип",
  "metaInfo.duration": "Длительность",
  "metaInfo.priority": "Приоритет",
  "metaInfo.twitchPointsCost": "Баллы",
};

export const MediaInfoListPage: React.FC = () => {
  const [items, setItems] = useState<ApiMediaInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<MediaInfoFilters>(defaultFilters);
  const [sortField, setSortField] = useState<MediaInfoSortField>(
    "metaInfo.displayName"
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const mediaInfoApi = useMemo(() => new MediaInfoApi(), []);

  const loadItems = useCallback(async () => {
    setLoading(true);

    try {
      const response = await mediaInfoApi.mediaInfoApiList();
      const payload = response.data;

      if (payload.success) {
        setItems(payload.data ?? []);
        setError(null);
      } else {
        setItems([]);
        setError(payload.message ?? "Не удалось загрузить список медиа");
      }
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Не удалось загрузить список медиа"
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [mediaInfoApi]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  const filteredItems = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return items.filter(item => {
      const rewardId = item.metaInfo.twitchGuid ?? "";
      const searchable = [
        item.metaInfo.displayName,
        item.fileInfo.fileName,
        item.fileInfo.filePath,
        item.textInfo.triggerWord,
        rewardId,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      if (search && !searchable.includes(search)) {
        return false;
      }

      if (filters.type && item.fileInfo.type !== filters.type) {
        return false;
      }

      if (filters.priority && item.metaInfo.priority !== filters.priority) {
        return false;
      }

      if (filters.localFile === "true" && item.fileInfo.isLocalFile !== true) {
        return false;
      }

      if (
        filters.localFile === "false" &&
        item.fileInfo.isLocalFile !== false
      ) {
        return false;
      }

      if (filters.rewardState === "linked" && !rewardId) {
        return false;
      }

      if (filters.rewardState === "unlinked" && rewardId) {
        return false;
      }

      return true;
    });
  }, [filters, items]);

  const sortedItems = useMemo(() => {
    const sorted = [...filteredItems].sort((left, right) => {
      const leftValue = getSortValue(left, sortField);
      const rightValue = getSortValue(right, sortField);

      if (leftValue < rightValue) {
        return sortDirection === "asc" ? -1 : 1;
      }

      if (leftValue > rightValue) {
        return sortDirection === "asc" ? 1 : -1;
      }

      return 0;
    });

    return sorted;
  }, [filteredItems, sortDirection, sortField]);

  const handleSort = useCallback((field: MediaInfoSortField) => {
    setSortField(previousField => {
      if (previousField === field) {
        setSortDirection(previousDirection =>
          previousDirection === "asc" ? "desc" : "asc"
        );
        return previousField;
      }

      setSortDirection("asc");
      return field;
    });
  }, []);

  const handleDelete = useCallback(
    async (item: ApiMediaInfo) => {
      const confirmDelete = window.confirm(
        `Удалить медиа «${item.metaInfo.displayName || item.fileInfo.fileName}»?`
      );

      if (!confirmDelete) {
        return;
      }

      try {
        const response = await mediaInfoApi.mediaInfoApiDelete(item.id);
        if (response.data.success) {
          setItems(previous =>
            previous.filter(current => current.id !== item.id)
          );
          setError(null);
        } else {
          setError(response.data.message ?? "Не удалось удалить запись");
        }
      } catch (deleteError) {
        setError(
          deleteError instanceof Error
            ? deleteError.message
            : "Не удалось удалить запись"
        );
      }
    },
    [mediaInfoApi]
  );

  const resetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const activeFiltersCount = useMemo(
    () => Object.values(filters).filter(value => value.length > 0).length,
    [filters]
  );

  return (
    <div className="media-info-page media-info-list-page">
      <section className="media-info-hero">
        <div className="hero-copy">
          <p className="eyebrow">Media info manager</p>
          <h1>Медиа-алерты и кастомные награды</h1>
          <p className="hero-description">
            Таблица с поиском, фильтрами и быстрыми действиями для создания,
            редактирования и удаления записей.
          </p>
        </div>

        <div className="hero-actions">
          <Link to="/media-info/create" className="btn btn-primary hero-button">
            Создать запись
          </Link>
          <button
            type="button"
            className="btn btn-outline-secondary hero-button"
            onClick={loadItems}
          >
            Обновить список
          </button>
        </div>
      </section>

      <section className="media-info-toolbar card-shell">
        <div className="toolbar-row toolbar-row-search">
          <label className="toolbar-field search-field">
            <span>Поиск</span>
            <input
              type="search"
              value={filters.search}
              onChange={event =>
                setFilters(previous => ({
                  ...previous,
                  search: event.target.value,
                }))
              }
              placeholder="Название, путь, триггер, reward id"
            />
          </label>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetFilters}
          >
            Сбросить фильтры
          </button>
        </div>

        <div className="toolbar-row toolbar-grid">
          <label className="toolbar-field">
            <span>Тип</span>
            <select
              value={filters.type}
              onChange={event =>
                setFilters(previous => ({
                  ...previous,
                  type: event.target.value,
                }))
              }
            >
              <option value="">Все</option>
              {mediaInfoFileTypes.map(type => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className="toolbar-field">
            <span>Приоритет</span>
            <select
              value={filters.priority}
              onChange={event =>
                setFilters(previous => ({
                  ...previous,
                  priority: event.target.value,
                }))
              }
            >
              <option value="">Все</option>
              {mediaInfoPriorities.map(priority => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>

          <label className="toolbar-field">
            <span>Файл</span>
            <select
              value={filters.localFile}
              onChange={event =>
                setFilters(previous => ({
                  ...previous,
                  localFile: event.target.value,
                }))
              }
            >
              <option value="">Все</option>
              <option value="true">Локальные</option>
              <option value="false">Внешние</option>
            </select>
          </label>

          <label className="toolbar-field">
            <span>Награда</span>
            <select
              value={filters.rewardState}
              onChange={event =>
                setFilters(previous => ({
                  ...previous,
                  rewardState: event.target.value,
                }))
              }
            >
              <option value="">Все</option>
              <option value="linked">Привязана</option>
              <option value="unlinked">Не привязана</option>
            </select>
          </label>
        </div>

        <div className="toolbar-summary">
          <span>Всего: {items.length}</span>
          <span>Показано: {sortedItems.length}</span>
          <span>Активных фильтров: {activeFiltersCount}</span>
        </div>
      </section>

      {error && (
        <div className="alert alert-danger page-alert">
          <div className="alert-content">
            <strong>Ошибка:</strong> {error}
          </div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setError(null)}
          >
            ×
          </button>
        </div>
      )}

      <section className="media-info-table-shell card-shell">
        {loading ? (
          <div className="state-block">
            <div className="loading-spinner" />
            <p>Загружаем медиа...</p>
          </div>
        ) : sortedItems.length === 0 ? (
          <div className="state-block empty-state">
            <h2>Ничего не найдено</h2>
            <p>Измени фильтры или создай новую запись.</p>
            <div className="empty-actions">
              <Link to="/media-info/create" className="btn btn-primary">
                Создать запись
              </Link>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetFilters}
              >
                Сбросить фильтры
              </button>
            </div>
          </div>
        ) : (
          <div className="table-scroll">
            <table className="media-info-table">
              <thead>
                <tr>
                  {(
                    [
                      "metaInfo.displayName",
                      "fileInfo.filePath",
                      "fileInfo.type",
                      "metaInfo.duration",
                      "metaInfo.priority",
                      "metaInfo.twitchPointsCost",
                    ] as MediaInfoSortField[]
                  ).map(field => (
                    <th key={field}>
                      <button
                        type="button"
                        className={`sort-button ${sortField === field ? "active" : ""}`}
                        onClick={() => handleSort(field)}
                      >
                        <span>{columnLabels[field]}</span>
                        <span className="sort-icon">
                          {sortField === field
                            ? sortDirection === "asc"
                              ? "↑"
                              : "↓"
                            : "↕"}
                        </span>
                      </button>
                    </th>
                  ))}
                  <th>Состояние</th>
                  <th>Действия</th>
                </tr>
              </thead>
              <tbody>
                {sortedItems.map(item => (
                  <tr key={item.id}>
                    <td>
                      <div className="title-cell">
                        <strong>
                          {item.metaInfo.displayName || "Без названия"}
                        </strong>
                        <span>{item.fileInfo.fileName || "Без файла"}</span>
                        {item.textInfo.triggerWord ? (
                          <span className="muted-line">
                            Триггер: {item.textInfo.triggerWord}
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td>
                      <div className="muted-line path-cell">
                        {item.fileInfo.filePath || "—"}
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge type-badge type-${item.fileInfo.type.toLowerCase()}`}
                      >
                        {item.fileInfo.type}
                      </span>
                    </td>
                    <td>{formatMediaDuration(item.metaInfo.duration)}</td>
                    <td>
                      <span
                        className={`badge priority-badge priority-${item.metaInfo.priority.toLowerCase()}`}
                      >
                        {item.metaInfo.priority}
                      </span>
                    </td>
                    <td>{item.metaInfo.twitchPointsCost}</td>
                    <td>
                      <div className="status-stack">
                        <span
                          className={`status-pill ${item.fileInfo.isLocalFile ? "is-local" : "is-external"}`}
                        >
                          {item.fileInfo.isLocalFile
                            ? "Локальный файл"
                            : "Внешний файл"}
                        </span>
                        <span
                          className={`status-pill ${item.metaInfo.twitchGuid ? "is-linked" : "is-empty"}`}
                        >
                          {item.metaInfo.twitchGuid
                            ? formatMediaRewardId(item.metaInfo.twitchGuid)
                            : "Награда не привязана"}
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="actions-cell">
                        <Link
                          to={`/media-info/edit/${item.id}`}
                          className="btn btn-sm btn-primary"
                        >
                          Редактировать
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(item)}
                        >
                          Удалить
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
};

function getSortValue(
  item: ApiMediaInfo,
  field: MediaInfoSortField
): string | number {
  switch (field) {
    case "fileInfo.filePath":
      return item.fileInfo.filePath || "";
    case "fileInfo.type":
      return item.fileInfo.type || "";
    case "metaInfo.duration":
      return item.metaInfo.duration;
    case "metaInfo.priority":
      return item.metaInfo.priority || "";
    case "metaInfo.twitchPointsCost":
      return item.metaInfo.twitchPointsCost ?? 0;
    case "metaInfo.displayName":
    default:
      return item.metaInfo.displayName || "";
  }
}
