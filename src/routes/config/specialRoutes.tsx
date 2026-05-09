import ScoreboardAdminPanel from "@/components/OBS_Components/Scoreboard/AdminPanel/AdminPanel";
import TelegramClipboardCopyPage from "@/components/Site/Pages/TelegramClipboardCopyPage";

import { RouteConfig } from "./RouteConfig";

// Массив специальных маршрутов
export const specialRoutes: RouteConfig[] = [
  {
    path: "/telegram-copy",
    name: "Telegram copy",
    type: "special",
    element: <TelegramClipboardCopyPage />,
  },
  {
    path: "/scoreboard-admin",
    name: "Админ панель скорборда",
    type: "special",
    element: <ScoreboardAdminPanel />,
  },
];
