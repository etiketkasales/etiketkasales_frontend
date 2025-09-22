"use client";
import React from "react";

import classes from "./wrapper.module.scss";
import LoginHeader from "../header";

interface Props {
  children: React.ReactNode;
  title: string;
}

export default function LoginWrapper({ children, title }: Props) {
  return (
    <section
      className={`absolute white-container padding-20 radius-20 flex-column gap-6 ${classes.container}`}
    >
      <LoginHeader title={title} />
      {children}
    </section>
  );
}
