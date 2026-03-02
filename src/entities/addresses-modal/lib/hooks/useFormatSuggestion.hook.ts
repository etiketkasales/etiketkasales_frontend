import { useCallback } from "react";
import { useAppSelector } from "~/src/app/store/hooks";

import { selectUser } from "~/src/app/store/reducers/user.slice";

import {
  IAddressSuggestionResponse,
  IUserAddressBase,
} from "~/src/features/user/model";
import { formatAddressSuggestion } from "~/src/entities/address-input/lib/utils";

export const useFormatSuggestion = () => {
  const { userInfo } = useAppSelector(selectUser);

  const formatSuggestion = useCallback(
    (suggestion: IAddressSuggestionResponse): IUserAddressBase => {
      const newAddress: IUserAddressBase = formatAddressSuggestion(suggestion);

      newAddress.phone = userInfo.phone;
      newAddress.full_name = userInfo.name!;
      return newAddress;
    },
    [userInfo.phone, userInfo.name],
  );

  return formatSuggestion;
};
