import React from "react";

import classes from "./cart-header.module.scss";
import HeaderWithBack from "~/src/entities/header-with-back/ui";
import HeaderSearch from "~/src/entities/header-default/ui/search";

export default function CartHeader() {
  return (
    <HeaderWithBack className={classes.container}>
      <HeaderSearch className={classes.input} />
    </HeaderWithBack>
  );
}
