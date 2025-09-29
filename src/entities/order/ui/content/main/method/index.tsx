"use client";
import React from "react";

import GeoAlt from "~/public/order/geo-alt-fill.svg";
import OrderMainWrapper from "../wrapper";
import RadioInput from "~/src/shared/ui/inputs/radio";
import Button from "~/src/shared/ui/button";

export default function OrderMethod() {
  const [value, setValue] = React.useState<string>("cdek");
  return (
    <OrderMainWrapper title="Способ получения">
      <div className="flex-column gap-5 flex-start">
        <RadioInput
          onChange={() => {
            setValue("cdek");
          }}
          value={value}
          gap={"10px"}
          name={"cdek"}
          label="В пункте СДЭК"
          checked={value === "cdek"}
        />
        <Button
          typeButton="bg-gray"
          size="12-20"
          onClick={() => {}}
          radius={16}
        >
          <div className="flex-row gap-10px align-center">
            <GeoAlt />
            <span className="black second-family text-16 semibold">
              Выберите адрес пункта СДЭК
            </span>
          </div>
        </Button>
      </div>
    </OrderMainWrapper>
  );
}
