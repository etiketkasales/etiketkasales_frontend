"use client";

import classes from "./skeleton.module.scss";

interface Props {
  className?: string;
}

export default function SkeletonWrapper({ className }: Props) {
  return <div className={`${classes.container} ${className}`}></div>;
}
