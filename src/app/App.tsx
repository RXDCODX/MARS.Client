import "./global.scss";
import "./tailwind.css";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { AntdStyleProvider, ThemeProvider as AntThemeProvider } from "@/shared/components/ui";
import { usePrefetchRoutes } from "@/routes/hooks/usePrefetchRoutes";
import Routes from "@/routes/Routes";

function App() {
  usePrefetchRoutes();

  return (
    <ThemeProvider>
      <AntdStyleProvider>
        <AntThemeProvider>
          <Routes />
        </AntThemeProvider>
      </AntdStyleProvider>
    </ThemeProvider>
  );
}

export default App;
