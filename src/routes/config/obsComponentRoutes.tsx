import { ADHDController } from "@/components/OBS_Components/ADHDLayout";
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
import Manager from "@/components/OBS_Components/ScreenParticles/Manager";
import CurrentTrackInfo from "@/components/OBS_Components/SoundRequest/CurrentTrack/CurrentTrackManager";
import WaifuAlerts from "@/components/OBS_Components/WaifuAlerts/WaifuAlerts";
import { OBSComponentWrapper } from "@/components/OBS_Components/wrapper";

import { RouteConfig } from "./RouteConfig";

// Массив OBS компонентов (без Layout для интеграции в OBS)
export const obsComponentRoutes: RouteConfig[] = [
  {
    path: "/adhd",
    name: "ADHD Layout",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <ADHDController />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/automessage",
    name: "Автосообщения",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <AutoMessageBillboard />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/automessage-test",
    name: "Тест автосообщений",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <AutoMessageBillboardTest />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/pyroalerts",
    name: "Pyro Алерты",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <PyroAlerts />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/randommem",
    name: "Случайные мемы",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <RandomMem />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/waifu",
    name: "Waifu Алерты",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <WaifuAlerts />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/fumofriday",
    name: "Fumo Friday",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <FumoFriday />
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
        <Manager />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/scoreboard",
    name: "Скорборд",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <Scoreboard />
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
    path: "/sr/currenttrack",
    name: "Текущий трек",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <CurrentTrackInfo />
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
        <PNGTuber />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/avatarka-fire",
    name: "Аватарка с огнем",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <AvatarWithFire />
      </OBSComponentWrapper>
    ),
  },
  {
    path: "/avatarka-fire-svg",
    name: "Аватарка с огнем (SVG)",
    type: "obs",
    element: (
      <OBSComponentWrapper>
        <AvatarWithFireSvg />
      </OBSComponentWrapper>
    ),
  },
];
