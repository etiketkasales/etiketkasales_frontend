import React from "react";

import classes from "./input.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import { IQuoteInput } from "~/src/entities/profile-section/model";
import { IChangeableProfile } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";

interface Props extends IQuoteInput {
  changeData: IChangeableProfile;
  onChange: (v: string, field: keyof IChangeableProfile) => void;
  onBooleanChange?: (v: boolean, field: keyof IChangeableProfile) => void;
  error: MessageI | null;
}

export default function QuoteInput({
  placeholder,
  field,
  type,
  changeData,
  onChange,
  onBooleanChange,
  error,
  maxLength,
}: Props) {
  if (type === "checkbox") {
    return (
      <CheckboxInput
        checked={changeData[field] as boolean}
        onChange={(e) => onBooleanChange?.(e, field)}
        label={placeholder}
        className={`flex-row gap-10px flex-start ${classes.input}`}
        classNameLabel={`text-body l text-neutral-700 ${classes.checkboxLabel}`}
        name={`etiketka-${field}`}
        id={`etiketka-${field}`}
      />
    );
  }

  return (
    <TextInput
      inputClassName={`text-body l text-neutral-900 ${classes.input} ${classes.inputWrapper}`}
      value={changeData[field]?.toString() ?? ""}
      onChange={(e) => {
        if (type === "number") {
          const numValue = Number(e.target.value);
          if (isNaN(numValue)) return;
        }
        onChange(e.target.value, field);
      }}
      placeholder={placeholder}
      errorText={error?.field === field ? error.message || "" : ""}
      maxLength={maxLength}
      name={`etiketka-${field}`}
      id={`etiketka-${field}`}
    />
  );
}
