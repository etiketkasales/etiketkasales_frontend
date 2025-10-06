"use client";
import React, { CSSProperties } from "react";
import classNames from "classnames";
import { useHeaderContainer } from "../lib/hooks/useHeaderContainer.hook";

import classes from "./header-container.module.scss";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  children: React.ReactNode;
  heightRef: React.RefObject<HTMLDivElement | null>;
  bgColor?: string;
  className?: string;
  classNameContainer?: string;
  needTranslate?: boolean;
}

export default function HeaderContainer({
  children,
  heightRef,
  className,
  classNameContainer,
  bgColor,
  needTranslate = true,
}: Props) {
  const { translated } = useHeaderContainer({ heightRef, needTranslate });

  return (
    <header className={classNames("header-container", className)}>
      <Container
        bgColor={bgColor}
        className={classNames(
          "wrapper-header",
          classes.container,
          classNameContainer,
          {
            [classes.translated]: translated,
          },
        )}
        style={
          {
            "--translate-value": `-${heightRef.current?.offsetHeight || 0}px`,
          } as CSSProperties
        }
      >
        {children}
      </Container>
    </header>
  );
}
