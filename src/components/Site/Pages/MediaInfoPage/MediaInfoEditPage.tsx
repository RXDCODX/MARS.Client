import "./MediaInfoPage.scss";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  ApiMediaInfo,
  MediaFileInfoTypeEnum,
  MediaInfoApi,
} from "@/shared/api";

import { MediaInfoFormSections } from "./MediaInfoFormSections";
import {
  applySelectedFileToMediaInfo,
  buildMediaInfoFormData,
  formatMediaDuration,
  formatMediaRewardId,
  updateMediaInfoValue,
} from "./mediaInfoPageHelpers";

const getMediaPreviewKind = (
  item: ApiMediaInfo
): "image" | "audio" | "video" | "unsupported" => {
  if (
    item.fileInfo.type === MediaFileInfoTypeEnum.Image ||
    item.fileInfo.type === MediaFileInfoTypeEnum.Gif
  ) {
    return "image";
  }

  if (item.fileInfo.type === MediaFileInfoTypeEnum.Audio) {
    return "audio";
  }

  if (item.fileInfo.type === MediaFileInfoTypeEnum.Video) {
    return "video";
  }

  return "unsupported";
};

const MediaInfoPreviewCard: React.FC<{ item: ApiMediaInfo }> = ({ item }) => {
  const fileUrl =
    item.fileInfo.filePath.startsWith("blob:") ||
    item.fileInfo.filePath.startsWith("data:")
      ? item.fileInfo.filePath
      : `/api/MediaInfoApi/${item.id}/file`;
  const previewKind = getMediaPreviewKind(item);

  return (
    <section className="preview-card card-shell">
      <div className="preview-card-header">
        <div>
          <p className="eyebrow">Сам алерт</p>
          <h2>{item.metaInfo.displayName || "Без названия"}</h2>
          <p className="preview-subtitle">
            {item.fileInfo.filePath || "Путь к файлу не указан"}
          </p>
        </div>

        <div className="preview-badges">
          <span
            className={`badge priority-badge priority-${item.metaInfo.priority.toLowerCase()}`}
          >
            {item.metaInfo.priority}
          </span>
          <span
            className={`badge type-badge type-${item.fileInfo.type.toLowerCase()}`}
          >
            {item.fileInfo.type}
          </span>
        </div>
      </div>

      <div className="preview-stage">
        {previewKind === "image" && (
          <img
            className="preview-media"
            src={fileUrl}
            alt={item.metaInfo.displayName}
          />
        )}

        {previewKind === "audio" && (
          <audio
            className="preview-media preview-audio"
            controls
            src={fileUrl}
          />
        )}

        {previewKind === "video" && (
          <video
            className="preview-media preview-video"
            controls
            src={fileUrl}
          />
        )}

        {previewKind === "unsupported" && (
          <div className="preview-empty">
            <h3>Неподдерживаемый формат</h3>
            <p>{item.fileInfo.type}</p>
          </div>
        )}
      </div>

      <div className="preview-meta-grid">
        <div className="meta-chip">
          <span>Файл</span>
          <strong>{item.fileInfo.fileName || "Не указан"}</strong>
        </div>
        <div className="meta-chip">
          <span>Длительность</span>
          <strong>{formatMediaDuration(item.metaInfo.duration)}</strong>
        </div>
        <div className="meta-chip">
          <span>Reward</span>
          <strong>{formatMediaRewardId(item.metaInfo.twitchGuid)}</strong>
        </div>
        <div className="meta-chip">
          <span>Баллы</span>
          <strong>{item.metaInfo.twitchPointsCost}</strong>
        </div>
      </div>

      <div className="preview-description">
        <p>{item.textInfo.text || "Описание алерта не заполнено"}</p>
      </div>
    </section>
  );
};

