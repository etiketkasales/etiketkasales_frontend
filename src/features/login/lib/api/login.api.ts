import { AxiosError } from "axios";
import { apiClient, tryCatch } from "~/src/shared/lib/api";
import CookieUtils from "~/src/shared/lib/utils/cookies.utils";
import { ISendCode, IVerifyCode } from "~/src/features/login/model";

export const sendCode = async (phone: string) => {
  try {
    return await tryCatch(async () => {
      const res = await apiClient.post<ISendCode>(
        `/auth/send-code/`,
        {
          phone,
        },
        { skipAuth: true },
      );
      return res.data;
    });
  } catch (err: AxiosError<ISendCode> | any) {
    const error = err as AxiosError<ISendCode>;
    if (error.response) {
      return error.response.data;
    }
    console.error(err);
    throw err;
  }
};
const setCookies = (accessToken: string, refreshToken: string) => {
  CookieUtils.setCookieWithToken("auth_token", accessToken, 86400);
  CookieUtils.setCookieWithToken("refresh_token", refreshToken, 2592000);
};

export const verifyCode = async (phone: string, code: string) => {
  try {
    const res = await apiClient.post<IVerifyCode>(
      `/auth/verify-code/`,
      {
        phone,
        code,
      },
      { skipAuth: true },
    );
    setCookies(res.data.access_token, res.data.refresh_token);

    return res.data;
  } catch (err) {
    const error = err as AxiosError<IVerifyCode>;
    if (error.response) {
      throw error.response.data.message;
    }
    console.error(error);
    throw error;
  }
};

export const loginByPassword = async (phone: string, password: string) => {
  try {
    const res = await apiClient.post<IVerifyCode>(`/auth/login/`, {
      phone,
      password,
    });
    setCookies(res.data.access_token, res.data.refresh_token);
    return res.data.user || res.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const logout = async () => {
  try {
    await apiClient.post(`/auth/logout/`);
    CookieUtils.deleteCookie("auth_token");
    CookieUtils.deleteCookie("refresh_token");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
