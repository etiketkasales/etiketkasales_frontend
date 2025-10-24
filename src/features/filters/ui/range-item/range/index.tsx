import React from "react";

import classes from "./filters-range.module.scss";
import { IRange } from "~/src/features/filters/lib/hooks/useFiltersRange.hook";
import { RangeInputType } from "~/src/features/filters/model";
import FiltersRangeInput from "./input";

interface Props {
  value: IRange;
  min: number;
  max: number;
  onInputChange: (type: RangeInputType, value: string) => void;
}

const typesToMap: RangeInputType[] = ["max", "min"] as const;

export default function FiltersRange({
  min,
  max,
  value,
  onInputChange,
}: Props) {
  const placeholders = { min: min.toString(), max: max.toString() };

  return (
    <div className="flex-row align-center gap-2">
      {typesToMap.map((type, index) => {
        return (
          <FiltersRangeInput
            key={index + type}
            type={type}
            onChange={onInputChange}
            value={value[type]}
            placeholder={placeholders[type]}
          />
        );
      })}
    </div>
  );
}
