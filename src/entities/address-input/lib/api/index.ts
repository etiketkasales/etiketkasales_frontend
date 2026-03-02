import { IAddressSuggestionResponse } from "~/src/features/user/model";
import { apiClient, tryCatch } from "~/src/shared/lib";

export const getAddressSuggestions = async (q: string) => {
  return await tryCatch(async () => {
    const res = await apiClient.get<{
      suggestions: IAddressSuggestionResponse[];
    }>(`/address/suggest/`, {
      params: {
        query: q,
      },
    });

    return res.data.suggestions;
  });
};
