import { lazy, type JSX, type ReactNode } from "react";
import {  UsersRound  } from "lucide-react";

// const Dashboard = lazy(() => import("../pages/Dashboard"));
const Guests = lazy(() => import("../pages/Guests"));

export interface AppRoute {
  path: string;
  element: JSX.Element;
  label?: string;  
  icon?: ReactNode;    
}

export const routes: AppRoute[] = [
  // {
  //   path: "/dashboard",
  //   element: <Dashboard />,
  //   label: "Dashboard",
  //   icon:<Home/>
  // },
  {
    path: "/guests",
    element: <Guests />,
    label: "Quản lý khách mời",
    icon:<UsersRound size={16} />
  },
];
