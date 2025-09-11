import type { Event } from "@/types/events";
import type { Guest } from "@/types/guest";
import type { Seat } from "@/types/seats";

export const mockGuests: Guest[] = [
  {
    id: "1",
    object: "Khách mời VIP",
    region: "Hà Nội",
    title: "PGS.TS",
    fullName: "Nguyễn Văn A",
    position: "Giám đốc",
    organization: "Công ty ABC",
    address: "123 Trần Duy Hưng, Hà Nội",
    email: "nguyenvana@example.com",
    phone: "0912345678",
    department: "Phòng Kinh doanh",
    tableCode: "B01",
    status: "Bình thường",
    checkin: true,
    note: "Ăn chay",
  },
  {
    id: "2",
    object: "Diễn giả",
    region: "TP. Hồ Chí Minh",
    title: "TS",
    fullName: "Trần Thị B",
    position: "Trưởng phòng",
    organization: "Đại học XYZ",
    address: "45 Nguyễn Huệ, Quận 1, TP.HCM",
    email: "tranthib@example.com",
    phone: "0987654321",
    department: "Phòng Đào tạo",
    tableCode: "C02",
    status: "Bình thường",
    checkin: false,
    note: "",
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
  { uuid: "H1DA", name: "Hàng 1 Dãy A", event: "25 năm thành lập IIG" },
  { uuid: "H2DA", name: "Hàng 1 Dãy A", event: "25 năm thành lập IIG" },
  { uuid: "H1DB", name: "Hàng 1 Dãy A", event: "25 năm thành lập IIG" },
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
