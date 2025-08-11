import { ChakraProvider } from "@chakra-ui/react";
import { defaultConfig, defaultSystem } from "@chakra-ui/react";
import { ReactNode, useEffect, useMemo, useState } from "react";

import { Theme, ThemeContext } from "./Theme";

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeMode, setThemeMode] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    return savedTheme || "light";
  });

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
    document.documentElement.dataset.colorMode = themeMode;
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  const systemValue = useMemo(() => {
    // Можно дополнительно настраивать defaultConfig.theme.semanticTokens под тему
    return defaultSystem;
  }, [themeMode]);

  return (
    <ChakraProvider value={systemValue}>
      <ThemeContext.Provider value={{ theme: themeMode, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </ChakraProvider>
  );
};
