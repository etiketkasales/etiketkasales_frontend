"use client";
import React from "react";

import classes from "./order.module.scss";
import ProfileOrderInfo from "./info";
import ProfileOrderEtiketkaInfo from "./etiketka-info";
import { ProfileOrderI } from "~/src/entities/profile-section/model/profile.interface";

interface Props extends ProfileOrderI {}

export default function ProfileOrdersItem({
  id,
  price,
  date_ordered,
  status,
  order_bill_url,
  order_delivery_date,
  when_delivered,
  etiketka_url,
  etiketka_image_url,
  has_review,
}: Props) {
  return (
    <li className={`flex-row gap-6 space-between ${classes.container}`}>
      <ProfileOrderInfo
        id={id}
        orderDate={date_ordered}
        status={status}
        deliveryDate={order_delivery_date}
        deliveredDate={when_delivered}
        orderBillUrl={order_bill_url}
        hasReview={has_review}
      />
      <ProfileOrderEtiketkaInfo
        orderPrice={price}
        etiketkaUrl={etiketka_url}
        etiketkaImage={etiketka_image_url}
      />
    </li>
  );
}
