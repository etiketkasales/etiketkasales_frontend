import classNames from "classnames";
import React from "react";

import Accordeon from "~/src/shared/ui/accordeon/ui";

interface Props {
  title: string;
  children: React.ReactNode;
  clickRef: React.RefObject<HTMLDivElement | null>;
  className?: string;
}

export default function FiltersItem({
  title,
  children,
  clickRef,
  className,
}: Props) {
  return (
    <Accordeon
      title={title}
      className={classNames(className, `flex-column gap-4`)}
      classNameTitle={`heading h7 text-neutral-1000`}
      clickOutsideControl={false}
      clickRef={clickRef}
    >
      {children}
    </Accordeon>
  );
}
