import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";
import { apiClient } from "~/src/shared/lib/api/client.api";
import { GetDataInterface } from "~/src/shared/model/shared.interface";

export const getSectionItems = async (
  section_id: string,
  itemsCount: number,
) => {
  try {
    const response = await apiClient.get<GetDataInterface<EtiketkaI[]>>(
      `/items/get-listByCategoryID/${section_id}`,
      {
        params: {
          limit: itemsCount,
        },
      },
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
