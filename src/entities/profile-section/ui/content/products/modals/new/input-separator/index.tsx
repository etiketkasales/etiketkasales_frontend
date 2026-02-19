import classNames from "classnames";

import classes from "./separator.module.scss";
import TextInput from "~/src/shared/ui/inputs/text-input";
import TextAreaInput from "~/src/shared/ui/inputs/textarea-input";
import Select from "~/src/shared/ui/select/ui";
import {
  INewProduct,
  INewProductInput,
} from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";

export interface Props extends INewProductInput {
  newProduct: INewProduct;
  onChange: (v: string, f: keyof INewProduct) => void;
  error: MessageI | null;
}

export default function NewProductInputSeparator({
  placeholder,
  type,
  field,
  newProduct,
  onChange,
  options,
  error,
}: Props) {
  const value: string = Array.isArray(newProduct[field])
    ? ""
    : newProduct[field];

  switch (type) {
    default:
    case "text":
    case "numeric":
      return (
        <TextInput
          value={value ?? ""}
          onChange={(e) => {
            if (type === "numeric") {
              const numValue = Number(e.target.value);
              if (isNaN(numValue)) return;
            }
            onChange(e.target.value, field);
          }}
          type={type}
          placeholder={placeholder}
          wrapperClassName={classNames(classes.input)}
          errorText={error && error.field === field ? error.message : ""}
        />
      );
    case "textarea":
      return (
        <TextAreaInput
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value, field)}
          placeholder={placeholder}
          textareaClassName={classNames(classes.textarea)}
          errorText={error && error.field === field ? error.message : ""}
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
          error={error && error.field === field ? error.message : ""}
          errorClassOnWrapper={false}
        />
      );
  }
}
