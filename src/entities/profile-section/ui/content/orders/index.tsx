import classNames from "classnames";
import { useOrders } from "~/src/entities/profile-section/lib/hooks";

import classes from "./profile-orders.module.scss";
import ProfileContentContainer from "../container";
import ProfileOrdersItem from "./item";
import { profileTitlesMap } from "~/src/entities/profile-section/model";

export default function ProfileOrders() {
  const { orders, loading } = useOrders({ role: "buyer" });

  return (
    <ProfileContentContainer
      className={classNames(classes.container, "flex-column relative", {
        [classes.loading]: loading,
      })}
      title={profileTitlesMap.orders}
      loading={loading}
    >
      {Array.isArray(orders) && orders.length > 0 ? (
        <ul className={`flex-column ${classes.list}`}>
          {orders.map((item) => {
            return (
              <ProfileOrdersItem {...item} key={`${item.id} ${item.user_id}`} />
            );
          })}
        </ul>
      ) : (
        <h6 className="heading h7 text-neutral-700">У вас пока нет заказов</h6>
      )}
    </ProfileContentContainer>
  );
}
