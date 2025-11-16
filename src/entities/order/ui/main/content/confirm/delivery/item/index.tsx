import React from "react";

import classes from "./delivery-item.module.scss";
import Container from "~/src/shared/ui/container/ui";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import ChosenDeliveryText from "./text";

interface Props {
  name: string;
  image: string;
  address: string;
  price: string;
  time: string;
}

export default function DeliveryChosenMethodItem({
  name,
  image,
  address,
  price,
  time,
}: Props) {
  return (
    <Container
      bgColor={"neutral-200"}
      className={`flex-row ${classes.container}`}
    >
      <ImageWrapper
        src={image}
        needDummy={false}
        width={40}
        height={40}
        className={classes.image}
      />
      <ChosenDeliveryText
        name={name}
        address={address}
        price={price}
        time={time}
      />
    </Container>
  );
}
