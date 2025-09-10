export interface Guest {
  id: string;
  object: string;
  region: string;
  title: string;
  fullName: string;
  position: string;
  organization: string;
  address: string;
  email: string;
  phone: string;
  department: string;
  tableCode: string;
  status: string;
  checkin: boolean;
  note?: string;
}
