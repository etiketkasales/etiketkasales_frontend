"use client";
import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames";

import classes from "./button.module.scss";
import Icon from "~/public/etiketka-page/chevron-compact-right.svg";
import Button from "~/src/shared/ui/button";

interface Props {
  viewAll: boolean;
  setViewAll: Dispatch<SetStateAction<boolean>>;
}

export default function CharacteristicsButton({ viewAll, setViewAll }: Props) {
  return (
    <div>
      <Button
        typeButton="ghost"
        onClick={() => setViewAll(!viewAll)}
        needActiveScale={false}
        justifyCenter={false}
        className={`grid-column gap-1 align-center`}
      >
        <span className={`heading h7 text-yellow-600`}>
          {!viewAll ? "Все характеристики" : "Скрыть"}
        </span>
        <Icon
          className={classNames(classes.icon, { [classes.active]: viewAll })}
        />
      </Button>
    </div>
  );
}
