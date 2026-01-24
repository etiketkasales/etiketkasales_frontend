import classes from "./pickup-point.module.scss";
import Container from "~/src/shared/ui/container/ui";
import PickupPointText from "./text";
import PickupPointButton from "./button";
import { IOrderPickupPointResponse } from "~/src/entities/order/model";

interface Props {
  choosePoint: (point: IOrderPickupPointResponse) => void;
  point: IOrderPickupPointResponse | null;
}

export default function OrderPickupPoint({ choosePoint, point }: Props) {
  if (!point) return null;

  return (
    <Container className={`flex-column ${classes.container}`}>
      <PickupPointText
        title={point.name}
        address={point.full_address}
        cost={point.cost_formatted}
        date={point.delivery_time?.formatted || ""}
      />
      <PickupPointButton onClick={() => choosePoint(point)} />
    </Container>
  );
}
