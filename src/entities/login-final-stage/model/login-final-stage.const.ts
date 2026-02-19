import InputUtils from "~/src/shared/lib/utils/input.util";
import { ILoginFinalStageInput } from ".";
import { IChangeableProfile } from "~/src/features/user/model";

const createInput = InputUtils.createArbitraryInput<
  ILoginFinalStageInput,
  IChangeableProfile
>;

export const loginFinalStageInputs: ILoginFinalStageInput[] = [
  createInput("name", "Имя", { type: "text" }),
  createInput("surname", "Фамилия", { type: "text" }),
  createInput("email", "Почта", { type: "email" }),
];

export const loginFinalStageRequiredFields: (keyof IChangeableProfile)[] = [
  "name",
  "surname",
  "email",
];
