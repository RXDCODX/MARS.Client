import { lazy, Suspense } from "react";

import { OBSComponentWrapper } from "@/components/OBS_Components/wrapper";
import { OBSLazyLoader } from "@/components/shared/LazyLoader";

import { RouteConfig } from "./RouteConfig";

// Все OBS компоненты - lazy loading для оптимизации производительности
const AFKScreen = lazy(
  () => import("@/components/OBS_Components/AFKScreen/AFKScreen")
);
const ChatHorizontal = lazy(
  () => import("@/components/OBS_Components/ChatHorizontal/ChatHorizontal")
);
const ChatVertical = lazy(
  () => import("@/components/OBS_Components/ChatVertical/ChatVertical")
);
const HighliteMessage = lazy(
  () => import("@/components/OBS_Components/HighliteMessage/HighliteMessage")
);
const ChoosePath = lazy(() =>
  import("@/components/OBS_Components/SoundRequest/ChoosePath").then(m => ({
    default: m.ChoosePath,
  }))
);

// Тяжелые компоненты - lazy loading
const Credits = lazy(
  () => import("@/components/OBS_Components/Credits/Credits")
);
const ADHDController = lazy(() =>
  import("@/components/OBS_Components/ADHDLayout").then(m => ({
    default: m.ADHDController,
  }))
);
const ExplosionVideo = lazy(() =>
  import("@/components/OBS_Components/ADHDLayout/ExplosionVideo").then(m => ({
    default: m.ExplosionVideo,
  }))
);
const AutoMessageBillboard = lazy(
  () =>
    import(
      "@/components/OBS_Components/AutoMessageBillboard/AutoMessageBillboard"
    )
);
const AutoMessageBillboardTest = lazy(
  () =>
    import(
      "@/components/OBS_Components/AutoMessageBillboard/AutoMessageBillboardTest"
    )
);
const FumoFriday = lazy(() =>
  import("@/components/OBS_Components/FumoFriday").then(m => ({
    default: m.FumoFriday,
  }))
);
const GaoAlertController = lazy(
  () => import("@/components/OBS_Components/GaoAlert/GaoAlertController")
);
const MichaelJackson = lazy(
  () => import("@/components/OBS_Components/MichaelJackson")
);
const PNGTuber = lazy(() =>
  import("@/components/OBS_Components/PNGTuber").then(m => ({
    default: m.PNGTuber,
  }))
);
const AvatarWithFire = lazy(() =>
  import("@/components/OBS_Components/PNGTuber").then(m => ({
    default: m.AvatarWithFire,
  }))
);
const AvatarWithFireSvg = lazy(() =>
  import("@/components/OBS_Components/PNGTuber").then(m => ({
    default: m.AvatarWithFireSvg,
  }))
);
const PyroAlerts = lazy(
  () => import("@/components/OBS_Components/PyroAlerts/PyroAlerts")
);
const RandomMem = lazy(
  () => import("@/components/OBS_Components/RandomMem/RandomMem")
);
const Scoreboard = lazy(() => import("@/components/OBS_Components/Scoreboard"));
const Manager = lazy(
  () => import("@/components/OBS_Components/ScreenParticles/Manager")
);
const WaifuAlerts = lazy(
  () => import("@/components/OBS_Components/WaifuAlerts/WaifuAlerts")
);

// Массив OBS компонентов (без Layout для интеграции в OBS)
export const obsComponentRoutes: RouteConfig[] = [
  {
    path: "/sr/*",
    name: "SR: SoundRequest",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Suspense fallback={<OBSLazyLoader />}>
          <ChoosePath />
        </Suspense>
      </OBSComponentWrapper>
    ),
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
