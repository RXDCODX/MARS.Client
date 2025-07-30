import Routes from "../routes/Routes";
import useTwitchStore from "../shared/twitchStore/twitchStore";
import { SignalRContext } from ".";
import { ThemeProvider } from "../contexts/ThemeContext";

function App() {
  const init = useTwitchStore((state) => state.init);

  SignalRContext.useSignalREffect(
    "posttwitchinfo",
    (clientId: string, clientSecret: string) => {
      init(clientId, clientSecret);
    },
    [],
  );

  return (
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  );
}

export default App;
