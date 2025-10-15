import React from "react";
import classNames from "classnames";

import classes from "../item-wrapper.module.scss";
import Container from "~/src/shared/ui/container/ui";
import { IBaseWrapperProps } from "..";

interface Props extends IBaseWrapperProps {}

export default function HomeItemWrapper({
  className,
  itemId,
  children,
}: Props) {
  return (
    <Container
      bgColor={null}
      as={"a"}
      className={classNames(
        `flex-column gap-2 cursor align-center`,
        classes.container,
        className,
      )}
      rel={"noopener norefferer"}
      href={`/catalogue${itemId ? `?category_id=${itemId},` : ""}`}
    >
      {children}
    </Container>
  );
}
