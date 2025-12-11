"use client";
import React, { useMemo } from "react";
import StringUtils from "~/src/shared/lib/utils/string.util";

import classes from "./heading-info.module.scss";
import Dot from "~/public/profile/dot.svg";
import {
  sellerOrderColors,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

interface Props {
  created_at: string;
  order_number: string;
  status: string;
  status_code: SellerOrderStatusCode;
}

export default function OrderHeadingInfo({
  created_at,
  order_number,
  status,
  status_code,
}: Props) {
  const textColor = useMemo(() => {
    return `text-${sellerOrderColors[status_code].text}`;
  }, [status_code]);

  return (
    <div className={`flex-column ${classes.container}`}>
      <div className="flex-row gap-1 flex-start">
        <p className={`text-body l ${textColor}`}>
          от {StringUtils.formatDateFromApi(created_at)}
        </p>
        <Dot />
        <p className={`text-body l ${textColor}`}>№{order_number}</p>
      </div>
      <h3 className={`heading h6 text-${textColor}`}>{status}</h3>
    </div>
  );
}
