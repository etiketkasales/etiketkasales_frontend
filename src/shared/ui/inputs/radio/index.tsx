"use client";
import React, { useRef } from "react";

import classes from "./radio.module.scss";

interface Props {
  onChange: () => void;
  value: string;
  name: string;
  gap?: string;
  label?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  className?: string;
  type?: "yellow" | "green";
}

export default function RadioInput({
  onChange,
  gap,
  value,
  label,
  name,
  checked,
  className,
  type = "green",
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <label
      htmlFor={name}
      className={`no-select cursor${label ? " align-center" : ""} flex-row${gap ? ` gap-${gap}` : ""} ${className}`}
      onClick={() => [inputRef.current?.click()]}
    >
      <div className={classes.input_wrapper}>
        <input
          ref={inputRef}
          type="radio"
          value={value}
          className={`${classes.input} ${checked ? classes.checked : ""} ${classes[type]} cursor`}
          onChange={() => {
            onChange();
          }}
          checked={checked}
          name={name}
        />
      </div>
      {label && (
        <span className="text-16 regular second-family gray-2">{label}</span>
      )}
    </label>
  );
}
