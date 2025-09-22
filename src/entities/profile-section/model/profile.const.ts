import {
  IChangeUserData,
  ProfileInputI,
  ProfileLegalEntityI,
  ProfileOrderI,
  ProfileTabsI,
} from "./profile.interface";

export const profileTabsC: ProfileTabsI[] = [
  {
    title: "Личные данные",
    action: "personal",
  },
  {
    title: "Мои заказы",
    action: "purchases",
  },
  {
    title: "Покупать как юр. лицо",
    action: "as-legal-entity",
  },
  {
    title: "Выйти",
    action: "log-out",
  },
];

export const profileInputsC: ProfileInputI[] = [
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
    type: "string",
  },
];

export const changeDataS: IChangeUserData = {
  name: "",
  surname: "",
  email: "",
  phone: "",
};

export const profileLegalEntity: ProfileLegalEntityI = {
  id: 0,
  title: "Название организации 1",
  adress: "г. Краснодар, ул. Гимназическая, д. 65, помещ. 40",
  inn: 123456789,
  ogrn: 123456789,
  kpp: 123456789,
};

export const profileOrdersTestC: ProfileOrderI[] = [
  {
    id: 1274823,
    price: 100,
    date_ordered: "14.08.2025",
    status: "Заказ принят и ожидает отправки",
    order_bill_url: "",
    order_delivery_date: "13 мая",
    when_delivered: "14 мая",
    etiketka_url: "sofnbe",
    etiketka_image_url: "/best-offers/test2.png",
    order_finished: false,
    has_review: false,
  },
  {
    id: 1274823,
    price: 100,
    date_ordered: "14.08.2025",
    status: "Заказ принят и ожидает отправки",
    order_bill_url: "sbkvs",
    order_delivery_date: "13 мая",
    etiketka_url: "sofbn",
    etiketka_image_url: "/best-offers/test2.png",
    order_finished: true,
    has_review: true,
  },
];
