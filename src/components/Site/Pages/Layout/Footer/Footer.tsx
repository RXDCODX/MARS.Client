import { Link } from "react-router-dom";

import { useSiteColors } from "@/shared/Utils/useSiteColors";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const colors = useSiteColors();

  const linkSections = [
    {
      title: "Быстрые ссылки",
      links: [
        { to: "/", label: "Главная" },
        { to: "/about", label: "О проекте" },
        { to: "/docs", label: "Документация" },
        { to: "/contacts", label: "Контакты" },
      ],
    },
    {
      title: "OBS Компоненты",
      links: [
        { to: "/pyroalerts", label: "Pyro Alerts" },
        { to: "/waifu", label: "Waifu Alerts" },
        { to: "/chath", label: "Горизонтальный чат" },
        { to: "/chatv", label: "Вертикальный чат" },
      ],
    },
    {
      title: "Панель управления",
      links: [
        { to: "/admin", label: "Админ панель" },
        { to: "/dashboard", label: "Дашборд" },
        { to: "/main", label: "Просмотр серверов" },
        { to: "/services", label: "Сервисы" },
      ],
    },
  ];

  return (
    <footer
      className="mt-auto border-t py-10"
      style={{
        backgroundColor: colors.background.secondary,
        color: colors.text.primary,
        borderColor: colors.border.primary,
      }}
      data-testid="footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3
              className="mb-3 text-lg font-semibold"
              style={colors.utils.getTextStyle("primary")}
            >
              🚀 MARS Client
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={colors.utils.getTextStyle("secondary")}
            >
              Мощная платформа для управления стримингом и создания
              интерактивных компонентов для OBS.
            </p>
          </div>

          {linkSections.map((section) => (
            <div key={section.title}>
              <h4
                className="mb-3 text-sm font-semibold uppercase tracking-wider"
                style={colors.utils.getTextStyle("primary")}
              >
                {section.title}
              </h4>
              <ul className="flex flex-col gap-1.5">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm transition-colors hover:text-[var(--site-text-accent)]"
                      style={colors.utils.getTextStyle("secondary")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <hr
          className="my-6"
          style={{ borderColor: colors.border.primary }}
        />

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <p
            className="text-sm"
            style={colors.utils.getTextStyle("muted")}
          >
            &copy; {currentYear} MARS Client. Все права защищены.
          </p>
          <div className="flex gap-3">
            {[
              { href: "#", label: "GitHub", icon: "🐙" },
              { href: "#", label: "Discord", icon: "💬" },
              { href: "#", label: "Twitter", icon: "🐦" },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-lg transition-transform hover:scale-110"
                style={colors.utils.getTextStyle("secondary")}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
