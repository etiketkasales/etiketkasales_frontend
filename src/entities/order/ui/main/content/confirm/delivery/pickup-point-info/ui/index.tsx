"use client";
import classes from "./pickup-point-info.module.scss";
import Container from "~/src/shared/ui/container/ui";
import PickupPointInfoText from "./info";
import PickupPointPriceDays from "./price-time";
import PickupPointInfoButton from "./button";
import { IOrderPickupPointResponse } from "~/src/entities/order/model";

interface Props extends IOrderPickupPointResponse {
  onButtonClick: () => void | Promise<void>;
}

export default function PickupPointInfo(props: Props) {
  const { full_address, cost_formatted, delivery_time, name, onButtonClick } =
    props;

  return (
    <Container className={`${classes.container} flex-column gap-4`}>
      <PickupPointInfoText name={name} address={full_address} />
      <PickupPointPriceDays
        price={cost_formatted}
        days={delivery_time?.formatted || ""}
      />
      <PickupPointInfoButton onClick={onButtonClick} />
    </Container>
  );
}
