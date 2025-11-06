import React from "react";

import classes from "./order-status.module.scss";

interface Props {
  status: string;
  message?: string;
}

export default function OrderStatus({ status, message }: Props) {
  return (
    <div className={`flex-column ${classes.container}`}>
      <p className="heading h5 text-neutral-800">{status}</p>
      <p className="text-body xl text-neutral-800">
        {/* // убрать когда появится апи */}
        {message || "Доставку назначим после оплаты"}
      </p>
    </div>
  );
}
