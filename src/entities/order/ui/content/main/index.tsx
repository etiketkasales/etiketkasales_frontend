"use client";
import React from "react";

import classes from "./main.classes.module.scss";
import OrderMethod from "./method";
import OrderMainItems from "./items";

export default function OrderMain() {
  return (
    <div className={`flex-column ${classes.container}`}>
      <OrderMethod />
      <OrderMainItems />
    </div>
  );
}
