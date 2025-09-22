"use client";
import React, { useEffect, useRef } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setNavigation } from "~/src/app/store/reducers/navigation.slice";
import { useWindowSize } from "react-use";

import classes from "../bottom.module.scss";
import ownClasses from "./logo.module.scss";
import LogoSvg from "~/public/header/logo.svg";
import ImageContainer from "~/src/shared/ui/image-container";
import HeaderBottomNavButton from "../business";
import LinkContainer from "~/src/shared/ui/link-container/ui";

interface Props {
  isCartPage: boolean;
}

export default function HeaderBottomLogo({ isCartPage }: Props) {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useWindowSize();

  useEffect(() => {
    if (width <= 768) {
      if (!ref.current) return;
      if (isCartPage) return;
      dispatch(
        setNavigation({
          headerHeight: 24 + ref.current.scrollHeight || 0,
        }),
      );
    }
  }, [width, dispatch, isCartPage]);

  return (
    <div
      className={`flex-row align-center gap-3 space-between ${ownClasses.container}`}
      ref={ref}
    >
      <LinkContainer link="/" className={classes.button}>
        {width <= 768 ? (
          <LogoSvg />
        ) : (
          <ImageContainer
            src="/header/logo.png"
            alt=""
            width={242}
            height={46}
            className={classes.logo}
            fixedSize
          />
        )}
      </LinkContainer>
      {width <= 768 ? <HeaderBottomNavButton /> : null}
    </div>
  );
}
