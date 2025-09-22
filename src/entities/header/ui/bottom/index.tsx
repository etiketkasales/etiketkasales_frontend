"use client";
import React, { useEffect } from "react";
import { useWindowSize } from "react-use";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import classes from "./bottom.module.scss";
import HeaderBottomSearch from "./search";
import HeaderBottomNav from "./nav";
import HeaderBottomLogo from "./logo";

interface Props {
  isCartPage: boolean;
}

export default function HeaderBottom({ isCartPage }: Props) {
  const { width } = useWindowSize();
  const { deviceType } = useAppSelector(selectNavigation);
  const [isEtiketkaPage, setIsEtiketkaPage] = React.useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const path = window.location.pathname;
    if (path.includes("etiketka")) {
      setIsEtiketkaPage(true);
    }
  }, []);

  const getDynamicClasses = () => {
    const classesList: string[] = [];
    if (deviceType === "ios") {
      classesList.push(classes.pt_49);
    }

    if (width < 768) {
      if (isEtiketkaPage) {
        classesList.push(`container-neutral-100 ${classes.pb_12}`);
      } else {
        classesList.push(`container-yellow-500`);
      }
    } else {
      classesList.push(`container-neutral-100`);
    }

    return classesList.map((item) => ` ${item}`);
  };

  return (
    <section
      className={`flex-row gap-10 align-center padding-16 ${getDynamicClasses()} ${classes.container}`}
    >
      {isEtiketkaPage ? (
        width <= 768 ? null : (
          <HeaderBottomLogo isCartPage={isCartPage} />
        )
      ) : (
        <HeaderBottomLogo isCartPage={isCartPage} />
      )}
      <HeaderBottomSearch
        className={classes.search}
        isEtiketkaPage={isEtiketkaPage}
      />
      {width > 768 ? <HeaderBottomNav className={classes.nav} /> : null}
    </section>
  );
}
