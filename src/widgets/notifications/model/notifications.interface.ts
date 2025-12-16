import { MessageI } from "~/src/shared/model";

export interface INotification extends MessageI {
  uuid: string;
}
