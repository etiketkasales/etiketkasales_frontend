import { useCallback, useEffect, useState } from "react";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { useAppSelector } from "~/src/app/store/hooks";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { IAdv } from "~/src/shared/ui/advs/model/advs.interface";
import { advsSkeleton } from "~/src/shared/ui/advs/model/advs.skeleton";

export const useAdvs = () => {
  const { loaded } = useAppSelector(selectNavigation);
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
    loading: !loaded || loading,
    handleGetAdvs,
  };
};
