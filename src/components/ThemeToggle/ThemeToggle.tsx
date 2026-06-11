import { useTheme } from "@/contexts/Theme";

interface ThemeToggleProps {
  variant?: "default" | "admin";
  size?: "sm" | "md" | "lg";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ variant = "default" }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all hover:-translate-y-0.5 ${
        variant === "admin"
          ? "border-[var(--site-border-secondary)] bg-[var(--site-bg-secondary)] text-[var(--site-text-primary)] hover:bg-[var(--site-bg-tertiary)]"
          : theme === "light"
            ? "border-[var(--site-border-primary)] bg-[var(--site-bg-secondary)] text-[var(--site-text-primary)] hover:bg-[var(--site-bg-tertiary)]"
            : "border-[var(--site-border-primary)] bg-[var(--site-bg-secondary)] text-[var(--site-text-primary)] hover:bg-[var(--site-bg-tertiary)]"
      }`}
      title={`Переключить на ${theme === "light" ? "темную" : "светлую"} тему`}
      data-testid="button-theme-toggle"
    >
      {theme === "light" ? (
        <>
          <span>🌙</span>
          <span className="hidden sm:inline">Тёмная</span>
        </>
      ) : (
        <>
          <span>☀️</span>
          <span className="hidden sm:inline">Светлая</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
