import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LinktreeMenu } from "./LinkTree/LinkTreeMenu"; // Импортируем новый компонент
import { FumoFriday } from "../components/FumoFriday";
import HighliteMessage from "../components/HighliteMessage/HighliteMessage";
import PyroAlerts from "../components/PyroAlerts/PyroAlerts";
import WaifuAlerts from "../components/WaifuAlerts/WaifuAlerts";
import Manager from "../components/ScreenParticles/Manager";
import ChatHorizontal from "../components/ChatHorizontal/ChatHorizontal";
import ChatVertical from "../components/ChatVertical/ChatVertical";

const PrivateRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LinktreeMenu />} /> {/* Главное меню */}
        <Route path="/pyroalerts" element={<PyroAlerts />} />
        <Route path="/waifu" element={<WaifuAlerts />} />
        <Route path="/fumofriday" element={<FumoFriday />} />
        <Route path="/highlite" element={<HighliteMessage />} />
        <Route path="/confetti" element={<Manager />} />
        <Route path="/chath" element={<ChatHorizontal />} />
        <Route path="/chatv" element={<ChatVertical />} />

        <Route path="/sr/tracklist" element={} />
        <Route path="/sr/videoscreen" element={} />

        <Route path="*" element={<Navigate to="/" />} />{" "}
        {/* Редирект на меню */}
      </Routes>
    </BrowserRouter>
  );
};

PrivateRoutes.displayName = "PrivateRoutes";

export default PrivateRoutes;
