import React from "react";

import classes from "./order-logged-out.module.scss";
import Wrapper from "~/src/shared/ui/wrapper";
import Button from "~/src/shared/ui/button";

export default function OrderLoggedOut() {
  return (
    <Wrapper
      padding="20px"
      radius={20}
      className={`flex-column ${classes.container}`}
    >
      <div className="flex-column gap-2">
        <h6 className={`heading h6 text-neutral-900`}>Вход или регистрация</h6>
        <p className="body-text l text-neutral-700">
          Для оформления заказа необходимо авторизоваться на сайте
        </p>
      </div>
      <Button typeButton="yellow" size="12" radius={12} as="a" href="/login">
        <span className="heading h7 text-yellow-1000">Войти</span>
      </Button>
    </Wrapper>
  );
}
