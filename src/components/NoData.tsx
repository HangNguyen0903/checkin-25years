import { PackageOpen } from "lucide-react";

const NoData = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-6 text-center rounded-2xl border border-dashed border-gray-300 bg-gray-50">
      <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
        <PackageOpen size={40} className="text-gray-400" />
      </div>
      <h2 className="text-lg font-semibold text-gray-700">Chưa có dữ liệu</h2>
      <p className="text-sm text-gray-500 mt-1">
        Hiện tại chưa có thông tin nào được hiển thị.
      </p>
    </div>
  );
};

export default NoData;
