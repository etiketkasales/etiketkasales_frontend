"use client";
import React from "react";

import classes from "./wrapper.module.scss";
import ContainerShared from "~/src/shared/ui/container/ui";

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
    <ContainerShared padding={"20"} gap={5} className={`${className}`}>
      <h3 className="black bold second-family text-20">{title}</h3>
      {children}
    </ContainerShared>
  );
}
