import { useCallback, useState } from "react";
import { getAddressSuggestions } from "~/src/features/user/lib/api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import {
  IAddressSuggestionResponse,
  IUserAddressBase,
} from "~/src/features/user/model";
import { newAddressSkeleton } from "../../model";

export const useAddressSuggestions = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<IAddressSuggestionResponse[]>(
    [],
  );

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
    (suggestion: IAddressSuggestionResponse): IUserAddressBase => {
      const newAddress: IUserAddressBase = { ...newAddressSkeleton };
      newAddress.city = suggestion.name;
      newAddress.region = suggestion.region;
      newAddress.country = suggestion.country;
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
