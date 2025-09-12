import { lazy, type ComponentType } from "react";
import { Armchair, CalendarDays, UsersRound } from "lucide-react";

const Events = lazy(() => import("../pages/Events"));
const Seats = lazy(() => import("../pages/Seats"));
const Guests = lazy(() => import("../pages/Guests"));

export interface AppRoute {
  path: string;
  element: ComponentType;
  label?: string;
  icon: React.ElementType;
}

export const routes: AppRoute[] = [
  {
    path: "/events",
    element: Events,
    label: "Quản lý sự kiện",
    icon: CalendarDays,
  },
  {
    path: "/seats",
    element: Seats,
    label: "Quản lý sơ đồ chỗ ngồi",
    icon: Armchair,
  },
  {
    path: "/guests",
    element: Guests,
    label: "Quản lý danh sách khách mời",
    icon: UsersRound,
  },
];
