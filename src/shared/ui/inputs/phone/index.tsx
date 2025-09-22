import React from "react";

import classes from "./phone.module.scss";
import Input, { InputProps } from "~/src/shared/ui/input";

interface Props extends InputProps {
  classNameInput?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  name?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  title?: string;
}

export default function PhoneInput({
  classNameInput,
  placeholder,
  disabled,
  onChange,
  value,
  name,
  onKeyDown,
  title,
  ...rest
}: Props) {
  return (
    <Input
      className={`${classNameInput} ${classes.input} text-16 black regular second-family`}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      value={value}
      type={"tel"}
      name={name}
      onKeyDown={onKeyDown}
      title={title}
      {...rest}
    />
  );
}
