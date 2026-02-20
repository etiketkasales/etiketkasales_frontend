"use client";
import { useDelivery } from "~/src/entities/order/lib/hooks";

import classes from "./delivery.module.scss";
import OrderContainer from "../../container";
import DeliveryMethodItem from "./item";
import Loader from "~/src/shared/ui/loader";
import { IDeliveryMethodResponse } from "~/src/entities/order/model";

interface Props {
  canChoosePvz: boolean;
  deliveryAddressId: string | number;
  chosenDeliveryMethod: IDeliveryMethodResponse;
  openModal: () => void;
}

export default function OrderDeliveryMethod({
  canChoosePvz,
  deliveryAddressId,
  chosenDeliveryMethod,
  openModal,
}: Props) {
  const { methods, loading, chooseDeliveryMethod } = useDelivery({
    deliveryAddressId,
    canLoad: canChoosePvz,
  });

  return (
    <OrderContainer
      className={`flex-column relative ${classes.container}`}
      title="Способ получения"
    >
      {loading && <Loader radius={20} />}
      {(!Array.isArray(methods) || !methods.length) && !loading ? (
        <p className="text-body l text-neutral-800">
          Не удалось получить методы доставки
        </p>
      ) : (
        <div className={`grid ${classes.methods}`}>
          {methods.map((method, index) => (
            <DeliveryMethodItem
              key={index}
              isActive={chosenDeliveryMethod.id === method.id}
              addressName={method.display}
              canChoosePvz={canChoosePvz}
              chooseDeliveryMethod={chooseDeliveryMethod}
              openModal={openModal}
              method={method}
            />
          ))}
        </div>
      )}
    </OrderContainer>
  );
}
