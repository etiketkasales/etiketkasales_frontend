"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import classes from "./footer.module.scss";
import FooterTop from "./top";
import FooterBottom from "./bottom";

export default function Footer() {
  const { tabsHeight } = useAppSelector(selectNavigation);
  return (
    <footer>
      <section
        className={`wrapper black-container padding-32-24 flex-column gap-50 ${classes.container}`}
        style={{
          paddingBottom: tabsHeight ? `${tabsHeight + 24}px` : "0",
        }}
      >
        <FooterTop />
        <div className={classes.drag}></div>
        <FooterBottom />
      </section>
    </footer>
  );
}
