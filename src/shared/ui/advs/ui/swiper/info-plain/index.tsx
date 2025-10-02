"use client";
import React from "react";

import classes from "./info-plain.module.scss";
import Info2Circle from "~/public/adv/info2-circle.svg";
import Container from "~/src/shared/ui/container/ui";

export default function InfoPlain() {
  return (
    <Container
      bgColor={"neutral-1000"}
      className={`absolute align-center flex-row gap-6px ${classes.container}`}
    >
      <Info2Circle className={classes.icon} />
      <p className="text-14 white semibold second-family">Реклама</p>
    </Container>
  );
}
