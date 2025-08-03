import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import ServerViewer from "../components/ControlRoom_Components/ServerViewer/ServerViewer";
import ServiceDetails from "../components/ControlRoom_Components/ServerViewer/ServiceDetails";
import AutoMessageBillboard from "../components/OBS_Components/AutoMessageBillboard/AutoMessageBillboard";
import AutoMessageBillboardTest from "../components/OBS_Components/AutoMessageBillboard/AutoMessageBillboardTest";
import ChatHorizontal from "../components/OBS_Components/ChatHorizontal/ChatHorizontal";
import ChatVertical from "../components/OBS_Components/ChatVertical/ChatVertical";
import { FumoFriday } from "../components/OBS_Components/FumoFriday";
import HighliteMessage from "../components/OBS_Components/HighliteMessage/HighliteMessage";
import PyroAlerts from "../components/OBS_Components/PyroAlerts/PyroAlerts";
import RandomMem from "../components/OBS_Components/RandomMem/RandomMem";
import Scoreboard from "../components/OBS_Components/Scoreboard";
import ScoreboardAdminPanel from "../components/OBS_Components/Scoreboard/AdminPanel/AdminPanel";
import Manager from "../components/OBS_Components/ScreenParticles/Manager";
import CurrentTrackSignalRHubWrapper from "../components/OBS_Components/SoundRequest/CurrentTrack/SignalRHubWrapper";
import WaifuAlerts from "../components/OBS_Components/WaifuAlerts/WaifuAlerts";
import { Layout } from "../components/Site_Components/Layout";
import AboutPage from "../pages/AboutPage";
import CommandsPage from "../pages/CommandsPage/CommandsPage";
import ContactsPage from "../pages/ContactsPage";
import DocsPage from "../pages/DocsPage";
import WelcomePage from "../pages/WelcomePage";
import { LinktreeMenu } from "./LinkTree/LinkTreeMenu";

// Компонент-обертка для страницы деталей сервиса
const ServiceDetailsPage = () => (
  <div style={{ padding: "20px" }}>
    <ServiceDetails onClose={() => window.history.back()} />
  </div>
);

// Компонент-обертка для OBS компонентов
const OBSComponentWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="obs-component">{children}</div>
);

const PrivateRoutes = () => (
  <BrowserRouter>
    <Routes>
      {/* Основные страницы сайта с Layout */}
      <Route
        path="/"
        element={
          <Layout>
            <WelcomePage />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <AboutPage />
          </Layout>
        }
      />
      <Route
        path="/docs"
        element={
          <Layout>
            <DocsPage />
          </Layout>
        }
      />
      <Route
        path="/contacts"
        element={
          <Layout>
            <ContactsPage />
          </Layout>
        }
      />
      <Route
        path="/commands"
        element={
          <Layout>
            <CommandsPage />
          </Layout>
        }
      />

      {/* OBS Компоненты (без Layout для интеграции в OBS) */}
      <Route
        path="/automessage"
        element={
          <OBSComponentWrapper>
            <AutoMessageBillboard />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/automessage-test"
        element={
          <OBSComponentWrapper>
            <AutoMessageBillboardTest />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/pyroalerts"
        element={
          <OBSComponentWrapper>
            <PyroAlerts />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/randommem"
        element={
          <OBSComponentWrapper>
            <RandomMem />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/waifu"
        element={
          <OBSComponentWrapper>
            <WaifuAlerts />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/fumofriday"
        element={
          <OBSComponentWrapper>
            <FumoFriday />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/highlite"
        element={
          <OBSComponentWrapper>
            <HighliteMessage />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/confetti"
        element={
          <OBSComponentWrapper>
            <Manager />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/scoreboard"
        element={
          <OBSComponentWrapper>
            <Scoreboard />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/chath"
        element={
          <OBSComponentWrapper>
            <ChatHorizontal />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/chatv"
        element={
          <OBSComponentWrapper>
            <ChatVertical />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/sr/currenttrack"
        element={
          <OBSComponentWrapper>
            <CurrentTrackSignalRHubWrapper />
          </OBSComponentWrapper>
        }
      />

      {/* Панель управления (с Layout) */}
      <Route
        path="/admin"
        element={
          <Layout>
            <ServerViewer />
          </Layout>
        }
      />
      <Route
        path="/dashboard"
        element={
          <Layout>
            <ServerViewer />
          </Layout>
        }
      />
      <Route
        path="/main"
        element={
          <Layout>
            <ServerViewer />
          </Layout>
        }
      />
      <Route
        path="/services"
        element={
          <Layout>
            <ServerViewer />
          </Layout>
        }
      />
      <Route
        path="/services/details"
        element={
          <Layout>
            <ServiceDetailsPage />
          </Layout>
        }
      />

      {/* Админ панель для скорборда */}
      <Route path="/scoreboard-admin" element={<ScoreboardAdminPanel />} />

      {/* Старые маршруты для совместимости */}
      <Route path="/ui/index.html" />
      <Route path="/linktree" element={<LinktreeMenu />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </BrowserRouter>
);

PrivateRoutes.displayName = "PrivateRoutes";

export default PrivateRoutes;
