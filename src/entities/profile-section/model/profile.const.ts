import { IChangeableProfile } from "~/src/features/user/model";
import {
  IAsideItem,
  IProfileInput,
  IProfileLegalInputsSection,
  ProfileActionType,
} from "./profile.interface";

export const buyerTabs: IAsideItem[] = [
  {
    title: "Личные данные",
    action: "personal",
  },
  {
    title: "Адреса доставки",
    action: "addresses",
  },
  {
    title: "Мои заказы",
    action: "orders",
  },
  {
    title: "Покупать как юр. лицо",
    action: "as_legal",
  },
  {
    title: "Выйти",
    action: "logout",
  },
];

export const sellerDraftTabs: IAsideItem[] = [
  {
    title: "Заявка на активацию магазина",
    action: "quote",
  },
  {
    title: "Адреса доставки",
    action: "addresses",
  },
];

export const sellerTabs: IAsideItem[] = [
  {
    title: "Профиль магазина",
    action: "profile",
  },
  {
    title: "Отзывы",
    action: "reviews",
  },
  {
    title: "Заказы",
    action: "seller_orders",
  },
  {
    title: "Адреса доставки",
    action: "addresses",
  },
  {
    title: "Карточки товаров",
    action: "products",
  },
  {
    title: "Продвижение товаров",
    action: "promotion",
  },
  {
    title: "Бухгалтерия",
    action: "accounting",
  },
  {
    title: "Статистика продаж",
    action: "statistics",
  },
  {
    title: "Удалить магазин",
    action: "delete",
  },
];

export const profileTitlesMap: Record<ProfileActionType, string> = {
  personal: "Личные данные",
  orders: "Мои заказы",
  seller_orders: "Заказы",
  as_legal: "Покупать как юр. лицо",
  addresses: "Адреса",
  quote: "Заявка на активацию магазина",
  profile: "Профиль магазина",
  reviews: "Отзывы",
  products: "Карточки товаров",
  promotion: "Продвижение товаров",
  accounting: "Бухгалтерия",
  statistics: "Статистика продаж",
  delete: "Вы действительно хотите удалить свой магазин?",
  logout: "Вы действительно хотите выйти?",
};

export const profileDangerousActions: ProfileActionType[] = [
  "delete",
  "logout",
];
export const profileModalActions: ProfileActionType[] = [
  "addresses",
  "delete",
  "logout",
];
export const profileInDev: ProfileActionType[] = [
  "reviews",
  "accounting",
  "promotion",
  "statistics",
];

const stringInput = (
  field: keyof IChangeableProfile,
  holder: string,
): IProfileInput => ({
  holder,
  field,
  type: "string",
});

export const profilePersonalInputs: IProfileInput[] = [
  stringInput("name", "Имя"),
  stringInput("surname", "Фамилия"),
  {
    holder: "Телефон",
    field: "phone",
    type: "phone",
  },
  {
    holder: "Почта",
    field: "email",
    type: "email",
  },
];

export const profileLegalInputs: IProfileInput[] = [
  stringInput("inn", "ИНН"),
  stringInput("company_name", "Наименование компании"),
  stringInput("kpp", "КПП"),
  stringInput("ogrn", "ОГРН / ОГРНИП"),
  stringInput("legal_address", "Юридический адрес"),
  stringInput("actual_address", "Фактический адрес"),
];

export const requisitsInputs: IProfileInput[] = [
  stringInput("bank_account", "Номер расчетного счета"),
  stringInput("bank_bik", "БИК"),
  stringInput("correspondent_account", "Корреспондентский счет"),
  stringInput("bank_name", "Название банка получателя"),
  stringInput("legal_address", "Юридический адрес"),
  stringInput("actual_address", "Фактический адрес"),
];

export const directorInputs: IProfileInput[] = [
  stringInput("director_surname", "Фамилия"),
  stringInput("director_name", "Имя"),
  stringInput("director_patronymic", "Отчество"),
];

export const accountantInputs: IProfileInput[] = [
  {
    holder: "За бухгалтерию отвечает генеральный директор",
    field: "accountant_is_director",
    type: "checkbox",
  },
  stringInput("accountant_surname", "Фамилия"),
  stringInput("accountant_name", "Имя"),
  stringInput("accountant_patronymic", "Отчество"),
];

export const aboutOrganisationSection: IProfileLegalInputsSection = {
  title: "Об организации",
  inputs: profileLegalInputs,
};

export const requisitsSection: IProfileLegalInputsSection = {
  title: "Реквизиты",
  inputs: requisitsInputs,
};

export const directorSection: IProfileLegalInputsSection = {
  title: "Генеральный директор",
  inputs: directorInputs,
};

export const accountantSection: IProfileLegalInputsSection = {
  title: "Бухгалтер",
  inputs: accountantInputs,
};
