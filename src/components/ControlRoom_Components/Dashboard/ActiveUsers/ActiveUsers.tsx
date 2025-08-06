import React from "react";

import styles from "./ActiveUsers.module.scss";

const ActiveUsers: React.FC = () => {
  const users = [
    {
      id: 1,
      name: "Алексей Петров",
      status: "online",
      lastActivity: "2 мин назад",
      avatar: "👤",
    },
    {
      id: 2,
      name: "Мария Сидорова",
      status: "online",
      lastActivity: "5 мин назад",
      avatar: "👤",
    },
    {
      id: 3,
      name: "Дмитрий Козлов",
      status: "away",
      lastActivity: "15 мин назад",
      avatar: "👤",
    },
    {
      id: 4,
      name: "Анна Волкова",
      status: "online",
      lastActivity: "1 мин назад",
      avatar: "👤",
    },
    {
      id: 5,
      name: "Сергей Морозов",
      status: "offline",
      lastActivity: "1 час назад",
      avatar: "👤",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return styles.online;
      case "away":
        return styles.away;
      case "offline":
        return styles.offline;
      default:
        return styles.offline;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "В сети";
      case "away":
        return "Отошел";
      case "offline":
        return "Не в сети";
      default:
        return "Неизвестно";
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Активные пользователи</h3>
        <div className={styles.count}>{users.length} пользователей</div>
      </div>

      <div className={styles.users}>
        {users.map(user => (
          <div key={user.id} className={styles.user}>
            <div className={styles.userInfo}>
              <div className={styles.avatar}>{user.avatar}</div>
              <div className={styles.details}>
                <div className={styles.name}>{user.name}</div>
                <div className={styles.lastActivity}>{user.lastActivity}</div>
              </div>
            </div>
            <div className={`${styles.status} ${getStatusColor(user.status)}`}>
              <span className={styles.statusDot}></span>
              <span className={styles.statusText}>
                {getStatusText(user.status)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.footer}>
        <button className={styles.viewAllButton}>
          Посмотреть всех пользователей
        </button>
      </div>
    </div>
  );
};

export default ActiveUsers;
