import type { ConfigProviderProps } from "antd";
import { useMemo } from "react";

import { Theme, useTheme } from "@/contexts/Theme";

import { AntdStyle, useAntdStyle } from "./AntdStyleContext";
import { useCartoonTheme } from "./themes/cartoonTheme";
import { useGeekTheme } from "./themes/geekTheme";
import { useIllustrationTheme } from "./themes/illustrationTheme";
import { useMuiTheme } from "./themes/muiTheme";

const useAntdTheme = () => {
  const { theme: siteTheme } = useTheme();
  const { antdStyle } = useAntdStyle();

  const isDark = antdStyle === "geek" || siteTheme === "dark";

  const illustrationProps = useIllustrationTheme(isDark);
  const muiProps = useMuiTheme(isDark);
  const cartoonProps = useCartoonTheme(isDark);
  const geekProps = useGeekTheme(isDark);

  return useMemo<ConfigProviderProps>(() => {
    switch (antdStyle) {
      case "mui":
        return muiProps;
      case "cartoon":
        return cartoonProps;
      case "geek":
        return geekProps;
      case "illustration":
      default:
        return illustrationProps;
    }
  }, [antdStyle, illustrationProps, muiProps, cartoonProps, geekProps]);
};

export default useAntdTheme;
