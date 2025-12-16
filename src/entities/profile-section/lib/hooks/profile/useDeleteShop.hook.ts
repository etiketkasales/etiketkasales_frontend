import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { deleteShopProfile } from "~/src/entities/profile-section/lib/api";

import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { MessageI } from "~/src/shared/model";

export const useDeleteShop = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<MessageI | null>(null);

  const deleteShop = useCallback(async (closeModal: () => void) => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await deleteShopProfile();
        if (res.success) {
          setMessage({
            message: res.message || "Магазин удалён",
            type: "success",
            field: "global",
          });
          closeModal();
          setMessage(null);
        }
      },
      setError: setMessage,
    });
  }, []);

  useEffect(() => {
    if (message) {
      dispatch(addNotification(message));
    }
  }, [message, dispatch]);

  return {
    loading,
    message,
    deleteShop,
  };
};
