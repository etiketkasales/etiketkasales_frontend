"use client";
import React from "react";

import classes from "./item-wrapper.module.scss";

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function ItemWrapper({ children, className, onClick }: Props) {
  return (
    <div
      className={`flex-column gap-2 cursor align-center ${className} ${classes.container}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
