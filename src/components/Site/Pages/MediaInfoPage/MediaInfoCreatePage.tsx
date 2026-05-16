import "./MediaInfoPage.scss";

import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ApiMediaInfo, MediaFileInfoTypeEnum, MediaInfoApi } from "@/shared/api";

import { MediaInfoFormSections } from "./MediaInfoFormSections";
import {
  createDefaultMediaInfo,
  updateMediaInfoValue,
} from "./mediaInfoPageHelpers";

export const MediaInfoCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ApiMediaInfo>(() =>
    createDefaultMediaInfo()
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mediaInfoApi = useMemo(() => new MediaInfoApi(), []);

  const handleChange = useCallback((path: string, value: unknown) => {
    setFormData(previous => updateMediaInfoValue(previous, path, value));
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
      setLoading(true);

      try {
        const response = await mediaInfoApi.mediaInfoApiCreate(formData);
        if (response.data.success && response.data.data) {
          setError(null);
          navigate(`/media-info/edit/${response.data.data.id}`);
        } else {
          setError(response.data.message ?? "Не удалось создать медиа");
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
    [formData, mediaInfoApi, navigate]
  );

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
              <p className="preview-subtitle">{formData.fileInfo.filePath || "Путь к файлу не указан"}</p>
            </div>

            <div className="preview-badges">
              <span className={`badge priority-badge priority-${formData.metaInfo.priority.toLowerCase()}`}>
                {formData.metaInfo.priority}
              </span>
              <span className={`badge type-badge type-${formData.fileInfo.type.toLowerCase()}`}>
                {formData.fileInfo.type}
              </span>
            </div>
          </div>

          <div className="preview-stage">
            {(() => {
              const filePath = formData.fileInfo.filePath;
              const type = formData.fileInfo.type;
              if (
                type === MediaFileInfoTypeEnum.Image ||
                type === MediaFileInfoTypeEnum.Gif
              ) {
                return filePath ? (
                  <img className="preview-media" src={filePath} alt={formData.metaInfo.displayName} />
                ) : (
                  <div className="preview-empty">
                    <h3>Нет изображения для предпросмотра</h3>
                  </div>
                );
              }

              if (type === MediaFileInfoTypeEnum.Audio) {
                return filePath ? (
                  <audio className="preview-media preview-audio" controls src={filePath} />
                ) : (
                  <div className="preview-empty">
                    <h3>Нет аудио для предпросмотра</h3>
                  </div>
                );
              }

              if (type === MediaFileInfoTypeEnum.Video) {
                return filePath ? (
                  <video className="preview-media preview-video" controls src={filePath} />
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
  );
};
