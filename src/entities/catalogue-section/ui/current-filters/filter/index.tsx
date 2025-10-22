import React from "react";

import classes from "./filter.module.scss";
import XCircle from "~/public/shared/x-circle.svg";
import Button from "~/src/shared/ui/button";
import CurrentFiltersItemWrapper from "../item-wrapper";
import { useUpdateSearchParams } from "~/src/shared/lib/hooks/useUpdateSearchParams.hook";

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
    <CurrentFiltersItemWrapper
      type="yellow"
      className="flex-row gap-2 align-center"
    >
      <span className={`text-body l text-yellow-1000`}>
        {title}: {value}
        {lastCount > 0 && <span className={`heading h7`}>; +{lastCount}</span>}
      </span>
      <Button
        typeButton="ghost"
        size="0"
        needActiveScale={false}
        onClick={() => {
          clearParams({
            key: filterName,
            action: "clear",
            routerReplace: true,
          });
          onClick?.();
        }}
      >
        <XCircle className={classes.icon} />
      </Button>
    </CurrentFiltersItemWrapper>
  );
}
