import React from "react";
import classNames from "classnames";
import StringUtils from "~/src/shared/lib/utils/string.util";

import classes from "./order-heading.module.scss";
import OrderHeadingInfo from "./info";
import {
  sellerOrderColors,
  SellerOrderStatusCode,
} from "~/src/entities/profile-section/model";

interface Props {
  status: string;
  total_amount: string;
  created_at: string;
  order_number: string;
  status_code: SellerOrderStatusCode;
  readiness_message: string | null;
}

export default function SellerOrderHeading({
  status,
  total_amount,
  created_at,
  order_number,
  status_code,
  readiness_message,
}: Props) {
  return (
    <div className={classNames("flex", classes.container)}>
      <OrderHeadingInfo
        status={status}
        created_at={created_at}
        order_number={order_number}
        status_code={status_code}
      />
      <div
        className={classNames(`flex-row`, classes.info, {
          [classes.extended]: readiness_message,
          [classes.short]: !readiness_message,
        })}
      >
        {readiness_message && (
          <p className="heading h8 text-red-600">{readiness_message}</p>
        )}
        <p className={`heading h6 text-${sellerOrderColors[status_code].text}`}>
          {StringUtils.formatPrice(total_amount)} ₽
        </p>
      </div>
    </div>
  );
}
