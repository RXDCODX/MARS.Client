import "./MediaInfoPage.scss";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { ApiMediaInfo, MediaInfoApi } from "@/shared/api";

export const MediaInfoListPage: React.FC = () => {
  const [alerts, setAlerts] = useState<ApiMediaInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
          : "Произошла ошибка при загрузке алертов"
      );
    } finally {
      setLoading(false);
    }
  }, [mediaInfoApi]);

  useEffect(() => {
    loadAlerts();
  }, [loadAlerts]);

  const handleDeleteAlert = async (id: string) => {
    if (!window.confirm("Вы уверены, что хотите удалить этот алерт?")) {
      return;
    }

    try {
      await mediaInfoApi.mediaInfoApiDelete(id);
      setAlerts(prev => prev.filter(alert => alert.id !== id));
      setError(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка при удалении алерта"
      );
    }
  };

  if (loading) {
    return <div className="media-info-page">Загрузка...</div>;
  }

  return (
    <div className="media-info-page">
      {/* <div className="page-header">
        <h1>Список алертов (MediaInfo)</h1>
        <Link to="/media-info/create" className="btn btn-primary">
          Создать новый алерт
        </Link>
      </div> */}

      {error && (
        <div className="alert alert-danger">
          {error}
          <button className="btn-close" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}

      <div className="alerts-grid">
        {alerts.length === 0 ? (
          <p>Алерты не найдены</p>
        ) : (
          alerts.map(alert => (
            <div key={alert.id} className="alert-card">
              <div className="alert-header">
                <h3>{alert.fileInfo.filePath || "Без названия"}</h3>
                <div className="alert-actions">
                  <Link
                    to={`/media-info/edit/${alert.id}`}
                    className="btn btn-sm btn-outline-primary"
                  >
                    Редактировать
                  </Link>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDeleteAlert(alert.id)}
                  >
                    Удалить
                  </button>
                </div>
              </div>

              <div className="alert-details">
                <div className="detail-row">
                  <strong>Тип файла:</strong> {alert.fileInfo.type}
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
                  <strong>Приоритет:</strong> {alert.metaInfo.priority}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
