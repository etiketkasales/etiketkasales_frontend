import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { IFileUploadRes, IGetData } from "~/src/shared/model";

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

export const uploadProductImage = async (image: string) => {
  return await tryCatch(async () => {
    const res = await apiClient.post<IGetData<IFileUploadRes>>(
      `/upload/product-image`,
      {
        image,
      },
    );

    return res.data.data;
  });
};
