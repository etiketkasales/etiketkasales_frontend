import classes from "./delivery-item.module.scss";
import Container from "~/src/shared/ui/container/ui";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import ChosenDeliveryText from "./text";
import { resolveDeliveryIcon } from "~/src/entities/order/lib/utils/deliveryIcon";

interface Props {
  name: string;
  code: string;
  image: string;
  address: string;
  display: string;
}

export default function DeliveryChosenMethodItem({
  name,
  code,
  image,
  address,
  display,
}: Props) {
  return (
    <Container
      bgColor={"neutral-200"}
      className={`flex-row align-center ${classes.container}`}
    >
      {name ? (
        <>
          <ImageWrapper
            src={resolveDeliveryIcon(code, image)}
            needDummy={false}
            width={40}
            height={40}
            className={classes.image}
          />
          <ChosenDeliveryText name={name} address={address} display={display} />
        </>
      ) : (
        <h6 className="heading h7 text-neutral-700">
          Выберите способ получения
        </h6>
      )}
    </Container>
  );
}
