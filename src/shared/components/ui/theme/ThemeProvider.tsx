import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

import useAntdTheme from "./useAntdTheme";

interface ThemeProviderProps {
  children: ReactNode;
}

const AntdThemeProvider = ({ children }: ThemeProviderProps) => {
  const configProps = useAntdTheme();

  return <ConfigProvider {...configProps}>{children}</ConfigProvider>;
};

export default AntdThemeProvider;
