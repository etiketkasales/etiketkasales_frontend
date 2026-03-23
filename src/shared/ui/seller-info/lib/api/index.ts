import axios from "axios";
import { apiClient } from "~/src/shared/lib/api";
import { IGetData } from "~/src/shared/model";
import { ISellerInfo } from "~/src/shared/ui/seller-info/model";

export const getSellerInfoById = async (id: number) => {
  const n = Math.floor(Number(id));
  if (!Number.isFinite(n) || n <= 0) return null;

  try {
    const res = await apiClient.get<IGetData<ISellerInfo>>(`/sellers/${n}`);
    return res.data.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 404) return null;
    console.error(e);
    throw e;
  }
};
