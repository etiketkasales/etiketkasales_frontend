import React from "react";

import classes from "./inputs.module.scss";
import NewProductInputSeparator from "../input-separator";
import { INewProduct } from "~/src/entities/profile-section/model";
import { newProductMainInputs } from "~/src/entities/profile-section/model/seller-products.const";

interface Props {
  newProduct: INewProduct;
  onInputChange: (v: string, field: keyof INewProduct) => void;
}

export default function ProductsModalMainInputs({
  onInputChange,
  newProduct,
}: Props) {
  return (
    <div className={`flex-column gap-2 ${classes.container}`}>
      {newProductMainInputs.map((item, index) => {
        return (
          <NewProductInputSeparator
            key={`${index}-${item.placeholder}`}
            newProduct={newProduct}
            onChange={onInputChange}
            placeholder={item.placeholder}
            type={item.type}
            field={item.field}
          />
        );
      })}
    </div>
  );
}
