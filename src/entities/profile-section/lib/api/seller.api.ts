import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { IGetData } from "~/src/shared/model";

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

export interface IUploadRes {
  upload_id: number;
  filename: string;
  original_name: string;
  size: number;
  type: string;
  url: string;
  thumbnail: string;
}
export const uploadProductImage = async (image: File) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<IGetData<IUploadRes>>(
      `/upload/product-image`,
      {
        image,
      },
    );

    return res.data.data.upload_id;
  });
};
