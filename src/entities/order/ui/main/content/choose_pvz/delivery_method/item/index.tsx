import React from "react";
import classNames from "classnames";

import classes from "./item.module.scss";
import Container from "~/src/shared/ui/container/ui";
import DeliveryMethodHeader from "./header";
import DeliveryMethodText from "./text";
import DeliveryMethodButton from "./button";
import { IDeliveryMethodResponse } from "~/src/entities/order/model/order.interface";

interface Props {
  method: IDeliveryMethodResponse;
  isActive: boolean;
  addressName: string | null;
  canChoosePvz: boolean;
  chooseDeliveryMethod: (method: IDeliveryMethodResponse) => void;
  openModal: () => void;
}

export default function DeliveryMethodItem({
  method,
  isActive,
  addressName,
  canChoosePvz,
  chooseDeliveryMethod,
  openModal,
}: Props) {
  return (
    <Container
      bgColor={"neutral-200"}
      className={classNames(`flex-column pointer`, classes.container)}
      onClick={() => chooseDeliveryMethod(method)}
    >
      <DeliveryMethodHeader isActive={isActive} image={method.image_url} />
      <DeliveryMethodText
        name={method.name}
        address={addressName}
        canChoose={canChoosePvz}
      />
      <DeliveryMethodButton canChoose={canChoosePvz} onClick={openModal} />
    </Container>
  );
}
