import "./global.scss";

import { ThemeProvider } from "@/contexts/ThemeContext";
import Routes from "@/routes/Routes";
import { ToastModalProvider } from "@/shared/Utils/ToastModal";

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
