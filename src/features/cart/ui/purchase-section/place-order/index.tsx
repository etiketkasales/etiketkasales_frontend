"use client";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";

import classes from "./place-order.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  openModal: () => void;
}

interface IButton {
  title: string;
  type: "yellow" | "gray-border";
  link: string;
  onClick?: () => void;
}

export default function CartPlaceOrder({ openModal }: Props) {
  const { push } = useRouter();
  const { companies } = useAppSelector(selectUser);

  const onAsCompanyClick = useCallback(() => {
    if (!companies || companies.length === 0) {
      openModal();
    } else {
      push("/order/company");
    }
  }, [companies, openModal, push]);

  const buttons: IButton[] = [
    {
      title: "Перейти к оформлению",
      type: "yellow",
      link: "/order",
    },
    {
      title: "Купить как юр. лицо",
      type: "gray-border",
      link: "/order/company",
      onClick: onAsCompanyClick,
    },
  ];

  return (
    <div className="flex-column gap-10px">
      {buttons.map((item, index) => {
        return (
          <Button
            key={`${item.title}-${index}`}
            as="a"
            typeButton={item.type}
            size="12"
            radius={12}
            className={classes.button}
            href={item.link}
            customClickWithHref={item.onClick}
          >
            <span className="text-16 black second-family semibold">
              {item.title}
            </span>
          </Button>
        );
      })}
    </div>
  );
}
