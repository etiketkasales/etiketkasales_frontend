import React, { Ref } from "react";

import classes from "./input.module.scss";
import classNames from "classnames";

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
  classNameError?: string;
  borderType?: "label" | "input";
  separatedPlaceholder?: boolean;
  separatedPlaceholderClassName?: string;
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
  classNameError,
  borderType = "input",
  separatedPlaceholder,
  separatedPlaceholderClassName,
  ...rest
}: InputProps) {
  return (
    <label
      htmlFor={rest.id}
      className={classNames(
        `cursor no-select flex-column ${classes.label}`,
        classNameLabel,
        {
          [classes.error]: errorText && borderType === "label",
          ["relative"]: separatedPlaceholder,
        },
      )}
    >
      <input
        {...rest}
        ref={ref}
        name={name ?? ""}
        type={type ?? "text"}
        disabled={disabled}
        placeholder={separatedPlaceholder ? undefined : placeholder}
        value={value}
        onChange={onChange}
        className={classNames(`${classes.input}`, className, {
          [classes.error]: errorText && borderType === "input",
        })}
      />
      {separatedPlaceholder && (
        <p className={separatedPlaceholderClassName}>{placeholder}</p>
      )}
      {errorText && (
        <p className={classNames(`red text-14 regular`, classNameError)}>
          {errorText}
        </p>
      )}
    </label>
  );
}
