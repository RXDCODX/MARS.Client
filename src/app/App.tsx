import "./global.scss";

import { ThemeProvider } from "@/contexts/ThemeContext";
import Routes from "@/routes/Routes";
import { ToastModalProvider } from "@/shared/Utils/ToastModal";
import { usePrefetchRoutes } from "@/routes/hooks/usePrefetchRoutes";

function App() {
  // Запускаем фоновую загрузку некритичных компонентов
  usePrefetchRoutes();

  return (
    <ThemeProvider>
      <ToastModalProvider>
        <Routes />
      </ToastModalProvider>
    </ThemeProvider>
  );
}

export default App;
