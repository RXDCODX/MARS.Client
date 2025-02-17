import "./App.module.scss";
import "./global.scss";

import Routes from "../routes/Routes";
import useTwitchStore from "../shared/twitchStore/twitchStore";
import { SignalRContext } from ".";

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
    <>
      <Routes />
    </>
  );
}

export default App;
