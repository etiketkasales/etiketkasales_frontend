"use client";
import { useRouter } from "next/navigation";

import classes from "./buttons.module.scss";
import Button from "~/src/shared/ui/button";

interface IButton {
  title: string;
  type: "yellow" | "gray-border";
  href: string;
}

const buttons: IButton[] = [
  {
    title: "В личный кабинет",
    type: "yellow",
    href: "/profile",
  },
  {
    title: "На главную",
    type: "gray-border",
    href: "/",
  },
];

export default function OrderErrorButtons() {
  const { push } = useRouter();

  return (
    <div className={`flex gap-3 ${classes.container}`}>
      {buttons.map((item, index) => (
        <Button
          key={`${index}-${item.href}`}
          href={item.href}
          onClick={() => push(item.href)}
          className={classes.button}
          typeButton={item.type}
        >
          <span className="heading h7">{item.title}</span>
        </Button>
      ))}
    </div>
  );
}
