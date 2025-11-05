import React from "react";

import classes from "./change-button.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  onSave: () => void;
  disabled: boolean;
}

export default function ProfileChangeButton({ onSave, disabled }: Props) {
  return (
      <Button
        typeButton="yellow"
        size="16-24"
        onClick={onSave}
        disabled={disabled}
        className={classes.container}
        radius={12}
      >
        <span className="text-yellow-1000 heading h7">Сохранить</span>
      </Button>
  );
}
