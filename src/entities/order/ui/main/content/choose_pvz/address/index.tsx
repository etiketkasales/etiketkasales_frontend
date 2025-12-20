"use client";
import React from "react";

import classes from "./address.module.scss";
import OrderContainer from "~/src/entities/order/ui/main/content/container";
import AddressesModal from "~/src/entities/addresses-modal/ui";
import OrderDefaultAddress from "./default";
import OrderAddressButton from "./button";
import { IUserAddress } from "~/src/features/user/model";

interface Props {
  setModal: (v: boolean) => void;
  defAddress: IUserAddress | null;
  loading: boolean;
  modal: boolean | null;
}

export default function OrderAddress({
  defAddress,
  setModal,
  loading,
  modal,
}: Props) {
  return (
    <OrderContainer
      className={`flex-column ${classes.container}`}
      title="Адрес доставки"
    >
      {defAddress && <OrderDefaultAddress {...defAddress} />}
      <OrderAddressButton
        onClick={() => setModal(true)}
        disabled={loading}
        hasAddress={defAddress !== null}
      />
      {modal !== null && (
        <AddressesModal
          isOpen={modal}
          onClose={() => setModal(false)}
          action="choose_address"
        />
      )}
    </OrderContainer>
  );
}
