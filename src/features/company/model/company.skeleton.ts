import { BankDetailsI, CompanyI, CompanyPersonI } from "./company.interface";

export const companyMemberS: CompanyPersonI = {
  surname: "",
  name: "",
  lastname: "",
};

export const companyBankS: BankDetailsI = {
  bank_account_number: 0,
  bik: 0,
  correspondent_account: 0,
  bank_name: "",
  address: "",
};

export const companyS: CompanyI = {
  id: 0,
  name: "",
  phone: "",
  email: "",
  is_agree_confident: false,
  organization_type: "organization",
  organization_inn: 0,
  organization_name: "",
  organization_ogrn: 0,
  organization_kpp: 0,
  organization_address: "",
  shop_name: "",
  warehouse_town: "",
  is_agree_contact: false,
  bank_details: companyBankS,
  general_manager: companyMemberS,
  accountant: companyMemberS,
  contact_phone: "",
  contact_email: "",
  moder_status: "",
  url: "",
  avatar: "",
};
