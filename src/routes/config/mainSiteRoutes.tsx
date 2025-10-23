import { lazy, Suspense } from "react";

import { PageLoader } from "@/components/shared/LazyLoader";
import Layout from "@/Site/Pages/Layout/Layout";

import {
  registerCriticalComponents,
  registerPrefetchComponents,
} from "../utils/prefetchRoutes";
import { RouteConfig } from "./RouteConfig";

// КРИТИЧНЫЕ компоненты - загружаются сразу для главной страницы
const welcomePageLoader = () => import("@/Site/Pages/WelcomePage");
const WelcomePage = lazy(welcomePageLoader);

// Регистрируем критичный компонент
registerCriticalComponents([welcomePageLoader]);

// Остальные страницы - lazy loading для оптимизации производительности
const aboutPageLoader = () => import("@/Site/Pages/AboutPage");
const AboutPage = lazy(aboutPageLoader);

const docsPageLoader = () => import("@/Site/Pages/DocsPage");
const DocsPage = lazy(docsPageLoader);

const contactsPageLoader = () => import("@/Site/Pages/ContactsPage");
const ContactsPage = lazy(contactsPageLoader);

const routesPageLoader = () => import("@/Site/Pages/RoutesPage/RoutesPage");
const RoutesPage = lazy(routesPageLoader);

// Тяжелые страницы - lazy loading для оптимизации производительности
const framedataPageLoader = () =>
  import("@/Site/Pages/FramedataPage/FramedataPage");
const FramedataPage = lazy(framedataPageLoader);

const pendingChangesPageLoader = () =>
  import("@/Site/Pages/FramedataPage").then(m => ({
    default: m.PendingChangesPage,
  }));
const PendingChangesPage = lazy(pendingChangesPageLoader);

const changeDetailsPageLoader = () =>
  import("@/Site/Pages/FramedataPage").then(m => ({
    default: m.ChangeDetailsPage,
  }));
const ChangeDetailsPage = lazy(changeDetailsPageLoader);

const randomMemePageLoader = () =>
  import("@/Site/Pages/RandomMemePage/RandomMemePage");
const RandomMemePage = lazy(randomMemePageLoader);

const randomMemeDetailsPageLoader = () =>
  import("@/Site/Pages/RandomMemePage/pages").then(m => ({
    default: m.RandomMemeDetailsPage,
  }));
const RandomMemeDetailsPage = lazy(randomMemeDetailsPageLoader);

const randomMemeEditPageLoader = () =>
  import("@/Site/Pages/RandomMemePage/pages").then(m => ({
    default: m.RandomMemeEditPage,
  }));
const RandomMemeEditPage = lazy(randomMemeEditPageLoader);

const cinemaQueuePageLoader = () =>
  import("@/Site/Pages/CinemaQueuePage/CinemaQueuePage");
const CinemaQueuePage = lazy(cinemaQueuePageLoader);

const commandsPageLoader = () =>
  import("@/Site/Pages/CommandsPage/CommandsPage");
const CommandsPage = lazy(commandsPageLoader);

const mediaInfoListPageLoader = () =>
  import("@/Site/Pages/MediaInfoPage/MediaInfoListPage").then(m => ({
    default: m.MediaInfoListPage,
  }));
const MediaInfoListPage = lazy(mediaInfoListPageLoader);

const mediaInfoEditPageLoader = () =>
  import("@/Site/Pages/MediaInfoPage/MediaInfoEditPage").then(m => ({
    default: m.MediaInfoEditPage,
  }));
const MediaInfoEditPage = lazy(mediaInfoEditPageLoader);

// Регистрируем все некритичные компоненты для фоновой загрузки
registerPrefetchComponents([
  // Часто используемые страницы
  aboutPageLoader,
  docsPageLoader,
  contactsPageLoader,
  commandsPageLoader,
  routesPageLoader,
  // Тяжелые страницы
  framedataPageLoader,
  pendingChangesPageLoader,
  changeDetailsPageLoader,
  randomMemePageLoader,
  randomMemeDetailsPageLoader,
  randomMemeEditPageLoader,
  cinemaQueuePageLoader,
  mediaInfoListPageLoader,
  mediaInfoEditPageLoader,
]);

// Массив основных страниц сайта с Layout
export const mainSiteRoutes: RouteConfig[] = [
  {
    path: "/",
    name: "Главная страница",
    type: "site",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <WelcomePage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/about",
    name: "О проекте",
    type: "site",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <AboutPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/docs",
    name: "Документация",
    type: "site",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <DocsPage />
        </Suspense>
      </Layout>
    ),
  },
  {
    path: "/contacts",
    name: "Контакты",
    type: "site",
    element: (
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <ContactsPage />
        </Suspense>
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
        <Suspense fallback={<PageLoader />}>
          <RoutesPage />
        </Suspense>
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
