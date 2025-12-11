import React from "react";

import classes from "./inputs.module.scss";
import NewProductInputSeparator from "../../../input-separator";
import { INewProduct } from "~/src/entities/profile-section/model";
import { newProductMainInputs } from "~/src/entities/profile-section/model/seller-products/seller-products.const";
import { MessageI } from "~/src/shared/model";

interface Props {
  newProduct: INewProduct;
  onInputChange: (v: string, field: keyof INewProduct) => void;
  error: MessageI | null;
}

export default function ProductsModalMainInputs({
  onInputChange,
  newProduct,
  error,
}: Props) {
  return (
    <div className={`flex-column gap-2 ${classes.container}`}>
      {newProductMainInputs.map((item, index) => {
        return (
          <NewProductInputSeparator
            key={`${index}-${item.placeholder}`}
            newProduct={newProduct}
            onChange={onInputChange}
            type={item.type}
            placeholder={item.placeholder}
            field={item.field}
            error={error}
          />
        );
      })}
    </div>
  );
}
