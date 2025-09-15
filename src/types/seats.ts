import type { Event } from "./events";

export interface Seat {
  uuid: string;
  name: string;
  image?: string;
  event: Event;
}
