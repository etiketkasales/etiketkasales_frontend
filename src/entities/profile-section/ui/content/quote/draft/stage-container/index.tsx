import React from "react";
import classNames from "classnames";

import classes from "./stage-container.module.scss";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function QuoteStageContainer({
  title,
  children,
  className,
}: Props) {
  return (
    <div className={classNames(`flex-column`, classes.container, className)}>
      <h6 className="heading h6 text-neutral-1000">{title}</h6>
      {children}
    </div>
  );
}
