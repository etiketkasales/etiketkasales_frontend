import { apiClient, tryCatch } from "~/src/shared/lib/api";
import { AxiosError } from "axios";
import CookieUtils from "~/src/shared/lib/utils/cookies.utils";

import { IProfile, UserRoleType } from "~/src/features/user/model";
import { IGetDataBase } from "~/src/shared/model";

export const getProfile = async () => {
  return await tryCatch(async () => {
    const res = await apiClient.get<{ user: IProfile }>(`/users/profile/`);
    return res.data;
  });
};

interface IResponse extends IGetDataBase {
  user?: IProfile;
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  error?: string;
  missing_fields?: { field: string; label: string }[];
}
export const switchRole = async (role: UserRoleType) => {
  try {
    const res = await apiClient.post<IResponse>(`/users/switch-role/`, {
      role,
    });
    if (res.data.access_token && res.data.refresh_token) {
      CookieUtils.setCookieWithToken("auth_token", res.data.access_token);
      CookieUtils.setCookieWithToken("refresh_token", res.data.refresh_token);
    }

    return res.data;
  } catch (err) {
    const error = err as AxiosError<IResponse>;
    if (error.response) {
      return error.response.data;
    }
    console.error(err);
    throw err;
  }
};
