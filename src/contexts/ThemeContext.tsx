import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ReactNode, useEffect, useState } from "react";

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
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode(prevTheme => (prevTheme === "light" ? "dark" : "light"));
  };

  const theme = extendTheme({
    config: {
      initialColorMode: themeMode,
      useSystemColorMode: false,
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <ThemeContext.Provider value={{ theme: themeMode, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </ChakraProvider>
  );
};
