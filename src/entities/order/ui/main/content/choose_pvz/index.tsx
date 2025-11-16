"use client";
import React, { useState } from "react";
import { useAddresses } from "~/src/features/user/lib/hooks/useAddresses.hook";

import classes from "./choose.module.scss";
import OrderAddress from "./address";
import OrderDeliveryMethod from "./delivery_method";
import OrderStageWrapper from "../stage-wrapper";

interface Props {
  isActive: boolean;
}

export default function OrderChoosePvz({ isActive }: Props) {
  const { defAddress, loading: addressLoading } = useAddresses();
  const [modal, setModal] = useState<boolean | null>(null);

  return (
    <OrderStageWrapper
      isActive={isActive}
      className={`flex-column ${classes.container}`}
    >
      <OrderAddress
        setModal={(a) => setModal(a)}
        loading={addressLoading}
        defAddress={defAddress}
        modal={modal}
      />
      <OrderDeliveryMethod canChoosePvz={defAddress !== null} />
    </OrderStageWrapper>
  );
}
