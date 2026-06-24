"use client";
import React, { useMemo } from "react";
import StringUtils from "~/src/shared/lib/utils/string.util";

import classes from "./buyer-info.module.scss";
import {
  ISellerOrderBuyer,
  getSellerOrderColor,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

interface Props extends ISellerOrderBuyer {
  status_code: SellerOrderStatusCode;
}

export default function BuyerInfo({
  name,
  phone,
  address,
  status_code,
}: Props) {
  const colors = getSellerOrderColor(status_code);
  const itemProps = useMemo(() => {
    return {
      className: `${classes.item} text-body l text-${colors.text}`,
      style: {
        "--color": colors.textHex,
      } as React.CSSProperties,
    };
  }, [colors.text, colors.textHex]);
  return (
    <ul className={`flex-column gap-1`}>
      {name && phone && (
        <li {...itemProps}>
          {[name, StringUtils.formatPhone(phone)].join(", ")}
        </li>
      )}
      {address && <li {...itemProps}>{address}</li>}
    </ul>
  );
}
