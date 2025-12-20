"use client";
import { usePayment } from "~/src/entities/order/lib/hooks";

import classes from "./purchase.module.scss";
import OrderContainer from "../../container";
import OrderPurchaseItem from "./item";
import { OrderType } from "~/src/entities/order/model";

interface Props {
  type: OrderType;
}

export default function OrderPurchase({ type }: Props) {
  const { methods, loading, onMethodClick, chosenMethod } = usePayment({
    isCompany: type === "company",
  });

  return (
    <OrderContainer
      title="Способ оплаты"
      className={`flex-column ${classes.container}`}
    >
      {(!Array.isArray(methods) || !methods.length) && !loading ? (
        <p className="text-neutral-1000 text-body l">
          Не удалось получить способы оплаты
        </p>
      ) : (
        <div className={`grid ${classes.items}`}>
          {methods.map((item, index) => (
            <OrderPurchaseItem
              key={`${index}-${item.code}`}
              name={item.name}
              comission={item.commission_formatted}
              image={item.image_url}
              onClick={() => onMethodClick(item.code)}
              isActive={item.code === chosenMethod}
            />
          ))}
        </div>
      )}
    </OrderContainer>
  );
}
