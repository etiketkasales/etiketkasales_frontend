import { useCallback, useState } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import {
  clearUserData,
  setNeedRemember,
} from "~/src/app/store/reducers/user.slice";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { logout } from "../api/login.api";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleClearUserData = useCallback(() => {
    dispatch(clearUserData());
    dispatch(setNeedRemember(false));
  }, [dispatch]);

  const handleLogout = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      setErrBool: setError,
      callback: async () => {
        await logout().then(() => handleClearUserData());
      },
    });
  }, [handleClearUserData]);

  return {
    handleLogout,
    loading,
    error,
  };
};
