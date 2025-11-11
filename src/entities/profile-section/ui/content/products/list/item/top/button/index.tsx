import React from "react";

import classes from "./button.module.scss";
import Pencil from "~/public/profile/products/pencil-square.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  onClick: () => void;
}

export default function ProfileProductButton({ onClick }: Props) {
  return (
    <Button
      typeButton="blue"
      onClick={onClick}
      className={`place-center ${classes.container}`}
    >
      <Pencil />
    </Button>
  );
}
