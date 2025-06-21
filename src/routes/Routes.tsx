import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LinktreeMenu } from "./LinkTree/LinkTreeMenu"; // Импортируем новый компонент
import { FumoFriday } from "../components/FumoFriday";
import HighliteMessage from "../components/HighliteMessage/HighliteMessage";
import WaifuAlerts from "../components/WaifuAlerts/WaifuAlerts";
import Manager from "../components/ScreenParticles/Manager";
import ChatHorizontal from "../components/ChatHorizontal/ChatHorizontal";
import ChatVertical from "../components/ChatVertical/ChatVertical";
import { TrackList } from "../components/SoundRequest/TrackList/TrackList";
import { VideoScreen } from "../components/SoundRequest/VideoScreen/VideoScreen";
import PyroAlerts from "../components/PyroAlerts/PyroAlerts";
import RandomMem from "../components/RandomMem/RandomMem";
import CurrentTrackSignalRHubWrapper from "../components/SoundRequest/CurrentTrack/SignalRHubWrapper";

const PrivateRoutes = () => {
  return (
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
        <Route path="/sr/tracklist" element={<TrackList />} />
        <Route path="/sr/videoscreen" element={<VideoScreen />} />
        <Route
          path="/sr/currenttrack"
          element={<CurrentTrackSignalRHubWrapper />}
        />
        <Route path="*" element={<Navigate to="/" />} />
        {/* Редирект на меню */}
      </Routes>
    </BrowserRouter>
  );
};

PrivateRoutes.displayName = "PrivateRoutes";

export default PrivateRoutes;
