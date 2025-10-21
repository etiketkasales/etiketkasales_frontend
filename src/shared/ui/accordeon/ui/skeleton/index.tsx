import React from "react";

import Arrow from "~/public/shared/chevron-compact-down.svg";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";

interface Props {
  className: string;
}

export default function AccordeonSkeleton({ className }: Props) {
  return (
    <div className={`flex-row space-between`}>
      <SkeletonWrapper className={className} />
      <Arrow />
    </div>
  );
}
