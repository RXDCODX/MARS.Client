import "./global.scss";

import { ThemeProvider } from "@/contexts/ThemeContext";
import Routes from "@/routes/Routes";

function App() {
  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
