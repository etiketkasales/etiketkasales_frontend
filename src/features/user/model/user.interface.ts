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

export type SellerStatusType = "draft" | "pending" | "approved" | "rejected";

export interface IChangeableProfile {
  email: string | null;
  name: string | null;
  surname: string | null;
  avatar: string | null;
  company_name: string | null;
  company_type: string | null;
  shop_name: string | null;
  inn: string | null;
  kpp: string | null;
  ogrn: string | null;
  legal_address: string | null;
  actual_address: string | null;
  storage_city: string | null;
  company_address: string | null;
  bank_account: string | null;
  bank_bik: string | null;
  correspondent_account: string | null;
  bank_name: string | null;
  director_surname: string | null;
  director_name: string | null;
  director_patronymic: string | null;
  accountant_is_director: boolean;
  accountant_surname: string | null;
  accountant_name: string | null;
  accountant_patronymic: string | null;
  agreement_accepted: boolean;
}

export interface IProfile extends IChangeableProfile {
  id: number;
  phone: string;
  seller_status: SellerStatusType;
  seller_rejection_reason: string | null;
  seller_approved_at: string | null; //2025-01-29T10:00:00Z
  agreement_accepted_at: string | null; //2025-01-29T10:00:00Z
  role: UserRoleType;
  is_active: boolean;
  created_at: string; //2025-01-29T10:00:00Z
  updated_at: string; //2025-01-29T10:00:00Z
}

export type UserRoleType = "buyer" | "seller";

export interface IUserCompanyBase {
  name: string;
  legal_address: string;
  actual_address: string;
  inn: string;
  kpp: string;
  ogrn: string;
  director_name: string;
  contact_person: string;
  contact_phone: string;
  contact_email: string;
}

export interface IUserCompany extends IUserCompanyBase {
  id: number;
  user_id: number;
  is_default: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
