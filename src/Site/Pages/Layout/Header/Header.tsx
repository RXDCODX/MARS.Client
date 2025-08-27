import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import ThemeToggle from "@/components/ThemeToggle";
import { useSiteColors } from "@/shared/Utils/useSiteColors";

import styles from "./Header.module.scss";

// Интерфейсы для типизации навигации
interface NavigationItem {
  label: string;
  path: string;
}

interface NavigationGroup {
  label: string;
  children: NavigationItem[];
}

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(
    null
  );
  const colors = useSiteColors();

  const sitePages: NavigationItem[] = [
    { label: "Главная", path: "/" },
    { label: "О проекте", path: "/about" },
    { label: "Документация", path: "/docs" },
    { label: "Команды", path: "/commands" },
    { label: "Контакты", path: "/contacts" },
    { label: "Управление алертами", path: "/media-info" },
    { label: "Cinema Queue", path: "/cinema-queue" },
    { label: "ADHD News", path: "/adhd" },
  ];

  const framedataPages: NavigationItem[] = [
    {
      label: "Просмотр фреймдаты",
      path: "/framedata",
    },
    {
      label: "Изменения",
      path: "/framedata/pending",
    },
  ];

  const obsComponents: NavigationGroup[] = [
    {
      label: "Чат",
      children: [
        { label: "Горизонтальный чат", path: "/chath" },
        { label: "Вертикальный чат", path: "/chatv" },
      ],
    },
    {
      label: "Алерты",
      children: [
        { label: "Pyro Alerts", path: "/pyroalerts" },
        { label: "Waifu Alerts", path: "/waifu" },
        { label: "Highlight Message", path: "/highlite" },
        { label: "Auto Message Billboard", path: "/automessage" },
      ],
    },
    {
      label: "Развлечения",
      children: [
        { label: "Fumo Friday", path: "/fumofriday" },
        { label: "Random Mem", path: "/randommem" },
        { label: "Экранные частицы", path: "/confetti" },
        { label: "AFK Screen", path: "/afkscreen" },
        { label: "ADHD Controller", path: "/adhd" },
      ],
    },
    {
      label: "Звук",
      children: [{ label: "Текущий трек", path: "/sr/currenttrack" }],
    },
  ];

  const controlRoomPages: NavigationItem[] = [
    { label: "Панель управления", path: "/admin" },
    { label: "Дашборд", path: "/dashboard" },
    { label: "Просмотр серверов", path: "/main" },
    { label: "Сервисы", path: "/services" },
    { label: "Бекапы", path: "/backups" },
  ];

  const handleDropdownToggle = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    setActiveSubDropdown(null);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  const handleMainDropdownMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  return (
    <Navbar
      expand="lg"
      className={styles.header}
      sticky="top"
      style={{
        backgroundColor: colors.background.secondary,
        borderBottom: `1px solid ${colors.border.primary}`,
        boxShadow: colors.shadow.medium,
      }}
    >
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className={styles.logo}
          style={colors.utils.getTextStyle("primary")}
        >
          <i className="bi bi-rocket-takeoff me-2"></i>
          MARS Client
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* Страницы сайта */}
            <div className={styles.dropdownContainer}>
              <button
                className={styles.dropdownButton}
                onClick={() => handleDropdownToggle("site")}
                onMouseEnter={() => setActiveDropdown("site")}
                style={colors.utils.getTextStyle("primary")}
              >
                Страницы сайта <i className="bi bi-chevron-down ms-1"></i>
              </button>
              {activeDropdown === "site" && (
                <div
                  className={styles.dropdownMenu}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundColor: colors.background.card,
                    border: `1px solid ${colors.border.primary}`,
                    boxShadow: colors.shadow.medium,
                  }}
                >
                  {sitePages.map((item, index) => (
                    <div key={index} className={styles.dropdownItem}>
                      <Link
                        to={item.path}
                        onClick={handleLinkClick}
                        style={colors.utils.getTextStyle("primary")}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Фреймдата */}
            <div className={styles.dropdownContainer}>
              <button
                className={styles.dropdownButton}
                onClick={() => handleDropdownToggle("framedata")}
                onMouseEnter={() => setActiveDropdown("framedata")}
                style={colors.utils.getTextStyle("primary")}
              >
                Фреймдата <i className="bi bi-chevron-down ms-1"></i>
              </button>
              {activeDropdown === "framedata" && (
                <div
                  className={styles.dropdownMenu}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundColor: colors.background.card,
                    border: `1px solid ${colors.border.primary}`,
                    boxShadow: colors.shadow.medium,
                  }}
                >
                  {framedataPages.map((item, index) => (
                    <div key={index} className={styles.dropdownItem}>
                      <Link
                        to={item.path}
                        onClick={handleLinkClick}
                        style={colors.utils.getTextStyle("primary")}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* OBS Компоненты */}
            <div className={styles.dropdownContainer}>
              <button
                className={styles.dropdownButton}
                onClick={() => handleDropdownToggle("obs")}
                onMouseEnter={() => setActiveDropdown("obs")}
                style={colors.utils.getTextStyle("primary")}
              >
                OBS Компоненты <i className="bi bi-chevron-down ms-1"></i>
              </button>
              {activeDropdown === "obs" && (
                <div
                  className={styles.dropdownMenu}
                  onMouseLeave={handleMainDropdownMouseLeave}
                  style={{
                    backgroundColor: colors.background.card,
                    border: `1px solid ${colors.border.primary}`,
                    boxShadow: colors.shadow.medium,
                  }}
                >
                  {obsComponents.map((item, index) => (
                    <div key={index} className={styles.dropdownItem}>
                      {item.children ? (
                        <div
                          className={styles.subDropdownContainer}
                          onMouseEnter={() =>
                            setActiveSubDropdown(`obs-${index}`)
                          }
                          onMouseLeave={() => setActiveSubDropdown(null)}
                        >
                          <button
                            className={styles.subDropdownButton}
                            onMouseEnter={() =>
                              setActiveSubDropdown(`obs-${index}`)
                            }
                            style={colors.utils.getTextStyle("primary")}
                          >
                            {item.label}{" "}
                            <i className="bi bi-chevron-right ms-1"></i>
                          </button>
                          {activeSubDropdown === `obs-${index}` && (
                            <div
                              className={styles.subDropdownMenu}
                              onMouseEnter={() =>
                                setActiveSubDropdown(`obs-${index}`)
                              }
                              onMouseLeave={() => setActiveSubDropdown(null)}
                              style={{
                                backgroundColor: colors.background.card,
                                border: `1px solid ${colors.border.primary}`,
                                boxShadow: colors.shadow.medium,
                              }}
                            >
                              {item.children.map((child, childIndex) => (
                                <div
                                  key={childIndex}
                                  className={styles.subDropdownItem}
                                >
                                  <Link
                                    to={child.path}
                                    onClick={handleLinkClick}
                                    style={colors.utils.getTextStyle("primary")}
                                  >
                                    {child.label}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link
                          to="#"
                          onClick={handleLinkClick}
                          style={colors.utils.getTextStyle("primary")}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Панель управления */}
            <div className={styles.dropdownContainer}>
              <button
                className={styles.dropdownButton}
                onClick={() => handleDropdownToggle("control")}
                onMouseEnter={() => setActiveDropdown("control")}
                style={colors.utils.getTextStyle("primary")}
              >
                Панель управления <i className="bi bi-chevron-down ms-1"></i>
              </button>
              {activeDropdown === "control" && (
                <div
                  className={styles.dropdownMenu}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundColor: colors.background.card,
                    border: `1px solid ${colors.border.primary}`,
                    boxShadow: colors.shadow.medium,
                  }}
                >
                  {controlRoomPages.map((item, index) => (
                    <div key={index} className={styles.dropdownItem}>
                      <Link
                        to={item.path}
                        onClick={handleLinkClick}
                        style={colors.utils.getTextStyle("primary")}
                      >
                        {item.label}
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Nav>

          <Nav className="ms-auto">
            <ThemeToggle />

            {/* Иконка для перехода на /ui */}
            <Nav.Link
              as={Link}
              to="/ui"
              className="ms-3"
              style={{
                ...colors.utils.getTextStyle("primary"),
                fontSize: "1.2rem",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "40px",
                height: "40px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
              }}
              title="Перейти на /ui"
              href="/ui"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="bi bi-layers" />
            </Nav.Link>

            {/* Иконка для перехода на /static с релоудом */}
            <Nav.Link
              className="ms-2"
              style={{
                ...colors.utils.getTextStyle("primary"),
                fontSize: "1.2rem",
                padding: "0.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "40px",
                height: "40px",
                borderRadius: "8px",
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              title="Перейти на /static с обновлением страницы"
              href="/static"
              as={Link}
              to="/static"
              rel="noopener noreferrer"
              target="_blank"
            >
              <i className="bi bi-arrow-clockwise" />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
