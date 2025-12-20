import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import classes from "./content.module.scss";
import OrderLoggedOut from "./logged-out";
import OrderChoosePvz from "./choose_pvz";
import OrderContentLoader from "./loader";
import OrderConfirm from "./confirm";
import { OrderType } from "~/src/entities/order/model";
import { OrderStageType } from "~/src/entities/order/model/order.interface";

interface Props {
  type: OrderType;
  stage: OrderStageType;
}

export default function OrderContent({ type, stage }: Props) {
  const { loaded } = useAppSelector(selectNavigation);
  const { isLoggedIn, userInfo, loadingData } = useAppSelector(selectUser);

  if (!loaded || loadingData) return <OrderContentLoader />;

  if (!isLoggedIn || !userInfo.name || !userInfo.surname || !userInfo.email)
    return <OrderLoggedOut />;

  return (
    <div className={`flex-column ${classes.container}`}>
      <OrderChoosePvz isActive={stage === "choose_pvz"} />
      <OrderConfirm isActive={stage === "confirm"} type={type} />
    </div>
  );
}
