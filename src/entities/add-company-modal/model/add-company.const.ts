import { createStringInput } from "~/src/shared/lib/utils";
import { AddCompanySpecificFields, IAddCompanyInput } from "./add-company.interface";
import { IUserCompanyBase } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";
import FormUtils from "~/src/shared/lib/utils/form.util";

const createInput = (
  field: keyof IUserCompanyBase,
  holder: string,
  number?: boolean,
  maxWidth?: number,
) => {
  return createStringInput<IAddCompanyInput, IUserCompanyBase>(field, holder, {
    maxWidth,
    type: number ? "number" : "string",
  });
};

export const addNewCompanyInputs: IAddCompanyInput[] = [
  createInput("inn", "ИНН", true, 12),
  createInput("name", "Название организации"),
  createInput("ogrn", "ОГРН", true, 13),
  createInput("legal_address", "Адрес"),
  createInput("kpp", "КПП", true, 9),
];

export const newCompanySkeleton: IUserCompanyBase = {
  inn: "",
  name: "",
  ogrn: "",
  actual_address: "",
  kpp: "",
  legal_address: "",
  director_name: "",
  contact_person: "",
  contact_phone: "",
  contact_email: "",
};

export const addCompanyRequiredFields: (keyof IUserCompanyBase)[] = [
  "inn",
  "name",
  "ogrn",
  "legal_address",
  "kpp",
];

export const addCompanySpecificFields: (keyof IUserCompanyBase)[] = [
  "inn",
  "kpp",
  "ogrn",
];

export const specificErrorDetectors: Record<
  AddCompanySpecificFields,
  (newCompany: IUserCompanyBase) => MessageI | null
> = {
  inn: (newCompany: IUserCompanyBase) =>
    FormUtils.getINNError(newCompany.inn, "inn"),
  ogrn: (newCompany: IUserCompanyBase) =>
    FormUtils.getOGRNError(newCompany.ogrn, "ogrn"),
  kpp: (newCompany: IUserCompanyBase) =>
    FormUtils.getKPPError(newCompany.kpp, "kpp"),
};
