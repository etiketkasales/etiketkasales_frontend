"use client";
import React, { useMemo } from "react";
import StringUtils from "~/src/shared/lib/utils/string.util";

import classes from "./buyer-info.module.scss";
import {
  ISellerOrderBuyer,
  sellerOrderColors,
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
  const itemProps = useMemo(() => {
    return {
      className: `${classes.item} text-body l text-${sellerOrderColors[status_code].text}`,
      style: {
        "--color": sellerOrderColors[status_code].textHex,
      } as React.CSSProperties,
    };
  }, [status_code]);
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
