import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { IAdv } from "../../model/advs.interface";
import { advsSkeleton } from "../../model/advs.skeleton";

export const useAdvs = () => {
  const [advs, setAdvs] = useState<IAdv[]>(advsSkeleton);
  const [loading, setLoading] = useState<boolean>(false);

  const clearAdvs = useCallback(() => {
    setAdvs(advsSkeleton);
  }, []);

  const handleGetAdvs = useCallback(
    async (needLoad?: boolean) => {
      await promiseWrapper({
        setLoading,
        needLoad,
        callback: async () => {
          clearAdvs();
        },
      });
    },
    [clearAdvs],
  );

  useEffect(() => {
    handleGetAdvs();
  }, [handleGetAdvs]);

  return {
    advs,
    loading,
    handleGetAdvs,
  };
};
