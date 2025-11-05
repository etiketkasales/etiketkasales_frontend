import React from "react";

import classes from "./default.module.scss";
import Button from "~/src/shared/ui/button";
import { AddressesModalStage } from "../../model";
import classNames from "classnames";

interface Props {
  stage: AddressesModalStage;
  setStage: (stage: AddressesModalStage) => void;
}

export default function AddressesModalDefault({ stage, setStage }: Props) {
  return (
    <div
      className={classNames(`flex-column gap-3 scrollbar`, classes.container, {
        [classes.active]: stage === "default",
        [classes.hidden]: stage === "add",
      })}
    >
      <Button
        typeButton="yellow"
        onClick={() => setStage("add")}
        className={classes.button}
        radius={12}
      >
        <span className="heading h7 text-yellow-1000">
          Добавить новый адрес
        </span>
      </Button>
    </div>
  );
}
