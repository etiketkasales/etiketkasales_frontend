"use client";
import React from "react";
import StringUtils from "~/src/shared/lib/utils/string.util";

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
  return (
    <div className={`flex-column gap-3 ${classes.container}`}>
      {headerText && (
        <p className="text-16 gray-2 second-family regular">{headerText}</p>
      )}
      {inputs.map((input, index) => {
        const { field, placeholder } = input;
        const commonProps = {
          placeholder: placeholder,
          errorText: error?.field === field ? error.message : "",
          name: `etiketka-${String(field)}`,
        };
        switch (input.type) {
          default:
          case "text":
            return (
              <TextInput
                key={index + input.field.toString()}
                onChange={(e) => onChange(e.target.value, input.field)}
                value={formData[field] ? String(formData[field]) : ""}
                {...commonProps}
              />
            );
          case "phone":
            return (
              <PhoneInput
                key={index}
                onChange={(e) => onChange(e, input.field)}
                className={classes.input}
                value={StringUtils.formatPhone(
                  formData[field]?.toString() || "",
                )}
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
                      typeButton="gray"
                      size="12"
                      onClick={() => onChange(item, input.field)}
                      className={`${classes.option}`}
                      justifyCenter={false}
                    >
                      <span className={`text-body l text-left cursor`}>
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
