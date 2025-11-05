import { useCallback } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { getProfile } from "~/src/features/user/lib/api/user.api";

import { profileChangeableFields } from "~/src/features/user/model/user.const";
import { IChangeableProfile, IProfile } from "~/src/features/user/model";

export const useGetUser = () => {
  const dispatch = useAppDispatch();

  const setEditableData = useCallback(
    (data: IProfile) => {
      const editableData = Object.fromEntries(
        Object.entries(data).filter(([key]) =>
          profileChangeableFields.includes(key as keyof IProfile),
        ),
      );
      dispatch(
        setUser({ changeableUserInfo: editableData as IChangeableProfile }),
      );
    },
    [dispatch],
  );

  const handleGetUser = useCallback(async () => {
    try {
      const res = await getProfile();
      if (res.user) {
        dispatch(
          setUser({
            userInfo: res.user,
          }),
        );
        setEditableData(res.user);
      }
    } catch (err) {
      console.error(err);
    }
  }, [dispatch, setEditableData]);

  return {
    handleGetUser,
  };
};
