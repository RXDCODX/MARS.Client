import { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./DocsPage.module.scss";

const DocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("getting-started");

  const tabs = [
    { id: "getting-started", label: "Начало работы" },
    { id: "obs-components", label: "OBS Компоненты" },
    { id: "admin-panel", label: "Панель управления" },
    { id: "api", label: "API Документация" },
  ];

  const obsComponents = [
    {
      name: "Pyro Alerts",
      path: "/pyroalerts",
      description: "Красивые алерты для донатов и подписок",
      features: [
        "Настраиваемые анимации",
        "Поддержка различных платформ",
        "Кастомные звуки",
      ],
    },
    {
      name: "Waifu Alerts",
      path: "/waifu",
      description: "Алерты с аниме персонажами",
      features: [
        "Аниме персонажи",
        "Интерактивные элементы",
        "Настраиваемые реакции",
      ],
    },
    {
      name: "Chat Horizontal",
      path: "/chath",
      description: "Горизонтальный чат для стримов",
      features: [
        "Горизонтальное отображение",
        "Фильтрация сообщений",
        "Настройка стилей",
      ],
    },
    {
      name: "Chat Vertical",
      path: "/chatv",
      description: "Вертикальный чат с анимациями",
      features: [
        "Вертикальное отображение",
        "Плавные анимации",
        "Кастомные эффекты",
      ],
    },
    {
      name: "Fumo Friday",
      path: "/fumofriday",
      description: "Пятничные фумо анимации",
      features: ["Фумо персонажи", "Пятничные эффекты", "Интерактивность"],
    },
    {
      name: "Screen Particles",
      path: "/confetti",
      description: "Экранные эффекты и частицы",
      features: [
        "Конфетти эффекты",
        "Настраиваемые частицы",
        "Триггеры событий",
      ],
    },
  ];

  const renderGettingStarted = () => (
    <div className={styles.tabContent}>
      <h2>Быстрый старт</h2>
      <p>
        Добро пожаловать в документацию MARS Client! Этот раздел поможет вам
        быстро начать работу с платформой.
      </p>

      <div className={styles.stepCard}>
        <h3>Шаг 1: Установка</h3>
        <p>Скачайте и установите MARS Client на ваш компьютер.</p>
        <code>npm install mars-client</code>
      </div>

      <div className={styles.stepCard}>
        <h3>Шаг 2: Настройка OBS</h3>
        <p>Добавьте компоненты в OBS Studio как Browser Source.</p>
        <code>URL: http://localhost:3000/pyroalerts</code>
      </div>

      <div className={styles.stepCard}>
        <h3>Шаг 3: Настройка панели управления</h3>
        <p>Откройте панель управления для настройки компонентов.</p>
        <Link to="/admin" className={styles.linkButton}>
          Открыть панель управления
        </Link>
      </div>
    </div>
  );

  const renderObsComponents = () => (
    <div className={styles.tabContent}>
      <h2>OBS Компоненты</h2>
      <p>Все доступные компоненты для интеграции в OBS Studio.</p>

      <div className={styles.componentsGrid}>
        {obsComponents.map((component, index) => (
          <div key={index} className={styles.componentDocCard}>
            <h3>{component.name}</h3>
            <p>{component.description}</p>
            <ul>
              {component.features.map((feature, featureIndex) => (
                <li key={featureIndex}>{feature}</li>
              ))}
            </ul>
            <Link to={component.path} className={styles.tryButton}>
              Попробовать
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAdminPanel = () => (
    <div className={styles.tabContent}>
      <h2>Панель управления</h2>
      <p>Мощная админ-панель для управления всеми аспектами вашего стрима.</p>

      <div className={styles.adminFeatures}>
        <div className={styles.adminFeature}>
          <h3>📊 Дашборд</h3>
          <p>Мониторинг статистики и производительности в реальном времени.</p>
          <Link to="/dashboard" className={styles.linkButton}>
            Открыть дашборд
          </Link>
        </div>

        <div className={styles.adminFeature}>
          <h3>⚙️ Настройки</h3>
          <p>Конфигурация всех компонентов и интеграций.</p>
          <Link to="/admin" className={styles.linkButton}>
            Открыть настройки
          </Link>
        </div>

        <div className={styles.adminFeature}>
          <h3>🔧 Сервисы</h3>
          <p>Управление подключенными сервисами и API.</p>
          <Link to="/services" className={styles.linkButton}>
            Управление сервисами
          </Link>
        </div>
      </div>
    </div>
  );

  const renderApi = () => (
    <div className={styles.tabContent}>
      <h2>API Документация</h2>
      <p>Полная документация по API для разработчиков.</p>

      <div className={styles.apiSection}>
        <h3>Базовый URL</h3>
        <code>https://api.marsclient.com/v1</code>

        <h3>Аутентификация</h3>
        <p>Все API запросы требуют API ключ в заголовке:</p>
        <code>Authorization: Bearer YOUR_API_KEY</code>

        <h3>Примеры запросов</h3>
        <div className={styles.codeExample}>
          <h4>Получение алертов</h4>
          <code>
            GET /alerts
            <br />
            Response: {"{"}
            <br />
            &nbsp;&nbsp;"alerts": [...]
            <br />
            {"}"}
          </code>
        </div>

        <div className={styles.codeExample}>
          <h4>Создание алерта</h4>
          <code>
            POST /alerts
            <br />
            Body: {"{"}
            <br />
            &nbsp;&nbsp;"type": "donation",
            <br />
            &nbsp;&nbsp;"message": "Спасибо за донат!"
            <br />
            {"}"}
          </code>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "getting-started":
        return renderGettingStarted();
      case "obs-components":
        return renderObsComponents();
      case "admin-panel":
        return renderAdminPanel();
      case "api":
        return renderApi();
      default:
        return renderGettingStarted();
    }
  };

  return (
    <div className={styles.docsPage}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <h2>Документация</h2>
          <nav className={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className={styles.content}>{renderTabContent()}</div>
      </div>
    </div>
  );
};

export default DocsPage;
