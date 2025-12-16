import { AxiosError } from "axios";
import { setCookies } from "~/src/features/login/lib/api/login.api";
import { IProfile } from "~/src/features/user/model";
import { apiClient, tryCatch } from "~/src/shared/lib/api";

export * from "./products";
export * from "./orders";

interface IAgreementRes {
  success: boolean;
  error?: string;
  terms?: string;
  version?: string;
  updated_at?: string;
}
export const getSellAgreement = async () => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IAgreementRes>(`/seller/agreement-terms/`);
    return res.data.terms;
  });
};

interface IDeleteResponse {
  success: boolean;
  message?: string;
  products_deactivated: number;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  user: IProfile;
}
export const deleteShopProfile = async () => {
  return await tryCatch(
    async () => {
      const res = await apiClient.delete<IDeleteResponse>(`/seller/profile/`);
      setCookies({
        refresh: res.data.refresh_token,
        access: res.data.access_token,
      });
      return res.data;
    },
    (err: any) => {
      const error = err as AxiosError<IDeleteResponse>;
      if (error.response) {
        throw error.response.data;
      }
    },
  );
};
