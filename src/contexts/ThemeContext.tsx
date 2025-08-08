import { ReactNode, useEffect, useState } from "react";

import { Theme, ThemeContext } from "./Theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    // Проверяем сохраненную тему в localStorage
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "light";
  });

  useEffect(() => {
    // Применяем тему к html элементу для Bootstrap
    document.documentElement.setAttribute("data-bs-theme", theme);
    // Также применяем к body для совместимости со старым кодом
    document.body.setAttribute("data-theme", theme);
    // Сохраняем в localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
