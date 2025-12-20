import React from "react";
import StringUtils from "~/src/shared/lib/utils/string.util";

import classes from "./input.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import PhoneInput from "~/src/shared/ui/inputs/phone";
import EmailInput from "~/src/shared/ui/inputs/email";
import { INewOrderInput, IOrderReceiver } from "~/src/entities/order/model";

interface Props extends INewOrderInput {
  onChange: (v: string, f: keyof IOrderReceiver) => void;
  receiver: IOrderReceiver;
  disabled: boolean;
}

export default function OrderreceiverInput({
  onChange,
  receiver,
  field,
  placeholder,
  type,
  disabled,
}: Props) {
  const commonProps = {
    placeholder,
    disabled,
    wrapperClassName: classes.input,
  };

  switch (type) {
    default:
      return null;
    case "string":
      return (
        <TextInput
          onChange={(e) => onChange(e.target.value, field)}
          value={receiver[field]}
          {...commonProps}
        />
      );
    case "phone":
      return (
        <PhoneInput
          onChange={(e) => onChange(e, field)}
          value={StringUtils.formatPhone(receiver[field])}
          {...commonProps}
        />
      );
    case "email":
      return (
        <EmailInput
          onChange={(e) => onChange(e.target.value, field)}
          value={receiver[field]}
          {...commonProps}
        />
      );
  }
}
