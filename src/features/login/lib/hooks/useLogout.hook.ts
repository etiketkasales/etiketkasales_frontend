import { useCallback, useState } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import { logout } from "../api/login.api";
import {
  clearUserData,
  setNeedRemember,
} from "~/src/app/store/reducers/user.slice";
import { promiseWrapper } from "~/src/shared/lib/functions";

/**
 * Hook to handle logout user.
 *
 * @returns {Object} - object with handleLogout function, loading and error states.
 */
export const useLogout = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const createNotification = useCreateNotification();

  const handleClearUserData = useCallback(() => {
    dispatch(clearUserData());
    dispatch(setNeedRemember(false));
    createNotification("Вы успешно вышли", "success");
  }, [dispatch, createNotification]);

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
