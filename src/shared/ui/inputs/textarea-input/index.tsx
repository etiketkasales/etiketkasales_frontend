import React, { memo } from "react";
import classNames from "classnames";

import classes from "./text-area.module.scss";
import Button from "~/src/shared/ui/button";
import TextArea, { TextAreaProps } from "../textarea";

export interface TextAreaInputProps extends TextAreaProps {
  wrapperClassName?: string;
  textareaClassName?: string;
  rightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  leftIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  onRightIconClick?: () => void;
  onLeftIconClick?: () => void;
  iconButtonClassName?: string;
  gap?: number;
}

const TextAreaInput: React.FC<TextAreaInputProps> = memo(
  ({
    wrapperClassName,
    textareaClassName,
    rightIcon: RightIcon,
    leftIcon: LeftIcon,
    onRightIconClick,
    onLeftIconClick,
    iconButtonClassName,
    gap = 8,
    ...textareaProps
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
        <TextArea
          {...textareaProps}
          className={classNames(classes.textarea, textareaClassName)}
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

TextAreaInput.displayName = "TextAreaInput";
export default TextAreaInput;
