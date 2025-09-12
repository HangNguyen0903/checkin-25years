import type { Event } from "@/types/events";
import type { Guest } from "@/types/guest";
import type { Seat } from "@/types/seats";

export const mockGuests: Guest[] = [
  {
    id: "1",
    object: "TW",
    region: "Hà Nội",
    title: "PGS.TS",
    fullName: "Nguyễn Văn A",
    position: "KTW",
    organization: "Công ty ABC",
    address: "123 Trần Duy Hưng, Hà Nội",
    email: "nguyenvana@example.com",
    phone: "0912345678",
    department: "DAHCM",
    tableCode: "B01",
    status: "BT",
    checkin: true,
    note: "Ăn chay",
  },
  {
    id: "2",
    object: "GDĐT",
    region: "TP. Hồ Chí Minh",
    title: "TS",
    fullName: "Trần Thị B",
    position: "KDN",
    organization: "Đại học XYZ",
    address: "45 Nguyễn Huệ, Quận 1, TP.HCM",
    email: "tranthib@example.com",
    phone: "0987654321",
    department: "SHCM",
    tableCode: "C02",
    status: "DC",
    checkin: false,
    note: "",
    fullName_change: "Trần Văn AB",
    phone_change: "0987654321",
  },
  {
    id: "3",
    object: "Khách mời",
    region: "Đà Nẵng",
    title: "Ông",
    fullName: "Lê Văn C",
    position: "Phó giám đốc",
    organization: "Công ty DEF",
    address: "89 Bạch Đằng, Đà Nẵng",
    email: "levanc@example.com",
    phone: "0901234567",
    department: "Phòng Nhân sự",
    tableCode: "A03",
    status: "Thêm mới",
    checkin: false,
    note: "Không tham dự",
  },
  {
    id: "4",
    object: "Ban tổ chức",
    region: "Hà Nội",
    title: "Bà",
    fullName: "Phạm Thị D",
    position: "Thư ký",
    organization: "Công ty GHI",
    address: "56 Láng Hạ, Hà Nội",
    email: "phamthid@example.com",
    phone: "0934567890",
    department: "Phòng Hành chính",
    tableCode: "D01",
    status: "Điều chỉnh thông tin",
    checkin: true,
    note: "",
  },
];

export const seats: Seat[] = [
  {
    uuid: "H1DA",
    name: "Hàng 1 Dãy A",
    event: { id: "SK01", name: "25 năm thành lập IIG" },
  },
  {
    uuid: "H2DA",
    name: "Hàng 1 Dãy A",
    event: { id: "SK02", name: "30 năm thành lập IIG" },
  },
  {
    uuid: "H1DB",
    name: "Hàng 1 Dãy A",
    event: { id: "SK03", name: "35 năm thành lập IIG" },
  },
];

export const events: Event[] = [
  {
    id: "SK01",
    name: "25 năm thành lập IIG",
    description: "Lễ kỷ niệm 25 năm thành lập IIG diễn ra tại HN",
  },
  {
    id: "SK02",
    name: "30 năm thành lập IIG",
    description: "Lễ kỷ niệm 25 năm thành lập IIG diễn ra tại HN",
  },
  {
    id: "SK03",
    name: "35 năm thành lập IIG",
    description: "Lễ kỷ niệm 25 năm thành lập IIG diễn ra tại HN",
  },
];
