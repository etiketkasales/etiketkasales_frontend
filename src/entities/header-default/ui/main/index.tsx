import React from "react";

import classes from "./header-default-main.module.scss";
import HeaderLogo from "./logo";
import HeaderSearch from "./search";
import HeaderFeatures from "./features";

export default function HeaderDefaultMain() {
  return (
    <div className={`flex-row align-center gap-10 ${classes.container}`}>
      <HeaderLogo />
      <HeaderSearch />
      <HeaderFeatures />
    </div>
  );
}
