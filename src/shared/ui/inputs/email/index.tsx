import React, { memo } from "react";
import classNames from "classnames";

import classes from "./email-input.module.scss";
import TextInput, { TextInputProps } from "../text-input";

export interface EmailInputProps extends Omit<TextInputProps, "type"> {
  errorText?: string;
}

const EmailInput: React.FC<EmailInputProps> = memo(
  ({ errorText, wrapperClassName, ...rest }) => {
    return (
      <div
        className={classNames(classes.wrapper, wrapperClassName, "relative", {
          [classes.error]: errorText,
        })}
      >
        <TextInput
          {...rest}
          type="email"
          inputClassName={classNames(rest.inputClassName)}
        />
        {errorText && (
          <p className={`text-body xs text-red-700 ${classes.errorText}`}>
            {errorText}
          </p>
        )}
      </div>
    );
  },
);

EmailInput.displayName = "EmailInput";
export default EmailInput;
