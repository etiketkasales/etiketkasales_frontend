import { useCallback, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";

import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { getAddressSuggestions } from "~/src/features/user/lib/api";

import {
  IAddressSuggestionResponse,
  IUserAddressBase,
} from "~/src/features/user/model";
import { addressesSimilarFieldsRecord, newAddressSkeleton } from "../../model";

export const useAddressSuggestions = () => {
  const { userInfo } = useAppSelector(selectUser);
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
      Object.keys(addressesSimilarFieldsRecord).forEach((key) => {
        if (key in suggestion) {
          const value = suggestion[key as keyof IAddressSuggestionResponse];
          newAddress[key as keyof IUserAddressBase] = value;
        }
      });

      newAddress.phone = userInfo.phone;
      newAddress.full_name = userInfo.name!;
      return newAddress;
    },
    [userInfo.phone, userInfo.name],
  );

  return {
    loading,
    suggestions,
    getSuggestions,
    formatSuggestion,
  };
};
