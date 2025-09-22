"use client";
import React from "react";

import classes from "./content.module.scss";
import OrderPayment from "./payment";
import OrderMain from "./main";

interface Props {
  forCompany: boolean;
}

export default function OrderContent({ forCompany }: Props) {
  return (
    <div className={`flex-row gap-5 align-start ${classes.container}`}>
      <OrderMain />
      <OrderPayment forCompany={forCompany} />
    </div>
  );
}
