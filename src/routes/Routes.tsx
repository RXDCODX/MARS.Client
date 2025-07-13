import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ChatHorizontal from "../components/ChatHorizontal/ChatHorizontal";
import ChatVertical from "../components/ChatVertical/ChatVertical";
import { FumoFriday } from "../components/FumoFriday";
import HighliteMessage from "../components/HighliteMessage/HighliteMessage";
import PyroAlerts from "../components/PyroAlerts/PyroAlerts";
import RandomMem from "../components/RandomMem/RandomMem";
import Manager from "../components/ScreenParticles/Manager";
import ServerViewer from "../components/ServerViewer/ServerViewer";
import ServiceDetails from "../components/ServerViewer/ServiceDetails";
import CurrentTrackSignalRHubWrapper from "../components/SoundRequest/CurrentTrack/SignalRHubWrapper";
import WaifuAlerts from "../components/WaifuAlerts/WaifuAlerts";
import { LinktreeMenu } from "./LinkTree/LinkTreeMenu"; // Импортируем новый компонент

// Компонент-обертка для страницы деталей сервиса
const ServiceDetailsPage = () => (
  <div style={{ padding: "20px" }}>
    <ServiceDetails onClose={() => window.history.back()} />
  </div>
);

const PrivateRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LinktreeMenu />} /> {/* Главное меню */}
      <Route path="/pyroalerts" element={<PyroAlerts />} />
      <Route path="/randommem" element={<RandomMem />} />
      <Route path="/waifu" element={<WaifuAlerts />} />
      <Route path="/fumofriday" element={<FumoFriday />} />
      <Route path="/highlite" element={<HighliteMessage />} />
      <Route path="/confetti" element={<Manager />} />
      <Route path="/chath" element={<ChatHorizontal />} />
      <Route path="/chatv" element={<ChatVertical />} />
      <Route
        path="/sr/currenttrack"
        element={<CurrentTrackSignalRHubWrapper />}
      />
      <Route path="/main" element={<ServerViewer />} />
      <Route path="/services" element={<ServerViewer />} />
      <Route path="/services/details" element={<ServiceDetailsPage />} />
      <Route path="*" element={<Navigate to="/" />} />
      {/* Редирект на меню */}
    </Routes>
  </BrowserRouter>
);

PrivateRoutes.displayName = "PrivateRoutes";

export default PrivateRoutes;
