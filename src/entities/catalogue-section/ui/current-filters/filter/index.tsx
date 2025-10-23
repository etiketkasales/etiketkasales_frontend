import React from "react";
import { useUpdateSearchParams } from "~/src/shared/lib/hooks/useUpdateSearchParams.hook";

import classes from "./filter.module.scss";
import FilterWrapperWithIcon from "../item-wrapper/with-button";

interface Props {
  title: string;
  value: string;
  filterName: string;
  lastCount: number;
  onClick?: () => void;
}

export default function CurrentFiltersItem({
  title,
  value,
  filterName,
  lastCount,
  onClick,
}: Props) {
  const clearParams = useUpdateSearchParams();
  return (
    <FilterWrapperWithIcon
      type="yellow"
      classNameIcon={classes.icon}
      onButtonClick={() => {
        clearParams({
          key: filterName,
          action: "clear",
          routerReplace: true,
        });
        onClick?.();
      }}
    >
      <span className={`text-body l text-yellow-1000`}>
        {title}: {value}
        {lastCount > 0 && <span className={`heading h7`}>; +{lastCount}</span>}
      </span>
    </FilterWrapperWithIcon>
  );
}
