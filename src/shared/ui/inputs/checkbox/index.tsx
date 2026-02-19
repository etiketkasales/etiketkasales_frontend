"use client";
import React, { useRef } from "react";
import { useWindowSize } from "react-use";
import classNames from "classnames";

import classes from "./checkbox.module.scss";
import CheckboxChecked24 from "~/public/shared/checkbox-checked-24.svg";
import ChecboxChecked from "~/public/shared/checkbox-checked.svg";

interface Props {
  onChange: (e: boolean) => void;
  checked: boolean;
  gap?: string;
  label?: string;
  nodeLabel?: React.ReactNode;
  name?: string;
  className?: string;
  classNameLabel?: string;
  checkboxClassName?: string;
  error?: boolean;
  id?: string;
}

export default function CheckboxInput({
  onChange,
  gap,
  label,
  name,
  checked,
  className,
  classNameLabel,
  checkboxClassName,
  nodeLabel,
  error = false,
  id,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { width } = useWindowSize();

  return (
    <label
      htmlFor={name}
      className={classNames(
        `relative no-select cursor flex-row${gap ? ` gap-${gap}` : ""}`,
        className,
      )}
    >
      <input
        ref={inputRef}
        type="checkbox"
        className={classNames(`cursor`, classes.container, {
          [classes.checked]: checked,
          [classes.error]: error,
          checkboxClassName,
        })}
        onChange={() => {
          onChange(!checked);
        }}
        checked={checked}
        name={name}
        id={id}
      />
      {label && <span className={classNameLabel}>{label}</span>}
      {nodeLabel}
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
