import classes from "./marker.module.scss";
import Container from "~/src/shared/ui/container/ui";
import { IOrderPickupPointResponse } from "~/src/entities/order/model";

interface IInfoItem {
  text: string;
  color: string;
}

interface Props extends IOrderPickupPointResponse {}

export default function OrderPickupPointMarker({
  name,
  work_hours,
  cost_formatted,
}: Props) {
  const info: IInfoItem[] = [
    {
      text: work_hours,
      color: "neutral-1000",
    },
    {
      text: cost_formatted,
      color: "neutral-800",
    },
  ];

  return (
    <Container className={`flex-column gap-1 pointer ${classes.container}`}>
      <p className="heading h7 text-neutral-1000 nowrap-text">{name}</p>
      <p className={`heading h8 nowrap-text`}>
        {info.map((item, index) => (
          <span key={`${item.text}-${index}`} className={`text-${item.color}`}>
            {item.text}
          </span>
        ))}
      </p>
    </Container>
  );
}
