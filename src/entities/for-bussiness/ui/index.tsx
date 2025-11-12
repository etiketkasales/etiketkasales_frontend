"use client";
import React from "react";
import classNames from "classnames";
import { useAppDispatch } from "~/src/app/store/hooks";

import classes from "./for-bussiness.module.scss";
import Button from "~/src/shared/ui/button";
import { setForwardHref } from "~/src/app/store/reducers/login.slice";

export default function ForBussinessSection() {
  const dispatch = useAppDispatch();
  return (
    <section
      className={classNames(
        `radius-20 flex-column gap-9 align-center center-element`,
        classes.container,
      )}
    >
      <div className="flex-column gap-7 align-center">
        <h1 className="heading h2 text-center text-yellow-1000">
          Предложите свои этикетки пользователям нашей платформы
        </h1>
        <h2 className="text-body xl text-center text-yellow-1000">
          Зарегистрируйтесь прямо сейчас!
        </h2>
      </div>
      <Button
        as={"a"}
        href="/login"
        className={`${classes.link}`}
        typeButton={"white"}
        radius={12}
        onClick={() => {
          dispatch(setForwardHref("/company/registrate"));
        }}
      >
        <span className="text-18 black semibold second-family">
          Стать продавцом
        </span>
      </Button>
    </section>
  );
}
