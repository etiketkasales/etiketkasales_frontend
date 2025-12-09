import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { IGetData } from "~/src/shared/model";
import { ISuggestedAddress, IUserAddress, IUserAddressBase } from "../../model";

export const getUserAddresses = async () => {
  return await tryCatch(async () => {
    const res =
      await apiClient.get<IGetData<IUserAddress[]>>(`/users/addresses/`);
    return res.data.data;
  });
};

export const setDefaultAddress = async (id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.put(`/users/addresses/${id}/default/`);
    return res.data;
  });
};

export const addNewAddress = async (data: IUserAddressBase) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<IGetData<IUserAddress>>(
      `/users/addresses/`,
      {
        ...data,
      },
    );
    return res.data;
  });
};

export const deleteAddress = async (id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.delete(`/users/addresses/${id}/`);
    return res.data;
  });
};

export const getAddressSuggestions = async (q: string, limit?: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<ISuggestedAddress[]>>(
      `/users/address-suggestions/`,
      {
        params: {
          query: q,
          limit: limit || 5,
        },
      },
    );

    return res.data.data;
  });
};
