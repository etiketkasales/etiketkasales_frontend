import { useCallback, useRef, useState } from "react";
import { getAddressSuggestions } from "~/src/features/user/lib/api";
import { ISuggestedAddress, IUserAddressBase } from "~/src/features/user/model";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { newAddressSkeleton } from "../../model";

export const useAddressSuggestions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<ISuggestedAddress[]>([]);

  const getSuggestions = useCallback(async (v: string) => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        if (!v || v.length < 3) return;
        const res = await getAddressSuggestions(v);
        setSuggestions(res || []);
      },
    });
  }, []);

  const formatSuggestion = useCallback(
    (suggestion: ISuggestedAddress): IUserAddressBase => {
      const newAddress: IUserAddressBase = { ...newAddressSkeleton };
      Object.keys(newAddress).forEach((key) => {
        if (key in suggestion) {
          newAddress[key as keyof IUserAddressBase] = (suggestion as any)[key];
        }
      });
      return newAddress;
    },
    [],
  );

  return {
    loading,
    suggestions,
    getSuggestions,
    formatSuggestion,
  };
};
