"use client";
import React from "react";

import classes from "./info-plain.module.scss";
import Info2Circle from "~/public/adv/info2-circle.svg";

export default function InfoPlain() {
  return (
    <div
      className={`radius-12 black-container absolute ${classes.container} align-center flex-row gap-6px padding-6`}
    >
      <Info2Circle className={classes.icon} />
      <p className="text-14 white semibold second-family">Реклама</p>
    </div>
  );
}
