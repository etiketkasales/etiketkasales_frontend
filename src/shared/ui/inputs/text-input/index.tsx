import React, { memo } from "react";
import classNames from "classnames";

import classes from "./text-input.module.scss";
import CustomInput, { InputProps } from "../../input";

export interface TextInputProps extends InputProps {
  wrapperClassName?: string;
  inputClassName?: string;
  children?: React.ReactNode;
  wrapperRef?: React.Ref<HTMLDivElement | null>;
}

const TextInput: React.FC<TextInputProps> = memo(
  ({
    wrapperClassName,
    inputClassName,
    errorText,
    children,
    error,
    wrapperRef,
    ...inputProps
  }) => {
    return (
      <div
        className={classNames(
          classes.wrapper,
          wrapperClassName,
          errorText && classes.error,
          "relative flex-column",
        )}
        ref={wrapperRef}
      >
        <CustomInput
          {...inputProps}
          errorText={errorText}
          className={classNames(classes.input, inputClassName)}
        />
        {children}
        {errorText && (
          <span
            className={classNames(
              classes.errorText,
              "text-red-500 text-body xs",
            )}
          >
            {errorText}
          </span>
        )}
      </div>
    );
  },
);

TextInput.displayName = "TextInput";

export default TextInput;
