import classes from "./pickup-point.module.scss";
import Container from "~/src/shared/ui/container/ui";
import PickupPointText from "./text";
import PickupPointButton from "./button";
import { IOrderPickupPointResponse } from "~/src/entities/order/model";
import PickupPointFallback from "./fallback";
import classNames from "classnames";

interface Props {
  choosePoint: (point: IOrderPickupPointResponse) => void;
  point: IOrderPickupPointResponse | null;
}

export default function OrderPickupPoint({ choosePoint, point }: Props) {
  return (
    <Container
      className={classNames(
        `flex-column ${classes.container}`,
        !point && classes.noPoint,
      )}
    >
      {point ? (
        <>
          <PickupPointText
            title={point.name}
            address={point.full_address}
            cost={point.cost_formatted}
            date={point.delivery_time?.formatted || ""}
          />
          <PickupPointButton onClick={() => choosePoint(point)} />
        </>
      ) : (
        <PickupPointFallback />
      )}
    </Container>
  );
}
