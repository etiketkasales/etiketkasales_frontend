import classNames from "classnames";

import classes from "./default.module.scss";
import AddNewAddress from "./button";
import ModalAddress from "./address";
import { IUserAddress } from "~/src/features/user/model";
import { AddressesModalStage } from "../../model";

interface Props {
  stage: AddressesModalStage;
  setStage: (stage: AddressesModalStage) => void;
  addresses: IUserAddress[];
  onAddressClick: (type: "delete" | "default", id: number) => void;
  addressClickType: "delete" | "default";
}

export default function AddressesModalDefault({
  stage,
  setStage,
  addresses,
  onAddressClick,
  addressClickType,
}: Props) {
  return (
    <div
      className={classNames(`flex-column gap-3 scrollbar`, classes.container, {
        [classes.active]: stage === "default",
        [classes.hidden]: stage === "add",
      })}
    >
      <ul className={`flex-column gap-3`}>
        {addresses.map((item, index) => (
          <ModalAddress
            key={`${item.id}-${index}`}
            {...item}
            onClick={(id) => onAddressClick(addressClickType, id)}
          />
        ))}
      </ul>
      <AddNewAddress
        onClick={() => setStage("add")}
        type={addresses && addresses.length > 0 ? "ghost" : "yellow"}
      />
    </div>
  );
}
