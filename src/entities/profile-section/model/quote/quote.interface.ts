import { IChangeableProfile } from "~/src/features/user/model";

export type QuoteStageType = "about" | "requisites" | "agreement";

export interface IQuoteInput {
  placeholder: string;
  field: keyof IChangeableProfile;
  type: "string" | "number" | "checkbox";
  maxLength?: number;
}
