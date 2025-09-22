import { apiClient } from "~/src/features/login/lib/api/login.api";
import { IChangeUserData } from "../../model/profile.interface";

export const changeUserData = async (
  data: IChangeUserData,
  user_id: number,
) => {
  try {
    const response = await apiClient.put(`/users/update-mainInfo/`, {
      id: user_id,
      ...data,
    });

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
