import React, { RefObject } from "react";
import classNames from "classnames";

import classes from "./new-input.module.scss";
import Button from "../button";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  classNameLabel?: string;

  LeftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  RightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onLeftIconClick?: () => void;
  onRightIconClick?: () => void;
  iconButtonClassName?: string;

  placeholder?: string;
  value?: string | number;
  separatedPlaceholder?: boolean;
  separatedPlaceholderClassName?: string;

  ref?: RefObject<HTMLInputElement>;
  errorText?: string;
}

const CustomInput = ({
  className,
  classNameLabel,
  LeftIcon,
  RightIcon,
  onLeftIconClick,
  onRightIconClick,
  iconButtonClassName,
  placeholder,
  value,
  separatedPlaceholder = true,
  separatedPlaceholderClassName,
  ref,
  errorText,
  ...rest
}: InputProps) => {
  const defaultRef = React.useRef<HTMLInputElement>(null);

  return (
    <label
      htmlFor={rest.name}
      className={classNames(
        "flex-row align-center",
        classes.label,
        classNameLabel,
        errorText && classes.error,
      )}
      onClick={() => {
        if (ref) {
          ref.current?.focus();
        } else {
          defaultRef.current?.focus();
        }
      }}
    >
      {LeftIcon && (
        <Button
          typeButton="ghost"
          onClick={onLeftIconClick}
          className={iconButtonClassName}
        >
          <LeftIcon className={classes.icon} />
        </Button>
      )}
      <div className={`flex-column flex-1`}>
        {separatedPlaceholder && value && (
          <span className={`text-body xs ${classes.separatedPlaceholder}`}>
            {placeholder}
          </span>
        )}
        <input
          ref={ref ?? defaultRef}
          className={classNames(classes.input, className)}
          value={value}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {RightIcon && (
        <Button
          typeButton="ghost"
          onClick={onRightIconClick}
          className={iconButtonClassName}
        >
          <RightIcon className={classes.icon} />
        </Button>
      )}
    </label>
  );
};

CustomInput.displayName = "Input";

export default CustomInput;
