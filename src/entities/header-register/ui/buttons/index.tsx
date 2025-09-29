import React from "react";

import Button from "~/src/shared/ui/button";

interface ButtonI {
  title: string;
  type: "yellow" | "border-bg";
  link: string;
}

export default function HeaderRegisterButtons() {
  const buttons: ButtonI[] = [
    {
      title: "Войти",
      type: "border-bg",
      link: "/login",
    },
    {
      title: "Стать продавцом",
      type: "yellow",
      link: "/company/registrate",
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
