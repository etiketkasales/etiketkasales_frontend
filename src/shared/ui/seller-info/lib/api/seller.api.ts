import { apiClient } from "~/src/features/login/lib/api/login.api";
import { ReponseInterface } from "~/src/shared/model/shared.interface";
import { SellerI } from "~/src/shared/ui/seller-info/model/seller.interface";

export const getSeller = async (seller_id: number) => {
  try {
    const response = await apiClient.get<ReponseInterface<SellerI>>(
      `/sellers/get-infoInfoByID/${seller_id}`,
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
