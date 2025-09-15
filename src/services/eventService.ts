import { event } from "@/api/events";
import type { Event, EventsParams } from "@/types/events";


export const getEvents = async (params?: EventsParams) => {
  const res = await event.get("/api/events", { params });
  return res.data;
};

export const createEvent = async (data: Event) => {
  const res = await event.post("/api/events", data);
  return res.data;
};

export const updateEvent = async (id: string, data: Event) => {
  const res = await event.put(`/api/events/${id}`, data);
  return res.data;
};

export const deleteEvent = async (id: string) => {
  const res = await event.delete(`/api/events/${id}`);
  return res.data;
};
