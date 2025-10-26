"use client";
import React, { useState } from "react";
import { useWindowSize } from "react-use";

import classes from "./sort.module.scss";
import SortMobile from "./mobile";

export default function Sort() {
  const [optionsActive, setOptionsActive] = useState<boolean>(false);
  const { width } = useWindowSize();

  return (
    <>{width <= 1024 ? <SortMobile className={classes.mobile} /> : null}</>
  );
}
