import React from "react";
import classNames from "classnames";

import classes from "./aside-item.module.scss";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  onClick: () => void;
  title: string;
  isActive: boolean;
  isDangerous?: boolean;
}

export default function ProfileAsideItem({
  onClick,
  title,
  isActive,
  isDangerous = false,
}: Props) {
  return (
    <Container
      bgColor={!isActive ? "neutral-100" : "yellow-200"}
      className={classNames(
        `flex-row space-betweeen align-center gap-6px pointer`,
        classes.container,
        {
          [classes.dangerous]: isDangerous,
        },
      )}
      onClick={() => {
        onClick();
      }}
    >
      <p className="text-body xl text-yellow-1000">{title}</p>
    </Container>
  );
}
