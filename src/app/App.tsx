import "./App.module.scss";
import "./global.scss";

import { useEffect, useState } from "react";

import Routes from "../routes/Routes";
import useTwitchStore from "../shared/twitchStore/twitchStore";
import { SignalRContext } from ".";

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const init = useTwitchStore((state) => state.init);

  SignalRContext.useSignalREffect(
    "posttwitchinfo",
    (clientId: string, clientSecret: string) => {
      init(clientId, clientSecret);
    },
    [],
  );

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          zIndex: 2000,
          width: 80,
          height: 50,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 80,
            height: 50,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-end",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.querySelector("button")!.style.opacity = "1";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.querySelector("button")!.style.opacity = "0";
          }}
        >
          <button
            onClick={toggleTheme}
            style={{
              border: "none",
              background: "var(--table-header-bg)",
              color: "var(--main-text)",
              borderRadius: 6,
              padding: "6px 14px",
              fontWeight: 600,
              boxShadow: "0 1px 4px #0002",
              cursor: "pointer",
              opacity: 0,
              transition: "opacity 0.2s",
              pointerEvents: "auto",
              margin: 8,
            }}
          >
            {theme === "dark" ? "🌙 Тёмная" : "☀️ Светлая"}
          </button>
        </div>
      </div>
      <Routes />
    </>
  );
}

export default App;
