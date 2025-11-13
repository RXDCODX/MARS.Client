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

const serviceDetailsPageLoader = () => import("./ServiceDetailsPage");
const ServiceDetailsPage = lazy(serviceDetailsPageLoader);

const environmentVariablesPageLoader = () =>
  import("@/Site/Pages").then(m => ({
    default: m.EnvironmentVariablesPage,
  }));
const EnvironmentVariablesPage = lazy(environmentVariablesPageLoader);

// Регистрируем админ компоненты для фоновой загрузки
registerPrefetchComponents([
  logsPageLoader,
  serverViewerLoader,
  twitchRewardsPageLoader,
  serviceDetailsPageLoader,
  environmentVariablesPageLoader,
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
];
