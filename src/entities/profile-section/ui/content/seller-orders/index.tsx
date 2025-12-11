"use client";
import React from "react";
import classNames from "classnames";
import { useOrders } from "~/src/entities/profile-section/lib/hooks";

import classes from "./orders.module.scss";
import ProfileContentContainer from "~/src/entities/profile-section/ui/content/container";
import SellerOrder from "./item";
import {
  profileTitlesMap,
  sellerOrdersTest,
} from "~/src/entities/profile-section/model";

export default function SellerOrders() {
  const { sellerOrders } = useOrders({ role: "seller" });

  return (
    <ProfileContentContainer
      className={classNames(classes.container, "flex-column")}
      title={profileTitlesMap.orders}
    >
      <ul className={`flex-column ${classes.list}`}>
        {sellerOrdersTest.map((item, index) => {
          return (
            <SellerOrder key={`${item.order_number}-${index}`} {...item} />
          );
        })}
      </ul>
    </ProfileContentContainer>
  );
}
