import React from "react";

import classes from "./loader.module.scss";
import OrderContainer from "../container";
import LoaderCircle from "~/src/shared/ui/loader-circle";

export default function OrderContentLoader() {
  return (
    <OrderContainer className={classes.container}>
      <LoaderCircle radius={20} />
    </OrderContainer>
  );
}
