"use client";
import React from "react";

import classes from "./wrapper.module.scss";
import LoginHeader from "../header";
import Container from "~/src/shared/ui/container/ui";

interface Props {
  children: React.ReactNode;
  title: string;
}

export default function LoginWrapper({ children, title }: Props) {
  return (
    <Container
      as="section"
      className={`absolute padding-20 radius-20 flex-column gap-6 ${classes.container}`}
    >
      <LoginHeader title={title} />
      {children}
    </Container>
  );
}
