"use client";
import React from "react";

import classes from "./wrapper.module.scss";
import Wrapper from "~/src/shared/ui/wrapper";

interface Props {
  children: React.ReactNode;
  className?: string;
  title: string;
}

export default function OrderMainWrapper({
  children,
  className,
  title,
}: Props) {
  return (
    <Wrapper padding={"20px"} className={`${className} gap-5`}>
      <h3 className="black bold second-family text-20">{title}</h3>
      {children}
    </Wrapper>
  );
}
