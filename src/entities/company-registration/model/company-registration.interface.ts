import { CompanyI } from "~/src/features/company/model/company.interface";
import { MessageI } from "~/src/shared/model";

export type RegistrationStageT = "personal" | "status" | "name" | "city";

export interface OrgTypeI {
  name: string;
  label: string;
}

export interface RegCommonPropsI {
  onInputChange: (v: string, field: keyof CompanyI) => void;
  buttonClick: (nextPage?: RegistrationStageT) => void;
  changeStage: (stage: RegistrationStageT) => void;
  companyInfo: CompanyI;
  error: MessageI | null;
}