export const MediaInfoEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [alert, setAlert] = useState<ApiMediaInfo | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const mediaInfoApi = useMemo(() => new MediaInfoApi(), []);

  const loadAlert = useCallback(async () => {
    if (!id) {
      setError("Не указан идентификатор медиа");
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await mediaInfoApi.mediaInfoApiDetail(id);
      if (response.data.success && response.data.data) {
        setAlert(response.data.data);
        setSelectedFile(null);
        setError(null);
      } else {
        setAlert(null);
        setError(response.data.message ?? "Медиа не найдено");
      }
    } catch (loadError) {
      setAlert(null);
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Не удалось загрузить медиа"
      );
    } finally {
      setLoading(false);
    }
  }, [id, mediaInfoApi]);

  useEffect(() => {
    loadAlert();
  }, [loadAlert]);

  const handleChange = useCallback((path: string, value: unknown) => {
    setAlert(previous => {
      if (!previous) {
        return previous;
      }

      return updateMediaInfoValue(previous, path, value);
    });
  }, []);

  const handleFileSelected = useCallback((file: File | null) => {
    setSelectedFile(file);

    setAlert(previous => {
      if (!previous) {
        return previous;
      }

      if (!file) {
        return updateMediaInfoValue(previous, "fileInfo.filePath", "");
      }

      const previewUrl = URL.createObjectURL(file);
      return applySelectedFileToMediaInfo(previous, file, previewUrl);
    });
  }, []);

  const handleGenerateRewardId = useCallback(() => {
    handleChange("metaInfo.twitchGuid", crypto.randomUUID());
  }, [handleChange]);

  const handleClearRewardId = useCallback(() => {
    handleChange("metaInfo.twitchGuid", undefined);
    handleChange("metaInfo.twitchPointsCost", 0);
  }, [handleChange]);

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (!alert || !id) {
        return;
      }

      setSaving(true);

      try {
        const response = await fetch(`/api/MediaInfoApi/${id}`, {
          method: "PUT",
          body: buildMediaInfoFormData(alert, selectedFile),
        });
        const result = await response.json();

        if (response.ok && result?.success && result.data) {
          setAlert(result.data);
          setSelectedFile(null);
          setSuccess("Изменения сохранены");
          setError(null);
        } else {
          setError(result?.message ?? "Не удалось сохранить изменения");
        }
      } catch (saveError) {
        setError(
          saveError instanceof Error
            ? saveError.message
            : "Не удалось сохранить изменения"
        );
      } finally {
        setSaving(false);
      }
    },
    [alert, id, selectedFile]
  );

  const handleDelete = useCallback(async () => {
    if (!alert || !id) {
      return;
    }

    const confirmDelete = window.confirm(
      `Удалить медиа «${alert.metaInfo.displayName || alert.fileInfo.fileName}»?`
    );

    if (!confirmDelete) {
      return;
    }

    setSaving(true);

    try {
      const response = await mediaInfoApi.mediaInfoApiDelete(id);
      if (response.data.success) {
        navigate("/media-info");
      } else {
        setError(response.data.message ?? "Не удалось удалить медиа");
      }
    } catch (deleteError) {
      setError(
        deleteError instanceof Error
          ? deleteError.message
          : "Не удалось удалить медиа"
      );
    } finally {
      setSaving(false);
    }
  }, [alert, id, mediaInfoApi, navigate]);

  const handleCancel = useCallback(() => {
    navigate("/media-info");
  }, [navigate]);

  if (loading) {
    return (
      <div className="media-info-page media-info-edit-page">
        <div className="state-block">
          <div className="loading-spinner" />
          <p>Загружаем карточку алерта...</p>
        </div>
      </div>
    );
  }

  if (!alert) {
    return (
      <div className="media-info-page media-info-edit-page">
        <div className="state-block empty-state">
          <h2>Алерт не найден</h2>
          <p>Запрашиваемая запись отсутствует или была удалена.</p>
          <Link to="/media-info" className="btn btn-primary">
            Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="media-info-page media-info-edit-page">
      <section className="media-info-hero">
        <div className="hero-copy">
          <p className="eyebrow">Редактирование</p>
          <h1>Карточка медиа-алерта</h1>
          <p className="hero-description">
            Здесь видно сам алерт, его reward-привязку и все параметры
            поведения.
          </p>
        </div>

        <div className="hero-actions">
          <button
            type="button"
            className="btn btn-outline-secondary hero-button"
            onClick={handleCancel}
          >
            Назад
          </button>
          <button
            type="button"
            className="btn btn-outline-danger hero-button"
            onClick={handleDelete}
            disabled={saving}
          >
            Удалить
          </button>
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

      {success && (
        <div className="alert alert-success page-alert success-alert">
          <div className="alert-content">{success}</div>
          <button
            type="button"
            className="btn-close"
            onClick={() => setSuccess(null)}
          >
            ×
          </button>
        </div>
      )}

      <div className="editor-layout">
        <MediaInfoPreviewCard item={alert} />

        <section className="card-shell editor-shell">
          <form className="editor-form" onSubmit={handleSubmit}>
            <div className="editor-form-header">
              <div>
                <h2>Редактирование полей</h2>
                <p>
                  Все изменения сохраняются одной операцией и сразу отражаются в
                  карточке.
                </p>
              </div>

              <div className="editor-form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleGenerateRewardId}
                >
                  Новый reward id
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={saving}
                >
                  {saving ? "Сохраняем..." : "Сохранить"}
                </button>
              </div>
            </div>

            <MediaInfoFormSections
              formData={alert}
              onChange={handleChange}
              onGenerateRewardId={handleGenerateRewardId}
              onClearRewardId={handleClearRewardId}
              onFileSelected={handleFileSelected}
            />

            <div className="editor-footer-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={saving}
              >
                {saving ? "Сохраняем..." : "Сохранить изменения"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCancel}
              >
                К списку
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
