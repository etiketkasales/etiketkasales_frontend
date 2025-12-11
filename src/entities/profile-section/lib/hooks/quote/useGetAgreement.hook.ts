import { useCallback, useEffect, useState } from "react";

import { getSellAgreement } from "~/src/entities/profile-section/lib/api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

export const useGetAgreement = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [terms, setTerms] = useState<string>("");

  const getTerms = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await getSellAgreement();
        if (res) setTerms(res);
      },
    });
  }, []);

  useEffect(() => {
    getTerms();
  }, [getTerms]);

  return {
    loadingTerms: loading,
    terms,
  };
};
