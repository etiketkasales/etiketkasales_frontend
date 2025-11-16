import { createStringInput } from "~/src/shared/lib/utils";
import { INewOrderAcceptor, INewOrderInput } from "./order.interface";

const stringInput = (field: keyof INewOrderAcceptor, placeholder: string) =>
  createStringInput<INewOrderInput, INewOrderAcceptor>(field, placeholder);

export const newOrderInputs: INewOrderInput[] = [
  stringInput("name", "Имя"),
  stringInput("surname", "Фамилия"),
  {
    field: "phone",
    placeholder: "Телефон",
    type: "phone",
  },
  {
    field: "email",
    placeholder: "Почта",
    type: "email",
  },
];
