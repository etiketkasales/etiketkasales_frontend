"use client";
import React from "react";

import classes from "./nav.module.scss";
import HeaderBottomNavButton from "../business";
import HeaderBottomFeatures from "./features";
import HeaderBottomAuthorize from "./authorize";

interface Props {
  className: string;
}

export default function HeaderBottomNav({ className }: Props) {
  return (
    <nav
      className={`flex-row gap-9 align-center ${classes.container} ${className}`}
    >
      <HeaderBottomNavButton />
      <HeaderBottomFeatures />
      <HeaderBottomAuthorize />
    </nav>
  );
}
