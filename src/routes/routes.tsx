import { lazy, type JSX, type ReactNode } from "react";
import {  Armchair, CalendarDays, UsersRound  } from "lucide-react";
import Seating from "../pages/Seats";
import Events from "../pages/Events";

// const Dashboard = lazy(() => import("../pages/Dashboard"));
const Guests = lazy(() => import("../pages/Guests"));

export interface AppRoute {
  path: string;
  element: JSX.Element;
  label?: string;  
  icon?: ReactNode;    
}

export const routes: AppRoute[] = [
  {
    path: "/events",
    element: <Events />,
    label: "Quản lý sự kiện",
    icon:<CalendarDays />
  },
  {
    path: "/seating-chart",
    element: <Seating />,
    label: "Quản lý sơ đồ chỗ ngồi",
    icon:<Armchair />
  },
  {
    path: "/guests",
    element: <Guests />,
    label: "Quản lý danh sách khách mời",
    icon:<UsersRound />
  },
];
