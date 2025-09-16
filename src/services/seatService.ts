/* eslint-disable @typescript-eslint/no-explicit-any */
import { seat } from "@/api/seats";
import type { Seat } from "@/types/seats";

export const getSeats = async (params?: any) => {
  const res = await seat.get("/api/seats/paged-list", { params });
  return res.data;
};

export const createSeat = async (data: Seat) => {
  const res = await seat.post("/api/seats", data);
  return res.data;
};
