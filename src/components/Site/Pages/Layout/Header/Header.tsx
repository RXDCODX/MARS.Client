import { ChevronDown, FolderOpen, Monitor } from "lucide-react";
import { Suspense, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import ThemeToggle from "@/components/ThemeToggle";

interface NavigationItem {
  label: string;
  path: string;
  icon?: string;
}

interface NavigationGroup {
  label: string;
  icon?: string;
  children: NavigationItem[];
}

const Header: React.FC = () => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const sitePages: NavigationItem[] = [
    { label: "Главная", path: "/", icon: "🏠" },
    { label: "О проекте", path: "/about", icon: "ℹ️" },
    { label: "Документация", path: "/docs", icon: "📖" },
    { label: "Команды", path: "/commands", icon: "⌨️" },
    { label: "Контакты", path: "/contacts", icon: "📧" },
    { label: "Управление алертами", path: "/media-info", icon: "🔔" },
    { label: "Cinema Queue", path: "/cinema-queue", icon: "🎬" },
    { label: "Все маршруты", path: "/routes", icon: "🗺️" },
  ];

  const framedataPages: NavigationItem[] = [
    { label: "Просмотр фреймдаты", path: "/framedata", icon: "📊" },
    { label: "Изменения", path: "/framedata/pending", icon: "✏️" },
  ];

  const obsComponents: NavigationGroup[] = [
    {
      label: "Чат",
      icon: "💬",
      children: [
        { label: "Горизонтальный чат", path: "/chath" },
        { label: "Вертикальный чат", path: "/chatv" },
      ],
    },
    {
      label: "Алерты",
      icon: "🔔",
      children: [
        { label: "Pyro Alerts", path: "/pyroalerts" },
        { label: "Waifu Alerts", path: "/waifu" },
        { label: "Highlight Message", path: "/highlite" },
        { label: "Auto Message Billboard", path: "/automessage" },
      ],
    },
    {
      label: "Развлечения",
      icon: "🎮",
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
      icon: "🎵",
      children: [{ label: "Текущий трек", path: "/sr/currenttrack" }],
    },
  ];

  const controlRoomPages: NavigationItem[] = [
    { label: "Панель управления", path: "/admin", icon: "⚙️" },
    { label: "Логи", path: "/logs", icon: "📋" },
    { label: "Дашборд", path: "/dashboard", icon: "📊" },
    { label: "Просмотр серверов", path: "/main", icon: "🖥️" },
    { label: "Сервисы", path: "/services", icon: "🔌" },
    { label: "RootState", path: "/root-state", icon: "💾" },
    { label: "Твич награды", path: "/twitch-rewards", icon: "🎁" },
    { label: "Автосообщения", path: "/auto-messages", icon: "📨" },
    { label: "Telegram ↔ Discord Bridge", path: "/telegram-discord-bridge", icon: "🔗" },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleDropdownToggle = (name: string) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  const renderDropdown = (
    name: string,
    label: string,
    items: NavigationItem[],
    isActiveFn: (item: NavigationItem) => boolean
  ) => (
    <div
      className="relative pb-2"
      onMouseLeave={() => setActiveDropdown(null)}
      data-testid={`nav-dropdown-${name}`}
    >
      <button
        onClick={() => handleDropdownToggle(name)}
        onMouseEnter={() => setActiveDropdown(name)}
        className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-[var(--site-bg-tertiary)] hover:text-[var(--site-text-accent)] ${
          activeDropdown === name
            ? "bg-[var(--site-bg-tertiary)] text-[var(--site-text-accent)]"
            : "text-[var(--site-text-primary)]"
        }`}
      >
        {label}
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${activeDropdown === name ? "rotate-180" : ""}`}
        />
      </button>
      {activeDropdown === name && (
        <div
          className="absolute left-0 top-full z-50 pt-2 min-w-[220px] origin-top rounded-xl border border-[var(--site-border-primary)] bg-[var(--site-bg-card)] p-1.5 shadow-[var(--site-shadow-heavy)] animate-dropdown-open"
          data-testid={`nav-dropdown-menu-${name}`}
        >
          {items.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={handleLinkClick}
              className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:translate-x-0.5 hover:bg-[var(--site-hover-bg)] hover:text-[var(--site-text-accent)] ${
                isActiveFn(item)
                  ? "bg-[var(--site-hover-bg)] text-[var(--site-text-accent)]"
                  : "text-[var(--site-text-primary)]"
              }`}
            >
              {item.icon && <span className="w-5 text-center">{item.icon}</span>}
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <nav
      className="sticky top-0 z-[1030] border-b border-[var(--site-border-primary)] bg-[var(--site-bg-secondary)]/80 backdrop-blur-xl"
      data-testid="navbar"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-lg px-2 py-1 transition-all hover:bg-[var(--site-bg-tertiary)] hover:scale-[1.02]"
          data-testid="nav-logo"
        >
          <span className="text-xl">🚀</span>
          <span className="bg-gradient-to-r from-[var(--site-text-primary)] to-[var(--site-text-accent)] bg-clip-text text-lg font-extrabold tracking-tight text-transparent">
            MARS
          </span>
        </Link>

        <button
          className="flex flex-col gap-1 rounded-lg p-2 transition-opacity hover:opacity-100 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          data-testid="nav-mobile-toggle"
        >
          <span className={`block h-0.5 w-5 bg-[var(--site-text-primary)] transition-all ${mobileOpen ? "translate-y-1.5 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-[var(--site-text-primary)] transition-all ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-[var(--site-text-primary)] transition-all ${mobileOpen ? "-translate-y-1.5 -rotate-45" : ""}`} />
        </button>

        <div className={`hidden items-center gap-1 lg:flex`}>
          {renderDropdown("site", "Страницы сайта", sitePages, (item) => isActive(item.path))}
          {renderDropdown("framedata", "Фреймдата", framedataPages, (item) =>
            isActive(item.path)
          )}

          <div
            className="relative pb-2"
            onMouseLeave={() => setActiveDropdown(null)}
            data-testid="nav-dropdown-obs"
          >
            <button
              onClick={() => handleDropdownToggle("obs")}
              onMouseEnter={() => setActiveDropdown("obs")}
              className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-[var(--site-bg-tertiary)] hover:text-[var(--site-text-accent)] ${
                activeDropdown === "obs"
                  ? "bg-[var(--site-bg-tertiary)] text-[var(--site-text-accent)]"
                  : "text-[var(--site-text-primary)]"
              }`}
            >
              OBS
              <ChevronDown
                size={12}
                className={`transition-transform duration-200 ${activeDropdown === "obs" ? "rotate-180" : ""}`}
              />
            </button>
            {activeDropdown === "obs" && (
              <div
                className="absolute left-0 top-full z-50 pt-2 min-w-[220px] origin-top rounded-xl border border-[var(--site-border-primary)] bg-[var(--site-bg-card)] p-1.5 shadow-[var(--site-shadow-heavy)] animate-dropdown-open"
              >
                {obsComponents.map((group, gi) => (
                  <div key={gi} className="group/obs relative">
                    <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-[var(--site-text-primary)]">
                      <span className="w-5 text-center">{group.icon}</span>
                      {group.label}
                    </div>
                    <div className="hidden group-hover/obs:block">
                      <div className="ml-6 border-l border-[var(--site-border-primary)] pl-2">
                        {group.children.map((child, ci) => (
                          <Link
                            key={ci}
                            to={child.path}
                            onClick={handleLinkClick}
                            className={`block rounded-lg px-3 py-1.5 text-xs font-medium transition-all hover:translate-x-0.5 hover:bg-[var(--site-hover-bg)] hover:text-[var(--site-text-accent)] ${
                              isActive(child.path)
                                ? "bg-[var(--site-hover-bg)] text-[var(--site-text-accent)]"
                                : "text-[var(--site-text-primary)]"
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {renderDropdown(
            "control",
            "Управление",
            controlRoomPages,
            (item) => isActive(item.path)
          )}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <Suspense fallback={null}>
            <ThemeToggle />
          </Suspense>
          <a
            href="/ui"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--site-text-primary)] transition-all hover:bg-[var(--site-bg-tertiary)] hover:text-[var(--site-text-accent)]"
            title="Swagger UI"
            data-testid="nav-link-ui"
          >
            <Monitor size={18} />
          </a>
          <a
            href="/static"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--site-text-primary)] transition-all hover:bg-[var(--site-bg-tertiary)] hover:text-[var(--site-text-accent)]"
            title="Static files"
            data-testid="nav-link-static"
          >
            <FolderOpen size={18} />
          </a>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--site-border-primary)] bg-[var(--site-bg-secondary)] px-4 py-3 lg:hidden">
          <MobileNav
            sitePages={sitePages}
            framedataPages={framedataPages}
            obsComponents={obsComponents}
            controlRoomPages={controlRoomPages}
            isActive={isActive}
            onLinkClick={handleLinkClick}
          />
          <div className="mt-3 flex justify-center gap-2 border-t border-[var(--site-border-primary)] pt-3">
            <Suspense fallback={null}>
              <ThemeToggle />
            </Suspense>
          </div>
        </div>
      )}

      <style>{`
        @keyframes dropdown-open {
          from { opacity: 0; transform: scaleY(0.95) translateY(-4px); }
          to { opacity: 1; transform: scaleY(1) translateY(0); }
        }
        .animate-dropdown-open {
          animation: dropdown-open 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </nav>
  );
};

interface MobileNavProps {
  sitePages: NavigationItem[];
  framedataPages: NavigationItem[];
  obsComponents: NavigationGroup[];
  controlRoomPages: NavigationItem[];
  isActive: (path: string) => boolean;
  onLinkClick: () => void;
}

const MobileNav: React.FC<MobileNavProps> = ({
  sitePages,
  framedataPages,
  obsComponents,
  controlRoomPages,
  isActive,
  onLinkClick,
}) => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const sections = [
    { key: "site", label: "Страницы сайта", items: sitePages },
    { key: "framedata", label: "Фреймдата", items: framedataPages },
    { key: "obs", label: "OBS Компоненты", items: obsComponents.flatMap((g) => g.children) },
    { key: "control", label: "Управление", items: controlRoomPages },
  ];

  return (
    <div className="flex flex-col gap-1">
      {sections.map((section) => (
        <div key={section.key}>
          <button
            onClick={() => setOpenSection(openSection === section.key ? null : section.key)}
            className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--site-text-primary)] transition-all hover:bg-[var(--site-bg-tertiary)]"
          >
            {section.label}
            <ChevronDown
              size={14}
              className={`transition-transform ${openSection === section.key ? "rotate-180" : ""}`}
            />
          </button>
          {openSection === section.key && (
            <div className="ml-4 flex flex-col gap-0.5 border-l border-[var(--site-border-primary)] pl-3">
              {section.items.map((item, i) => (
                <Link
                  key={i}
                  to={item.path}
                  onClick={onLinkClick}
                  className={`rounded-lg px-3 py-2 text-sm transition-all hover:bg-[var(--site-hover-bg)] hover:text-[var(--site-text-accent)] ${
                    isActive(item.path)
                      ? "bg-[var(--site-hover-bg)] text-[var(--site-text-accent)]"
                      : "text-[var(--site-text-primary)]"
                  }`}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Header;
