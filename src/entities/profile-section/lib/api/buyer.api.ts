import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { IGetData } from "~/src/shared/model";
import { AxiosError } from "axios";
import { IUserCompany, IUserCompanyBase } from "~/src/features/user/model";

export const getCompanies = async () => {
  return await tryCatch(async () => {
    const res =
      await apiClient.get<IGetData<IUserCompany[]>>(`/users/companies`);
    return res.data.data;
  });
};

interface IErrorResponse {
  success?: boolean;
  message?: string;
  errors?: {
    [key: string]: string;
  };
}
export const addNewCompany = async (data: IUserCompanyBase) => {
  try {
    const res = await apiClient.post<IGetData<IUserCompany>>(
      `/users/companies`,
      {
        ...data,
      },
    );
    return res.data;
  } catch (err) {
    const axiosErr = err as AxiosError<IErrorResponse>;
    if (axiosErr.response) {
      return axiosErr.response.data;
    }
    console.error(err);
    throw err;
  }
};
export const deleteCompany = async (id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.delete(`/users/companies/${id}`);
    return res.data;
  });
};
