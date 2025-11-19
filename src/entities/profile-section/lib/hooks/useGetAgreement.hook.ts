import { useCallback, useEffect, useState } from "react";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { getSellAgreement } from "../api";

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
