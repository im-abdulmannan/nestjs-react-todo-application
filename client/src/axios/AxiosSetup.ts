import axios from "axios";

export const custom_axios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
    Accept: "*/*",
    "Content-Type": "application/json",
  },
  timeout: 5000,
});
