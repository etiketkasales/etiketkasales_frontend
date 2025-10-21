"use client";
import React from "react";
import classNames from "classnames";
import { useUpdateSearchParams } from "~/src/shared/lib/hooks/useUpdateSearchParams.hook";

import classes from "../item-wrapper.module.scss";
import Container from "~/src/shared/ui/container/ui";
import { IBaseWrapperProps } from "..";

interface Props extends IBaseWrapperProps {}

export default function CatalogueItemWrapper({
  children,
  itemId,
  className,
  clickAction = "toggle",
}: Props) {
  const updateParams = useUpdateSearchParams();

  return (
    <Container
      bgColor={null}
      as={"button"}
      className={classNames(
        `flex-column gap-2 cursor align-center`,
        classes.container,
        className,
      )}
      onClick={() =>
        updateParams({
          key: "category_id",
          value: itemId,
          action: clickAction,
          routerReplace: true,
        })
      }
    >
      {children}
    </Container>
  );
}
