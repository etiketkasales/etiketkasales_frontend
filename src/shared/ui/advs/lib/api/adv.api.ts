import { apiClient } from "~/src/features/login/lib/api/login.api";
import { GetDataInterface } from "~/src/shared/model/shared.interface";
import { AdvI } from "../../model/advs.interface";

export const getActiveAdvs = async () => {
  try {
    const response =
      await apiClient.get<GetDataInterface<AdvI[]>>(`/sliders/get-active/`);

    return response.data;
  } catch (err) {
    console.error(err);
  }
};
