import "./MediaInfoPage.scss";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  MediaFileInfoTypeEnum,
  MediaInfo,
  MediaMetaInfoPriorityEnum,
} from "@/shared/api";
import { MediaInfoApi } from "@/shared/api/http-clients/MediaInfoApi";

export const MediaInfoCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Создаем экземпляр API
  const mediaInfoApi = useMemo(() => new MediaInfoApi(), []);

  const createEmptyAlert = (): Omit<MediaInfo, "id"> => ({
    textInfo: {
      text: "",
      textColor: "#ffffff",
      triggerWord: "",
      keyWordsColor: "#ffff00",
    },
    fileInfo: {
      fileName: "",
      filePath: "",
      extension: "",
      isLocalFile: true,
      type: MediaFileInfoTypeEnum.Image,
    },
    positionInfo: {
      xCoordinate: 0,
      yCoordinate: 0,
      width: 100,
      height: 100,
      rotation: 0,
      randomCoordinates: false,
      isRotated: false,
      isResizeRequires: false,
      isProportion: true,
      isHorizontalCenter: false,
      isVerticallCenter: false,
      isUseOriginalWidthAndHeight: false,
    },
    metaInfo: {
      displayName: "",
      duration: 15,
      isLooped: false,
      priority: MediaMetaInfoPriorityEnum.Normal,
      twitchGuid: undefined,
      twitchPointsCost: 0,
      vip: false,
      volume: 100,
    },
    stylesInfo: {
      isBorder: false,
    },
  });

  const [formData, setFormData] = useState(createEmptyAlert());

  const updateNestedObject = (path: string, value: unknown) => {
    const keys = path.split(".");
    setFormData(prev => {
      const newData = { ...prev };
      let current: Record<string, unknown> = newData;

      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]] as Record<string, unknown>;
      }

      current[keys[keys.length - 1]] = value;
      return newData;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await mediaInfoApi.mediaInfoApiCreate(formData as MediaInfo);
      navigate("/media-info");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Ошибка при создании алерта"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/media-info");
  };

  return (
    <div className="media-info-page">
      <div className="page-header">
        <h1>Создание нового алерта</h1>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Отмена
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
          <button className="btn-close" onClick={() => setError(null)}>
            ×
          </button>
        </div>
      )}

      <div className="alert-form">
        <form onSubmit={handleSubmit}>
          <div className="form-section">
            <h3>Основная информация</h3>
            <div className="form-group">
              <label>Отображаемое имя:</label>
              <input
                type="text"
                value={formData.metaInfo.displayName}
                onChange={e =>
                  updateNestedObject("metaInfo.displayName", e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Триггер слово:</label>
              <input
                type="text"
                value={formData.textInfo.triggerWord}
                onChange={e =>
                  updateNestedObject("textInfo.triggerWord", e.target.value)
                }
              />
            </div>

            <div className="form-group">
              <label>Текст:</label>
              <input
                type="text"
                value={formData.textInfo.text}
                onChange={e =>
                  updateNestedObject("textInfo.text", e.target.value)
                }
              />
            </div>
          </div>

          <div className="form-section">
            <h3>Файл</h3>
            <div className="form-group">
              <label>Имя файла:</label>
              <input
                type="text"
                value={formData.fileInfo.fileName}
                onChange={e =>
                  updateNestedObject("fileInfo.fileName", e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Путь к файлу:</label>
              <input
                type="text"
                value={formData.fileInfo.filePath}
                onChange={e =>
                  updateNestedObject("fileInfo.filePath", e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Расширение:</label>
              <input
                type="text"
                value={formData.fileInfo.extension}
                onChange={e =>
                  updateNestedObject("fileInfo.extension", e.target.value)
                }
                required
              />
            </div>

            <div className="form-group">
              <label>Тип файла:</label>
              <select
                value={formData.fileInfo.type}
                onChange={e =>
                  updateNestedObject(
                    "fileInfo.type",
                    e.target.value as MediaFileInfoTypeEnum
                  )
                }
              >
                {Object.values(MediaFileInfoTypeEnum).map(type => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.fileInfo.isLocalFile}
                  onChange={e =>
                    updateNestedObject("fileInfo.isLocalFile", e.target.checked)
                  }
                />
                Локальный файл
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Настройки</h3>
            <div className="form-group">
              <label>Длительность (секунды):</label>
              <input
                type="number"
                value={formData.metaInfo.duration}
                onChange={e =>
                  updateNestedObject(
                    "metaInfo.duration",
                    parseInt(e.target.value)
                  )
                }
                min="1"
                max="300"
              />
            </div>

            <div className="form-group">
              <label>Приоритет:</label>
              <select
                value={formData.metaInfo.priority}
                onChange={e =>
                  updateNestedObject(
                    "metaInfo.priority",
                    e.target.value as MediaMetaInfoPriorityEnum
                  )
                }
              >
                {Object.values(MediaMetaInfoPriorityEnum).map(priority => (
                  <option key={priority} value={priority}>
                    {priority}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Стоимость в Twitch Points:</label>
              <input
                type="number"
                value={formData.metaInfo.twitchPointsCost}
                onChange={e =>
                  updateNestedObject(
                    "metaInfo.twitchPointsCost",
                    parseInt(e.target.value)
                  )
                }
                min="0"
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.metaInfo.vip}
                  onChange={e =>
                    updateNestedObject("metaInfo.vip", e.target.checked)
                  }
                />
                VIP только
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.metaInfo.isLooped}
                  onChange={e =>
                    updateNestedObject("metaInfo.isLooped", e.target.checked)
                  }
                />
                Зациклить
              </label>
            </div>

            <div className="form-group">
              <label>Громкость:</label>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={formData.metaInfo.volume}
                onChange={e =>
                  updateNestedObject(
                    "metaInfo.volume",
                    parseInt(e.target.value)
                  )
                }
              />
              <span>{formData.metaInfo.volume}%</span>
            </div>
          </div>

          <div className="form-section">
            <h3>Позиция</h3>
            <div className="form-row">
              <div className="form-group">
                <label>X координата:</label>
                <input
                  type="number"
                  value={formData.positionInfo.xCoordinate}
                  onChange={e =>
                    updateNestedObject(
                      "positionInfo.xCoordinate",
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
              <div className="form-group">
                <label>Y координата:</label>
                <input
                  type="number"
                  value={formData.positionInfo.yCoordinate}
                  onChange={e =>
                    updateNestedObject(
                      "positionInfo.yCoordinate",
                      parseInt(e.target.value)
                    )
                  }
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Ширина:</label>
                <input
                  type="number"
                  value={formData.positionInfo.width}
                  onChange={e =>
                    updateNestedObject(
                      "positionInfo.width",
                      parseInt(e.target.value)
                    )
                  }
                  min="1"
                />
              </div>
              <div className="form-group">
                <label>Высота:</label>
                <input
                  type="number"
                  value={formData.positionInfo.height}
                  onChange={e =>
                    updateNestedObject(
                      "positionInfo.height",
                      parseInt(e.target.value)
                    )
                  }
                  min="1"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Поворот (градусы):</label>
              <input
                type="number"
                value={formData.positionInfo.rotation}
                onChange={e =>
                  updateNestedObject(
                    "positionInfo.rotation",
                    parseInt(e.target.value)
                  )
                }
                min="0"
                max="360"
              />
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.positionInfo.randomCoordinates}
                  onChange={e =>
                    updateNestedObject(
                      "positionInfo.randomCoordinates",
                      e.target.checked
                    )
                  }
                />
                Случайные координаты
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.positionInfo.isHorizontalCenter}
                  onChange={e =>
                    updateNestedObject(
                      "positionInfo.isHorizontalCenter",
                      e.target.checked
                    )
                  }
                />
                Центрировать по горизонтали
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.positionInfo.isVerticallCenter}
                  onChange={e =>
                    updateNestedObject(
                      "positionInfo.isVerticallCenter",
                      e.target.checked
                    )
                  }
                />
                Центрировать по вертикали
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.positionInfo.isUseOriginalWidthAndHeight}
                  onChange={e =>
                    updateNestedObject(
                      "positionInfo.isUseOriginalWidthAndHeight",
                      e.target.checked
                    )
                  }
                />
                Использовать оригинальные размеры
              </label>
            </div>
          </div>

          <div className="form-section">
            <h3>Стили</h3>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.stylesInfo.isBorder}
                  onChange={e =>
                    updateNestedObject("stylesInfo.isBorder", e.target.checked)
                  }
                />
                Показать границу
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Создание..." : "Создать"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={loading}
            >
              Отмена
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
