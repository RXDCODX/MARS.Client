import { ConfigProvider } from "antd";
import type { ReactNode } from "react";

import useIllustrationTheme from "./illustrationTheme";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const configProps = useIllustrationTheme();

  return <ConfigProvider {...configProps}>{children}</ConfigProvider>;
};

export default ThemeProvider;
