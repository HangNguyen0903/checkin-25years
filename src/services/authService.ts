/* eslint-disable @typescript-eslint/no-explicit-any */
import { login } from "@/api/auth";
import type { LoginFormInputs } from "@/types/auth";

export const loginUser = async (data: LoginFormInputs) => {
  try {
    const res = await login.post("/api/auth/login", data);
    return res.data; 
  } catch (error: any) {
    throw error.response?.data || { detail: "Lỗi không xác định" };
  }
};