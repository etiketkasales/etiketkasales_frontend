import React from "react";
import StringUtils from "~/src/shared/lib/utils/string.util";

interface Props {
  name: string;
  address: string;
  price: string;
  time: string;
}

export default function ChosenDeliveryText({
  name,
  address,
  price,
  time,
}: Props) {
  return (
    <div className="flex-column gap-6px">
      <p className="heading h7 text-neutral-1000">{name}</p>
      <p className="text-body l text-neutral-700">{address}</p>
      <p className="heading h7 text-neutral-1000">
        {StringUtils.formatPrice(price)} ₽{time && `, ${time}`}
      </p>
    </div>
  );
}
