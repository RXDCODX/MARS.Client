import { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import ThemeToggle from "../../../ThemeToggle";
import styles from "./Header.module.scss";

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(
    null,
  );

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
      bg="primary"
      variant="dark"
      expand="lg"
      className={styles.header}
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className={styles.logo}>
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
              >
                Страницы сайта <i className="bi bi-chevron-down ms-1"></i>
              </button>
              {activeDropdown === "site" && (
                <div
                  className={styles.dropdownMenu}
                  onMouseLeave={handleMouseLeave}
                >
                  {sitePages.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={styles.dropdownItem}
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
              >
                OBS Компоненты <i className="bi bi-chevron-down ms-1"></i>
              </button>
              {activeDropdown === "obs" && (
                <div
                  className={styles.dropdownMenu}
                  onMouseLeave={handleMouseLeave}
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
                          >
                            {item.label}{" "}
                            <i className="bi bi-chevron-right ms-1"></i>
                          </button>
                          {activeSubDropdown === `obs-${index}` && (
                            <div className={styles.subDropdownMenu}>
                              {item.children.map((child, childIndex) => (
                                <Link
                                  key={childIndex}
                                  to={child.path}
                                  className={styles.subDropdownItem}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <Link to={item.children || "#"}>{item.label}</Link>
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
              >
                Панель управления <i className="bi bi-chevron-down ms-1"></i>
              </button>
              {activeDropdown === "control" && (
                <div
                  className={styles.dropdownMenu}
                  onMouseLeave={handleMouseLeave}
                >
                  {controlRoomPages.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className={styles.dropdownItem}
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
