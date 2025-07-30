import React, { useState } from 'react';
import { AdminPanelProps } from './AdminPanel.types';
import styles from './AdminPanel.module.scss';
import Navbar from '../Navbar/Navbar';
import Dashboard from '../Dashboard/Dashboard';

const AdminPanel: React.FC<AdminPanelProps> = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'servers':
        return (
          <div className={styles.placeholder}>
            <h2>🖥️ Управление серверами</h2>
            <p>Здесь будет интерфейс для управления серверами</p>
          </div>
        );
      case 'logs':
        return (
          <div className={styles.placeholder}>
            <h2>📝 Системные логи</h2>
            <p>Здесь будет детальный просмотр логов</p>
          </div>
        );
      case 'users':
        return (
          <div className={styles.placeholder}>
            <h2>👥 Управление пользователями</h2>
            <p>Здесь будет интерфейс для управления пользователями</p>
          </div>
        );
      case 'performance':
        return (
          <div className={styles.placeholder}>
            <h2>⚡ Детальная производительность</h2>
            <p>Здесь будут расширенные метрики производительности</p>
          </div>
        );
      case 'settings':
        return (
          <div className={styles.placeholder}>
            <h2>⚙️ Настройки системы</h2>
            <p>Здесь будут настройки админ панели</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={styles.adminPanel}>
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className={styles.content}>
        {renderContent()}
      </main>
    </div>
  );
};

export default AdminPanel; 