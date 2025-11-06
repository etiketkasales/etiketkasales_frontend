import React from "react";

import StringUtils from "~/src/shared/lib/utils/string.util";

interface Props {
  price: string; // 1500.00
}

export default function OrderPrice({ price }: Props) {
  return (
    <p className="heading h6 text-neutral-800">
      {StringUtils.formatPrice(price)} ₽
    </p>
  );
}
