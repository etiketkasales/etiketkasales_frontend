import React from "react";
import classNames from "classnames";

import Accordeon from "~/src/shared/ui/accordeon/ui";

interface Props {
  title: string;
  children: React.ReactNode;
  className?: string;
  classNameChildren?: string;
}

export default function FiltersItem({
  title,
  children,
  className,
  classNameChildren,
}: Props) {
  return (
    <Accordeon
      title={title}
      className={classNames(className, `flex-column gap-4`)}
      classNameTitle={`heading h7 text-neutral-1000`}
      classNameChildren={classNameChildren}
      clickOutsideControl={false}
    >
      {children}
    </Accordeon>
  );
}
