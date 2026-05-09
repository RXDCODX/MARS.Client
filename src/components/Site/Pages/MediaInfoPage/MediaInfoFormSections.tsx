import {
  ApiMediaInfo,
  MediaFileInfoTypeEnum,
  MediaMetaInfoPriorityEnum,
} from "@/shared/api";

import {
  mediaInfoFileTypes,
  mediaInfoPriorities,
} from "./mediaInfoPageHelpers";

type Props = {
  formData: ApiMediaInfo;
  onChange: (path: string, value: unknown) => void;
  onGenerateRewardId: () => void;
  onClearRewardId: () => void;
};

export const MediaInfoFormSections: React.FC<Props> = ({
  formData,
  onChange,
  onGenerateRewardId,
  onClearRewardId,
}) => (
  <div className="media-info-form-sections">
    <section className="form-section-card">
      <div className="section-heading">
        <h2>Основные данные</h2>
        <p>Название, триггер и сам текст алерта.</p>
      </div>

      <div className="form-grid form-grid-two">
        <label className="field">
          <span>Отображаемое имя</span>
          <input
            type="text"
            value={formData.metaInfo.displayName}
            onChange={event =>
              onChange("metaInfo.displayName", event.target.value)
            }
            placeholder="Например: Welcome clip"
            required
          />
        </label>

        <label className="field">
          <span>Триггер</span>
          <input
            type="text"
            value={formData.textInfo.triggerWord ?? ""}
            onChange={event =>
              onChange("textInfo.triggerWord", event.target.value)
            }
            placeholder="Команда или слово"
          />
        </label>
      </div>

      <label className="field">
        <span>Текст алерта</span>
        <textarea
          value={formData.textInfo.text ?? ""}
          onChange={event => onChange("textInfo.text", event.target.value)}
          rows={4}
          placeholder="Текст, который увидит зритель"
        />
      </label>

      <div className="form-grid form-grid-three">
        <label className="field">
          <span>Цвет текста</span>
          <input
            type="text"
            value={formData.textInfo.textColor ?? ""}
            onChange={event =>
              onChange("textInfo.textColor", event.target.value)
            }
            placeholder="#ffffff"
          />
        </label>

        <label className="field">
          <span>Цвет ключевых слов</span>
          <input
            type="text"
            value={formData.textInfo.keyWordsColor ?? ""}
            onChange={event =>
              onChange("textInfo.keyWordsColor", event.target.value)
            }
            placeholder="#f7c948"
          />
        </label>

        <label className="field">
          <span>Разделитель ключевых слов</span>
          <input
            type="text"
            value={formData.textInfo.keyWordSybmolDelimiter ?? ""}
            onChange={event =>
              onChange("textInfo.keyWordSybmolDelimiter", event.target.value)
            }
            placeholder="#"
            maxLength={1}
          />
        </label>
      </div>
    </section>

    <section className="form-section-card reward-card">
      <div className="section-heading">
        <h2>Своя награда</h2>
        <p>Привяжи Twitch reward или сгенерируй новый идентификатор.</p>
      </div>

      <div className="reward-state">
        <span
          className={`reward-pill ${formData.metaInfo.twitchGuid ? "linked" : "empty"}`}
        >
          {formData.metaInfo.twitchGuid
            ? "Награда привязана"
            : "Награда не привязана"}
        </span>
        <span className="reward-hint">
          {formData.metaInfo.twitchGuid
            ? formData.metaInfo.twitchGuid
            : "Сейчас можно добавить свой reward id"}
        </span>
      </div>

      <div className="form-grid form-grid-two">
        <label className="field">
          <span>Reward ID</span>
          <input
            type="text"
            value={formData.metaInfo.twitchGuid ?? ""}
            onChange={event =>
              onChange(
                "metaInfo.twitchGuid",
                event.target.value.trim() ? event.target.value : undefined
              )
            }
            placeholder="UUID кастомной награды"
          />
        </label>

        <label className="field">
          <span>Стоимость</span>
          <input
            type="number"
            min={0}
            value={formData.metaInfo.twitchPointsCost}
            onChange={event =>
              onChange("metaInfo.twitchPointsCost", Number(event.target.value))
            }
          />
        </label>
      </div>

      <div className="reward-actions">
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onGenerateRewardId}
        >
          Сгенерировать новый reward id
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={onClearRewardId}
        >
          Очистить привязку
        </button>
      </div>
    </section>

    <section className="form-section-card">
      <div className="section-heading">
        <h2>Файл</h2>
        <p>Путь, тип и локальность медиа.</p>
      </div>

      <div className="form-grid form-grid-two">
        <label className="field">
          <span>Имя файла</span>
          <input
            type="text"
            value={formData.fileInfo.fileName}
            onChange={event =>
              onChange("fileInfo.fileName", event.target.value)
            }
            required
          />
        </label>

        <label className="field">
          <span>Расширение</span>
          <input
            type="text"
            value={formData.fileInfo.extension}
            onChange={event =>
              onChange("fileInfo.extension", event.target.value)
            }
            required
          />
        </label>
      </div>

      <label className="field">
        <span>Путь к файлу</span>
        <input
          type="text"
          value={formData.fileInfo.filePath}
          onChange={event => onChange("fileInfo.filePath", event.target.value)}
          placeholder="/media/alerts/..."
          required
        />
      </label>

      <div className="form-grid form-grid-three">
        <label className="field">
          <span>Тип файла</span>
          <select
            value={formData.fileInfo.type}
            onChange={event =>
              onChange(
                "fileInfo.type",
                event.target.value as MediaFileInfoTypeEnum
              )
            }
          >
            {mediaInfoFileTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Локальный файл</span>
          <select
            value={formData.fileInfo.isLocalFile ? "true" : "false"}
            onChange={event =>
              onChange("fileInfo.isLocalFile", event.target.value === "true")
            }
          >
            <option value="true">Да</option>
            <option value="false">Нет</option>
          </select>
        </label>

        <label className="field">
          <span>Формат preview</span>
          <input type="text" value={formData.fileInfo.extension} disabled />
        </label>
      </div>
    </section>

    <section className="form-section-card">
      <div className="section-heading">
        <h2>Позиция и размер</h2>
        <p>Координаты, масштаб и флаги поведения.</p>
      </div>

      <div className="form-grid form-grid-four">
        <label className="field">
          <span>X</span>
          <input
            type="number"
            value={formData.positionInfo.xCoordinate}
            onChange={event =>
              onChange("positionInfo.xCoordinate", Number(event.target.value))
            }
          />
        </label>

        <label className="field">
          <span>Y</span>
          <input
            type="number"
            value={formData.positionInfo.yCoordinate}
            onChange={event =>
              onChange("positionInfo.yCoordinate", Number(event.target.value))
            }
          />
        </label>

        <label className="field">
          <span>Ширина</span>
          <input
            type="number"
            value={formData.positionInfo.width}
            onChange={event =>
              onChange("positionInfo.width", Number(event.target.value))
            }
          />
        </label>

        <label className="field">
          <span>Высота</span>
          <input
            type="number"
            value={formData.positionInfo.height}
            onChange={event =>
              onChange("positionInfo.height", Number(event.target.value))
            }
          />
        </label>
      </div>

      <div className="form-grid form-grid-three">
        <label className="field">
          <span>Поворот</span>
          <input
            type="number"
            value={formData.positionInfo.rotation}
            onChange={event =>
              onChange("positionInfo.rotation", Number(event.target.value))
            }
          />
        </label>

        <label className="field">
          <span>Рандомные координаты</span>
          <select
            value={formData.positionInfo.randomCoordinates ? "true" : "false"}
            onChange={event =>
              onChange(
                "positionInfo.randomCoordinates",
                event.target.value === "true"
              )
            }
          >
            <option value="true">Да</option>
            <option value="false">Нет</option>
          </select>
        </label>

        <label className="field">
          <span>Пропорционально</span>
          <select
            value={formData.positionInfo.isProportion ? "true" : "false"}
            onChange={event =>
              onChange(
                "positionInfo.isProportion",
                event.target.value === "true"
              )
            }
          >
            <option value="true">Да</option>
            <option value="false">Нет</option>
          </select>
        </label>
      </div>

      <div className="toggle-grid">
        <label className="toggle-field">
          <input
            type="checkbox"
            checked={formData.positionInfo.isRotated}
            onChange={event =>
              onChange("positionInfo.isRotated", event.target.checked)
            }
          />
          <span>Рандомный поворот</span>
        </label>

        <label className="toggle-field">
          <input
            type="checkbox"
            checked={formData.positionInfo.isResizeRequires}
            onChange={event =>
              onChange("positionInfo.isResizeRequires", event.target.checked)
            }
          />
          <span>Требует ресайз</span>
        </label>

        <label className="toggle-field">
          <input
            type="checkbox"
            checked={formData.positionInfo.isHorizontalCenter}
            onChange={event =>
              onChange("positionInfo.isHorizontalCenter", event.target.checked)
            }
          />
          <span>Центр по горизонтали</span>
        </label>

        <label className="toggle-field">
          <input
            type="checkbox"
            checked={formData.positionInfo.isVerticallCenter}
            onChange={event =>
              onChange("positionInfo.isVerticallCenter", event.target.checked)
            }
          />
          <span>Центр по вертикали</span>
        </label>

        <label className="toggle-field">
          <input
            type="checkbox"
            checked={formData.positionInfo.isUseOriginalWidthAndHeight}
            onChange={event =>
              onChange(
                "positionInfo.isUseOriginalWidthAndHeight",
                event.target.checked
              )
            }
          />
          <span>Оригинальный размер</span>
        </label>
      </div>
    </section>

    <section className="form-section-card">
      <div className="section-heading">
        <h2>Поведение</h2>
        <p>Длительность, приоритет, громкость и флаги отображения.</p>
      </div>

      <div className="form-grid form-grid-three">
        <label className="field">
          <span>Длительность, сек</span>
          <input
            type="number"
            min={1}
            max={3600}
            value={formData.metaInfo.duration}
            onChange={event =>
              onChange("metaInfo.duration", Number(event.target.value))
            }
          />
        </label>

        <label className="field">
          <span>Приоритет</span>
          <select
            value={formData.metaInfo.priority}
            onChange={event =>
              onChange(
                "metaInfo.priority",
                event.target.value as MediaMetaInfoPriorityEnum
              )
            }
          >
            {mediaInfoPriorities.map(priority => (
              <option key={priority} value={priority}>
                {priority}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span>Громкость</span>
          <input
            type="number"
            min={0}
            max={100}
            value={formData.metaInfo.volume}
            onChange={event =>
              onChange("metaInfo.volume", Number(event.target.value))
            }
          />
        </label>
      </div>

      <div className="toggle-grid">
        <label className="toggle-field">
          <input
            type="checkbox"
            checked={formData.metaInfo.isLooped}
            onChange={event =>
              onChange("metaInfo.isLooped", event.target.checked)
            }
          />
          <span>Зациклить</span>
        </label>

        <label className="toggle-field">
          <input
            type="checkbox"
            checked={formData.metaInfo.vip}
            onChange={event => onChange("metaInfo.vip", event.target.checked)}
          />
          <span>VIP</span>
        </label>
      </div>
    </section>

    <section className="form-section-card">
      <div className="section-heading">
        <h2>Стили</h2>
        <p>Визуальные флаги для рамки и letterbox.</p>
      </div>

      <div className="toggle-grid">
        <label className="toggle-field">
          <input
            type="checkbox"
            checked={formData.stylesInfo.isBorder}
            onChange={event =>
              onChange("stylesInfo.isBorder", event.target.checked)
            }
          />
          <span>Рамка</span>
        </label>

        <label className="toggle-field">
          <input
            type="checkbox"
            checked={formData.stylesInfo.isShowLetterbox}
            onChange={event =>
              onChange("stylesInfo.isShowLetterbox", event.target.checked)
            }
          />
          <span>Letterbox</span>
        </label>
      </div>
    </section>
  </div>
);
