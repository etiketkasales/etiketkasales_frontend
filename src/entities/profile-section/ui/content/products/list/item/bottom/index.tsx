import React from "react";

import classes from "./bottom.module.scss";
import StringUtils from "~/src/shared/lib/utils/string.util";

interface Props {
  price: string;
  name: string;
  status: string;
  status_code: string;
}

const getStatusColor = (code: string): string => {
  let color: string = "text-green-700";
  switch (code) {
    case "in_archive":
      color = "text-blue-600";
      break;
    case "moderation":
      color = "text-red-700";
      break;
    case "published":
      color = "text-green-700";
      break;
  }
  return color;
};

export default function ProfileProductBottom({
  price,
  name,
  status,
  status_code,
}: Props) {
  return (
    <div className={`flex-column ${classes.container}`}>
      <p className="heading h6 text-neutral-600 nowrap-text">
        {StringUtils.formatPrice(price)} ₽
      </p>
      <p className={`heading h7 text-neutral-900 ${classes.webkitBox}`}>
        {name}
      </p>
      <p
        className={`heading h7 ${getStatusColor(status_code)} ${classes.webkitBox}`}
      >
        {status}
      </p>
    </div>
  );
}
