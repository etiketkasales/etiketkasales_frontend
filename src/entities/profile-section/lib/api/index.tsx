import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { IGetDataBase } from "~/src/shared/model";
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

interface IOrdersResponse extends IGetDataBase {
  orders: IOrder[];
}
export const getOrders = async () => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IOrdersResponse>(`/users/orders/`);
    return res.data;
  });
};

export * from "./buyer.api";
export * from "./seller.api";
