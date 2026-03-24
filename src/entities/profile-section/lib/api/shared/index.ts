import { apiClient, tryCatch } from "~/src/shared/lib/api";
import { AxiosResponse } from "axios";
import { IFileUploadRes, IGetData, IGetDataBase } from "~/src/shared/model";
import { IChangeableProfile, IProfile } from "~/src/features/user/model";
import { IOrder } from "~/src/entities/profile-section/model";

interface IResponse extends IGetDataBase {
  user: IProfile;
}
export const changePersonalData = async (data: IChangeableProfile) => {
  return await tryCatch(async () => {
    const res = await apiClient.put<IResponse>(`/users/profile/`, {
      ...data,
    });
    return res.data;
  });
};

interface ICompanyLookupData {
  name?: string | null;
  short_name?: string | null;
  inn?: string | null;
  kpp?: string | null;
  ogrn?: string | null;
  legal_address?: string | null;
}

/**
 * Lookup организации по ИНН (DaData). GET /v1/users/companies/lookup?inn=
 */
export type CompanyLookupApiResult = IGetDataBase & {
  data?: ICompanyLookupData | null;
};

export const lookupCompanyByInn = async (
  inn: string,
): Promise<CompanyLookupApiResult> => {
  const res: AxiosResponse<CompanyLookupApiResult> = await apiClient.get(
    `/users/companies/lookup/`,
    {
      params: { inn },
      // Иначе axios кидает AxiosError и теряется message из тела (404 и т.п.)
      validateStatus: (status) =>
        (status >= 200 && status < 300) || status === 400 || status === 404,
    },
  );
  return res.data;
};

interface IOrdersResponse extends IGetDataBase {
  orders: IOrder[];
}
export const getOrders = async () => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IOrdersResponse>(`/users/orders/`);
    return res.data;
  });
};

export const uploadAvatar = async (data: FormData) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<IGetData<IFileUploadRes>>(
      `/upload/user-avatar`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return res.data.data;
  });
};
