export interface UserInfoI {
  id: number;
  name: string;
  surname: string;
  email: string;
  phone: string;
  registration_date: string;
  avatar: string;
  in_cart_ids: number[];
  in_favourites_ids: number[];
}

export interface IProfile {
  id: number;
  phone: string;
  avatar: string | null;
  email: string | null;
  name: string | null;
  surname: string | null;
  company_name?: string;
  inn: string | number | null;
  kpp: string | number | null;
  ogrn: string | number | null;
  company_address: string | null;
  role: UserRoleType;
  is_active: boolean;
  created_at: string; //2025-01-07T12:00:00Z
  updated_at?: string; //2025-01-07T12:00:00Z
}

export type UserRoleType = "buyer" | "seller";
