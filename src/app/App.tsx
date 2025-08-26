import "./global.scss";

import { ThemeProvider } from "@/contexts/ThemeContext";
import { ToastModalProvider } from "@/shared/Utils/ToastModal";
import Routes from "@/routes/Routes";

function App() {
  return (
    <ThemeProvider>
      <ToastModalProvider>
        <Routes />
      </ToastModalProvider>
    </ThemeProvider>
  );
}

export default App;
