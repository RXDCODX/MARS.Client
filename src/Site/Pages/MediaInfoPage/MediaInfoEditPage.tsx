import "./MediaInfoPage.scss";
import "react-toastify/dist/ReactToastify.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { MediaFileInfoTypeEnum, MediaMetaInfoPriorityEnum } from "@/shared/api";
import { MediaInfo, MediaInfoApi } from "@/shared/api";

// Компонент проигрывателя медиафайлов
const MediaPlayer: React.FC<{
  alert: MediaInfo;
  onVolumeChange?: (volume: number) => void;
}> = ({ alert, onVolumeChange }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(alert.metaInfo.volume / 100);
  const [error, setError] = useState<string | null>(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const fileUrl = `/api/MediaInfoApi/${alert.id}/file`;
  const isAudio = alert.fileInfo.type === MediaFileInfoTypeEnum.Audio;
  const isVideo = alert.fileInfo.type === MediaFileInfoTypeEnum.Video;
  const isImage =
    alert.fileInfo.type === MediaFileInfoTypeEnum.Image ||
    alert.fileInfo.type === MediaFileInfoTypeEnum.Gif;

  // Синхронизируем громкость при изменении в форме
  useEffect(() => {
    const newVolume = alert.metaInfo.volume / 100;
    setVolume(newVolume);

    if (isAudio && audioRef.current) {
      audioRef.current.volume = newVolume;
    } else if (isVideo && videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  }, [alert.metaInfo.volume, isAudio, isVideo]);

  // Синхронизируем громкость при изменении в плеере
  useEffect(() => {
    if (isAudio && audioRef.current) {
      audioRef.current.volume = volume;
    } else if (isVideo && videoRef.current) {
      videoRef.current.volume = volume;
    }
  }, [volume, isAudio, isVideo]);

  const handlePlayPause = useCallback(() => {
    if (isAudio && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    } else if (isVideo && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  }, [isAudio, isPlaying, isVideo]);

  const handleTimeUpdate = useCallback(
    (e: React.SyntheticEvent<HTMLVideoElement | HTMLAudioElement>) => {
      const target = e.target as HTMLVideoElement | HTMLAudioElement;
      setCurrentTime(target.currentTime);
      setDuration(target.duration);
    },
    []
  );

  const handleSeek = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newTime = parseFloat(e.target.value);
      setCurrentTime(newTime);
      // Обновляем время в элементе
      if (isAudio && audioRef.current) {
        audioRef.current.currentTime = newTime;
      } else if (isVideo && videoRef.current) {
        videoRef.current.currentTime = newTime;
      }
    },
    [isAudio, isVideo]
  );

  const handleVolumeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newVolume = parseFloat(e.target.value);
      setVolume(newVolume);

      // Обновляем громкость в форме
      if (onVolumeChange) {
        onVolumeChange(Math.round(newVolume * 100));
      }

      // Обновляем громкость в элементе
      if (isAudio && audioRef.current) {
        audioRef.current.volume = newVolume;
      } else if (isVideo && videoRef.current) {
        videoRef.current.volume = newVolume;
      }
    },
    [isAudio, isVideo, onVolumeChange]
  );

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  if (isImage) {
    return (
      <div className="image-preview">
        <img
          src={fileUrl}
          alt={alert.metaInfo.displayName}
          className="preview-image"
          onError={e => {
            const target = e.target as HTMLImageElement;
            target.style.display = "none";
            target.nextElementSibling!.textContent =
              "Ошибка загрузки изображения";
          }}
        />
        <div className="image-error" style={{ display: "none" }}></div>
        <div className="image-info">
          <p>
            <strong>Файл:</strong> {alert.fileInfo.fileName}
          </p>
          <p>
            <strong>Размер:</strong> {alert.positionInfo.width} ×{" "}
            {alert.positionInfo.height}
          </p>
          <p>
            <strong>Длительность:</strong> {alert.metaInfo.duration}с
          </p>
        </div>
      </div>
    );
  }

  if (isAudio) {
    return (
      <div className="audio-player">
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

        <audio
          ref={audioRef}
          src={fileUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onError={e => {
            console.error("Ошибка загрузки аудио:", e);
            setError("Ошибка загрузки аудио файла");
          }}
          preload="metadata"
        />

        <div className="player-controls">
          <button className="play-pause-btn" onClick={handlePlayPause}>
            {isPlaying ? "⏸️" : "▶️"}
          </button>

          <div className="time-display">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="seek-control">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="seek-slider"
            step="0.1"
          />
        </div>

        <div className="volume-control">
          <span>🔊</span>
          <input
            type="range"
            min="0"
            max="1"
            value={volume}
            onChange={handleVolumeChange}
            className="volume-slider"
            step="0.1"
          />
          <span>{Math.round(volume * 100)}%</span>
        </div>

        {/* Кнопки управления */}
        <div className="control-buttons">
          <button
            className="control-btn"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = Math.max(0, currentTime - 10);
              }
            }}
            title="Назад на 10 секунд"
          >
            ⏪ 10с
          </button>

          <button
            className="control-btn"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = Math.min(
                  duration,
                  currentTime + 10
                );
              }
            }}
            title="Вперед на 10 секунд"
          >
            10с ⏩
          </button>

          <button
            className="control-btn"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
              }
            }}
            title="В начало"
          >
            ⏮️ Начало
          </button>

          <button
            className="control-btn"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.currentTime = 0;
                setIsPlaying(false);
              }
            }}
            title="Остановить"
          >
            ⏹️ Стоп
          </button>

          <button
            className="control-btn"
            onClick={() => {
              if (audioRef.current) {
                audioRef.current.currentTime = duration;
                setIsPlaying(false);
              }
            }}
            title="В конец"
          >
            Конец ⏭️
          </button>

          <button
            className="control-btn"
            onClick={() => {
              if (audioRef.current) {
                const newRate = playbackRate === 1 ? 2 : 1;
                audioRef.current.playbackRate = newRate;
                setPlaybackRate(newRate);
              }
            }}
            title="Переключить скорость воспроизведения"
          >
            🚀 {playbackRate === 1 ? "1x" : "2x"}
          </button>
        </div>

        <div className="audio-info">
          <p>
            <strong>Файл:</strong> {alert.fileInfo.fileName}
          </p>
          <p>
            <strong>Длительность:</strong> {alert.metaInfo.duration}с
          </p>
          <p>
            <strong>Громкость:</strong> {alert.metaInfo.volume}%
          </p>
        </div>
      </div>
    );
  }

  if (isVideo) {
    return (
      <div className="video-player">
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

        <video
          ref={videoRef}
          src={fileUrl}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onError={e => {
            console.error("Ошибка загрузки видео:", e);
            setError("Ошибка загрузки видео файла");
          }}
          preload="metadata"
          controls
          className="video-element"
        />

        {/* Кнопки управления для видео */}
        <div className="control-buttons">
          <button
            className="control-btn"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = Math.max(0, currentTime - 10);
              }
            }}
            title="Назад на 10 секунд"
          >
            ⏪ 10с
          </button>

          <button
            className="control-btn"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = Math.min(
                  duration,
                  currentTime + 10
                );
              }
            }}
            title="Вперед на 10 секунд"
          >
            10с ⏩
          </button>

          <button
            className="control-btn"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = 0;
                setIsPlaying(false);
              }
            }}
            title="В начало"
          >
            ⏮️ Начало
          </button>

          <button
            className="control-btn"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                setIsPlaying(false);
              }
            }}
            title="Остановить"
          >
            ⏹️ Стоп
          </button>

          <button
            className="control-btn"
            onClick={() => {
              if (videoRef.current) {
                videoRef.current.currentTime = duration;
                setIsPlaying(false);
              }
            }}
            title="В конец"
          >
            Конец ⏭️
          </button>

          <button
            className="control-btn"
            onClick={() => {
              if (videoRef.current) {
                const newRate = playbackRate === 1 ? 2 : 1;
                videoRef.current.playbackRate = newRate;
                setPlaybackRate(newRate);
              }
            }}
            title="Переключить скорость воспроизведения"
          >
            🚀 {playbackRate === 1 ? "1x" : "2x"}
          </button>
        </div>

        <div className="video-info">
          <p>
            <strong>Файл:</strong> {alert.fileInfo.fileName}
          </p>
          <p>
            <strong>Размер:</strong> {alert.positionInfo.width} ×{" "}
            {alert.positionInfo.height}
          </p>
          <p>
            <strong>Длительность:</strong> {alert.metaInfo.duration}с
          </p>
          <p>
            <strong>Громкость:</strong> {alert.metaInfo.volume}%
          </p>
          <p>
            <strong>Зациклить:</strong> {alert.metaInfo.isLooped ? "Да" : "Нет"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="unsupported-format">
      <p>❌ Неподдерживаемый формат файла: {alert.fileInfo.type}</p>
      <p>
        <strong>Файл:</strong> {alert.fileInfo.fileName}
      </p>
      <p>
        <strong>Расширение:</strong> {alert.fileInfo.extension}
      </p>
    </div>
  );
};

