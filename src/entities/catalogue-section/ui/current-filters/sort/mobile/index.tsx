import React from "react";

import Icon from "~/public/catalogue/sort.svg";
import CurrentFiltersItemWrapper from "~/src/entities/catalogue-section/ui/current-filters/item-wrapper";

interface Props {
  className?: string;
}

export default function SortMobile({ className }: Props) {
  return (
    <CurrentFiltersItemWrapper
      type="neutral"
      as={"button"}
      className={className}
    >
      <Icon />
    </CurrentFiltersItemWrapper>
  );
}
