"use client";
import React from "react";
import { useWindowSize } from "react-use";
import classNames from "classnames";

import classes from "./header-default.module.scss";
import HeaderContainer from "~/src/entities/header-container/ui";
import HeaderDefaultMain from "./main";
import HeaderMedia from "./media";
import HeaderLinks from "./links";

export default function HeaderDefault() {
  const { width } = useWindowSize();
  return (
    <HeaderContainer
      bgColor={width <= 768 ? "yellow-500" : "neutral-100"}
      classNameContainer={classNames(`flex-column`, classes.container)}
    >
      {width <= 768 ? (
        <HeaderMedia />
      ) : (
        <>
          <HeaderLinks />
          <HeaderDefaultMain />
        </>
      )}
    </HeaderContainer>
  );
}
