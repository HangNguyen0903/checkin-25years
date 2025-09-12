import { seatColumns } from "@/features/columns";
import { events, seats } from "@/mockData/guest";
import DataTableGrid from "../components/ui/Table/DataTableGrid";
import InputField from "@/components/ui/Input/InputField";
import ButtonField from "@/components/ui/Button/ButtonField";
import { Plus, RefreshCcw } from "lucide-react";
import { useState } from "react";
import ModalAddSeat from "@/components/modal/ModalAddSeat";
import type { Seat } from "@/types/seats";
import Select from "@/components/ui/Select/SelectField";

const Seats = () => {
  const [open, setOpen] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState<Seat | undefined>();

  const handleChangeEvent = (event?: Seat) => {
    setOpen(true);
    setSelectedSeat(event);
  };

  const handleDelete = (id: string) => {
    console.log(`Xóa thành công ${id}`);
  };

  return (
    <div className="bg-white shadow border border-gray-100 rounded-lg">
      <div className="border-b-1 border-gray-300">
        <div className="flex justify-between items-start p-4">
          <div className="flex gap-2">
            <InputField placeholder="Nhập Tên vị trí, Mã vị trí" />
            <Select
              options={events.map((ev) => ({
                label: ev.name,
                value: ev.id,
              }))}
              placeholder="Chọn sự kiện"
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
          <div className="">
            <ButtonField
              type="button"
              color="primary"
              text="Thêm mới"
              icon={<Plus size={14} />}
              onClick={() => handleChangeEvent()}
            />
          </div>
        </div>
      </div>
      <div className="p-4">
        <DataTableGrid
          columns={seatColumns}
          rows={seats}
          getRowId={(row) => row.uuid}
          helpers={{
            onOpenModalEdit: (row: Seat) => handleChangeEvent(row),
            onDelete: (id: string) => handleDelete(id),
          }}
        />
      </div>
      <ModalAddSeat open={open} setOpen={setOpen} selectedData={selectedSeat} />
    </div>
  );
};
export default Seats;