export const MediaInfoEditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [alert, setAlert] = useState<MediaInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Создаем экземпляр API
  const mediaInfoApi = useMemo(() => new MediaInfoApi(), []);

  const loadAlert = useCallback(async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await mediaInfoApi.mediaInfoApiDetail(id);
      setAlert(data.data);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ошибка при загрузке файла";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id, mediaInfoApi]);

  useEffect(() => {
    loadAlert();
  }, [loadAlert]);

  const updateNestedObject = useCallback(
    (path: string, value: unknown) => {
      if (!alert) return;

      const keys = path.split(".");
      setAlert(prev => {
        if (!prev) return prev;
        const newData = { ...prev };
        let current: Record<string, unknown> = newData;

        for (let i = 0; i < keys.length - 1; i++) {
          current = current[keys[i]] as Record<string, unknown>;
        }

        current[keys[keys.length - 1]] = value;
        return newData;
      });
    },
    [alert]
  );

  const handleSubmit = useCallback(async () => {
    if (!alert) {
      return;
    }

    if (!id) {
      return;
    }

    setSaving(true);

    try {
      await mediaInfoApi.mediaInfoApiUpdate(id, alert);

      toast.success("✅ Изменения успешно сохранены!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      navigate("/media-info");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ошибка при обновлении файла";
      setError(errorMessage);
      toast.error(`❌ ${errorMessage}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSaving(false);
    }
  }, [alert, id, mediaInfoApi, navigate]);

  const handleCancel = () => {
    navigate("/media-info");
  };

  if (loading) {
    return (
      <div className="media-info-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Загрузка данных файла...</p>
        </div>
      </div>
    );
  }

  if (!alert) {
    return (
      <div className="media-info-page">
        <div className="error-container">
          <h2>Файл не найден</h2>
          <p>Запрашиваемый файл не существует или был удален.</p>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/media-info")}
          >
            Вернуться к списку
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="media-info-page">
      <div className="page-header">
        <div className="header-content">
          <h1>✏️ Редактирование медиафайла</h1>
          <p className="header-subtitle">{alert.metaInfo.displayName}</p>
        </div>
        <div className="header-actions">
          <button className="btn btn-outline-secondary" onClick={handleCancel}>
            <span>←</span> Назад
          </button>
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

      <div className="edit-form-container">
        <form className="edit-form">
          <div className="cards-grid">
            {/* Первый ряд - 2 карточки */}
            <div className="form-card">
              <div className="card-header">
                <div className="card-icon">📝</div>
                <h3>Основная информация</h3>
              </div>
              <div className="card-content">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Отображаемое имя</span>
                    <span className="label-required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={alert.metaInfo.displayName}
                    onChange={e => {
                      const newName = e.target.value;
                      updateNestedObject("metaInfo.displayName", newName);
                    }}
                    placeholder="Введите название файла"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Триггер слово</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={alert.textInfo.triggerWord}
                    onChange={e => {
                      const newTrigger = e.target.value;
                      updateNestedObject("textInfo.triggerWord", newTrigger);
                    }}
                    placeholder="Слово для активации файла"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Текст сообщения</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={alert.textInfo.text}
                    onChange={e => {
                      const newText = e.target.value;
                      updateNestedObject("textInfo.text", newText);
                    }}
                    placeholder="Текст для отображения"
                  />
                </div>
              </div>
            </div>

            <div className="form-card">
              <div className="card-header">
                <div className="card-icon">📁</div>
                <h3>Информация о файле</h3>
              </div>
              <div className="card-content">
                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Имя файла</span>
                    <span className="label-required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={alert.fileInfo.fileName}
                    onChange={e => {
                      const newFileName = e.target.value;
                      updateNestedObject("fileInfo.fileName", newFileName);
                    }}
                    placeholder="example.mp4"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Путь к файлу</span>
                    <span className="label-required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    value={alert.fileInfo.filePath}
                    onChange={e => {
                      const newFilePath = e.target.value;
                      updateNestedObject("fileInfo.filePath", newFilePath);
                    }}
                    placeholder="/path/to/file"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Расширение</span>
                      <span className="label-required">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-input"
                      value={alert.fileInfo.extension}
                      onChange={e => {
                        const newExtension = e.target.value;
                        updateNestedObject("fileInfo.extension", newExtension);
                      }}
                      placeholder="mp4"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Тип файла</span>
                    </label>
                    <select
                      className="form-select"
                      value={alert.fileInfo.type}
                      onChange={e => {
                        const newType = e.target.value as MediaFileInfoTypeEnum;
                        updateNestedObject("fileInfo.type", newType);
                      }}
                    >
                      {Object.values(MediaFileInfoTypeEnum).map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={alert.fileInfo.isLocalFile}
                      onChange={e => {
                        const isLocal = e.target.checked;
                        updateNestedObject("fileInfo.isLocalFile", isLocal);
                      }}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Локальный файл</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Второй ряд - 2 карточки */}
            <div className="form-card">
              <div className="card-header">
                <div className="card-icon">⚙️</div>
                <h3>Настройки воспроизведения</h3>
              </div>
              <div className="card-content">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Длительность (сек)</span>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={alert.metaInfo.duration}
                      onChange={e => {
                        const newDuration = parseInt(e.target.value);
                        updateNestedObject("metaInfo.duration", newDuration);
                      }}
                      min="1"
                      max="300"
                      placeholder="5"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Приоритет</span>
                    </label>
                    <select
                      className="form-select"
                      value={alert.metaInfo.priority}
                      onChange={e => {
                        const newPriority = e.target
                          .value as MediaMetaInfoPriorityEnum;
                        updateNestedObject("metaInfo.priority", newPriority);
                      }}
                    >
                      {Object.values(MediaMetaInfoPriorityEnum).map(
                        priority => (
                          <option key={priority} value={priority}>
                            {priority}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">
                      Стоимость в Twitch Points
                    </span>
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    value={alert.metaInfo.twitchPointsCost}
                    onChange={e => {
                      const newCost = parseInt(e.target.value);
                      updateNestedObject("metaInfo.twitchPointsCost", newCost);
                    }}
                    min="0"
                    placeholder="0"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={alert.metaInfo.vip}
                        onChange={e => {
                          const isVip = e.target.checked;
                          updateNestedObject("metaInfo.vip", isVip);
                        }}
                      />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">VIP только</span>
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={alert.metaInfo.isLooped}
                        onChange={e => {
                          const isLooped = e.target.checked;
                          updateNestedObject("metaInfo.isLooped", isLooped);
                        }}
                      />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">Зациклить</span>
                    </label>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">
                      Громкость: {alert.metaInfo.volume}%
                    </span>
                  </label>
                  <div className="range-container">
                    <input
                      type="range"
                      className="form-range"
                      min="0"
                      max="100"
                      step="1"
                      value={alert.metaInfo.volume}
                      onChange={e => {
                        const newVolume = parseInt(e.target.value);
                        updateNestedObject("metaInfo.volume", newVolume);
                      }}
                    />
                    <div className="range-labels">
                      <span>0%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="form-card">
              <div className="card-header">
                <div className="card-icon">📍</div>
                <h3>Позиция и размеры</h3>
              </div>
              <div className="card-content">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">X координата</span>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={alert.positionInfo.xCoordinate}
                      onChange={e => {
                        const newX = parseInt(e.target.value);
                        updateNestedObject("positionInfo.xCoordinate", newX);
                      }}
                      placeholder="0"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Y координата</span>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={alert.positionInfo.yCoordinate}
                      onChange={e => {
                        const newY = parseInt(e.target.value);
                        updateNestedObject("positionInfo.yCoordinate", newY);
                      }}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Ширина</span>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={alert.positionInfo.width}
                      onChange={e => {
                        const newWidth = parseInt(e.target.value);
                        updateNestedObject("positionInfo.width", newWidth);
                      }}
                      min="1"
                      placeholder="100"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Высота</span>
                    </label>
                    <input
                      type="number"
                      className="form-input"
                      value={alert.positionInfo.height}
                      onChange={e => {
                        const newHeight = parseInt(e.target.value);
                        updateNestedObject("positionInfo.height", newHeight);
                      }}
                      min="1"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <span className="label-text">Поворот (градусы)</span>
                  </label>
                  <input
                    type="number"
                    className="form-input"
                    value={alert.positionInfo.rotation}
                    onChange={e => {
                      const newRotation = parseInt(e.target.value);
                      updateNestedObject("positionInfo.rotation", newRotation);
                    }}
                    min="0"
                    max="360"
                    placeholder="0"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={alert.positionInfo.randomCoordinates}
                        onChange={e => {
                          const isRandom = e.target.checked;
                          updateNestedObject(
                            "positionInfo.randomCoordinates",
                            isRandom
                          );
                        }}
                      />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">
                        Случайные координаты
                      </span>
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={alert.positionInfo.isHorizontalCenter}
                        onChange={e => {
                          const isCentered = e.target.checked;
                          updateNestedObject(
                            "positionInfo.isHorizontalCenter",
                            isCentered
                          );
                        }}
                      />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">
                        Центрировать по горизонтали
                      </span>
                    </label>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={alert.positionInfo.isVerticallCenter}
                        onChange={e => {
                          const isCentered = e.target.checked;
                          updateNestedObject(
                            "positionInfo.isVerticallCenter",
                            isCentered
                          );
                        }}
                      />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">
                        Центрировать по вертикали
                      </span>
                    </label>
                  </div>
                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        className="form-checkbox"
                        checked={alert.positionInfo.isUseOriginalWidthAndHeight}
                        onChange={e => {
                          const useOriginal = e.target.checked;
                          updateNestedObject(
                            "positionInfo.isUseOriginalWidthAndHeight",
                            useOriginal
                          );
                        }}
                      />
                      <span className="checkmark"></span>
                      <span className="checkbox-text">
                        Использовать оригинальные размеры
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Третий ряд - 1 карточка по центру */}
            <div className="form-card center-card">
              <div className="card-header">
                <div className="card-icon">🎨</div>
                <h3>Визуальные стили</h3>
              </div>
              <div className="card-content">
                <div className="form-group checkbox-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      className="form-checkbox"
                      checked={alert.stylesInfo.isBorder}
                      onChange={e => {
                        const showBorder = e.target.checked;
                        updateNestedObject("stylesInfo.isBorder", showBorder);
                      }}
                    />
                    <span className="checkmark"></span>
                    <span className="checkbox-text">Показать границу</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Проигрыватель файла */}
          <div className="media-player-section">
            <div className="form-card">
              <div className="card-header">
                <div className="card-icon">🎵</div>
                <h3>Проигрыватель</h3>
              </div>
              <div className="card-content">
                <MediaPlayer
                  alert={alert}
                  onVolumeChange={volume =>
                    updateNestedObject("metaInfo.volume", volume)
                  }
                />
              </div>
            </div>
          </div>

          {/* Действия */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-primary"
              disabled={saving}
              onClick={handleSubmit}
            >
              {saving ? (
                <>
                  <span className="btn-spinner"></span>
                  Сохранение...
                </>
              ) : (
                <>
                  <span>💾</span>
                  Сохранить изменения
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
              disabled={saving}
            >
              <span>❌</span>
              Отмена
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};
