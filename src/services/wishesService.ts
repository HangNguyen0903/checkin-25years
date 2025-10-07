import { wishes } from "@/api/wishes";
import type { Wish } from "@/types/wishes";

export const getWishes = async () => {
  const res = await wishes.get("/api/wishes");
  return res.data;
};
export const createWish = async (data: Wish) => {
  const res = await wishes.post("/api/wishes", data);
  return res.data;
};
