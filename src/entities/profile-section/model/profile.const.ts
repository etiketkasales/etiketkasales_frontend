import { IChangeableProfile } from "~/src/features/user/model";
import { IAsideItem, IProfileInput, ProfileActionType } from ".";

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
];

export const buyerFooterTabs: IAsideItem[] = [
  {
    title: "Выйти",
    action: "logout",
  },
];

/** Скрытые секции продавца (пусто — все вкладки видны). */
export const sellerProfileSectionsHidden: ProfileActionType[] = [];

export const sellerPendingTabs: IAsideItem[] = [
  {
    title: "Заявка на активацию магазина",
    action: "quote",
  },
  {
    title: "Адреса доставки",
    action: "addresses",
  },
];

export const sellerPendingFooterTabs: IAsideItem[] = buyerFooterTabs;

export const sellerTabs: IAsideItem[] = [
  {
    title: "Статистика продаж",
    action: "statistics",
  },
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
];

export const sellerFooterTabs: IAsideItem[] = [
  {
    title: "Удалить магазин",
    action: "delete",
  },
  {
    title: "Выйти",
    action: "logout",
  },
];

export const profileTitlesMap: Record<ProfileActionType, string> = {
  personal: "Личные данные",
  orders: "Мои заказы",
  seller_orders: "Заказы",
  as_legal: "Покупать как юр. лицо",
  addresses: "Адреса",
  quote: "Заявка на активацию",
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
export const profileInDev: ProfileActionType[] = ["accounting", "promotion"];

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
