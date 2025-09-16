import axios from "axios";

export const wishes = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: {
    "Content-Type": "application/json",
  },
});
