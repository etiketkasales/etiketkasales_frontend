import React from "react";

import OtpInput from "react-otp-input";

interface Props<T> {
  value: string;
  onChange: (e: string) => void;
  numInputs?: number;
  classNameContainer?: string;
  classNameInput?: string;
}

export default function OtpInputCustom<T>({
  value,
  onChange,
  numInputs = 4,
  classNameContainer,
  classNameInput,
}: Props<T>) {
  return (
    <OtpInput
      value={value}
      onChange={onChange}
      numInputs={numInputs}
      containerStyle={classNameContainer}
      renderInput={(props) => {
        return <input {...props} className={classNameInput} />;
      }}
      inputType="tel"
    />
  );
}
