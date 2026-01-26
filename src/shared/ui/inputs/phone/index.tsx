import React, { memo, useCallback } from "react";
import TextInput, { TextInputProps } from "../text-input";

export interface PhoneInputProps extends Omit<
  TextInputProps,
  "value" | "onChange"
> {
  value: string;
  onChange: (value: string) => void;
}

const formatPhone = (value: string): string => {
  const digits = value.replace(/\D/g, "");

  let num = digits;
  if (num.startsWith("8")) num = "7" + num.slice(1);
  if (!num.startsWith("7")) num = "7" + num;

  let formatted = "+7";

  if (num.length > 1) formatted += " " + num.slice(1, 4);
  if (num.length > 4) formatted += " " + num.slice(4, 7);
  if (num.length > 7) formatted += "-" + num.slice(7, 9);
  if (num.length > 9) formatted += "-" + num.slice(9, 11);

  return formatted;
};

const PhoneInput: React.FC<PhoneInputProps> = memo(
  ({ value, onChange, placeholder, ...props }) => {
    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const formatted = formatPhone(e.target.value);
        onChange(formatted);
      },
      [onChange],
    );

    return (
      <TextInput
        {...props}
        value={value}
        onChange={handleChange}
        inputMode="tel"
        placeholder={placeholder ?? "+7 ___ ___-__-__"}
      />
    );
  },
);

PhoneInput.displayName = "PhoneInput";
export default PhoneInput;
