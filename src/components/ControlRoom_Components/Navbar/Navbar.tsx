import { useState } from "react";
import { Link } from "react-router-dom";

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
    null,
  );

  const tabs = [
    { id: "dashboard", label: "Дашборд", icon: "📊" },
    { id: "servers", label: "Серверы", icon: "🖥️" },
    { id: "logs", label: "Логи", icon: "📝" },
    { id: "users", label: "Пользователи", icon: "👥" },
    { id: "performance", label: "Производительность", icon: "⚡" },
    { id: "settings", label: "Настройки", icon: "⚙️" },
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
      activeSubDropdown === subDropdownName ? null : subDropdownName,
    );
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
    setActiveSubDropdown(null);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>🚀</span>
          <span className={styles.logoText}>MARS Admin</span>
        </div>

        <div className={styles.tabs}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ""}`}
              onClick={() => onTabChange(tab.id)}
            >
              <span className={styles.tabIcon}>{tab.icon}</span>
              <span className={styles.tabLabel}>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* OBS Компоненты */}
        <div className={styles.obsSection}>
          <div
            className={styles.obsDropdown}
            onMouseEnter={() => setActiveDropdown("obs")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={styles.obsButton}
              onClick={() => handleDropdownToggle("obs")}
            >
              <span className={styles.obsIcon}>🎮</span>
              <span className={styles.obsLabel}>OBS Компоненты</span>
              <span className={styles.arrow}>▼</span>
            </button>
            {activeDropdown === "obs" && (
              <ul className={styles.dropdown}>
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
                        >
                          {item.label}
                          <span className={styles.arrow}>▶</span>
                        </button>
                        {activeSubDropdown === `obs-${index}` && (
                          <ul className={styles.subDropdown}>
                            {item.children.map((child, childIndex) => (
                              <li
                                key={childIndex}
                                className={styles.subDropdownItem}
                              >
                                <Link
                                  to={child.path || "#"}
                                  className={styles.subDropdownLink}
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

        <div className={styles.userInfo}>
          <span className={styles.userIcon}>👤</span>
          <span className={styles.userName}>Администратор</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
