import React from "react";

import classes from "./specs-item.module.scss";
import { ISpecification } from "~/src/entities/etiketka/model";

interface Props extends ISpecification {}

export default function SpecsItem({ title, value }: Props) {
  return (
    <li className={`flex-row gap-1 space-between`}>
      <p className={`text-neutral-700 text-body l ${classes.text}`}>{title}</p>
      <span className={classes.dots}></span>
      <p className={`text-body l text-neutral-1000 ${classes.text}`}>{value}</p>
    </li>
  );
}
