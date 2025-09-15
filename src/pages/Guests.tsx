/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { events, mockGuests } from "../mockData/guest";
import ButtonField from "../components/ui/Button/ButtonField";
import { Download, Plus, RefreshCcw, Send } from "lucide-react";
import type { Guest } from "../types/guest";
import InputField from "../components/ui/Input/InputField";
import Select from "../components/ui/Select/SelectField";
import DataTableGrid from "@/components/ui/Table/DataTableGrid";
import { guestColumns } from "@/features/columns";
import ModalAddGuest from "@/components/modal/ModalAddGuest";
import ModalCheckin from "@/components/modal/ModalCheckin";

const Guests = () => {
  const [data] = useState<Guest[]>(mockGuests);
  const [totalCount] = useState(0);
  const [loading] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState<string>();
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [open, setOpen] = useState(false);
  const [isCheckin, setIsCheckin] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | undefined>();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      e.target.value = "";
    }
  };

  const handleChangeEvent = (guest?: Guest) => {
    setOpen(true);
    setSelectedGuest(guest);
  };

  const handleDelete = (id: string) => {
    console.log(`Xóa thành công guest ${id}`);
  };

  const handleCheckin = (guest?: Guest) => {
    setIsCheckin(true);
    setSelectedGuest(guest);
  };

  return (
    <div className="bg-white shadow border border-gray-100 rounded-lg">
      <div className="border-b-1 border-gray-300">
        <div className="flex justify-between items-start p-4">
          <div className="space-y-2">
            <div className="flex gap-3">
              <InputField
                placeholder="Họ và tên, Số điện thoại, Mã bàn tiệc"
                width="lg:w-[300px]"
              />
              <Select
                options={events.map((ev) => ({
                  label: ev.name,
                  value: ev.name,
                }))}
                placeholder="Chọn sự kiện"
                onChange={(val) => {
                  console.log("Bạn vừa chọn sự kiện:", val);
                }}
              />
              <Select
                options={events.map((ev) => ({
                  label: ev.name,
                  value: ev.name,
                }))}
                placeholder="Trạng thái checkin"
                onChange={(val) => {
                  console.log("Bạn vừa chọn sự kiện:", val);
                }}
              />
              <Select
                options={events.map((ev) => ({
                  label: ev.name,
                  value: ev.name,
                }))}
                placeholder="Trạng thái"
                onChange={(val) => {
                  console.log("Bạn vừa chọn sự kiện:", val);
                }}
              />
              <ButtonField type="button" color="primary" text="Tìm kiếm" />
              <ButtonField
                type="button"
                color="danger"
                text="Reset"
                icon={<RefreshCcw size={16} />}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <ButtonField
              type="button"
              color="primary"
              text="Thêm mới"
              icon={<Plus size={14} />}
              onClick={() => handleChangeEvent()}
            />
            <ButtonField
              type="button"
              color="success"
              text="Gửi SMS"
              icon={<Send size={14} />}
              // onClick={() => handleChangeEvent()}
            />
            <ButtonField
              type="button"
              color="secondary"
              text="Import danh sách"
              icon={<Download size={14} />}
              onClick={handleClick}
            />
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <DataTableGrid
          columns={guestColumns}
          rows={data}
          getRowId={(row) => row.id}
          totalCount={totalCount}
          rowsPerPage={rowsPerPage}
          orderBy={orderBy}
          order={order}
          loading={loading}
          onPageChange={setPage}
          onRowsPerPageChange={setRowsPerPage}
          onSortChange={(col, dir) => {
            setOrderBy(col);
            setOrder(dir);
          }}
          page={page}
          helpers={{
            onEdit: (row: Guest) => handleChangeEvent(row),
            onDelete: (id: string) => handleDelete(id),
            onCheckin: (row: Guest) => handleCheckin(row),
          }}
        />
      </div>
      <ModalAddGuest
        open={open}
        setOpen={setOpen}
        selectedData={selectedGuest}
      />
      <ModalCheckin
        open={isCheckin}
        setOpen={setIsCheckin}
        selectedData={selectedGuest}
      />
    </div>
  );
};
export default Guests;
