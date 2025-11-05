import React, { memo } from "react";
import classNames from "classnames";

import classes from "./phone.module.scss";
import Button from "~/src/shared/ui/button";
import Input, { InputProps } from "~/src/shared/ui/input";

export interface PhoneInputProps extends InputProps {
  wrapperClassName?: string;
  inputClassName?: string;
  rightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  leftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onRightIconClick?: () => void;
  onLeftIconClick?: () => void;
  iconButtonClassName?: string;
  gap?: number;
}

const PhoneInput: React.FC<PhoneInputProps> = memo(
  ({
    wrapperClassName,
    inputClassName,
    rightIcon: RightIcon,
    leftIcon: LeftIcon,
    onRightIconClick,
    onLeftIconClick,
    iconButtonClassName,
    gap = 8,
    ...inputProps
  }) => {
    const hasIcons = Boolean(RightIcon || LeftIcon);

    return (
      <div
        className={classNames(
          classes.wrapper,
          hasIcons && classes.withIcons,
          wrapperClassName,
        )}
        style={hasIcons ? { gap } : undefined}
      >
        {LeftIcon && (
          <Button
            typeButton="ghost"
            size="0"
            className={classNames(classes.iconBtn, iconButtonClassName)}
            onClick={onLeftIconClick}
            aria-label="left-icon-button"
          >
            <LeftIcon />
          </Button>
        )}

        <Input
          {...inputProps}
          type="tel"
          inputMode="tel"
          className={classNames(
            classes.input,
            "text-16 black regular second-family",
            inputClassName,
          )}
        />

        {RightIcon && (
          <Button
            typeButton="ghost"
            size="0"
            className={classNames(classes.iconBtn, iconButtonClassName)}
            onClick={onRightIconClick}
            aria-label="right-icon-button"
          >
            <RightIcon />
          </Button>
        )}
      </div>
    );
  },
);

PhoneInput.displayName = "PhoneInput";
export default PhoneInput;
