"use client";
import React from "react";

import classes from "./radio.module.scss";

interface Props {
  onChange: () => void;
  value: string;
  /** Общий HTML name для всей группы переключателей */
  groupName: string;
  /** Уникальный id инпута (htmlFor лейбла) */
  inputId: string;
  gap?: string;
  label?: string;
  checked?: boolean;
  className?: string;
  type?: "yellow" | "green";
  classNameText?: string;
}

export default function RadioInput({
  onChange,
  gap,
  value,
  label,
  checked,
  className,
  groupName,
  inputId,
  type = "green",
  classNameText = "text-body m text-neutral-700",
}: Props) {
  return (
    <label
      htmlFor={inputId}
      className={`no-select cursor${label ? " align-center" : ""} flex-row${gap ? ` gap-${gap}` : ""} ${className}`}
    >
      <div className={classes.input_wrapper}>
        <input
          id={inputId}
          type="radio"
          value={value}
          className={`${classes.input} ${checked ? classes.checked : ""} ${classes[type]} cursor`}
          onChange={() => {
            onChange();
          }}
          checked={checked}
          name={groupName}
        />
      </div>
      {label && <span className={classNameText}>{label}</span>}
    </label>
  );
}
