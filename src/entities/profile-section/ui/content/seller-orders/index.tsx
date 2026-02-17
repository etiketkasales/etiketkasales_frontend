"use client";

import classNames from "classnames";
import { useSellerOrders } from "~/src/entities/profile-section/lib/hooks";

import classes from "./orders.module.scss";
import Loader from "~/src/shared/ui/loader";
import ProfileContentContainer from "~/src/entities/profile-section/ui/content/container";
import SellerOrder from "./item";
import { profileTitlesMap } from "~/src/entities/profile-section/model";

export default function SellerOrders() {
  const { orders, loading } = useSellerOrders({ needLoadEffect: true });

  return (
    <ProfileContentContainer
      className={classNames(classes.container, "flex-column relative")}
      title={profileTitlesMap.orders}
    >
      {loading && <Loader radius={20} />}
      <ul className={`flex-column ${classes.list}`}>
        {orders?.length > 0 ? (
          orders.map((item, index) => {
            return (
              <SellerOrder key={`${item.order_number}-${index}`} {...item} />
            );
          })
        ) : (
          <p className="text-body xl text-neutral-1000">
            У вас пока нет заказов
          </p>
        )}
      </ul>
    </ProfileContentContainer>
  );
}
