import { useCallback, useState } from "react";

import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { MessageI } from "~/src/shared/model";

export const useDeleteShop = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<MessageI | null>(null);

  const deleteShop = useCallback(async (closeModal: () => void) => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        closeModal();
        setError(null);
      },
    });
  }, []);

  return {
    loading,
    error,
    deleteShop,
  };
};
