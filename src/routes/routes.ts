import { lazy, type ComponentType } from "react";
import {
  Armchair,
  CalendarDays,
  // MailOpen,
  // MessageCircle,
  // QrCode,
  UsersRound,
} from "lucide-react";

const Events = lazy(() => import("../pages/Events"));
const Seats = lazy(() => import("../pages/Seats"));
const Guests = lazy(() => import("../pages/Guests"));
// const QRCodePage = lazy(() => import("../pages/QRCode"));
// const Wishes = lazy(() => import("../pages/Wishes"));
// const Message = lazy(() => import("../pages/Message"));

export interface AppRoute {
  path: string;
  element: ComponentType;
  label?: string;
  icon: React.ElementType;
  tooltip?: string;
}

export const routes: AppRoute[] = [
  {
    path: "/events",
    element: Events,
    label: "Quản lý sự kiện",
    icon: CalendarDays,
    tooltip: "Sự kiện",
  },
  {
    path: "/seats",
    element: Seats,
    label: "Quản lý sơ đồ chỗ ngồi",
    icon: Armchair,
    tooltip: "Vị trí",
  },
  {
    path: "/guests",
    element: Guests,
    label: "Quản lý danh sách khách mời",
    icon: UsersRound,
    tooltip: "Khách mời",
  },
  // {
  //   path: "/qr",
  //   element: QRCodePage,
  //   label: "QR chúc mừng",
  //   icon: QrCode,
  //   tooltip: "QR",
  // },
  // {
  //   path: "/message",
  //   element: Message,
  //   label: "Lời chúc mừng",
  //   icon: MessageCircle,
  //   tooltip: "Chúc mừng",
  // },
  // {
  //   path: "/wishes",
  //   element: Wishes,
  //   label: "Hiển thị chúc mừng",
  //   icon: MailOpen,
  //   tooltip: "Hiển thị",
  // },
];
