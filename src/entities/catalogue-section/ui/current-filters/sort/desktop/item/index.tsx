import React from "react";
import classNames from "classnames";

import classes from "./sort-item.module.scss";
import Check from "~/public/catalogue/check.svg";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  name: string;
  isActive: boolean;
  onClick: () => void;
}

export default function SortItem({ onClick, name, isActive }: Props) {
  return (
    <Container
      bgColor={isActive ? "yellow-200" : "neutral-100"}
      as="li"
      className={classNames(
        classes.container,
        "flex-row gap-10px space-between align-center",
        {
          [classes.active]: isActive,
        },
      )}
      onClick={onClick}
    >
      <span
        className={`text-body l ${isActive ? "yellow-1000" : "neutral-1000"} nowrap-text`}
      >
        {name}
      </span>
      {isActive && <Check />}
    </Container>
  );
}
