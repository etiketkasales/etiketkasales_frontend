import React from "react";

import CartButtonWithIcon from "./with-icon";
import CartCounter from "./counter";
import CartButtonWithText from "./with-text";

export interface ICommonCartButton {
  product_id: number;
  quantity: number;
  className?: string;
  updateInfo?: () => Promise<void>;
}

interface Props extends ICommonCartButton {
  type: "with_icon" | "with_text" | "counter";
}

export default function CartButton({ type, ...rest }: Props) {
  switch (type) {
    default:
    case "with_icon":
      return <CartButtonWithIcon {...rest} />;
    case "with_text":
      return <CartButtonWithText {...rest} />;
    case "counter":
      return <CartCounter {...rest} />;
  }
}
