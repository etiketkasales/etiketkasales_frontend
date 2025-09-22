import { apiClient } from "~/src/features/login/lib/api/login.api";
import { CharacterI, EtiketkaI } from "../../model/etiketka.interface";
import { GetDataInterface } from "~/src/shared/model/shared.interface";

export const getEtiketkaByUrl = async (item_url: string) => {
  try {
    const response = await apiClient.get<GetDataInterface<EtiketkaI>>(
      `/items/get-infoByURL/${item_url}`,
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getSpecificationsById = async (item_id: number) => {
  try {
    const response = await apiClient.get<GetDataInterface<CharacterI[]>>(
      `/items/get-specifications/${item_id}`,
    );
    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
