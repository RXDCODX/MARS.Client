import ScoreboardAdminPanel from "@/components/OBS_Components/Scoreboard/AdminPanel/AdminPanel";

import { LinktreeMenu } from "../LinkTree/LinkTreeMenu";
import { RouteConfig } from "./RouteConfig";

// Массив специальных маршрутов
export const specialRoutes: RouteConfig[] = [
  {
    path: "/scoreboard-admin",
    name: "Админ панель скорборда",
    type: "special",
    element: <ScoreboardAdminPanel />,
  },
  {
    path: "/linktree",
    name: "Linktree меню",
    type: "special",
    element: <LinktreeMenu />,
  },
];
