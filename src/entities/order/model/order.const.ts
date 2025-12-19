import { createStringInput } from "~/src/shared/lib/utils";
import {
  INewOrderAcceptor,
  INewOrderInput,
  IOrderReceiver,
} from "./order.interface";

const stringInput = (field: keyof IOrderReceiver, placeholder: string) =>
  createStringInput<INewOrderInput, IOrderReceiver>(field, placeholder);

export const newOrderInputs: INewOrderInput[] = [
  stringInput("receiver_name", "Имя"),
  stringInput("receiver_surname", "Фамилия"),
  {
    field: "receiver_phone",
    placeholder: "Телефон",
    type: "phone",
  },
  {
    field: "receiver_email",
    placeholder: "Почта",
    type: "email",
  },
];
