import React from "react";
import classNames from "classnames";

import classes from "./item.module.scss";
import Container from "~/src/shared/ui/container/ui";
import DeliveryMethodHeader from "./header";
import DeliveryMethodText from "./text";
import DeliveryMethodButton from "./button";
import { IOrderDeliveryMethod } from "~/src/entities/order/model/order.interface";

interface Props extends IOrderDeliveryMethod {
  isActive: boolean;
  addressName: string | null;
  canChoosePvz: boolean;
}

export default function DeliveryMethodItem({
  name,
  isActive,
  addressName,
  image,
  canChoosePvz,
}: Props) {
  return (
    <Container
      bgColor={"neutral-200"}
      className={classNames(`flex-column pointer`, classes.container)}
    >
      <DeliveryMethodHeader isActive={isActive} image={image} />
      <DeliveryMethodText
        name={name}
        address={addressName}
        canChoose={canChoosePvz}
      />
      <DeliveryMethodButton canChoose={canChoosePvz} onClick={() => {}} />
    </Container>
  );
}
