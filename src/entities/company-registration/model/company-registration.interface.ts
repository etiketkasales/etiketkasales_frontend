import { IChangeableProfile } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";

export type RegistrationStageT = "personal" | "status" | "name" | "city";

export interface OrgTypeI {
  name: string;
  label: string;
}

export interface RegCommonPropsI {
  onInputChange: (v: string, field: keyof IChangeableProfile) => void;
  buttonClick: (nextPage?: RegistrationStageT) => void;
  changeStage: (stage: RegistrationStageT) => void;
  companyInfo: IChangeableProfile;
  error: MessageI | null;
}

export interface IAvailableCity {
  id: number;
  name: string;
  slug: string;
}
