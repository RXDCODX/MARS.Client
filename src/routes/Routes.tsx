import { BrowserRouter, Route, Routes } from "react-router-dom";

import { FumoFriday } from "../components/FumoFriday";
import HighliteMessage from "../components/HighliteMessage/HighliteMessage";
import PyroAlerts from "../components/PyroAlerts/PyroAlerts";
import TikTok from "../components/TikTok/TikTok";
import WaifuAlerts from "../components/WaifuAlerts/WaifuAlerts";
import Redirect from "./Redirect";

/** Приватные роуты. */
const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/pyroalerts" element={<PyroAlerts />} />
        <Route path="/waifu" element={<WaifuAlerts />} />
        <Route path="/fumofriday" element={<FumoFriday />} />
        <Route path="/tiktok" element={<TikTok />} />
        <Route path="/highlite" element={<HighliteMessage />} />
        <Route
          path="/ui"
          element={<Redirect path="/backend/ui/index.html" />}
        />

        <Route path="*" element={<Redirect path="/pyroalerts" />} />
      </Routes>
    </BrowserRouter>
  );
};

PrivateRoutes.displayName = "PrivateRoutes";

export default PrivateRoutes;
