import axios from "axios";
import { GetDataInterface } from "~/src/shared/model/shared.interface";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const sendPhone = async (phone: string, need_remember: boolean) => {
  try {
    const response = await apiClient.post(`/users/send-sms_code/`, {
      phone,
    });
    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const sendCode = async (code: string, phone: string) => {
  try {
    const response = await apiClient.post<
      GetDataInterface<{ user_id?: string }>
    >(`/users/check-sms_code/`, {
      code,
      phone,
    });

    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
