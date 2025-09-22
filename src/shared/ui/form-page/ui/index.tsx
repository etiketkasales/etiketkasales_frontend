"use client";
import React from "react";

import classes from "./form-page.module.scss";

interface Props {
  children: React.ReactNode;
  needBgSvg?: boolean;
}

export default function FormPageWrapper({
  children,
  needBgSvg = false,
}: Props) {
  return (
    <section
      className={`relative ${classes.container}${needBgSvg ? ` ${classes.with_bg}` : ""}`}
    >
      {children}
    </section>
  );
}
