import { Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

import { useTheme } from "@/contexts/Theme";

import styles from "./ThemeToggle.module.scss";

interface ThemeToggleProps {
  variant?: "default" | "admin";
  size?: "sm" | "md" | "lg";
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = "default",
  size = "sm",
}) => {
  const { theme, toggleTheme } = useTheme();

  const getButtonColorScheme = () => {
    if (variant === "admin") return "gray";
    return theme === "light" ? "gray" : "yellow";
  };

  const getButtonSize = () => {
    switch (size) {
      case "lg":
        return "lg";
      case "md":
        return "md";
      default:
        return "sm";
    }
  };

  const getButtonClass = () =>
    variant === "admin" ? styles.adminThemeToggle : styles.themeToggle;

  return (
    <Button
      variant="outline"
      colorScheme={getButtonColorScheme()}
      size={getButtonSize()}
      onClick={toggleTheme}
      className={getButtonClass()}
      title={`Переключить на ${theme === "light" ? "темную" : "светлую"} тему`}
    >
      {theme === "light" ? (
        <>
          <MoonIcon style={{ marginRight: 6 }} />
          <span className="ms-1 d-none d-sm-inline">Темная</span>
        </>
      ) : (
        <>
          <SunIcon style={{ marginRight: 6 }} />
          <span className="ms-1 d-none d-sm-inline">Светлая</span>
        </>
      )}
    </Button>
  );
};

export default ThemeToggle;
