import React, { CSSProperties } from "react";
import classNames from "classnames";

import classes from "./filter-item.module.scss";
import Accordeon from "~/src/shared/ui/accordeon/ui";

interface Props {
  title: string;
  children: React.ReactNode;
  order: number;
  className?: string;
  classNameChildren?: string;
}

export default function FiltersItem({
  title,
  order,
  children,
  className,
  classNameChildren,
}: Props) {
  return (
    <Accordeon
      title={title}
      className={classNames(className, `flex-column gap-4`, classes.container)}
      classNameTitle={`heading h7 text-neutral-1000`}
      classNameChildren={classNameChildren}
      clickOutsideControl={false}
      style={
        {
          "--order": order,
        } as CSSProperties
      }
    >
      {children}
    </Accordeon>
  );
}
