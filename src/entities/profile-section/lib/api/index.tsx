import { apiClient, tryCatch } from "~/src/shared/lib/api/client.api";
import { IGetDataBase } from "~/src/shared/model";
import { IChangeableProfile, IProfile } from "~/src/features/user/model";

interface IResponse extends IGetDataBase {
  user: IProfile;
}
export const changePersonalData = async (data: IChangeableProfile) => {
  return await tryCatch(async () => {
    const res = await apiClient.put<IResponse>(`/users/profile`, {
      ...data,
    });
    return res.data;
  });
};
