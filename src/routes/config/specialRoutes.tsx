import ScoreboardAdminPanel from "@/components/OBS_Components/Scoreboard/AdminPanel/AdminPanel";

import { RouteConfig } from "./RouteConfig";

// Массив специальных маршрутов
export const specialRoutes: RouteConfig[] = [
  {
    path: "/scoreboard-admin",
    name: "Админ панель скорборда",
    type: "special",
    element: <ScoreboardAdminPanel />,
  },
];
