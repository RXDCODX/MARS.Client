import { lazy, Suspense } from "react";

import { PageLoader } from "@/components/shared/LazyLoader";
import Layout from "@/Site/Pages/Layout/Layout";

import { RouteConfig } from "./RouteConfig";

// Тяжелые админ страницы - lazy loading
const LogsPage = lazy(() =>
  import("@/Site/Pages").then(m => ({ default: m.LogsPage }))
);
const ServerViewer = lazy(
  () => import("@/Site/Pages/ServerViewer/ServerViewer")
);
const TwitchRewardsPage = lazy(() => import("@/Site/Pages/TwitchRewardsPage"));
const ServiceDetailsPage = lazy(() => import("./ServiceDetailsPage"));

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
