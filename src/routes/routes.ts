import { lazy, type ComponentType } from "react";
import {
  Armchair,
  CalendarDays,
  MailOpen,
  MessageCircle,
  QrCode,
  UsersRound,
} from "lucide-react";

const Events = lazy(() => import("../pages/Events"));
const Seats = lazy(() => import("../pages/Seats"));
const Guests = lazy(() => import("../pages/Guests"));
const QRCodePage = lazy(() => import("../pages/QRCode"));
const Wishes = lazy(() => import("../pages/Wishes"));
const Message = lazy(() => import("../pages/Message"));

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
  {
    path: "/qr",
    element: QRCodePage,
    label: "QR chúc mừng",
    icon: QrCode,
  },
  {
    path: "/message",
    element: Message,
    label: "Lời chúc mừng",
    icon: MessageCircle,
  },
  {
    path: "/wishes",
    element: Wishes,
    label: "Lời chúc mừng",
    icon: MailOpen,
  },
];
