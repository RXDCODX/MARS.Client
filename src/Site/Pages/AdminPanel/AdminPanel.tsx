import React, { useState } from "react";
import { Container, Nav, Navbar as BootstrapNavbar } from "react-bootstrap";

import Dashboard from "../Dashboard/Dashboard";
import styles from "./AdminPanel.module.scss";
import { AdminPanelProps } from "./AdminPanel.types";

const AdminPanel: React.FC<AdminPanelProps> = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />;
      case "servers":
        return (
          <div className={styles.placeholder}>
            <h2>🖥️ Управление серверами</h2>
            <p>Здесь будет интерфейс для управления серверами</p>
          </div>
        );
      case "logs":
        return (
          <div className={styles.placeholder}>
            <h2>📝 Системные логи</h2>
            <p>Здесь будет детальный просмотр логов</p>
          </div>
        );
      case "users":
        return (
          <div className={styles.placeholder}>
            <h2>👥 Управление пользователями</h2>
            <p>Здесь будет интерфейс для управления пользователями</p>
          </div>
        );
      case "performance":
        return (
          <div className={styles.placeholder}>
            <h2>⚡ Детальная производительность</h2>
            <p>Здесь будут расширенные метрики производительности</p>
          </div>
        );
      case "settings":
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
      <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="mb-3">
        <Container>
          <BootstrapNavbar.Brand>Админ панель</BootstrapNavbar.Brand>
          <BootstrapNavbar.Toggle aria-controls="admin-navbar-nav" />
          <BootstrapNavbar.Collapse id="admin-navbar-nav">
            <Nav
              className="me-auto"
              activeKey={activeTab}
              onSelect={k => setActiveTab(k || "dashboard")}
            >
              <Nav.Link eventKey="dashboard">Дашборд</Nav.Link>
              <Nav.Link eventKey="servers">Серверы</Nav.Link>
              <Nav.Link eventKey="logs">Логи</Nav.Link>
              <Nav.Link eventKey="users">Пользователи</Nav.Link>
              <Nav.Link eventKey="performance">Производительность</Nav.Link>
              <Nav.Link eventKey="settings">Настройки</Nav.Link>
            </Nav>
          </BootstrapNavbar.Collapse>
        </Container>
      </BootstrapNavbar>
      <main className={styles.content}>{renderContent()}</main>
    </div>
  );
};

export default AdminPanel;
