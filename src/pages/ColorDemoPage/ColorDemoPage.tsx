import ColorDemo from "../../components/Site_Components/ColorDemo/ColorDemo";
import { useSiteColors } from "../../shared/Utils/useSiteColors";
import styles from "./ColorDemoPage.module.scss";

/**
 * Страница для демонстрации глобальных цветовых переменных
 */
const ColorDemoPage: React.FC = () => {
  const colors = useSiteColors();

  return (
    <div className={styles.colorDemoPage}>
      <div className={styles.header} style={colors.utils.getCardStyle()}>
        <h1 style={colors.utils.getTextStyle("primary")}>
          Глобальные цветовые переменные
        </h1>
        <p style={colors.utils.getTextStyle("secondary")}>
          Демонстрация системы глобальных цветовых переменных, которые
          автоматически адаптируются к теме
        </p>
        <div className={styles.themeInfo}>
          <span style={colors.utils.getTextStyle("muted")}>
            Текущая тема: <strong>{colors.theme}</strong>
          </span>
        </div>
      </div>

      <ColorDemo />

      <div className={styles.infoSection} style={colors.utils.getCardStyle()}>
        <h2 style={colors.utils.getTextStyle("primary")}>Как использовать</h2>

        <div className={styles.usageExamples}>
          <div className={styles.example}>
            <h3 style={colors.utils.getTextStyle("secondary")}>
              TypeScript хук
            </h3>
            <pre style={colors.utils.getBackgroundStyle("secondary")}>
              <code style={colors.utils.getTextStyle("primary")}>
                {`import { useSiteColors } from '../../shared/Utils/useSiteColors';

const colors = useSiteColors();

return (
  <div style={colors.utils.getCardStyle()}>
    <h1 style={colors.utils.getTextStyle('primary')}>
      Заголовок
    </h1>
  </div>
);`}
              </code>
            </pre>
          </div>

          <div className={styles.example}>
            <h3 style={colors.utils.getTextStyle("secondary")}>CSS классы</h3>
            <pre style={colors.utils.getBackgroundStyle("secondary")}>
              <code style={colors.utils.getTextStyle("primary")}>
                {`<div className="site-bg-card site-text-primary site-border-primary site-shadow-light">
  Контент
</div>`}
              </code>
            </pre>
          </div>

          <div className={styles.example}>
            <h3 style={colors.utils.getTextStyle("secondary")}>
              CSS переменные
            </h3>
            <pre style={colors.utils.getBackgroundStyle("secondary")}>
              <code style={colors.utils.getTextStyle("primary")}>
                {`.myComponent {
  color: var(--site-text-primary);
  background-color: var(--site-bg-card);
  border: 1px solid var(--site-border-primary);
  box-shadow: var(--site-shadow-light);
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorDemoPage;
