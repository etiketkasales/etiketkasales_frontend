import React from "react";

import classes from "./confirmation.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  confirmText: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function SellerOrderConfirmationButton({
  confirmText,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div className={`flex gap-4 ${classes.container}`}>
      <Button
        typeButton="yellow"
        onClick={onConfirm}
        radius={12}
        className={classes.confirm}
      >
        <span className="heading h7 text-yellow-1000">{confirmText}</span>
      </Button>
      <Button
        typeButton="white"
        onClick={onCancel}
        radius={12}
        className={classes.cancel}
      >
        <span className="heading h7 text-neutral-800">Отклонить</span>
      </Button>
    </div>
  );
}
