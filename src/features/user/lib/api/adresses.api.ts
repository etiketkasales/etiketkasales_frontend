import { apiClient, tryCatch } from "~/src/shared/lib/api";
import { IGetData } from "~/src/shared/model";
import {
  IAddressSuggestionResponse,
  IUserAddress,
  IUserAddressBase,
} from "../../model";
import { AxiosError } from "axios";

export const getUserAddresses = async () => {
  return await tryCatch(async () => {
    const res =
      await apiClient.get<IGetData<IUserAddress[]>>(`/users/addresses`);
    return res.data.data;
  });
};

export const setDefaultAddress = async (id: string) => {
  return await tryCatch(async () => {
    const res = await apiClient.put(`/users/addresses/${id}/default/`);
    return res.data;
  });
};

export const addNewAddress = async (data: IUserAddressBase) => {
  return await tryCatch(
    async () => {
      const res = await apiClient.post<IGetData<IUserAddress>>(
        `/users/addresses/`,
        {
          ...data,
        },
      );
      return res.data;
    },
    (err) => {
      const error = err as AxiosError<IGetData<IUserAddress>>;
      if (error.response) {
        throw error.response.data;
      }
    },
  );
};

export const deleteAddress = async (id: string) => {
  return await tryCatch(async () => {
    const res = await apiClient.delete(`/users/addresses/${id}/`);
    return res.data;
  });
};

export const getAddressSuggestions = async (q: string) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<{ cities: IAddressSuggestionResponse[] }>(
      `/users/address-cities/`,
      {
        params: {
          query: q,
        },
      },
    );

    return res.data.cities;
  });
};
