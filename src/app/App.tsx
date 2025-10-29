import "./global.scss";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { usePrefetchRoutes } from "@/routes/hooks/usePrefetchRoutes";
import Routes from "@/routes/Routes";

function App() {
  // Запускаем фоновую загрузку некритичных компонентов
  usePrefetchRoutes();

  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
