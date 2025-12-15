import React from "react";

import classes from "./loader.module.scss";
import OrderContainer from "../container";
import Loader from "~/src/shared/ui/loader";

export default function OrderContentLoader() {
  return (
    <OrderContainer className={classes.container}>
      <Loader radius={20} />
    </OrderContainer>
  );
}
