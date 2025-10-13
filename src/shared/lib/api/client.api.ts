import axios from "axios";

export const apiClient = axios.create({
  baseURL: process.env.SERVER_API_URL ?? process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const tryCatch = async <T>(func: () => Promise<T>) => {
  try {
    const res = await func();
    return res;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
