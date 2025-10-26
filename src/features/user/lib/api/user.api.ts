import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";

import { IProfile } from "~/src/features/user/model/user.interface";

export const getProfile = async () => {
  return await tryCatch(async () => {
    const res = await apiClient.get<{ user: IProfile }>(`/users/profile`);

    return res.data;
  });
};
