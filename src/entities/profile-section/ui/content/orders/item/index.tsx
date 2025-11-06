import React from "react";
import classNames from "classnames";

import classes from "./orders-item.module.scss";
import Container from "~/src/shared/ui/container/ui";
import OrderContent from "./content";
import OrderExtra from "./extra";
import { IOrder } from "~/src/entities/profile-section/model";

interface Props extends IOrder {}

export default function ProfileOrdersItem({
  created_at,
  order_number,
  total_amount,
  status,
  bill_url,
}: Props) {
  return (
    <Container
      as="li"
      bgColor={"neutral-300"}
      className={classNames(classes.container, "flex")}
    >
      <OrderContent
        created_at={created_at}
        order_number={order_number}
        status={status}
        bill_url={bill_url}
      />
      <OrderExtra total_amount={total_amount} />
    </Container>
  );
}
