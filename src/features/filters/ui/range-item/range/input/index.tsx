import React from "react";

import classes from "./range-input.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import { RangeInputType } from "~/src/features/filters/model";

interface Props {
  value: string;
  type: RangeInputType;
  onChange: (type: RangeInputType, value: string) => void;
  placeholder: string;
}

export default function FiltersRangeInput({
  value,
  type,
  onChange,
  placeholder,
}: Props) {
  return (
    <TextInput
      value={value}
      onChange={(e) => onChange(type, e.target.value)}
      className={`${classes.container}`}
      classNameInput={`${classes.input} text-body l `}
      placeholder={placeholder}
    />
  );
}
