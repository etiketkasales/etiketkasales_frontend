import { apiClient, tryCatch } from "~/src/shared/lib/api";
import { IGetData } from "~/src/shared/model";
import { ISellerInfo } from "~/src/shared/ui/seller-info/model";

export const getSellerInfoById = async (id: number) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<IGetData<ISellerInfo>>(`/sellers/${id}/`);
    return res.data.data;
  });
};
