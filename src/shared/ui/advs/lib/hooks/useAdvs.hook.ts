import { useEffect, useState } from "react";
import { getActiveAdvs } from "../api/adv.api";
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
        const response = await getActiveAdvs();
        if (!response) {
          setAdvs(null);
          return;
        }
        setAdvs(response.data);
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
