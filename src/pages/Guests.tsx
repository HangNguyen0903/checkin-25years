/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { mockGuests } from "../mockData/guest";
import ButtonField from "../components/ui/Button/ButtonField";
import {
  Download,
  Search,
  Upload,
} from "lucide-react";
import type { Guest } from "../types/guest";
import InputField from "../components/ui/Input/InputField";
import Select from "../components/ui/Select/SelectField";
import DataTableGrid from "@/components/ui/Table/DataTableGrid";
import { guestColumns } from "@/features/columns";

const Guests = () => {
  // const [configPagination, setConfigPagination] = useState({
  //   page: 1,
  //   pageSize: 10,
  // });
  const [data, setData] = useState<Guest[]>(mockGuests);
  // const [total] = useState(0);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // onImport(file);
      e.target.value = "";
    }
  };

  const [selected, setSelected] = useState<string | number>("");

  return (
    <div className="space-y-4 p-2 ">
      <div className="bg-white shadow border border-gray-100 rounded-md p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            {" "}
            <InputField
              label=""
              type="text"
              placeholder="Nhập Họ tên, mã bàn tiệc"
              leftIcon={<Search size={16} />}
              width="400px"
            />
            <Select
              options={[
                { label: "Tuỳ chọn 1", value: "1" },
                { label: "Tuỳ chọn 2", value: "2" },
                { label: "Tuỳ chọn 3", value: "3" },
              ]}
              value={selected}
              onChange={setSelected}
              placeholder="Chọn đối tượng"
            />
            <Select
              options={[
                { label: "Cơ quan trung ương", value: "cstu" },
                { label: "Sở GDĐT", value: "gddt" },
                { label: "Nhà trường", value: "nt" },
              ]}
              value={selected}
              onChange={setSelected}
              placeholder="Chọn khu vực"
            />
            <Select
              options={[
                { label: "Tuỳ chọn 1", value: "1" },
                { label: "Tuỳ chọn 2", value: "2" },
                { label: "Tuỳ chọn 3", value: "3" },
              ]}
              value={selected}
              onChange={setSelected}
              placeholder="Chọn trạng thái"
            />
            <Select
              options={[
                { label: "Tuỳ chọn 1", value: "1" },
                { label: "Tuỳ chọn 2", value: "2" },
                { label: "Tuỳ chọn 3", value: "3" },
              ]}
              value={selected}
              onChange={setSelected}
              placeholder="Checkin"
            />
          </div>

          <div className="flex gap-2">
            <ButtonField
              type="button"
              color="secondary"
              text="Import khách mời"
              icon={<Download size={14} />}
              onClick={handleClick}
            />
            <ButtonField
              type="button"
              color="success"
              text="Export Báo cáo"
              icon={<Upload size={14} />}
              onClick={handleClick}
            />
          </div>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      </div>
      <div className="bg-white shadow border border-gray-100 rounded-lg p-6">
        <DataTableGrid
          columns={guestColumns}
          rows={data}
          getRowId={(row) => row.id}
          helpers={{
            onChangeCheckin: (id: string, checked: boolean) => {
              setData((prev) =>
                prev.map((r) => (r.id === id ? { ...r, checkin: checked } : r))
              );
            },
          }}
        />
      </div>
    </div>
  );
};
export default Guests;
