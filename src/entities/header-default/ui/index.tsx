import React from "react";

import classes from "./header-default.module.scss";
import HeaderContainer from "~/src/entities/header-container/ui";
import HeaderDefaultMain from "./main";
import HeaderLinks from "./links";

export default function HeaderDefault() {
  return (
    <HeaderContainer classNameContainer={`flex-column`}>
      <HeaderLinks />
      <HeaderDefaultMain />
    </HeaderContainer>
  );
}
