import {
  IAsideItem,
  IOrder,
  IProfileInput,
  IUserCompany,
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
    action: "orders",
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

export const profilePersonalInputs: IProfileInput[] = [
  {
    holder: "Имя",
    field: "name",
    type: "string",
  },
  {
    holder: "Фамилия",
    field: "surname",
    type: "string",
  },
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
