import { Loader2 } from "lucide-react";

const LoadingScreen = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-10 w-10 animate-spin text-blue-600" />
        <span className="text-gray-700 font-medium">⏳ Đang tải...</span>
      </div>
    </div>
  );
};

export default LoadingScreen;
