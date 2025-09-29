"use client";
import React from "react";
import { usePhoneInput } from "~/src/shared/ui/inputs/phone/hooks/usePhoneInput.hook";

import classes from "./inputs.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import PhoneInput from "~/src/shared/ui/inputs/phone";
import Select from "~/src/shared/ui/select/ui";
import Button from "~/src/shared/ui/button";
import { FormModalInputI } from "~/src/entities/form-modal/model/form-modal.interface";
import { MessageI } from "~/src/shared/model/shared.interface";

interface Props<T> {
  headerText: string;
  inputs: FormModalInputI<T>[];
  formData: T;
  onChange: (v: string, field: keyof T) => void;
  error: MessageI | null;
}

export default function FormModalInputs<T>({
  inputs,
  headerText,
  formData,
  onChange,
  error,
}: Props<T>) {
  const { formatInput, formatForApi } = usePhoneInput();

  return (
    <div className={`flex-column gap-3 ${classes.container}`}>
      <p className="text-16 gray-2 second-family regular">{headerText}</p>
      {inputs.map((input, index) => {
        switch (input.type) {
          default:
          case "text":
            return (
              <TextInput
                key={index}
                value={
                  formData[input.field] ? String(formData[input.field]) : ""
                }
                onChange={(e) => onChange(e.target.value, input.field)}
                placeholder={input.placeholder}
                classNameInput={classes.input}
                errorText={error?.field === input.field ? error.message : ""}
                name={`etiketka-${String(input.field)}`}
              />
            );
          case "phone":
            return (
              <PhoneInput
                key={index}
                value={
                  formData[input.field]
                    ? formatInput(String(formData[input.field]))
                    : ""
                }
                onChange={(e) =>
                  onChange(formatForApi(e.target.value), input.field)
                }
                placeholder={input.placeholder}
                className={classes.input}
                errorText={error?.field === input.field ? error.message : ""}
                name={`etiketka-${String(input.field)}`}
              />
            );
          case "select":
            return (
              <Select
                key={index}
                currentOption={
                  formData[input.field] ? String(formData[input.field]) : ""
                }
                holder={input.placeholder}
                selectOptions={input.selectOptions ? input.selectOptions : []}
                doubledHeader
                className={`${classes.input} ${classes.select}`}
                optionsClassName={`${classes.options}`}
                selectedOptionClassName={`${classes.selectedOption}`}
                optionsPosTop={12}
                optionHolder="Выберите город из списка"
                error={error?.field === input.field ? error.message : ""}
                renderItem={(item, index) => {
                  return (
                    <Button
                      key={index}
                      typeButton="bg-gray"
                      size="12"
                      onClick={() => onChange(item, input.field)}
                      className={`${classes.option}`}
                      justifyCenter={false}
                    >
                      <span
                        className={`text-14 gray second-family regular text-left cursor`}
                      >
                        {item}
                      </span>
                    </Button>
                  );
                }}
              />
            );
        }
      })}
    </div>
  );
}
