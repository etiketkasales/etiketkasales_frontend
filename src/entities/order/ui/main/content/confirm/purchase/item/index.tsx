import React from "react";

import classes from "./purchase-item.module.scss";
import Container from "~/src/shared/ui/container/ui";
import ImageWrapper from "~/src/shared/ui/image-wrapper/ui";
import RadioButton from "~/src/shared/ui/radio-button/ui";

interface Props {
  name: string;
  comission: string | null;
  image: string;
  onClick: () => void;
  isActive: boolean;
}

export default function OrderPurchaseItem({
  name,
  comission,
  image,
  onClick,
  isActive,
}: Props) {
  return (
    <Container
      bgColor={"neutral-200"}
      className={`flex gap-5 align-center padding-20 radius-20 pointer ${classes.container}`}
      onClick={onClick}
    >
      <div className={`flex ${classes.innerContainer}`}>
        <ImageWrapper
          src={image}
          width={32}
          height={32}
          needDummy={false}
          className={classes.image}
        />
        <div className={`flex-column ${classes.text}`}>
          <p className="text-body xl text-neutral-1000 nowrap-text">{name}</p>
          <p className="text-body m text-neutral-700 nowrap-text">
            {comission}
          </p>
        </div>
      </div>
      <RadioButton isActive={isActive} />
    </Container>
  );
}
