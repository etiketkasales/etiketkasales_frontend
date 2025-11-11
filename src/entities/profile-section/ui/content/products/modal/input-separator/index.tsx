import React from "react";
import classNames from "classnames";

import classes from "./separator.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import TextAreaInput from "~/src/shared/ui/inputs/textarea-input";
import {
  INewProduct,
  INewProductInput,
} from "~/src/entities/profile-section/model";

interface Props extends INewProductInput {
  newProduct: INewProduct;
  onChange: (v: string, f: keyof INewProduct) => void;
}

export default function NewProductInputSeparator({
  placeholder,
  type,
  field,
  newProduct,
  onChange,
}: Props) {
  const value: string = Array.isArray(newProduct[field])
    ? ""
    : newProduct[field];
  switch (type) {
    default:
    case "text":
      return (
        <TextInput
          value={value}
          onChange={(e) => onChange(e.target.value, field)}
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
      return null;
  }
}
