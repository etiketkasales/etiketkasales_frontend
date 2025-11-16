import React from "react";

import classes from "./logged-out.module.scss";
import OrderContainer from "../container";
import LoggedOutButton from "./button";

export default function OrderLoggedOut() {
  return (
    <OrderContainer className={`flex-column ${classes.container}`}>
      <div className="flex-column gap-2">
        <h6 className="heading h6 text-neutral-1000">Вход или регистрация</h6>
        <p className="text-body l text-neutral-700">
          Для оформления заказа необходимо авторизоваться на сайте
        </p>
      </div>
      <LoggedOutButton />
    </OrderContainer>
  );
}
