import React from "react";
import classNames from "classnames";

import classes from "./separator.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import TextAreaInput from "~/src/shared/ui/inputs/textarea-input";
import Select from "~/src/shared/ui/select/ui";
import {
  INewProduct,
  INewProductInput,
} from "~/src/entities/profile-section/model";

export interface Props extends INewProductInput {
  newProduct: INewProduct;
  onChange: (v: string, f: keyof INewProduct) => void;
}

export default function NewProductInputSeparator({
  placeholder,
  type,
  field,
  newProduct,
  onChange,
  options,
}: Props) {
  const value: string = Array.isArray(newProduct[field])
    ? ""
    : newProduct[field];
  switch (type) {
    default:
    case "text":
    case "number":
      return (
        <TextInput
          value={value}
          onChange={(e) => {
            if (type === "number") {
              const numValue = Number(e.target.value);
              if (isNaN(numValue)) return;
            }
            onChange(e.target.value, field);
          }}
          type={type}
          placeholder={placeholder}
          inputClassName={classNames(classes.input, classes.text)}
        />
      );
    case "textarea":
      return (
        <TextAreaInput
          value={value}
          onChange={(e) => onChange(e.target.value, field)}
          placeholder={placeholder}
          textareaClassName={classNames(classes.input, classes.textarea)}
        />
      );
    case "select":
      return (
        <Select
          activeOption={newProduct[field]?.toString() || ""}
          optionHolder={placeholder}
          options={options || []}
          selectButtonClassName={classes.selectButton}
          optionsClassName={classes.selectOptions}
          doubleHeader={placeholder}
          renderItem={(item, index) => (
            <div
              key={`${index}-${item}`}
              className={`${classes.selectItem} pointer`}
              onClick={() => onChange(item, field)}
            >
              <span className="text-body l text-neutral-1000">{item}</span>
            </div>
          )}
          optionsPosTop={12}
        />
      );
  }
}
