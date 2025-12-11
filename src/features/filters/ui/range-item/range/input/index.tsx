import React from "react";

import classes from "./range-input.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import { RangeInputType } from "~/src/features/filters/model";

interface Props {
  value: string;
  type: RangeInputType;
  onChange: (type: RangeInputType, value: string) => void;
  placeholder: string;
  filterName: string;
}

export default function FiltersRangeInput({
  value,
  type,
  onChange,
  placeholder,
  filterName,
}: Props) {
  return (
    <TextInput
      id={filterName + "_" + type}
      value={value}
      onChange={(e) => onChange(type, e.target.value)}
      inputClassName={`${classes.input} text-body l`}
      placeholder={placeholder}
      name={filterName + "_" + type}
    />
  );
}
