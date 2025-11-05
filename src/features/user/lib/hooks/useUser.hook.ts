import { useCallback } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { getProfile } from "~/src/features/user/lib/api/user.api";

import { profileChangeableFields } from "~/src/features/user/model/user.const";
import { IChangeableProfile, IProfile } from "~/src/features/user/model";

export const useUser = () => {
  const dispatch = useAppDispatch();

  const setLoading = useCallback(
    (loading: boolean) => {
      dispatch(setUser({ loadingData: loading }));
    },
    [dispatch],
  );

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

  const setUserData = useCallback(
    (data: IProfile) => {
      dispatch(setUser({ userInfo: data }));
      setEditableData(data);
    },
    [dispatch, setEditableData],
  );

  const handleGetUser = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      if (res.user) {
        setUserData(res.user);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setUserData]);

  return {
    handleGetUser,
    setUserData,
  };
};
