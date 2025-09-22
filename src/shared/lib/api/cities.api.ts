import { apiClient } from "~/src/features/login/lib/api/login.api";
import { GetDataInterface } from "../../model/shared.interface";

interface CityI {
  id: number;
  name: string;
}

export const getCities = async () => {
  try {
    const response =
      await apiClient.get<GetDataInterface<CityI[]>>(`/towns/get-list/`);

    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
