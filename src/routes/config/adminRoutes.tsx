import { lazy, Suspense } from "react";

import { PageLoader } from "@/components/shared/LazyLoader";
import Layout from "@/Site/Pages/Layout/Layout";

import { registerPrefetchComponents } from "../utils/prefetchRoutes";
import { RouteConfig } from "./RouteConfig";

// Тяжелые админ страницы - lazy loading
const logsPageLoader = () =>
  import("@/Site/Pages").then(m => ({ default: m.LogsPage }));
const LogsPage = lazy(logsPageLoader);

const serverViewerLoader = () =>
  import("@/Site/Pages/ServerViewer/ServerViewer");
const ServerViewer = lazy(serverViewerLoader);

const twitchRewardsPageLoader = () => import("@/Site/Pages/TwitchRewardsPage");
const TwitchRewardsPage = lazy(twitchRewardsPageLoader);

const autoMessagesPageLoader = () => import("@/Site/Pages/AutoMessagesPage");
const AutoMessagesPage = lazy(autoMessagesPageLoader);

const serviceDetailsPageLoader = () => import("./ServiceDetailsPage");
const ServiceDetailsPage = lazy(serviceDetailsPageLoader);

const environmentVariablesPageLoader = () =>
  import("@/Site/Pages").then(m => ({
    default: m.EnvironmentVariablesPage,
  }));
const EnvironmentVariablesPage = lazy(environmentVariablesPageLoader);

const rootStatePageLoader = () =>
  import("@/Site/Pages").then(m => ({
    default: m.RootStatePage,
  }));
const RootStatePage = lazy(rootStatePageLoader);

const ttsVoicePageLoader = () =>
  import("@/Site/Pages").then(m => ({
    default: m.TtsVoicePage,
  }));
const TtsVoicePage = lazy(ttsVoicePageLoader);

const commandsPageLoader = () =>
  import("@/Site/Pages").then(m => ({
    default: m.CommandsPage,
  }));
const CommandsPage = lazy(commandsPageLoader);

const cinemaQueuePageLoader = () =>
  import("@/Site/Pages").then(m => ({
    default: m.CinemaQueuePage,
  }));
const CinemaQueuePage = lazy(cinemaQueuePageLoader);

// Регистрируем админ компоненты для фоновой загрузки
registerPrefetchComponents([
  logsPageLoader,
  serverViewerLoader,
  twitchRewardsPageLoader,
  autoMessagesPageLoader,
  serviceDetailsPageLoader,
  environmentVariablesPageLoader,
  rootStatePageLoader,
  ttsVoicePageLoader,
  commandsPageLoader,
  cinemaQueuePageLoader,
]);

// Массив панелей управления (с Layout)
export const adminRoutes: RouteConfig[] = [
  {
    path: "/logs",
    name: "Панель логов",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <LogsPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/admin",
    name: "Админ панель",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <ServerViewer />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    name: "Дашборд",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <ServerViewer />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/main",
    name: "Главная панель",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <ServerViewer />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/services",
    name: "Сервисы",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <ServerViewer />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/services/details",
    name: "Детали сервиса",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <ServiceDetailsPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/environment-variables",
    name: "Переменные окружения",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <EnvironmentVariablesPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/root-state",
    name: "RootState",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <RootStatePage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/twitch-rewards",
    name: "Twitch награды",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <TwitchRewardsPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/auto-messages",
    name: "Автосообщения",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <AutoMessagesPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/tts-voice",
    name: "Голоса TTS",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <TtsVoicePage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/commands",
    name: "Команды",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <CommandsPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/cinema-queue",
    name: "Очередь кинотеатра",
    type: "control panel",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <CinemaQueuePage />
        </Suspense>
      </Layout>
    ),
  },
];
