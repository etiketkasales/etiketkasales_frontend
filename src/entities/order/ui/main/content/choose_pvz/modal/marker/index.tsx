import classes from "./marker.module.scss";
import Icon from "~/public/order/marker-item.svg";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  name: string;
}

export default function OrderPickupPointMarker({ name }: Props) {
  return (
    <Container
      className={`flex-row gap-2 align-center pointer ${classes.container}`}
    >
      <Icon className={classes.icon} />
      <div className="flex-column">
        <p className="heading h7 text-neutral-1000 nowrap-text">{name}</p>
        <p className={`text-body s nowrap-text neutral-700`}>Пункт выдачи</p>
      </div>
    </Container>
  );
}
