"use client";
import React from "react";
import { useDelivery } from "~/src/entities/order/lib/hooks/useDelivery.hook";

import classes from "./delivery.module.scss";
import OrderContainer from "../../container";
import DeliveryMethodItem from "./item";

interface Props {
  canChoosePvz: boolean;
}

export default function OrderDeliveryMethod({ canChoosePvz }: Props) {
  const { methods } = useDelivery();
  return (
    <OrderContainer
      className={`flex-column ${classes.container}`}
      title="Способ получения"
    >
      <div className={`flex-row ${classes.methods}`}>
        {Array.isArray(methods) && methods.length ? (
          methods.map((method, index) => (
            <DeliveryMethodItem
              key={index}
              name={method.name}
              isActive={true}
              addressName={method.addressName}
              image={method.image}
              canChoosePvz={canChoosePvz}
            />
          ))
        ) : (
          <p className="text-body l text-neutral-800">
            Не удалось получить методы
          </p>
        )}
      </div>
    </OrderContainer>
  );
}
