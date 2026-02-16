import classes from "./confirm.module.scss";
import OrderStageWrapper from "../stage-wrapper";
import DeliveryChosenMethod from "./delivery";
import OrderAcceptor from "./acceptor";
import OrderPurchase from "./purchase";
import { OrderStageType, OrderType } from "~/src/entities/order/model";

interface Props {
  isActive: boolean;
  type: OrderType;
  setStage: (stage: OrderStageType) => void;
}

export default function OrderConfirm({ isActive, type, setStage }: Props) {
  return (
    <OrderStageWrapper
      isActive={isActive}
      className={`flex-column ${classes.container}`}
    >
      <DeliveryChosenMethod setStage={setStage} />
      <OrderAcceptor type={type} />
      <OrderPurchase type={type} />
    </OrderStageWrapper>
  );
}
