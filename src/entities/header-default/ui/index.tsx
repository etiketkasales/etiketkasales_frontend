"use client";
import React, { useMemo, useRef } from "react";
import classNames from "classnames";
import { useWindowSize } from "react-use";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import classes from "./header-default.module.scss";
import HeaderContainer from "~/src/entities/header-container/ui";
import HeaderDefaultMain from "./main";
import HeaderMedia from "./media";
import HeaderLinks from "./links";

interface Props {
  mediaBgColor?: string;
  CustomMediaHeader?: React.ReactNode;
  className?: string;
  flexDirection?: "row" | "column";
  customRefMedia?: React.RefObject<HTMLDivElement | null>;
  needTranslate?: boolean;
}

export default function HeaderDefault({
  mediaBgColor = "yellow-500",
  CustomMediaHeader,
  className,
  flexDirection = "column",
  customRefMedia,
  needTranslate = true,
}: Props) {
  const { width } = useWindowSize();
  const { loaded } = useAppSelector(selectNavigation);
  const heightRef = useRef<HTMLDivElement>(null);
  const heightRefMedia = useRef<HTMLDivElement>(null);
  const isMobile = useMemo(() => {
    return width <= 768;
  }, [width]);

  return (
    <HeaderContainer
      needTranslate={needTranslate}
      bgColor={isMobile ? mediaBgColor : "neutral-100"}
      classNameContainer={classNames(`flex-${flexDirection}`, className, {
        [classes.hidden]: !loaded,
      })}
      heightRef={isMobile ? customRefMedia || heightRefMedia : heightRef}
    >
      {!isMobile ? (
        <>
          <HeaderLinks heightRef={heightRef} />
          <HeaderDefaultMain />
        </>
      ) : CustomMediaHeader ? (
        CustomMediaHeader
      ) : (
        <HeaderMedia heightRef={heightRefMedia} />
      )}
    </HeaderContainer>
  );
}
