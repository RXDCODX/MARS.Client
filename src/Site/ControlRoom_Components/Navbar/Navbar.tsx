import { useState } from "react";
import { Link } from "react-router-dom";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

import styles from "./Navbar.module.scss";
import { NavbarProps } from "./Navbar.types";

interface NavItem {
  label: string;
  path?: string;
  children?: NavItem[];
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, onTabChange }) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(
    null
  );
  const colors = useSiteColors();

  const tabs = [
    { id: "dashboard", label: "Дашборд", icon: "📊" },
    { id: "servers", label: "Серверы", icon: "🖥️" },
    { id: "logs", label: "Логи", icon: "📝" },
    { id: "users", label: "Пользователи", icon: "👥" },
    { id: "performance", label: "Производительность", icon: "⚡" },
    { id: "settings", label: "Настройки", icon: "⚙️" },
  ];

  const sitePages = [
    { label: "Главная", path: "/" },
    { label: "О проекте", path: "/about" },
    { label: "Документация", path: "/docs" },
    { label: "Фреймдата", path: "/framedata" },
    { label: "Команды", path: "/commands" },
    { label: "Контакты", path: "/contacts" },
  ];

  const controlRoomPages = [
    { label: "Панель управления", path: "/admin" },
    { label: "Дашборд", path: "/dashboard" },
    { label: "Просмотр серверов", path: "/main" },
    { label: "Сервисы", path: "/services" },
  ];

  const obsComponents: NavItem[] = [
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
      ],
    },
    {
      label: "Звук",
      children: [{ label: "Текущий трек", path: "/sr/currenttrack" }],
    },
  ];

  const handleDropdownToggle = (dropdownName: string) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
    setActiveSubDropdown(null);
  };

  const handleSubDropdownToggle = (subDropdownName: string) => {
    setActiveSubDropdown(
      activeSubDropdown === subDropdownName ? null : subDropdownName
    );
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  return (
    <nav
      className={styles.navbar}
      style={{
        backgroundColor: colors.background.secondary,
        boxShadow: colors.shadow.medium,
      }}
    >
      <div className={styles.container}>
        <div
          className={styles.logo}
          style={colors.utils.getTextStyle("primary")}
        >
          <span className={styles.logoIcon}>🚀</span>
          <span className={styles.logoText}>MARS Admin</span>
        </div>

        <div className={styles.tabs}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
              onClick={() => onTabChange(tab.id)}
              style={{
                backgroundColor:
                  activeTab === tab.id
                    ? colors.background.accent
                    : colors.background.tertiary,
                color:
                  activeTab === tab.id
                    ? colors.text.light
                    : colors.text.primary,
                borderColor: colors.border.primary,
              }}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Страницы сайта */}
        <div className={styles.dropdownSection}>
          <div
            className={styles.dropdownContainer}
            onMouseEnter={() => setActiveDropdown("site")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={styles.dropdownButton}
              onClick={() => handleDropdownToggle("site")}
              style={{
                backgroundColor: colors.background.tertiary,
                color: colors.text.primary,
                borderColor: colors.border.primary,
              }}
            >
              <span className={styles.dropdownIcon}>🌐</span>
              <span className={styles.dropdownLabel}>Страницы сайта</span>
              <span className={styles.arrow}>▼</span>
            </button>
            {activeDropdown === "site" && (
              <ul
                className={styles.dropdown}
                style={{
                  backgroundColor: colors.background.card,
                  border: `1px solid ${colors.border.primary}`,
                  boxShadow: colors.shadow.medium,
                }}
              >
                {sitePages.map((item, index) => (
                  <li key={index} className={styles.dropdownItem}>
                    <Link
                      to={item.path}
                      className={styles.dropdownLink}
                      style={colors.utils.getTextStyle("primary")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* OBS Компоненты */}
        <div className={styles.dropdownSection}>
          <div
            className={styles.dropdownContainer}
            onMouseEnter={() => setActiveDropdown("obs")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={styles.dropdownButton}
              onClick={() => handleDropdownToggle("obs")}
              style={{
                backgroundColor: colors.background.tertiary,
                color: colors.text.primary,
                borderColor: colors.border.primary,
              }}
            >
              <span className={styles.dropdownIcon}>🎮</span>
              <span className={styles.dropdownLabel}>OBS Компоненты</span>
              <span className={styles.arrow}>▼</span>
            </button>
            {activeDropdown === "obs" && (
              <ul
                className={styles.dropdown}
                style={{
                  backgroundColor: colors.background.card,
                  border: `1px solid ${colors.border.primary}`,
                  boxShadow: colors.shadow.medium,
                }}
              >
                {obsComponents.map((item, index) => (
                  <li key={index} className={styles.dropdownItem}>
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
                          onClick={() =>
                            handleSubDropdownToggle(`obs-${index}`)
                          }
                          style={colors.utils.getTextStyle("primary")}
                        >
                          {item.label}
                          <span className={styles.arrow}>▶</span>
                        </button>
                        {activeSubDropdown === `obs-${index}` && (
                          <ul
                            className={styles.subDropdown}
                            style={{
                              backgroundColor: colors.background.card,
                              border: `1px solid ${colors.border.primary}`,
                              boxShadow: colors.shadow.medium,
                            }}
                          >
                            {item.children.map((child, childIndex) => (
                              <li
                                key={childIndex}
                                className={styles.subDropdownItem}
                              >
                                <Link
                                  to={child.path || "#"}
                                  className={styles.subDropdownLink}
                                  style={colors.utils.getTextStyle("primary")}
                                >
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link
                        to={item.path || "#"}
                        className={styles.dropdownLink}
                        style={colors.utils.getTextStyle("primary")}
                      >
                        {item.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Панель управления */}
        <div className={styles.dropdownSection}>
          <div
            className={styles.dropdownContainer}
            onMouseEnter={() => setActiveDropdown("control")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={styles.dropdownButton}
              onClick={() => handleDropdownToggle("control")}
              style={{
                backgroundColor: colors.background.tertiary,
                color: colors.text.primary,
                borderColor: colors.border.primary,
              }}
            >
              <span className={styles.dropdownIcon}>⚙️</span>
              <span className={styles.dropdownLabel}>Панель управления</span>
              <span className={styles.arrow}>▼</span>
            </button>
            {activeDropdown === "control" && (
              <ul
                className={styles.dropdown}
                style={{
                  backgroundColor: colors.background.card,
                  border: `1px solid ${colors.border.primary}`,
                  boxShadow: colors.shadow.medium,
                }}
              >
                {controlRoomPages.map((item, index) => (
                  <li key={index} className={styles.dropdownItem}>
                    <Link
                      to={item.path}
                      className={styles.dropdownLink}
                      style={colors.utils.getTextStyle("primary")}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div
          className={styles.userInfo}
          style={{
            backgroundColor: colors.background.tertiary,
            color: colors.text.primary,
            borderColor: colors.border.primary,
          }}
        >
          <span className={styles.userIcon}>👤</span>
          <span className={styles.userName}>Администратор</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
