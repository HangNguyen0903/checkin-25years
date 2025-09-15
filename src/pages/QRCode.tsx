import { QRCodeCanvas } from "qrcode.react";
const QRCodePage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-bold mb-4">Quét QR để gửi lời chúc 🎉</h1>
        <QRCodeCanvas value="https://reactjs.org/" size={200} />
        <p className="mt-2 text-sm text-gray-500">''</p>
      </div>
    </div>
  );
};
export default QRCodePage;
