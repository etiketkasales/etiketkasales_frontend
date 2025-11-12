"use client";
import React from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setForwardHref } from "~/src/app/store/reducers/login.slice";

import Button from "~/src/shared/ui/button";

interface ButtonI {
  title: string;
  type: "yellow" | "border-bg";
  link: string;
  onClick?: () => void;
}

export default function HeaderRegisterButtons() {
  const dispatch = useAppDispatch();
  const buttons: ButtonI[] = [
    {
      title: "Войти",
      type: "border-bg",
      link: "/login",
    },
    {
      title: "Стать продавцом",
      type: "yellow",
      link: "/login",
      onClick: () => dispatch(setForwardHref("/company/registrate")),
    },
  ];

  return (
    <nav className="flex-row gap-3 align-center">
      {buttons.map((item, index) => {
        return (
          <Button
            as="a"
            key={`${item.link}-${index}`}
            typeButton={item.type}
            size="12"
            radius={12}
            href={item.link}
            onClick={item.onClick}
          >
            <span className="text-16 black second-family semibold">
              {item.title}
            </span>
          </Button>
        );
      })}
    </nav>
  );
}
