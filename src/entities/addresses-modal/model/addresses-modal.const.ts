import {
  IAddressSuggestionResponse,
  IUserAddressBase,
} from "~/src/features/user/model";

// Для того, чтобы знать, какие поля есть, а какие нет в респонсе подсказки
export const addressesSimilarFieldsRecord: Record<
  keyof IUserAddressBase,
  keyof IAddressSuggestionResponse | null
> = {
  country: "country",
  region: "region",
  city: "city",
  street: "street",
  house: "house",
  apartment: "apartment",
  postal_code: "postal_code",
  comment: null,
  entrance: null,
  floor: null,
  name: null,
  full_name: null,
  phone: null,
};
