import { apiClient } from "~/src/features/login/lib/api/login.api";
import { GetDataInterface } from "~/src/shared/model/shared.interface";
import { UserInfoI } from "~/src/features/user/model/user.interface";

export const getUser = async (user_id: string) => {
  try {
    const response = await apiClient.get<GetDataInterface<UserInfoI>>(
      `/users/get-infoByID/${user_id}`,
    );

    return response.data.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
