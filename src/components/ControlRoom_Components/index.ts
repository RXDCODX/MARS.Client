export { default as AdminPanel } from './AdminPanel/AdminPanel';
export { default as Navbar } from './Navbar/Navbar';
export { default as Dashboard } from './Dashboard/Dashboard';
export { default as MetricCard } from './Dashboard/MetricCard/MetricCard';
export { default as SystemStatus } from './Dashboard/SystemStatus/SystemStatus';
export { default as PerformanceChart } from './Dashboard/PerformanceChart/PerformanceChart';
export { default as ActiveUsers } from './Dashboard/ActiveUsers/ActiveUsers';
export { default as RecentLogs } from './Dashboard/RecentLogs/RecentLogs';

// Экспорт типов
export type { AdminPanelProps } from './AdminPanel/AdminPanel.types';
export type { NavbarProps, TabItem } from './Navbar/Navbar.types';
export type { DashboardProps, Metrics } from './Dashboard/Dashboard.types';
export type { MetricCardProps } from './Dashboard/MetricCard/MetricCard.types'; 