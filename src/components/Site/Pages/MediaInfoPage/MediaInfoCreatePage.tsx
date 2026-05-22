import "./MediaInfoPage.scss";

import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ApiMediaInfo, MediaFileInfoTypeEnum } from "@/shared/api";

import { MediaInfoFormSections } from "./MediaInfoFormSections";
import {
  applySelectedFileToMediaInfo,
  buildMediaInfoFormData,
  createDefaultMediaInfo,
  updateMediaInfoValue,
} from "./mediaInfoPageHelpers";

export const MediaInfoCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ApiMediaInfo>(() =>
    createDefaultMediaInfo()
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback((path: string, value: unknown) => {
    setFormData(previous => updateMediaInfoValue(previous, path, value));
  }, []);

  const handleFileSelected = useCallback((file: File | null) => {
    setSelectedFile(file);
    setPreviewUrl(previous => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }

      return file ? URL.createObjectURL(file) : null;
    });

    if (!file) {
      return;
    }

    setFormData(previous => applySelectedFileToMediaInfo(previous, file));
  }, []);

  useEffect(
    () => () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    },
    [previewUrl]
  );

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

      if (selectedFile && !formData.fileInfo.filePath.trim()) {
        setError("Укажи путь к файлу перед сохранением");
        return;
      }

      setLoading(true);

      try {
        const response = await fetch("/api/MediaInfoApi", {
          method: "POST",
          body: buildMediaInfoFormData(formData, selectedFile),
        });
        const result = await response.json();

        if (response.ok && result?.success && result.data) {
          setError(null);
          navigate(`/media-info/edit/${result.data.id}`);
        } else {
          setError(result?.message ?? "Не удалось создать медиа");
        }
      } catch (createError) {
        setError(
          createError instanceof Error
            ? createError.message
            : "Не удалось создать медиа"
        );
      } finally {
        setLoading(false);
      }
    },
    [formData, navigate, selectedFile]
  );

  const helpText =
    "Выбранный файл хранится в памяти клиента до сохранения. Укажи целевой путь внутри Alerts/uploaded_mems/ перед нажатием Создать.";

  return (
    <div className="media-info-page media-info-create-page">
      <section className="media-info-hero">
        <div className="hero-copy">
          <p className="eyebrow">Новая запись</p>
          <h1>Создание MediaInfo</h1>
          <p className="hero-description">
            Полная карточка алерта с reward-привязкой. После сохранения
            откроется экран редактирования.
          </p>
        </div>

        <div className="hero-actions">
          <Link
            to="/media-info"
            className="btn btn-outline-secondary hero-button"
          >
            К списку
          </Link>
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

      <div className="editor-layout">
        <section className="preview-card card-shell">
          <div className="preview-card-header">
            <div>
              <p className="eyebrow">Предпросмотр</p>
              <h2>{formData.metaInfo.displayName || "Без названия"}</h2>
              <p className="preview-subtitle">
                {formData.fileInfo.filePath || "Путь к файлу не указан"}
              </p>
            </div>

            <div className="preview-badges">
              <span
                className={`badge priority-badge priority-${formData.metaInfo.priority.toLowerCase()}`}
              >
                {formData.metaInfo.priority}
              </span>
              <span
                className={`badge type-badge type-${formData.fileInfo.type.toLowerCase()}`}
              >
                {formData.fileInfo.type}
              </span>
            </div>
          </div>

          <div className="preview-stage">
            {(() => {
              const filePath = previewUrl || formData.fileInfo.filePath;
              const type = formData.fileInfo.type;
              if (
                type === MediaFileInfoTypeEnum.Image ||
                type === MediaFileInfoTypeEnum.Gif
              ) {
                return filePath ? (
                  <img
                    className="preview-media"
                    src={filePath}
                    alt={formData.metaInfo.displayName}
                  />
                ) : (
                  <div className="preview-empty">
                    <h3>Нет изображения для предпросмотра</h3>
                  </div>
                );
              }

              if (type === MediaFileInfoTypeEnum.Audio) {
                return filePath ? (
                  <audio
                    className="preview-media preview-audio"
                    controls
                    src={filePath}
                  />
                ) : (
                  <div className="preview-empty">
                    <h3>Нет аудио для предпросмотра</h3>
                  </div>
                );
              }

              if (type === MediaFileInfoTypeEnum.Video) {
                return filePath ? (
                  <video
                    className="preview-media preview-video"
                    controls
                    src={filePath}
                  />
                ) : (
                  <div className="preview-empty">
                    <h3>Нет видео для предпросмотра</h3>
                  </div>
                );
              }

              return (
                <div className="preview-empty">
                  <h3>Неподдерживаемый формат</h3>
                  <p>{formData.fileInfo.type}</p>
                </div>
              );
            })()}
          </div>

          <div className="preview-meta-grid">
            <div className="meta-chip">
              <span>Файл</span>
              <strong>{formData.fileInfo.fileName || "Не указан"}</strong>
            </div>
            <div className="meta-chip">
              <span>Длительность</span>
              <strong>{formData.metaInfo.duration}s</strong>
            </div>
            <div className="meta-chip">
              <span>Reward</span>
              <strong>{formData.metaInfo.twitchGuid ?? "Не привязана"}</strong>
            </div>
            <div className="meta-chip">
              <span>Баллы</span>
              <strong>{formData.metaInfo.twitchPointsCost}</strong>
            </div>
          </div>

          <div className="preview-description">
            <p>{formData.textInfo.text || "Описание алерта не заполнено"}</p>
          </div>
        </section>

        <section className="card-shell editor-shell">
          <form className="editor-form" onSubmit={handleSubmit}>
            <div className="editor-form-header">
              <div>
                <h2>Карточка алерта</h2>
                <p>
                  Заполняй данные последовательно. Reward ID можно создать прямо
                  здесь.
                </p>
              </div>

              <div className="editor-form-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Сохраняем..." : "Создать запись"}
                </button>
              </div>
            </div>

            <MediaInfoFormSections
              formData={formData}
              onChange={handleChange}
              onGenerateRewardId={handleGenerateRewardId}
              onClearRewardId={handleClearRewardId}
              onFileSelected={handleFileSelected}
              helpText={helpText}
              previewUrl={previewUrl}
            />

            <div className="editor-footer-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Создаём..." : "Создать"}
              </button>
              <Link to="/media-info" className="btn btn-secondary">
                Отмена
              </Link>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
