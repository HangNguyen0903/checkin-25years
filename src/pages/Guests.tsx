/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import ReactTableGridCustom from "../components/ui/Table/DataTable";
import { mockGuests } from "../mockData/guest";
import ButtonField from "../components/ui/Button/ButtonField";
import { Download, GalleryThumbnails, Pencil, Trash2 } from "lucide-react";
import type { Guest } from "../types/guest";

const Guests = () => {
  const [configPagination, setConfigPagination] = useState({
    page: 1,
    pageSize: 10,
  });
  console.log("configPagination", configPagination);
  const [data, setData] = useState<Guest[]>(mockGuests);
  console.log("data_data", data);
  const [total, ] = useState(0);

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

  return (
    <div className="space-y-4 bg-white p-4 border border-gray-200 rounded-xl">
      <div className="flex justify-end">
        <ButtonField
          type="button"
          color="primary"
          text="Thêm khách mời"
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
  );
};
export default Guests;
