import { IUserAddressBase } from "~/src/features/user/model";

export type AddressesModalStage = "default" | "add";

export interface INewAddress {
  forApi: IUserAddressBase;
  forDisplay: string;
}
