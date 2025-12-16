import { useCallback, useState } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import {
  clearUserData,
  setNeedRemember,
} from "~/src/app/store/reducers/user.slice";
import { promiseWrapper } from "~/src/shared/lib/functions";
import { logout } from "../api/login.api";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const handleClearUserData = useCallback(() => {
    dispatch(clearUserData());
    dispatch(setNeedRemember(false));
    dispatch(
      addNotification({
        message: "Вы успешно вышли",
        type: "success",
        field: "global",
      }),
    );
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
