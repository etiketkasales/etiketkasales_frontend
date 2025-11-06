import React from "react";
import StringUtils from "~/src/shared/lib/utils/string.util";

import Dot from "~/public/profile/dot.svg";

interface Props {
  created_at: string;
  order_number: string;
}

const textClassName = "text-body l text-neutral-800";

export default function OrderInfo({ created_at, order_number }: Props) {
  return (
    <div className="flex-row gap-1 flex-start">
      <p className={textClassName}>
        от {StringUtils.formatDateFromApi(created_at)}
      </p>
      <Dot />
      <p className={textClassName}>№{order_number}</p>
    </div>
  );
}
