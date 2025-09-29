"use client";
import React from "react";
import clsx from "clsx";

import classes from "./for-bussiness.module.scss";
import Link from "next/link";
import Button from "~/src/shared/ui/button";

export default function ForBussinessSection() {
  return (
    <section
      className={clsx(
        `radius-20 flex-column gap-9 align-center center-element`,
        classes.container,
      )}
    >
      <div className="flex-column gap-7 align-center">
        <h1 className="black text-center second-family text-40 xbold">
          Предложите свои этикетки пользователям нашей платформы
        </h1>
        <h2 className="text-22 text-center regular yellow-dark-2 second-family">
          Зарегистрируйтесь прямо сейчас!
        </h2>
      </div>

      <Button
        as={"a"}
        href="/company/registrate"
        className={`${classes.link}`}
        typeButton={"white"}
        size="16-24"
        radius={12}
      >
        <span className="text-18 black semibold second-family">
          Стать продавцом
        </span>
      </Button>
    </section>
  );
}
