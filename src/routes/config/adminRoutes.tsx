import Layout from "@/Site/Pages/Layout/Layout";
import ServerViewer from "@/Site/Pages/ServerViewer/ServerViewer";
import TwitchRewardsPage from "@/Site/Pages/TwitchRewardsPage";

import { RouteConfig } from "./RouteConfig";
import ServiceDetailsPage from "./ServiceDetailsPage";

// Массив панелей управления (с Layout)
export const adminRoutes: RouteConfig[] = [
  {
    path: "/admin",
    name: "Админ панель",
    type: "control panel",
    element: (
      <Layout>
        <ServerViewer />
      </Layout>
    ),
  },
  {
    path: "/dashboard",
    name: "Дашборд",
    type: "control panel",
    element: (
      <Layout>
        <ServerViewer />
      </Layout>
    ),
  },
  {
    path: "/main",
    name: "Главная панель",
    type: "control panel",
    element: (
      <Layout>
        <ServerViewer />
      </Layout>
    ),
  },
  {
    path: "/services",
    name: "Сервисы",
    type: "control panel",
    element: (
      <Layout>
        <ServerViewer />
      </Layout>
    ),
  },
  {
    path: "/services/details",
    name: "Детали сервиса",
    type: "control panel",
    element: (
      <Layout>
        <ServiceDetailsPage />
      </Layout>
    ),
  },
  {
    path: "/twitch-rewards",
    name: "Twitch награды",
    type: "control panel",
    element: (
      <Layout>
        <TwitchRewardsPage />
      </Layout>
    ),
  },
];
