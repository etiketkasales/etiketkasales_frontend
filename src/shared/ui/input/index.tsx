import React, { Ref } from "react";

import classes from "./input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  classNameLabel?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  type?: string;
  name?: string;
  disabled?: boolean;
  ref?: Ref<HTMLInputElement>;
  label?: string;
  errorText?: string;
}

export default function Input({
  className,
  classNameLabel,
  placeholder,
  onChange,
  value,
  type,
  name,
  disabled,
  ref,
  label,
  errorText = "",
  ...rest
}: InputProps) {
  return (
    <label
      htmlFor={name}
      className={`${classNameLabel} cursor no-select flex-column`}
    >
      <input
        {...rest}
        ref={ref}
        name={name ?? ""}
        type={type ?? "text"}
        disabled={disabled}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${className} ${classes.input} ${errorText && classes.error}`}
      />
      {errorText && <p className="red text-14 regular">{errorText}</p>}
    </label>
  );
}
