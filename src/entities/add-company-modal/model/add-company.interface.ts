import { IUserCompanyBase } from "~/src/features/user/model";

export interface IAddCompanyInput {
  placeholder: string;
  field: keyof IUserCompanyBase;
  type: "string" | "number";
  maxWidth?: number;
}

export type AddCompanySpecificFields = "inn" | "ogrn" | "kpp";
