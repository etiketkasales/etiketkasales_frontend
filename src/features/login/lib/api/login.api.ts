import { AxiosError } from "axios";
import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { ISendCode, IVerifyCode } from "~/src/features/login/model";
import CookieUtils from "~/src/shared/lib/utils/cookies.utils";

export const sendCode = async (phone: string) => {
  try {
    return await tryCatch(async () => {
      const res = await apiClient.post<ISendCode>(`/auth/send-code/`, {
        phone,
      });
      return res.data;
    });
  } catch (err: AxiosError<ISendCode> | any) {
    const error = err as AxiosError<ISendCode>;
    if (error.response) {
      return error.response.data;
    }
    console.error(err);
  }
};

export const verifyCode = async (phone: string, code: string) => {
  try {
    const res = await apiClient.post<IVerifyCode>(`/auth/verify-code/`, {
      phone,
      code,
    });
    CookieUtils.setCookieWithToken("auth_token", res.data.token);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<ISendCode>;
    if (error.response) {
      return error.response.data;
    }
    console.error(err);
  }
};
