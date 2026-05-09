import "./MediaInfoPage.scss";

import { useCallback, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ApiMediaInfo, MediaInfoApi } from "@/shared/api";

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
