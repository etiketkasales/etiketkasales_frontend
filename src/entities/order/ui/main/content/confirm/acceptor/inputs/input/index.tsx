import React from "react";
import StringUtils from "~/src/shared/lib/utils/string.util";

import TextInput from "~/src/shared/ui/inputs/text-input";
import PhoneInput from "~/src/shared/ui/inputs/phone";
import EmailInput from "~/src/shared/ui/inputs/email";
import { INewOrderAcceptor, INewOrderInput } from "~/src/entities/order/model";

interface Props extends INewOrderInput {
  onChange: (v: string, f: keyof INewOrderAcceptor) => void;
  acceptor: INewOrderAcceptor;
  disabled: boolean;
}

export default function OrderAcceptorInput({
  onChange,
  acceptor,
  field,
  placeholder,
  type,
  disabled,
}: Props) {
  const commonProps = {
    placeholder,
    disabled,
  };

  switch (type) {
    default:
      return null;
    case "string":
      return (
        <TextInput
          onChange={(e) => onChange(e.target.value, field)}
          value={acceptor[field]}
          {...commonProps}
        />
      );
    case "phone":
      return (
        <PhoneInput
          onChange={(e) => onChange(e, field)}
          value={StringUtils.formatPhone(acceptor[field])}
          {...commonProps}
        />
      );
    case "email":
      return (
        <EmailInput
          onChange={(e) => onChange(e.target.value, field)}
          value={acceptor[field]}
          {...commonProps}
        />
      );
  }
}
