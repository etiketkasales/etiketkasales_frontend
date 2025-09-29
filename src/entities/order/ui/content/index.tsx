"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import classes from "./content.module.scss";
import OrderPayment from "./payment";
import OrderMain from "./main";
import OrderLoggedOut from "./logged-out";

interface Props {
  forCompany: boolean;
}

export default function OrderContent({ forCompany }: Props) {
  const { isLoggedIn } = useAppSelector(selectUser);

  return (
    <div className={`flex-row gap-5 align-start ${classes.container}`}>
      {isLoggedIn ? <OrderMain /> : <OrderLoggedOut />}
      <OrderPayment forCompany={forCompany} />
    </div>
  );
}
