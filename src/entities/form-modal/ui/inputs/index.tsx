"use client";
import React from "react";
import { usePhoneInput } from "~/src/shared/ui/inputs/phone/hooks/usePhoneInput.hook";

import classes from "./inputs.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import PhoneInput from "~/src/shared/ui/inputs/phone";
import Select from "~/src/shared/ui/select/ui";
import Button from "~/src/shared/ui/button";
import { FormModalInputI } from "~/src/entities/form-modal/model/form-modal.interface";
import { MessageI } from "~/src/shared/model";

interface Props<T> {
  headerText?: string;
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
  const { formatForApi } = usePhoneInput();

  return (
    <div className={`flex-column gap-3 ${classes.container}`}>
      {headerText && (
        <p className="text-16 gray-2 second-family regular">{headerText}</p>
      )}
      {inputs.map((input, index) => {
        const commonProps = {
          value: formData[input.field] ? String(formData[input.field]) : "",
          placeholder: input.placeholder,
          inputClassName: classes.input,
          errorText: error?.field === input.field ? error.message : "",
          name: `etiketka-${String(input.field)}`,
        };
        switch (input.type) {
          default:
          case "text":
            return (
              <TextInput
                key={index + input.field.toString()}
                onChange={(e) => onChange(e.target.value, input.field)}
                {...commonProps}
              />
            );
          case "phone":
            return (
              <PhoneInput
                key={index}
                onChange={(e) =>
                  onChange(formatForApi(e.target.value), input.field)
                }
                className={classes.input}
                {...commonProps}
              />
            );
          case "select":
            return (
              <Select
                key={index}
                activeOption={
                  formData[input.field] ? String(formData[input.field]) : ""
                }
                options={input.selectOptions ? input.selectOptions : ["Москва"]}
                className={`${classes.input} ${classes.select}`}
                optionsClassName={`${classes.options}`}
                selectedOptionClassName={`${classes.selectedOption}`}
                optionsPosTop={12}
                doubleHeader="Город"
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
