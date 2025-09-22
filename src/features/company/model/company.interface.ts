export interface CompanyI {
  id: number;
  name: string;
  phone: string;
  email: string;
  is_agree_confident: boolean;
  organization_type: "organization" | "person"; // ip | ooo
  organization_inn: number;
  organization_name: string;
  organization_ogrn: number;
  organization_kpp: number;
  organization_address: string;
  shop_name: string;
  warehouse_town: string;
  is_agree_contact: boolean;
  bank_details: BankDetailsI;
  general_manager: CompanyPersonI;
  accountant: CompanyPersonI;
  contact_phone: string;
  contact_email: string;
  moder_status: string; // на рассмотрении и т.д.
  url: string;
  avatar: string;
}

export interface CompanyPersonI {
  surname: string;
  name: string;
  lastname: string;
}

export interface BankDetailsI {
  bank_account_number: number;
  bik: number;
  correspondent_account: number;
  bank_name: string;
  address: string;
}
