import type { Event } from "@/types/events";
import type { Guest } from "@/types/guest";
import type { Seat } from "@/types/seats";
import type { Column } from "@/types/table";
import { Tooltip } from "@mui/material";
import { BadgeCheck, SquarePen, Trash2 } from "lucide-react";

export const eventColumns: Column<Event>[] = [
  { key: "name", label: "Tên sự kiên", sortable: true },
  { key: "description", label: "Mô tả" },
  {
    key: "actions",
    label: "Thao tác",
    renderCell: (row, { onOpenModalEdit, onDelete }) => (
      <div className="flex gap-3">
        <Tooltip title="Cập nhật" placement="top">
          <SquarePen
            size={16}
            onClick={() => onOpenModalEdit(row)}
            className="text-blue-900 hover:text-blue-700 cursor-pointer"
          />
        </Tooltip>
        <Tooltip title="Xóa" placement="top">
          <Trash2
            size={16}
            onClick={() => onDelete(row)}
            className="text-red-500 hover:text-red-00 cursor-pointer"
          />
        </Tooltip>
      </div>
    ),
  },
];

export const seatColumns: Column<Seat>[] = [
  { key: "uuid", label: "Mã vị trí", sortable: true },
  { key: "name", label: "Tên vị trí", sortable: true },
  {
    key: "event",
    label: "Sự kiện",
    renderCell: (row) => <span>{row.anniversaryEventId}</span>,
  },
  { key: "image", label: "Ảnh chỗ ngồi" },
  {
    key: "actions",
    label: "Thao tác",
    renderCell: (row, { onOpenModalEdit, onDelete }) => (
      <div className="flex gap-3">
        <Tooltip title="Cập nhật" placement="top">
          <SquarePen
            size={16}
            onClick={() => onOpenModalEdit(row)}
            className="text-blue-900 hover:text-blue-700 cursor-pointer"
          />
        </Tooltip>
        <Tooltip title="Xóa" placement="top">
          <Trash2
            size={16}
            onClick={() => onDelete(row.code)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          />
        </Tooltip>
      </div>
    ),
  },
];

export const guestColumns: Column<Guest>[] = [
  { key: "fullName", label: "Họ tên" },
  { key: "title", label: "Danh xưng" },
  { key: "tableCode", label: "Mã bàn tiệc" },
  { key: "phone", label: "Số điện thoại" },
  {
    key: "checkin",
    label: "Trạng thái Checkin",
    renderCell: (row) => (
      <span>
        {row.checkin ? (
          <span className="text-green-600">Checkin</span>
        ) : (
          <span className="text-gray-500">Chưa checkin</span>
        )}
      </span>
    ),
  },
  { key: "status", label: "Trạng thái" },
  {
    key: "actions",
    label: "Thao tác",
    renderCell: (row, { onEdit, onDelete, onCheckin }) => (
      <div className="flex gap-3">
        <Tooltip title="Cập nhật" placement="top">
          <SquarePen
            size={16}
            onClick={() => onEdit(row)}
            className="text-blue-900 hover:text-blue-700 cursor-pointer"
          />
        </Tooltip>
        <Tooltip title="Xóa" placement="top">
          <Trash2
            size={16}
            onClick={() => onDelete(row.id)}
            className="text-red-500 hover:text-red-700 cursor-pointer"
          />
        </Tooltip>
        {!row?.checkin && (
          <Tooltip title="Checkin" placement="top">
            <BadgeCheck
              size={16}
              onClick={() => onCheckin(row)}
              className="text-green-900 cursor-pointer"
            />
          </Tooltip>
        )}
      </div>
    ),
  },
];
