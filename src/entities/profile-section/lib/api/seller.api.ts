import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";

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
