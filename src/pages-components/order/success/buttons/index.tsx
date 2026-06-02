"use client";
import { useRouter } from "next/navigation";

import classes from "./buttons.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  isInvoicePayment?: boolean;
  orderId?: number | null;
}

const ordersHref = "/profile/buyer?active_section=orders";

export default function OrderSuccessButtons({
  isInvoicePayment = false,
}: Props) {
  const { push } = useRouter();

  const buttons = isInvoicePayment
    ? [
        {
          title: "Мои заказы и счёт",
          type: "yellow" as const,
          href: ordersHref,
        },
        {
          title: "На главную",
          type: "gray-border" as const,
          href: "/",
        },
      ]
    : [
        {
          title: "Мои заказы",
          type: "yellow" as const,
          href: ordersHref,
        },
        {
          title: "На главную",
          type: "gray-border" as const,
          href: "/",
        },
      ];

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
