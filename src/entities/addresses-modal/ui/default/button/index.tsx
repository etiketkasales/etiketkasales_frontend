import React from "react";

import classes from "./add-new-button.module.scss";
import Icon from "~/public/addresses/plus.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  type: "ghost" | "yellow";
  onClick: () => void;
}

export default function AddNewAddress({ type, onClick }: Props) {
  return (
    <Button
      typeButton={type}
      onClick={onClick}
      className={classes[type]}
      radius={12}
    >
      {type === "ghost" && <Icon />}
      <span
        className={`heading h7 ${type === "ghost" ? "text-yellow-600" : "text-yellow-1000"}`}
      >
        Добавить новый адрес
      </span>
    </Button>
  );
}
