import { lazy, Suspense } from "react";

import { PageLoader } from "@/components/shared/LazyLoader";
import AboutPage from "@/Site/Pages/AboutPage";
import ContactsPage from "@/Site/Pages/ContactsPage";
import DocsPage from "@/Site/Pages/DocsPage";
import Layout from "@/Site/Pages/Layout/Layout";
import RoutesPage from "@/Site/Pages/RoutesPage/RoutesPage";
import WelcomePage from "@/Site/Pages/WelcomePage";

import { RouteConfig } from "./RouteConfig";

// Тяжелые страницы - lazy loading для оптимизации производительности
const FramedataPage = lazy(
  () => import("@/Site/Pages/FramedataPage/FramedataPage")
);
const PendingChangesPage = lazy(() =>
  import("@/Site/Pages/FramedataPage").then(m => ({
    default: m.PendingChangesPage,
  }))
);
const ChangeDetailsPage = lazy(() =>
  import("@/Site/Pages/FramedataPage").then(m => ({
    default: m.ChangeDetailsPage,
  }))
);
const RandomMemePage = lazy(
  () => import("@/Site/Pages/RandomMemePage/RandomMemePage")
);
const RandomMemeDetailsPage = lazy(() =>
  import("@/Site/Pages/RandomMemePage/pages").then(m => ({
    default: m.RandomMemeDetailsPage,
  }))
);
const RandomMemeEditPage = lazy(() =>
  import("@/Site/Pages/RandomMemePage/pages").then(m => ({
    default: m.RandomMemeEditPage,
  }))
);
const CinemaQueuePage = lazy(
  () => import("@/Site/Pages/CinemaQueuePage/CinemaQueuePage")
);
const CommandsPage = lazy(
  () => import("@/Site/Pages/CommandsPage/CommandsPage")
);
const MediaInfoListPage = lazy(() =>
  import("@/Site/Pages/MediaInfoPage/MediaInfoListPage").then(m => ({
    default: m.MediaInfoListPage,
  }))
);
const MediaInfoEditPage = lazy(() =>
  import("@/Site/Pages/MediaInfoPage/MediaInfoEditPage").then(m => ({
    default: m.MediaInfoEditPage,
  }))
);

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
        <Suspense fallback={<PageLoader />}>
          <CommandsPage />
        </Suspense>
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
        <Suspense fallback={<PageLoader />}>
          <FramedataPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/framedata/pending",
    name: "Ожидающие изменения",
    type: "site",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <PendingChangesPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/framedata/pending/:changeId",
    name: "Детали изменения",
    type: "site",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <ChangeDetailsPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/media-info",
    name: "Информация о медиа",
    type: "site",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <MediaInfoListPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/media-info/edit/:id",
    name: "Редактирование медиа",
    type: "site",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <MediaInfoEditPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/cinema-queue",
    name: "Очередь кинотеатра",
    type: "site",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <CinemaQueuePage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/random-meme",
    name: "Random Meme Manager",
    type: "site",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <RandomMemePage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/random-meme/:id",
    name: "Random Meme Details",
    type: "site",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <RandomMemeDetailsPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/random-meme/edit/:id",
    name: "Edit Random Meme",
    type: "site",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <RandomMemeEditPage />
        </Suspense>
      </Layout>
    ),
  },
];
