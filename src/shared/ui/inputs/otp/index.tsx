import React from "react";

import OtpInput from "react-otp-input";

interface Props {
  value: string;
  onChange: (e: string) => void;
  numInputs?: number;
  classNameContainer?: string;
  classNameInput?: string;
}

export default function OtpInputCustom({
  value,
  onChange,
  numInputs = 4,
  classNameContainer,
  classNameInput,
}: Props) {
  return (
    <OtpInput
      value={value}
      onChange={onChange}
      numInputs={numInputs}
      containerStyle={classNameContainer}
      renderInput={(props) => {
        return (
          <input
            {...props}
            className={classNameInput}
            onFocus={(e) => {
              if (props.onFocus) props.onFocus(e);

              // снимаем выделение текста
              const el = e.target;
              requestAnimationFrame(() => {
                const len = el.value.length;
                el.setSelectionRange(len, len);
              });
            }}
          />
        );
      }}
      inputType="tel"
    />
  );
}
