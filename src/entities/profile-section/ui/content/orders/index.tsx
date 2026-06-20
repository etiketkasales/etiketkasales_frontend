"use client";
import { useOrders } from "~/src/entities/profile-section/lib/hooks";
import classNames from "classnames";

import classes from "./profile-orders.module.scss";
import ProfileContentContainer from "../container";
import ProfileOrdersItem from "./item";
import { profileTitlesMap } from "~/src/entities/profile-section/model";

export default function ProfileOrders() {
  const { orders, loading, error } = useOrders({
    role: "buyer",
    enabled: true,
  });

  return (
    <ProfileContentContainer
      className={classNames(classes.container, "flex-column relative", {
        [classes.loading]: loading,
      })}
      title={profileTitlesMap.orders}
      loading={loading}
    >
      {error && !loading && (
        <p className="text-body s text-neutral-700">{error}</p>
      )}

      {Array.isArray(orders) && orders.length > 0 ? (
        <ul className={`flex-column ${classes.list}`}>
          {orders.map((item) => {
            return (
              <ProfileOrdersItem
                {...item}
                key={`${item.id}-${item.order_number}`}
              />
            );
          })}
        </ul>
      ) : !loading && !error ? (
        <h6 className="heading h7 text-neutral-700">У вас пока нет заказов</h6>
      ) : null}
    </ProfileContentContainer>
  );
}
