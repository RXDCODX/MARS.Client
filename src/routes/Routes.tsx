import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { ADHDPage } from "@/components/OBS_Components/ADHDLayout";
import AFKScreen from "@/components/OBS_Components/AFKScreen/AFKScreen";
import AutoMessageBillboard from "@/components/OBS_Components/AutoMessageBillboard/AutoMessageBillboard";
import AutoMessageBillboardTest from "@/components/OBS_Components/AutoMessageBillboard/AutoMessageBillboardTest";
import ChatHorizontal from "@/components/OBS_Components/ChatHorizontal/ChatHorizontal";
import ChatVertical from "@/components/OBS_Components/ChatVertical/ChatVertical";
import { FumoFriday } from "@/components/OBS_Components/FumoFriday";
import HighliteMessage from "@/components/OBS_Components/HighliteMessage/HighliteMessage";
import {
  AvatarWithFire,
  AvatarWithFireSvg,
  PNGTuber,
} from "@/components/OBS_Components/PNGTuber";
import PyroAlerts from "@/components/OBS_Components/PyroAlerts/PyroAlerts";
import RandomMem from "@/components/OBS_Components/RandomMem/RandomMem";
import Scoreboard from "@/components/OBS_Components/Scoreboard";
import ScoreboardAdminPanel from "@/components/OBS_Components/Scoreboard/AdminPanel/AdminPanel";
import Manager from "@/components/OBS_Components/ScreenParticles/Manager";
import CurrentTrackInfo from "@/components/OBS_Components/SoundRequest/CurrentTrack/CurrentTrackManager";
import WaifuAlerts from "@/components/OBS_Components/WaifuAlerts/WaifuAlerts";
import { OBSComponentWrapper } from "@/components/OBS_Components/wrapper";
import AboutPage from "@/Site/Pages/AboutPage";
import BackupsPage from "@/Site/Pages/BackupsPage";
import CinemaQueuePage from "@/Site/Pages/CinemaQueuePage/CinemaQueuePage";
import CommandsPage from "@/Site/Pages/CommandsPage/CommandsPage";
import ContactsPage from "@/Site/Pages/ContactsPage";
import DocsPage from "@/Site/Pages/DocsPage";
import {
  ChangeDetailsPage,
  PendingChangesPage,
} from "@/Site/Pages/FramedataPage";
import FramedataPage from "@/Site/Pages/FramedataPage/FramedataPage";
import Layout from "@/Site/Pages/Layout/Layout";
import { MediaInfoEditPage } from "@/Site/Pages/MediaInfoPage/MediaInfoEditPage";
import { MediaInfoListPage } from "@/Site/Pages/MediaInfoPage/MediaInfoListPage";
import ServerViewer from "@/Site/Pages/ServerViewer/ServerViewer";
import ServiceDetails from "@/Site/Pages/ServerViewer/ServiceDetails";
import WelcomePage from "@/Site/Pages/WelcomePage";

import { LinktreeMenu } from "./LinkTree/LinkTreeMenu";

// Компонент-обертка для страницы деталей сервиса
const ServiceDetailsPage = () => (
  <div style={{ padding: "20px" }}>
    <ServiceDetails onClose={() => window.history.back()} />
  </div>
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
      <Route
        path="/framedata"
        element={
          <Layout>
            <FramedataPage />
          </Layout>
        }
      />
      <Route
        path="/framedata/pending"
        element={
          <Layout>
            <PendingChangesPage />
          </Layout>
        }
      />
      <Route
        path="/backups"
        element={
          <Layout>
            <BackupsPage />
          </Layout>
        }
      />
      <Route
        path="/framedata/pending/:changeId"
        element={
          <Layout>
            <ChangeDetailsPage />
          </Layout>
        }
      />
      <Route
        path="/media-info"
        element={
          <Layout>
            <MediaInfoListPage />
          </Layout>
        }
      />
      <Route
        path="/media-info/edit/:id"
        element={
          <Layout>
            <MediaInfoEditPage />
          </Layout>
        }
      />
      <Route
        path="/cinema-queue"
        element={
          <Layout>
            <CinemaQueuePage />
          </Layout>
        }
      />
      <Route
        path="/adhd"
        element={
          <OBSComponentWrapper>
            <ADHDPage />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/backups"
        element={
          <Layout>
            <BackupsPage />
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
            <CurrentTrackInfo />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/afkscreen"
        element={
          <OBSComponentWrapper>
            <AFKScreen />
          </OBSComponentWrapper>
        }
      />

      <Route
        path="/avatarka"
        element={
          <OBSComponentWrapper>
            <PNGTuber />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/avatarka-fire"
        element={
          <OBSComponentWrapper>
            <AvatarWithFire />
          </OBSComponentWrapper>
        }
      />
      <Route
        path="/avatarka-fire-svg"
        element={
          <OBSComponentWrapper>
            <AvatarWithFireSvg />
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
