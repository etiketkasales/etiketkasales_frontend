import { IProfile, UserInfoI } from "./user.interface";

export const userInfoS: UserInfoI = {
  id: 0,
  name: "",
  surname: "",
  email: "",
  phone: "",
  registration_date: "18.07.2025",
  avatar: "",
  in_cart_ids: [],
  in_favourites_ids: [],
};

export const SProfile: IProfile = {
  id: 0,
  name: "",
  surname: "",
  email: "",
  phone: "",
  role: "buyer",
  is_active: true,
  created_at: "",
  avatar: "",
  inn: null,
  ogrn: null,
  company_address: null,
  kpp: null,
};
