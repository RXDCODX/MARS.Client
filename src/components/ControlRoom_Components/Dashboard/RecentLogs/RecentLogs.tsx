import React from "react";

import styles from "./RecentLogs.module.scss";

const RecentLogs: React.FC = () => {
  const logs = [
    {
      id: 1,
      level: "info",
      message: "Пользователь успешно авторизован",
      timestamp: "2 мин назад",
      service: "Auth",
    },
    {
      id: 2,
      level: "warning",
      message: "Высокое использование памяти",
      timestamp: "5 мин назад",
      service: "System",
    },
    {
      id: 3,
      level: "error",
      message: "Ошибка подключения к базе данных",
      timestamp: "8 мин назад",
      service: "Database",
    },
    {
      id: 4,
      level: "info",
      message: "Новый файл загружен",
      timestamp: "12 мин назад",
      service: "FileService",
    },
    {
      id: 5,
      level: "info",
      message: "Запрос обработан успешно",
      timestamp: "15 мин назад",
      service: "API",
    },
  ];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "info":
        return "ℹ️";
      case "warning":
        return "⚠️";
      case "error":
        return "❌";
      case "debug":
        return "🐛";
      default:
        return "📝";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "info":
        return styles.info;
      case "warning":
        return styles.warning;
      case "error":
        return styles.error;
      case "debug":
        return styles.debug;
      default:
        return styles.info;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Последние логи</h3>
        <button className={styles.refreshButton}>🔄 Обновить</button>
      </div>

      <div className={styles.logs}>
        {logs.map(log => (
          <div
            key={log.id}
            className={`${styles.log} ${getLevelColor(log.level)}`}
          >
            <div className={styles.logHeader}>
              <div className={styles.logIcon}>{getLevelIcon(log.level)}</div>
              <div className={styles.logInfo}>
                <div className={styles.logService}>{log.service}</div>
                <div className={styles.logTimestamp}>{log.timestamp}</div>
              </div>
            </div>
            <div className={styles.logMessage}>{log.message}</div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.viewAllButton}>Просмотреть все логи</button>
      </div>
    </div>
  );
};

export default RecentLogs;
