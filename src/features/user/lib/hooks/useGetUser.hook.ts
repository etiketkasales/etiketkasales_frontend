import { useCallback } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { getProfile } from "~/src/features/user/lib/api/user.api";

export const useGetUser = () => {
  const dispatch = useAppDispatch();
  const handleGetUser = useCallback(async () => {
    try {
      const res = await getProfile();
      if (res.user) {
        dispatch(
          setUser({
            userInfo: res.user,
          }),
        );
      }
    } catch (err) {
      console.error(err);
    }
  }, [dispatch]);

  return {
    handleGetUser,
  };
};
