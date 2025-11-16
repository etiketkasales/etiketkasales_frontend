import React from "react";

import classes from "./button.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  canChoose: boolean;
  onClick?: () => void;
}

export default function DeliveryMethodButton({ canChoose, onClick }: Props) {
  return (
    <Button
      typeButton="yellow"
      disabled={!canChoose}
      onClick={onClick}
      radius={12}
      className={classes.container}
    >
      <span className="heading h7 text-yellow-1000">Изменить пункт</span>
    </Button>
  );
}
