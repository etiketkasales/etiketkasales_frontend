import React, { memo, RefObject, useRef } from "react";
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
  errorText?: string;
  separatedPlaceholder?: boolean;
  ref?: RefObject<HTMLTextAreaElement>;
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
    errorText,
    separatedPlaceholder,
    ref,
    ...textareaProps
  }) => {
    const defaultRef = useRef<HTMLTextAreaElement>(null);
    const hasIcons = Boolean(RightIcon || LeftIcon);

    return (
      <div className="flex-column flex-1">
        <div
          className={classNames(
            classes.wrapper,
            hasIcons && classes.withIcons,
            wrapperClassName,
            errorText && classes.error,
          )}
          style={hasIcons ? { gap } : undefined}
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
              size="0"
              className={classNames(classes.iconBtn, iconButtonClassName)}
              onClick={onLeftIconClick}
              aria-label="left-icon-button"
            >
              <LeftIcon />
            </Button>
          )}
          <div className="flex-column flex-1">
            {separatedPlaceholder && textareaProps.value && (
              <span className="text-body xs text-neutral-700">
                {textareaProps.placeholder}
              </span>
            )}
            <TextArea
              {...textareaProps}
              className={classNames(
                classes.textarea,
                textareaClassName,
                errorText && classes.error,
              )}
              ref={ref ?? defaultRef}
            />
          </div>
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
        {errorText && (
          <span className={`text-red-500 text-body xs ${classes.errorText}`}>
            {errorText}
          </span>
        )}
      </div>
    );
  },
);

TextAreaInput.displayName = "TextAreaInput";
export default TextAreaInput;
