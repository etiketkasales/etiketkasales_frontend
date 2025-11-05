import React, { memo } from "react";
import classNames from "classnames";

import classes from "./text-input.module.scss";
import Button from "~/src/shared/ui/button";
import Input, { InputProps } from "~/src/shared/ui/input";

export interface TextInputProps extends InputProps {
  wrapperClassName?: string;
  inputClassName?: string;
  rightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  leftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onRightIconClick?: () => void;
  onLeftIconClick?: () => void;
  iconButtonClassName?: string;
  gap?: number;
}

const TextInput: React.FC<TextInputProps> = memo(
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
          className={classNames(classes.input, inputClassName)}
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

TextInput.displayName = "TextInput";
export default TextInput;
