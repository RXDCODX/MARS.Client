import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type AntdStyle = "illustration" | "mui" | "cartoon" | "geek";

interface AntdStyleContextType {
  antdStyle: AntdStyle;
  setAntdStyle: (style: AntdStyle) => void;
}

const AntdStyleContext = createContext<AntdStyleContextType | undefined>(
  undefined
);

export const useAntdStyle = () => {
  const context = useContext(AntdStyleContext);
  if (!context) {
    throw new Error("useAntdStyle must be used within AntdStyleProvider");
  }
  return context;
};

interface AntdStyleProviderProps {
  children: ReactNode;
}

export const AntdStyleProvider: React.FC<AntdStyleProviderProps> = ({
  children,
}) => {
  const [antdStyle, setAntdStyleState] = useState<AntdStyle>(() => {
    const saved = localStorage.getItem("antd-style") as AntdStyle;
    return saved || "illustration";
  });

  const setAntdStyle = useCallback((style: AntdStyle) => {
    setAntdStyleState(style);
    localStorage.setItem("antd-style", style);
  }, []);

  useEffect(() => {
    const isDark = antdStyle === "geek";
    const resolvedTheme = isDark ? "dark" : "light";

    document.documentElement.setAttribute("data-bs-theme", resolvedTheme);
    document.body.setAttribute("data-theme", resolvedTheme);
    localStorage.setItem("theme", resolvedTheme);
  }, [antdStyle]);

  const value = useMemo(
    () => ({ antdStyle, setAntdStyle }),
    [antdStyle, setAntdStyle]
  );

  return (
    <AntdStyleContext.Provider value={value}>
      {children}
    </AntdStyleContext.Provider>
  );
};
