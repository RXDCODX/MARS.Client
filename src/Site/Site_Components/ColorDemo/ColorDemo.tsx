import React from "react";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

import styles from "./ColorDemo.module.scss";

/**
 * Демонстрационный компонент для показа использования глобальных цветовых переменных
 */
const ColorDemo: React.FC = () => {
  const colors = useSiteColors();

  return (
    <div className={styles.colorDemo} style={colors.utils.getCardStyle()}>
      <h2 style={colors.utils.getTextStyle("primary")}>
        Демонстрация глобальных цветовых переменных
      </h2>

      <div className={styles.section}>
        <h3 style={colors.utils.getTextStyle("secondary")}>Цвета текста</h3>
        <div className={styles.colorGrid}>
          <div style={colors.utils.getTextStyle("primary")}>Primary текст</div>
          <div style={colors.utils.getTextStyle("secondary")}>
            Secondary текст
          </div>
          <div style={colors.utils.getTextStyle("muted")}>Muted текст</div>
          <div style={colors.utils.getTextStyle("accent")}>Accent текст</div>
          <div style={colors.utils.getTextStyle("success")}>Success текст</div>
          <div style={colors.utils.getTextStyle("warning")}>Warning текст</div>
          <div style={colors.utils.getTextStyle("danger")}>Danger текст</div>
          <div style={colors.utils.getTextStyle("info")}>Info текст</div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 style={colors.utils.getTextStyle("secondary")}>Цвета фонов</h3>
        <div className={styles.colorGrid}>
          <div
            style={colors.utils.getBackgroundStyle("primary")}
            className={styles.colorBox}
          >
            Primary фон
          </div>
          <div
            style={colors.utils.getBackgroundStyle("secondary")}
            className={styles.colorBox}
          >
            Secondary фон
          </div>
          <div
            style={colors.utils.getBackgroundStyle("tertiary")}
            className={styles.colorBox}
          >
            Tertiary фон
          </div>
          <div
            style={colors.utils.getBackgroundStyle("accent")}
            className={styles.colorBox}
          >
            Accent фон
          </div>
          <div
            style={colors.utils.getBackgroundStyle("success")}
            className={styles.colorBox}
          >
            Success фон
          </div>
          <div
            style={colors.utils.getBackgroundStyle("warning")}
            className={styles.colorBox}
          >
            Warning фон
          </div>
          <div
            style={colors.utils.getBackgroundStyle("danger")}
            className={styles.colorBox}
          >
            Danger фон
          </div>
          <div
            style={colors.utils.getBackgroundStyle("info")}
            className={styles.colorBox}
          >
            Info фон
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 style={colors.utils.getTextStyle("secondary")}>Кнопки</h3>
        <div className={styles.buttonGrid}>
          <button
            style={colors.utils.getButtonStyle("primary")}
            className={styles.button}
          >
            Primary кнопка
          </button>
          <button
            style={colors.utils.getButtonStyle("secondary")}
            className={styles.button}
          >
            Secondary кнопка
          </button>
          <button
            style={colors.utils.getButtonStyle("success")}
            className={styles.button}
          >
            Success кнопка
          </button>
          <button
            style={colors.utils.getButtonStyle("warning")}
            className={styles.button}
          >
            Warning кнопка
          </button>
          <button
            style={colors.utils.getButtonStyle("danger")}
            className={styles.button}
          >
            Danger кнопка
          </button>
          <button
            style={colors.utils.getButtonStyle("info")}
            className={styles.button}
          >
            Info кнопка
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h3 style={colors.utils.getTextStyle("secondary")}>Тени</h3>
        <div className={styles.shadowGrid}>
          <div
            style={colors.utils.getShadowStyle("light")}
            className={styles.shadowBox}
          >
            Легкая тень
          </div>
          <div
            style={colors.utils.getShadowStyle("medium")}
            className={styles.shadowBox}
          >
            Средняя тень
          </div>
          <div
            style={colors.utils.getShadowStyle("heavy")}
            className={styles.shadowBox}
          >
            Тяжелая тень
          </div>
          <div
            style={colors.utils.getShadowStyle("inset")}
            className={styles.shadowBox}
          >
            Внутренняя тень
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 style={colors.utils.getTextStyle("secondary")}>CSS классы</h3>
        <div className={styles.cssClassGrid}>
          <div className="site-text-primary">site-text-primary</div>
          <div className="site-text-secondary">site-text-secondary</div>
          <div className="site-text-muted">site-text-muted</div>
          <div className="site-text-accent">site-text-accent</div>
          <div className="site-bg-primary site-text-light">site-bg-primary</div>
          <div className="site-bg-secondary site-text-light">
            site-bg-secondary
          </div>
          <div
            className="site-bg-card site-border-primary site-shadow-light"
            style={{ padding: "10px", border: "1px solid" }}
          >
            site-bg-card + site-border-primary + site-shadow-light
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h3 style={colors.utils.getTextStyle("secondary")}>Текущая тема</h3>
        <div
          style={colors.utils.getBackgroundStyle("secondary")}
          className={styles.themeInfo}
        >
          <p style={colors.utils.getTextStyle("primary")}>
            Текущая тема: <strong>{colors.theme}</strong>
          </p>
          <p style={colors.utils.getTextStyle("muted")}>
            Все цвета автоматически адаптируются к теме
          </p>
        </div>
      </div>
    </div>
  );
};

export default ColorDemo;
