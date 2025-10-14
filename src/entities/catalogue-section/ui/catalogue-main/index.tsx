"use client";
import React from "react";

import classes from "./catalogue.module.scss";

interface Props {}

export default function CatalogueMain({}: Props) {
  return <div className={`flex-column ${classes.container} gap-5`}></div>;
}
