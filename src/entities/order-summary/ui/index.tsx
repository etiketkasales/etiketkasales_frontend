import classes from "./order-summary.module.scss";
import Container from "~/src/shared/ui/container/ui";
import OrderSummaryPrices from "./prices";
import OrderSummaryButtons from "./buttons";
import { IOrderSummaryButton } from "../model/order-summary.interface";

interface Props {
  discount: number;
  totalSum: number;
  totalItemsCount: number;
  paySum: number;
  buttons: IOrderSummaryButton[];
  children?: React.ReactNode;
}

export default function OrderSummary({
  discount,
  totalSum,
  totalItemsCount,
  paySum,
  buttons,
  children,
}: Props) {
  return (
    <Container className={`flex-column ${classes.container}`}>
      <OrderSummaryPrices
        discountSum={discount}
        totalItemsAmount={totalItemsCount}
        totalSum={totalSum}
        paySum={paySum}
      />
      <OrderSummaryButtons buttons={buttons} />
      {children}
    </Container>
  );
}
