import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import ThemeToggle from "../../../ThemeToggle";
import { useSiteColors } from "../../../../shared/Utils/useSiteColors";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(
    null,
  );
  const colors = useSiteColors();

  const sitePages = [
    { label: "Главная", path: "/" },
    { label: "О проекте", path: "/about" },
    { label: "Документация", path: "/docs" },
    { label: "Контакты", path: "/contacts" },
  ];

  const obsComponents: {
    label: string;
    children: { label: string; path: string }[];
  }[] = [
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
      ],
    },
    {
      label: "Звук",
      children: [{ label: "Текущий трек", path: "/sr/currenttrack" }],
    },
  ];

  const controlRoomPages = [
    { label: "Панель управления", path: "/admin" },
    { label: "Дашборд", path: "/dashboard" },
    { label: "Просмотр серверов", path: "/main" },
    { label: "Сервисы", path: "/services" },
  ];

  const handleDropdownToggle = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    setActiveSubDropdown(null);
  };

  const handleSubDropdownToggle = (subDropdownName: string) => {
    setActiveSubDropdown(
      activeSubDropdown === subDropdownName ? null : subDropdownName,
    );
  };

  const handleMouseLeave = () => {
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
        <Navbar.Brand as={Link} to="/" className={styles.logo} style={colors.utils.getTextStyle('primary')}>
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
                style={colors.utils.getTextStyle('primary')}
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
                    <Link
                      key={index}
                      to={item.path}
                      className={styles.dropdownItem}
                      style={colors.utils.getTextStyle('primary')}
                    >
                      {item.label}
                    </Link>
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
                style={colors.utils.getTextStyle('primary')}
              >
                OBS Компоненты <i className="bi bi-chevron-down ms-1"></i>
              </button>
              {activeDropdown === "obs" && (
                <div
                  className={styles.dropdownMenu}
                  onMouseLeave={handleMouseLeave}
                  style={{
                    backgroundColor: colors.background.card,
                    border: `1px solid ${colors.border.primary}`,
                    boxShadow: colors.shadow.medium,
                  }}
                >
                  {obsComponents.map((item, index) => (
                    <div key={index} className={styles.dropdownItem}>
                      {item.children ? (
                        <div className={styles.subDropdownContainer}>
                          <button
                            className={styles.subDropdownButton}
                            onClick={() =>
                              handleSubDropdownToggle(`obs-${index}`)
                            }
                            onMouseEnter={() =>
                              setActiveSubDropdown(`obs-${index}`)
                            }
                            style={colors.utils.getTextStyle('primary')}
                          >
                            {item.label}{" "}
                            <i className="bi bi-chevron-right ms-1"></i>
                          </button>
                          {activeSubDropdown === `obs-${index}` && (
                            <div 
                              className={styles.subDropdownMenu}
                              style={{
                                backgroundColor: colors.background.card,
                                border: `1px solid ${colors.border.primary}`,
                                boxShadow: colors.shadow.medium,
                              }}
                            >
                              {item.children.map((child, childIndex) => (
                                <Link
                                  key={childIndex}
                                  to={child.path}
                                  className={styles.subDropdownItem}
                                  style={colors.utils.getTextStyle('primary')}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link to={item.children || "#"} style={colors.utils.getTextStyle('primary')}>{item.label}</Link>
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
                style={colors.utils.getTextStyle('primary')}
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
                    <Link
                      key={index}
                      to={item.path}
                      className={styles.dropdownItem}
                      style={colors.utils.getTextStyle('primary')}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Nav>

          <Nav className="ms-auto">
            <ThemeToggle />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
