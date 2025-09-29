import { useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { AdvI } from "../../model/advs.interface";

export const useAdvs = () => {
  const [advs, setAdvs] = useState<AdvI[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleGetAdvs = async (needLoad?: boolean) => {
    await promiseWrapper({
      setLoading,
      needLoad,
      callback: async () => {
        setAdvs(null);
      },
    });
  };

  useEffect(() => {
    handleGetAdvs();
  }, []);

  return {
    advs,
    loading,
    handleGetAdvs,
  };
};
