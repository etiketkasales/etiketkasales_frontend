import { useCallback, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

export const useDeleteCompany = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteCompany = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {},
    });
  }, []);

  return {
    loading,
    handleDeleteCompany,
  };
};
