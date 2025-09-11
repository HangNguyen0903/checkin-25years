// features/users/columns.tsx

import type { Event } from "@/types/events";
import type { Guest } from "@/types/guest";
import type { Seat } from "@/types/seats";
import type { Column } from "@/types/table";
import { BadgeCheck, SquarePen, Trash2 } from "lucide-react";

export const seatColumns: Column<Seat>[] = [
  { key: "uuid", label: "Mã vị trí", sortable: true },
  { key: "name", label: "Tên vị trí", sortable: true },
  { key: "event", label: "Sự kiện" },
  { key: "image", label: "Ảnh chỗ ngồi" },
  {
    key: "actions",
    label: "Actions",
    renderCell: () => (
      <div className="flex gap-3">
        <SquarePen
          size={16}
          onClick={() => alert(`Edit`)}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
        />
        <Trash2
          size={16}
          onClick={() => alert(`Edit`)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        />
      </div>
    ),
  },
];

export const guestColumns: Column<Guest>[] = [
  { key: "fullName", label: "Họ tên" },
  { key: "title", label: "Danh xưng" },
  { key: "tableCode", label: "Mã bàn tiệc" },
  { key: "phone", label: "Số điện thoại" },
  { key: "status", label: "Trạng thái" },
  {
    key: "checkin",
    label: "Checkin",
    renderCell: (row, { onChangeCheckin }) => (
      <select
        value={row.checkin ? "true" : "false"}
        onChange={(e) => onChangeCheckin?.(row.id, e.target.value === "true")}
        className={`px-2 py-1 rounded text-sm shadow focus:outline-none ${
          row.checkin ? "bg-green-300" : "bg-red-300"
        }`}
      >
        <option value="false">Chưa checkin</option>
        <option value="true">Đã checkin</option>
      </select>
    ),
  },
  {
    key: "actions",
    label: "Actions",
    renderCell: () => (
      <div className="flex gap-3">
        <SquarePen
          size={16}
          onClick={() => alert(`Edit`)}
          className="text-blue-500 hover:text-blue-700 cursor-pointer"
        />
        <Trash2
          size={16}
          onClick={() => alert(`Edit`)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        />
        <BadgeCheck
          size={16}
          onClick={() => alert(`Edit`)}
          className="text-blue-900 cursor-pointer"
        />
      </div>
    ),
  },
];

export const eventColumns: Column<Event>[] = [
  { key: "name", label: "Tên sự kiên", sortable: true },
  { key: "description", label: "Mô tả" },
  {
    key: "actions",
    label: "Actions",
    renderCell: (row, { onOpenModalEdit, onDelete }) => (
      <div className="flex gap-3">
        <SquarePen
          size={16}
         onClick={() => onOpenModalEdit(row)}
          className="text-blue-900 hover:text-blue-700 cursor-pointer"
        />
        <Trash2
          size={16}
          onClick={() => onDelete(row.id)}
          className="text-red-500 hover:text-red-00 cursor-pointer"
        />
      </div>
    ),
  },
];
