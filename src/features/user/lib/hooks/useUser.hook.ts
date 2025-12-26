import { useCallback } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { useUserCompanies } from "./useUserCompanies.hook";
import { getProfile } from "~/src/features/user/lib/api/user.api";
import { useAddresses } from "./useAddresses.hook";

import { profileChangeableFields } from "~/src/features/user/model/user.const";
import { IChangeableProfile, IProfile } from "~/src/features/user/model";

/**
 * Hook that returns functions to get user data, set user data, and
 * check if user is logged in.
 *
 * @returns {Object} - object with functions to get and set user data.
 */
export const useUser = () => {
  const dispatch = useAppDispatch();
  const { handleGetCompanies } = useUserCompanies();
  const { getAddresses } = useAddresses();
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
      await handleGetCompanies();
      await getAddresses();
      if (res.user) {
        setUserData(res.user);
      } else {
        dispatch(setUser({ isLoggedIn: false }));
      }
    } catch (err) {
      console.error(err);
      dispatch(setUser({ isLoggedIn: false }));
    } finally {
      setLoading(false);
    }
  }, [dispatch, setLoading, setUserData, getAddresses, handleGetCompanies]);

  return {
    handleGetUser,
    setUserData,
  };
};
