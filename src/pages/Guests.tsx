/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import ReactTableGridCustom from "../components/ui/Table/DataTable";
import { mockGuests } from "../mockData/guest";
import ButtonField from "../components/ui/Button/ButtonField";
import {
  Download,
  GalleryThumbnails,
  Pencil,
  Search,
  Trash2,
  Upload,
} from "lucide-react";
import type { Guest } from "../types/guest";
import InputField from "../components/ui/Input/InputField";
import Select from "../components/ui/Select/SelectField";

const Guests = () => {
  const [configPagination, setConfigPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  const [data, setData] = useState<Guest[]>([]);
  const [total] = useState(0);

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
              icon={<Upload  size={14} />}
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
        <ReactTableGridCustom<Guest>
          columns={[
            {
              key: "stt",
              name: "STT",
              renderCell({ rowIdx }) {
                const startIndex =
                  (configPagination.page - 1) * configPagination.pageSize;
                console.log("startIndex", startIndex);
                console.log("rowIdx", rowIdx);

                return <span>{startIndex + rowIdx + 1}</span>;
              },
            },
            {
              key: "object",
              name: "Đối tượng",
              renderCell: ({ row }) => {
                return (
                  <select
                    value={row.object}
                    onChange={(e) => {
                      const newObject = e.target.value;
                      setData((prev) =>
                        prev.map((r) =>
                          r.id === row.id ? { ...r, object: newObject } : r
                        )
                      );
                    }}
                    className={`px-2 py-1 rounded text-sm shadow`}
                  >
                    <option value="cstu">Cơ quan trung ương</option>
                    <option value="gddt">Sở GDĐT</option>
                    <option value="nt">Nhà trường</option>
                    <option value="dn">Doanh nghiệp</option>
                    <option value="bc">Báo chí</option>
                    <option value="khac">Khác</option>
                  </select>
                );
              },
            },
            {
              key: "region",
              name: "Khu vực",
              renderCell: ({ row }) => {
                return (
                  <select
                    value={row.region}
                    onChange={(e) => {
                      const newRegion = e.target.value;
                      setData((prev) =>
                        prev.map((r) =>
                          r.id === row.id ? { ...r, region: newRegion } : r
                        )
                      );
                    }}
                    className={`px-2 py-1 rounded text-sm shadow`}
                  >
                    <option value="cqtw">Khối Cơ quan TW</option>
                    <option value="dn">Khối Doanh nghiệp</option>
                    <option value="sabc">Khối Sở & Cơ quan Báo chí</option>
                    <option value="nt">Khối Nhà trường</option>
                  </select>
                );
              },
            },
            { key: "title", name: "Ông/Bà" },
            { key: "fullName", name: "Họ tên" },
            { key: "position", name: "Chức danh" },
            { key: "organization", name: "Tên cơ quan" },
            { key: "address", name: "Địa chỉ nhận thư tay" },
            { key: "email", name: "Email" },
            { key: "phone", name: "Số điện thoại" },
            {
              key: "department",
              name: "Phòng ban đề xuất",
              renderCell: ({ row }) => {
                return (
                  <select
                    value={row.department}
                    onChange={(e) => {
                      const newDepartment = e.target.value;
                      setData((prev) =>
                        prev.map((r) =>
                          r.id === row.id
                            ? { ...r, department: newDepartment }
                            : r
                        )
                      );
                    }}
                    className={`px-2 py-1 rounded text-sm shadow`}
                  >
                    <option value="cqtw">Dự án HCM</option>
                    <option value="dn">Sale HCM</option>
                    <option value="sabc">Sale ĐN</option>
                    <option value="nt">DA1</option>
                    <option value="nt">DA2</option>
                    <option value="nt">Kinh Doanh HN</option>
                    <option value="nt">Học viện</option>
                    <option value="nt">Ban KHTH</option>
                    <option value="nt">HCQT HN</option>
                    <option value="nt">Truyền thông</option>
                  </select>
                );
              },
            },
            { key: "tableCode", name: "Mã bàn tiệc" },
            {
              key: "status",
              name: "Trạng thái",
            },
            {
              key: "checkin",
              name: "Checkin",
              renderCell: ({ row }) => {
                return (
                  <select
                    value={row.checkin ? "true" : "false"}
                    onChange={(e) => {
                      const newCheckin = e.target.value === "true";
                      setData((prev) =>
                        prev.map((r) =>
                          r.id === row.id ? { ...r, checkin: newCheckin } : r
                        )
                      );
                    }}
                    className={`px-2 py-1 rounded text-sm shadow ${
                      row.checkin === true ? "bg-green-300" : "bg-red-300"
                    }`}
                  >
                    <option value="false">Chưa checkin</option>
                    <option value="true">Đã checkin</option>
                  </select>
                );
              },
            },
            { key: "note", name: "Ghi chú" },
            {
              key: "action",
              name: "Hành động",
              renderCell: ({ row }) => {
                return (
                  <div className="flex gap-3">
                    <button
                      onClick={() => console.log("Edit:", row)}
                      className=" text-xs text-green-500"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => console.log("Preview:", row)}
                      className="text-xs rounded  text-blue-500"
                    >
                      <GalleryThumbnails size={14} />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm("Bạn có chắc muốn xóa khách mời này?")) {
                          console.log("Delete:", row);
                        }
                      }}
                      className="text-xs text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              },
            },
          ]}
          data={data}
          page={configPagination.page}
          pageSize={configPagination.pageSize}
          total={total}
          setConfigPagination={setConfigPagination}
        />
      </div>
    </div>
  );
};
export default Guests;
