"use client";
import { useCallback } from "react";
import StringUtils from "~/src/shared/lib/utils/string.util";

import classes from "./inputs.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import PhoneInput from "~/src/shared/ui/inputs/phone";
import Select from "~/src/shared/ui/select/ui";
import Button from "~/src/shared/ui/button";
import {
  FormModalInputI,
  IFormModalSelectOption,
} from "~/src/entities/form-modal/model";
import { MessageI } from "~/src/shared/model";

interface Props<T> {
  headerText?: string;
  inputs: FormModalInputI<T>[];
  formData: T;
  onChange: (v: string, field: keyof T) => void;
  onSearch?: (v: string) => void;
  error: MessageI | null;
}

export default function FormModalInputs<T>({
  inputs,
  headerText,
  formData,
  onChange,
  onSearch,
  error,
}: Props<T>) {
  const getActiveOption = useCallback(
    (options: IFormModalSelectOption[], value: string): string => {
      const activeOption = options.find((option) => option.value === value);
      return activeOption ? activeOption.label : "";
    },
    [],
  );

  return (
    <div className={`flex-column gap-3`}>
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
                activeOption={getActiveOption(
                  input.selectOptions || [],
                  formData[field]?.toString() || "",
                )}
                options={input.selectOptions || []}
                className={classes.select}
                optionsClassName={`${classes.options}`}
                selectedOptionClassName={`${classes.selectedOption}`}
                optionsPosTop={12}
                doubleHeader="Город"
                optionHolder="Выберите город из списка"
                error={error?.field === input.field ? error.message : ""}
                isSearchable
                onSearch={onSearch}
                renderItem={(item, index) => {
                  return (
                    <Button
                      key={index}
                      typeButton="gray"
                      size="12"
                      onClick={() => onChange(item.value, input.field)}
                      className={`${classes.option}`}
                      justifyCenter={false}
                    >
                      <span className={`text-body l text-left cursor`}>
                        {item.label}
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
