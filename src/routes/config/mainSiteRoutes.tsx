import AboutPage from "@/Site/Pages/AboutPage";
import BackupsPage from "@/Site/Pages/BackupsPage";
import CinemaQueuePage from "@/Site/Pages/CinemaQueuePage/CinemaQueuePage";
import CommandsPage from "@/Site/Pages/CommandsPage/CommandsPage";
import ContactsPage from "@/Site/Pages/ContactsPage";
import DocsPage from "@/Site/Pages/DocsPage";
import { PendingChangesPage } from "@/Site/Pages/FramedataPage";
import { ChangeDetailsPage } from "@/Site/Pages/FramedataPage";
import FramedataPage from "@/Site/Pages/FramedataPage/FramedataPage";
import Layout from "@/Site/Pages/Layout/Layout";
import { MediaInfoEditPage } from "@/Site/Pages/MediaInfoPage/MediaInfoEditPage";
import { MediaInfoListPage } from "@/Site/Pages/MediaInfoPage/MediaInfoListPage";
import RandomMemePage from "@/Site/Pages/RandomMemePage/RandomMemePage";
import RoutesPage from "@/Site/Pages/RoutesPage/RoutesPage";
import WelcomePage from "@/Site/Pages/WelcomePage";

import { RouteConfig } from "./RouteConfig";

// Массив основных страниц сайта с Layout
export const mainSiteRoutes: RouteConfig[] = [
  {
    path: "/",
    name: "Главная страница",
    type: "site",
    element: (
      <Layout>
        <WelcomePage />
      </Layout>
    ),
  },
  {
    path: "/about",
    name: "О проекте",
    type: "site",
    element: (
      <Layout>
        <AboutPage />
      </Layout>
    ),
  },
  {
    path: "/docs",
    name: "Документация",
    type: "site",
    element: (
      <Layout>
        <DocsPage />
      </Layout>
    ),
  },
  {
    path: "/contacts",
    name: "Контакты",
    type: "site",
    element: (
      <Layout>
        <ContactsPage />
      </Layout>
    ),
  },
  {
    path: "/commands",
    name: "Команды",
    type: "site",
    element: (
      <Layout>
        <CommandsPage />
      </Layout>
    ),
  },
  {
    path: "/routes",
    name: "Все маршруты",
    type: "site",
    element: (
      <Layout>
        <RoutesPage />
      </Layout>
    ),
  },
  {
    path: "/framedata",
    name: "Фреймдата",
    type: "site",
    element: (
      <Layout>
        <FramedataPage />
      </Layout>
    ),
  },
  {
    path: "/framedata/pending",
    name: "Ожидающие изменения",
    type: "site",
    element: (
      <Layout>
        <PendingChangesPage />
      </Layout>
    ),
  },
  {
    path: "/backups",
    name: "Резервные копии",
    type: "site",
    element: (
      <Layout>
        <BackupsPage />
      </Layout>
    ),
  },
  {
    path: "/framedata/pending/:changeId",
    name: "Детали изменения",
    type: "site",
    element: (
      <Layout>
        <ChangeDetailsPage />
      </Layout>
    ),
  },
  {
    path: "/media-info",
    name: "Информация о медиа",
    type: "site",
    element: (
      <Layout>
        <MediaInfoListPage />
      </Layout>
    ),
  },
  {
    path: "/media-info/edit/:id",
    name: "Редактирование медиа",
    type: "site",
    element: (
      <Layout>
        <MediaInfoEditPage />
      </Layout>
    ),
  },
  {
    path: "/cinema-queue",
    name: "Очередь кинотеатра",
    type: "site",
    element: (
      <Layout>
        <CinemaQueuePage />
      </Layout>
    ),
  },
  {
    path: "/random-meme",
    name: "Random Meme Manager",
    type: "site",
    element: (
      <Layout>
        <RandomMemePage />
      </Layout>
    ),
  },
];
