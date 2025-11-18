import { FormModalInputI } from "../../form-modal/model/form-modal.interface";
import { OrgTypeI, RegistrationStageT } from "./company-registration.interface";
import { IChangeableProfile } from "~/src/features/user/model";

export const personalInputs: FormModalInputI<IChangeableProfile>[] = [
  {
    field: "name",
    type: "text",
    placeholder: "Имя",
  },
  {
    field: "surname",
    type: "string",
    placeholder: "Фамилия",
  },
  {
    field: "email",
    type: "email",
    placeholder: "Почта",
  },
];

export const nameInputs: FormModalInputI<IChangeableProfile>[] = [
  {
    field: "company_name",
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

export const personalFieldsRequired: (keyof IChangeableProfile)[] = [
  "name",
  "surname",
  "email",
  "agreement_accepted",
];

export const nameRequired: (keyof IChangeableProfile)[] = ["company_name"];

export const cityFieldsRequired: (keyof IChangeableProfile)[] = [
  "storage_city",
];

export const statusFieldsRequired: (keyof IChangeableProfile)[] = [
  "company_type",
];

export const companyRegFieldsRequired: (keyof IChangeableProfile)[] = [
  "name",
  "surname",
  "email",
  "agreement_accepted",
  "company_type",
  "storage_city",
  "company_name",
];

export const requiredFieldsRecord: Record<
  RegistrationStageT,
  (keyof IChangeableProfile)[]
> = {
  personal: personalFieldsRequired,
  name: nameRequired,
  city: cityFieldsRequired,
  status: statusFieldsRequired,
};
