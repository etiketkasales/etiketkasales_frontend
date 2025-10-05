"use client";
import React from "react";
import { useWindowSize } from "react-use";
import classNames from "classnames";

import classes from "./header-default.module.scss";
import HeaderContainer from "~/src/entities/header-container/ui";
import HeaderDefaultMain from "./main";
import HeaderMedia from "./media";
import HeaderLinks from "./links";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

interface Props {
  mediaBgColor?: string;
  CustomMediaHeader?: React.ReactNode;
  className?: string;
  flexDirection?: "row" | "column";
}

export default function HeaderDefault({
  mediaBgColor = "yellow-500",
  CustomMediaHeader,
  className,
  flexDirection = "column",
}: Props) {
  const { width } = useWindowSize();
  const { loaded } = useAppSelector(selectNavigation);
  return (
    <HeaderContainer
      bgColor={width <= 768 ? mediaBgColor : "neutral-100"}
      classNameContainer={classNames(
        `flex-${flexDirection}`,
        className,
        classes.container,
        {
          [classes.hidden]: !loaded,
        },
      )}
    >
      {width > 768 ? (
        <>
          <HeaderLinks />
          <HeaderDefaultMain />
        </>
      ) : CustomMediaHeader ? (
        CustomMediaHeader
      ) : (
        <HeaderMedia />
      )}
    </HeaderContainer>
  );
}
