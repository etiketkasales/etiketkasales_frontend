"use client";
import React, { useRef } from "react";
import { useWindowSize } from "react-use";

import classes from "./checkbox.module.scss";
import ChecboxChecked from "~/public/shared/checkbox-checked.svg";
import CheckboxChecked24 from "~/public/shared/checkbox-checked-24.svg";
import classNames from "classnames";

interface Props {
  onChange: (e: boolean) => void;
  checked: boolean;
  gap?: string;
  label?: string;
  name?: string;
  className?: string;
  classNameLabel?: string;
  error?: boolean;
}

export default function CheckboxInput({
  onChange,
  gap,
  label,
  name,
  checked,
  className,
  classNameLabel,
  error = false,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { width } = useWindowSize();

  return (
    <label
      htmlFor={name}
      className={classNames(
        `relative no-select cursor${label ? " align-center" : ""} flex-row${gap ? ` gap-${gap}` : ""}`,
        className,
      )}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className={classNames(`cursor`, classes.container, {
          [classes.checked]: checked,
          [classes.error]: error,
        })}
        onChange={() => {
          onChange(!checked);
        }}
        checked={checked}
        name={name}
      />
      {label && <span className={classNameLabel}>{label}</span>}
      {checked &&
        (width > 460 ? (
          <ChecboxChecked
            className={classes.icon}
            onClick={() => inputRef.current?.click()}
          />
        ) : (
          <CheckboxChecked24
            className={classes.icon}
            onClick={() => inputRef.current?.click()}
          />
        ))}
    </label>
  );
}
