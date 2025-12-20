import React from "react";

interface Props {
  name: string;
  address: string;
  display: string;
}

export default function ChosenDeliveryText({ name, address, display }: Props) {
  return (
    <div className="flex-column gap-6px">
      <p className="heading h7 text-neutral-1000">{name}</p>
      <p className="text-body l text-neutral-700">{address}</p>
      <p className="heading h7 text-neutral-1000">{display}</p>
    </div>
  );
}
