import React from "react";

import classes from "./header-default.module.scss";
import HeaderContainer from "~/src/entities/header-container/ui";
import HeaderDefaultMain from "./main";

export default function HeaderDefault() {
  return (
    <HeaderContainer classNameContainer={`flex-column ${classes.container}`}>
      <HeaderDefaultMain />
    </HeaderContainer>
  );
}
