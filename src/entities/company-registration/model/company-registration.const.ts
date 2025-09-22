import { CompanyI } from "~/src/features/company/model/company.interface";
import { FormModalInputI } from "../../form-modal/model/form-modal.interface";
import { OrgTypeI, RegistrationStageT } from "./company-registration.interface";

export const personalInputs: FormModalInputI<CompanyI>[] = [
  {
    field: "name",
    type: "text",
    placeholder: "Имя",
  },
  {
    field: "phone",
    type: "phone",
    placeholder: "Номер телефона",
  },
  {
    field: "email",
    type: "email",
    placeholder: "Почта",
  },
];

export const nameInputs: FormModalInputI<CompanyI>[] = [
  {
    field: "organization_name",
    type: "text",
    placeholder: "Название магазина",
  },
];

export const statusInputs: OrgTypeI[] = [
  {
    name: "organization",
    label: "Организация",
  },
  {
    name: "person",
    label: "ИП",
  },
];

export const personalFieldsRequired: (keyof CompanyI)[] = [
  "name",
  "phone",
  "email",
  "is_agree_confident",
];

export const nameRequired: (keyof CompanyI)[] = ["organization_name"];

export const cityFieldsRequired: (keyof CompanyI)[] = [
  "warehouse_town",
  "is_agree_contact",
];

export const requiredFieldsRecord: Record<
  RegistrationStageT,
  (keyof CompanyI)[]
> = {
  personal: personalFieldsRequired,
  name: nameRequired,
  city: cityFieldsRequired,
  status: [],
};
