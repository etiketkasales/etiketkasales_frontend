import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

import classes from "./content.module.scss";
import OrderLoggedOut from "./logged-out";
import OrderChoosePvz from "./choose_pvz";
import OrderContentLoader from "./loader";
import OrderConfirm from "./confirm";
import { OrderType } from "~/src/entities/order/model";
import { OrderStageType } from "~/src/entities/order/model";

interface Props {
  type: OrderType;
  stage: OrderStageType;
  setStage: (s: OrderStageType) => void;
}

const messages = {
  loggedOut: "Авторизуйтесь, чтобы оформить заказ",
  noData: "Заполните персональные данные",
};

export default function OrderContent({ type, stage, setStage }: Props) {
  const { loaded } = useAppSelector(selectNavigation);
  const { isLoggedIn, userInfo, loadingData } = useAppSelector(selectUser);
  const createNotification = useCreateNotification();

  if (!loaded || loadingData) return <OrderContentLoader />;

  if (!isLoggedIn) {
    createNotification(messages.loggedOut, "warning");
    return <OrderLoggedOut />;
  }

  if (!userInfo.name || !userInfo.surname || !userInfo.email) {
    createNotification(messages.noData, "warning");
    return <OrderLoggedOut />;
  }

  return (
    <div className={`flex-column ${classes.container}`}>
      <OrderChoosePvz isActive={stage === "choose_pvz"} />
      <OrderConfirm
        isActive={stage === "confirm"}
        type={type}
        setStage={setStage}
      />
    </div>
  );
}
