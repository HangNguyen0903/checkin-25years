import type { Event } from "@/types/events";
import type { Guest } from "@/types/guest";
import type { Seat } from "@/types/seats";

export const defaultValuesGuest: Guest = {
  id: "",
  object: "",
  region: "",
  title: "",
  fullName: "",
  position: "",
  organization: "",
  address: "",
  email: "",
  phone: "",
  department: "",
  tableCode: "",
  status: "",
  checkin: false,
  note: "",
};

export const defaultValuesEvent: Event = {
  id: "",
  name: "",
  description: "",
};

export const defaultValuesSeat: Seat = {
  uuid: "",
  name: "",
  image: "",
  event: defaultValuesEvent,
};
