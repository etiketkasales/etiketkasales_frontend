import { createNumberInput, createStringInput } from "~/src/shared/lib/utils";
import { IQuoteInput, QuoteStageType } from "./quote.interface";
import { IChangeableProfile } from "~/src/features/user/model";

const stringInput = (f: keyof IChangeableProfile, p: string) =>
  createStringInput<IQuoteInput, IChangeableProfile>(f, p);

const numberInput = (
  f: keyof IChangeableProfile,
  p: string,
  maxLength?: number,
): IQuoteInput =>
  createNumberInput<IQuoteInput, IChangeableProfile>(f, p, { maxLength });

export const quoteAboutInputs: IQuoteInput[] = [
  numberInput("inn", "ИНН", 12),
  stringInput("company_name", "Наименование компании"),
  numberInput("kpp", "КПП", 9),
  numberInput("ogrn", "ОГРН / ОГРНИП", 13),
  stringInput("legal_address", "Юридический адрес"),
  stringInput("actual_address", "Фактический адрес"),
];

export const quoteRequisitsInputs: IQuoteInput[] = [
  numberInput("bank_account", "Номер расчетного счета", 20),
  numberInput("bank_bik", "БИК", 9),
  numberInput("correspondent_account", "Корреспондентский счет", 20),
  stringInput("bank_name", "Название банка получателя"),
  stringInput("legal_address", "Юридический адрес"),
  stringInput("actual_address", "Фактический адрес"),
];

export const quoteDirectorInputs: IQuoteInput[] = [
  stringInput("director_surname", "Фамилия"),
  stringInput("director_name", "Имя"),
  stringInput("director_patronymic", "Отчество"),
];

export const quoteAccountantInputs: IQuoteInput[] = [
  {
    placeholder: "За бухгалтерию отвечает генеральный директор",
    field: "accountant_is_director",
    type: "checkbox",
  },
  stringInput("accountant_surname", "Фамилия"),
  stringInput("accountant_name", "Имя"),
  stringInput("accountant_patronymic", "Отчество"),
];

export const quoteRequiredFields: (keyof IChangeableProfile)[] = [
  "inn",
  "kpp",
  "ogrn",
  "legal_address",
  "actual_address",
  "company_name",
];

export const quoteRequisitsRequiredFields: (
  needAccountant: boolean,
) => (keyof IChangeableProfile)[] = (needAccountant) => {
  const baseFields: (keyof IChangeableProfile)[] = [
    "bank_account",
    "bank_bik",
    "correspondent_account",
    "bank_name",
    "legal_address",
    "actual_address",
    "director_surname",
    "director_name",
    "director_patronymic",
  ];
  const accountantFields: (keyof IChangeableProfile)[] = [
    "accountant_surname",
    "accountant_patronymic",
    "accountant_surname",
  ];
  return needAccountant ? [...baseFields, ...accountantFields] : baseFields;
};

export const quoteStageNumbers: Record<QuoteStageType, number> = {
  about: 1,
  requisites: 2,
  agreement: 3,
};

export const quotePrevStages: Record<QuoteStageType, QuoteStageType | null> = {
  about: null,
  requisites: "about",
  agreement: "requisites",
};

export const quoteNextStages: Record<QuoteStageType, QuoteStageType | null> = {
  about: "requisites",
  requisites: "agreement",
  agreement: null,
};
