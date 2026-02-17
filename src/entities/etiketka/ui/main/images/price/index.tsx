"use client";

import classes from "./price.module.scss";
import Container from "~/src/shared/ui/container/ui";
import Price from "~/src/shared/ui/price/ui";

interface Props {
  price: string;
  old_price?: string;
}

export default function EtiketkaImagesPrice({ price, old_price }: Props) {
  return (
    <Container className={classes.container}>
      <Price
        price={price}
        old_price={old_price}
        alignCenter
        needTransform={false}
      />
    </Container>
  );
}
