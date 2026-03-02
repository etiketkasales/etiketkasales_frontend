import {
  addressesSimilarFieldsRecord,
  newAddressSkeleton,
} from "~/src/entities/addresses-modal/model";
import {
  IAddressSuggestionResponse,
  IUserAddressBase,
} from "~/src/features/user/model";

export const formatAddressSuggestion = (
  suggestion: IAddressSuggestionResponse,
): IUserAddressBase => {
  const newAddress: IUserAddressBase = { ...newAddressSkeleton };
  Object.keys(addressesSimilarFieldsRecord).forEach((key) => {
    if (key in suggestion) {
      const value = suggestion[key as keyof IAddressSuggestionResponse];
      newAddress[key as keyof IUserAddressBase] = value;
    }
  });

  return newAddress;
};
