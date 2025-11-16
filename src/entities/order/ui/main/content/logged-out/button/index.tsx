"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setForwardHref } from "~/src/app/store/reducers/login.slice";

import classes from "./button.module.scss";
import Button from "~/src/shared/ui/button";

export default function LoggedOutButton() {
  const dispatch = useAppDispatch();
  const { push } = useRouter();

  const onClick = useCallback(() => {
    dispatch(setForwardHref("/login/final"));
    push("/login");
  }, [dispatch, push]);

  return (
    <Button
      typeButton="yellow"
      size="12"
      onClick={onClick}
      radius={12}
      className={classes.button}
    >
      <span className="heading h7 text-yellow-1000">Войти</span>
    </Button>
  );
}
