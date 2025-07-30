import React from 'react';
import styles from './SystemStatus.module.scss';

const SystemStatus: React.FC = () => {
  const services = [
    { name: 'Web API', status: 'online', uptime: '2д 14ч 32м' },
    { name: 'Database', status: 'online', uptime: '5д 8ч 15м' },
    { name: 'Redis Cache', status: 'online', uptime: '1д 22ч 8м' },
    { name: 'File Storage', status: 'online', uptime: '3д 6ч 45м' },
    { name: 'Email Service', status: 'warning', uptime: '12ч 30м' },
    { name: 'Background Jobs', status: 'online', uptime: '4д 1ч 20м' }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online':
        return '🟢';
      case 'warning':
        return '🟡';
      case 'error':
        return '🔴';
      default:
        return '⚪';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online':
        return styles.online;
      case 'warning':
        return styles.warning;
      case 'error':
        return styles.error;
      default:
        return styles.offline;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Статус сервисов</h3>
        <div className={styles.lastUpdate}>
          Обновлено: {new Date().toLocaleTimeString('ru-RU')}
        </div>
      </div>
      
      <div className={styles.services}>
        {services.map((service, index) => (
          <div key={index} className={styles.service}>
            <div className={styles.serviceInfo}>
              <div className={styles.serviceName}>{service.name}</div>
              <div className={styles.serviceUptime}>Uptime: {service.uptime}</div>
            </div>
            <div className={`${styles.status} ${getStatusColor(service.status)}`}>
              <span className={styles.statusIcon}>{getStatusIcon(service.status)}</span>
              <span className={styles.statusText}>
                {service.status === 'online' ? 'Работает' : 
                 service.status === 'warning' ? 'Предупреждение' : 'Ошибка'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemStatus; 