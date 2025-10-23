import { lazy, Suspense } from "react";

import { OBSComponentWrapper } from "@/components/OBS_Components/wrapper";
import { OBSLazyLoader } from "@/components/shared/LazyLoader";

import { registerPrefetchComponents } from "../utils/prefetchRoutes";
import { RouteConfig } from "./RouteConfig";

// Все OBS компоненты - lazy loading для оптимизации производительности
const afkScreenLoader = () =>
  import("@/components/OBS_Components/AFKScreen/AFKScreen");
const AFKScreen = lazy(afkScreenLoader);

const chatHorizontalLoader = () =>
  import("@/components/OBS_Components/ChatHorizontal/ChatHorizontal");
const ChatHorizontal = lazy(chatHorizontalLoader);

const chatVerticalLoader = () =>
  import("@/components/OBS_Components/ChatVertical/ChatVertical");
const ChatVertical = lazy(chatVerticalLoader);

const highliteMessageLoader = () =>
  import("@/components/OBS_Components/HighliteMessage/HighliteMessage");
const HighliteMessage = lazy(highliteMessageLoader);

const choosePathLoader = () =>
  import("@/components/OBS_Components/SoundRequest/ChoosePath").then(m => ({
    default: m.ChoosePath,
  }));
const ChoosePath = lazy(choosePathLoader);

// Тяжелые компоненты - lazy loading
const creditsLoader = () =>
  import("@/components/OBS_Components/Credits/Credits");
const Credits = lazy(creditsLoader);

const adhdControllerLoader = () =>
  import("@/components/OBS_Components/ADHDLayout").then(m => ({
    default: m.ADHDController,
  }));
const ADHDController = lazy(adhdControllerLoader);

const explosionVideoLoader = () =>
  import("@/components/OBS_Components/ADHDLayout/ExplosionVideo").then(m => ({
    default: m.ExplosionVideo,
  }));
const ExplosionVideo = lazy(explosionVideoLoader);

const autoMessageBillboardLoader = () =>
  import(
    "@/components/OBS_Components/AutoMessageBillboard/AutoMessageBillboard"
  );
const AutoMessageBillboard = lazy(autoMessageBillboardLoader);

const autoMessageBillboardTestLoader = () =>
  import(
    "@/components/OBS_Components/AutoMessageBillboard/AutoMessageBillboardTest"
  );
const AutoMessageBillboardTest = lazy(autoMessageBillboardTestLoader);

const fumoFridayLoader = () =>
  import("@/components/OBS_Components/FumoFriday").then(m => ({
    default: m.FumoFriday,
  }));
const FumoFriday = lazy(fumoFridayLoader);

const gaoAlertControllerLoader = () =>
  import("@/components/OBS_Components/GaoAlert/GaoAlertController");
const GaoAlertController = lazy(gaoAlertControllerLoader);

const michaelJacksonLoader = () =>
  import("@/components/OBS_Components/MichaelJackson");
const MichaelJackson = lazy(michaelJacksonLoader);

const pngTuberLoader = () =>
  import("@/components/OBS_Components/PNGTuber").then(m => ({
    default: m.PNGTuber,
  }));
const PNGTuber = lazy(pngTuberLoader);

const avatarWithFireLoader = () =>
  import("@/components/OBS_Components/PNGTuber").then(m => ({
    default: m.AvatarWithFire,
  }));
const AvatarWithFire = lazy(avatarWithFireLoader);

const avatarWithFireSvgLoader = () =>
  import("@/components/OBS_Components/PNGTuber").then(m => ({
    default: m.AvatarWithFireSvg,
  }));
const AvatarWithFireSvg = lazy(avatarWithFireSvgLoader);

const pyroAlertsLoader = () =>
  import("@/components/OBS_Components/PyroAlerts/PyroAlerts");
const PyroAlerts = lazy(pyroAlertsLoader);

const randomMemLoader = () =>
  import("@/components/OBS_Components/RandomMem/RandomMem");
const RandomMem = lazy(randomMemLoader);

const scoreboardLoader = () => import("@/components/OBS_Components/Scoreboard");
const Scoreboard = lazy(scoreboardLoader);

const managerLoader = () =>
  import("@/components/OBS_Components/ScreenParticles/Manager");
const Manager = lazy(managerLoader);

const waifuAlertsLoader = () =>
  import("@/components/OBS_Components/WaifuAlerts/WaifuAlerts");
const WaifuAlerts = lazy(waifuAlertsLoader);

// Регистрируем OBS компоненты для фоновой загрузки
// Эти компоненты загружаются редко, поэтому у них низкий приоритет
registerPrefetchComponents([
  // Легкие компоненты
  afkScreenLoader,
  chatHorizontalLoader,
  chatVerticalLoader,
  highliteMessageLoader,
  // Тяжелые компоненты
  choosePathLoader,
  creditsLoader,
  adhdControllerLoader,
  explosionVideoLoader,
  autoMessageBillboardLoader,
  autoMessageBillboardTestLoader,
  fumoFridayLoader,
  gaoAlertControllerLoader,
  michaelJacksonLoader,
  pngTuberLoader,
  avatarWithFireLoader,
  avatarWithFireSvgLoader,
  pyroAlertsLoader,
  randomMemLoader,
  scoreboardLoader,
  managerLoader,
  waifuAlertsLoader,
]);

// Массив OBS компонентов (без Layout для интеграции в OBS)
export const obsComponentRoutes: RouteConfig[] = [
  {
    path: "/sr/*",
    name: "SR: SoundRequest",
    type: "obs",
    element: <ChoosePath />,
  },
  {
    path: "/MichaelJackson",
    name: "Michael Jackson",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <MichaelJackson />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/credits",
    name: "Титры (RXDCODX)",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <Credits />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/gaoalert",
    name: "Гао алертс",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <GaoAlertController />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/adhd",
    name: "ADHD Layout",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <ADHDController />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/automessage",
    name: "Автосообщения",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <AutoMessageBillboard />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/automessage-test",
    name: "Тест автосообщений",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <AutoMessageBillboardTest />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/pyroalerts",
    name: "Pyro Алерты",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <PyroAlerts />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/randommem",
    name: "Случайные мемы",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <RandomMem />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/waifu",
    name: "Waifu Алерты",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <WaifuAlerts />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/fumofriday",
    name: "Fumo Friday",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <FumoFriday />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/highlite",
    name: "Подсветка сообщений",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <HighliteMessage />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/confetti",
    name: "Конфетти",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <Manager />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/scoreboard",
    name: "Скорборд",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <Scoreboard />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/chath",
    name: "Чат горизонтальный",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <ChatHorizontal />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/chatv",
    name: "Чат вертикальный",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <ChatVertical />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/afkscreen",
    name: "AFK экран",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <AFKScreen />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/avatarka",
    name: "PNG Tuber",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <PNGTuber />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/avatarka-fire",
    name: "Аватарка с огнем",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <AvatarWithFire />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/avatarka-fire-svg",
    name: "Аватарка с огнем (SVG)",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <AvatarWithFireSvg />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/explosion",
    name: "Explosion",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <ExplosionVideo />
        </Suspense>
      </OBSComponentWrapper>
    ),
  },
];
