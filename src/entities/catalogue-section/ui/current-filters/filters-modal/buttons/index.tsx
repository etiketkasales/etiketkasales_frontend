"use client";
import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setCatalogueActiveCategories } from "~/src/app/store/reducers/catalogue.slice";

import classes from "./modal-button.module.scss";
import Button from "~/src/shared/ui/button";

interface Props {
  onClose: () => void;
}

interface IButton {
  onClick: () => void;
  type: "white" | "yellow";
  text: string;
}

export default function FitlersModalButtons({ onClose }: Props) {
  const { push } = useRouter();
  const dispatch = useAppDispatch();

  const buttons: IButton[] = useMemo(
    () => [
      {
        onClick: () => {
          push("/catalogue");
          dispatch(setCatalogueActiveCategories(null));
          onClose();
        },
        type: "white",
        text: "Очистить все",
      },
      {
        onClick: onClose,
        type: "yellow",
        text: "Применить",
      },
    ],
    [onClose, push, dispatch],
  );

  return (
    <div className="flex-row gap-4 align-center">
      {buttons.map((item, index) => {
        return (
          <Button
            key={index + item.text}
            typeButton={item.type}
            onClick={item.onClick}
            radius={12}
            className={classes.button}
          >
            <span className="heading h7 text-neutral-1000">{item.text}</span>
          </Button>
        );
      })}
    </div>
  );
}
