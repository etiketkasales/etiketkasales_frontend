import React from "react";
import classNames from "classnames";

import TrashCan from "~/public/cart/yellow-trash.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  onClick: () => void;
  textClassName?: string;
}

export default function CartDeleteAll({ onClick, textClassName }: Props) {
  return (
    <Button
      typeButton="ghost"
      size="0"
      onClick={onClick}
      needActiveScale={false}
      className={`right-element`}
      justifyCenter={false}
    >
      <div className="flex-row gap-6px align-center">
        <TrashCan />
        <span className={classNames(`text-yellow-600`, textClassName)}>
          Удалить выбранные
        </span>
      </div>
    </Button>
  );
}
