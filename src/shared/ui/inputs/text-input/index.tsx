import React from "react";
import classNames from "classnames";

import Button from "~/src/shared/ui/button";
import Input, { InputProps } from "~/src/shared/ui/input";

interface Props extends InputProps {
  className?: string;
  classNameInput?: string;
  RightIcon?: React.FC<React.SVGProps<SVGSVGElement>>;
  rightIconClick?: () => void;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  name?: string;
  classNameRightIcon?: string;
  onKeyDown?: (e: React.KeyboardEvent) => void;
  title?: string;
  gap?: number;
}

export default function TextInput({
  className,
  classNameInput,
  RightIcon,
  rightIconClick,
  placeholder,
  disabled,
  onChange,
  value,
  name,
  classNameRightIcon,
  onKeyDown,
  title,
  gap,
  ...rest
}: Props) {
  if (RightIcon) {
    return (
      <div
        className={classNames(`flex-row space-between`, className)}
        style={{ gap: `${gap}px` }}
      >
        <Input
          className={classNameInput}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          value={value?.toString()}
          type={"text"}
          name={name}
          onKeyDown={onKeyDown}
          title={title}
          {...rest}
        />
        {RightIcon ? (
          <Button
            typeButton="ghost"
            size="0"
            onClick={rightIconClick}
            className={classNameRightIcon}
          >
            <RightIcon />
          </Button>
        ) : null}
      </div>
    );
  }
  return (
    <Input
      className={classNameInput}
      placeholder={placeholder}
      disabled={disabled}
      onChange={onChange}
      value={value}
      type={"text"}
      name={name}
      onKeyDown={onKeyDown}
      title={title}
      {...rest}
    />
  );
}
