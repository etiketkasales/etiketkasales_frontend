import React from "react";
import classNames from "classnames";

import classes from "./add.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import Button from "~/src/shared/ui/button";
import { AddressesModalStage } from "../../model";

interface Props {
  stage: AddressesModalStage;
  newAddress: string;
  onInputChange: (v: string) => void;
  onButtonClick: () => void;
}

export default function AddressesModalAdd({
  stage,
  newAddress,
  onInputChange,
  onButtonClick,
}: Props) {
  return (
    <div
      className={classNames(
        `flex-column gap-6 space-between`,
        classes.container,
        {
          [classes.active]: stage === "add",
          [classes.hidden]: stage === "default",
        },
      )}
    >
      <TextInput
        placeholder="Начните вводить адрес"
        onChange={(e) => onInputChange(e.target.value)}
        value={newAddress}
        wrapperClassName={classes.inputWrapper}
      />
      <Button
        typeButton="yellow"
        onClick={onButtonClick}
        radius={12}
        className={classes.button}
      >
        <span className="heading h7 text-yellow-1000">Добавить</span>
      </Button>
    </div>
  );
}
