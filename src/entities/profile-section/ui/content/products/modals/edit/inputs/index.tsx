import React from "react";

import EditProductInput from "./input";
import {
  editProductInputs,
  IEditSellerProduct,
} from "~/src/entities/profile-section/model";
import { MessageI } from "~/src/shared/model";

interface Props {
  editData: IEditSellerProduct;
  onInputChange: (field: keyof IEditSellerProduct, v: string) => void;
  loading: boolean;
  error: MessageI | null;
}

export default function EditProductInputs({
  editData,
  onInputChange,
  loading,
  error,
}: Props) {
  return (
    <div className={`flex-column gap-2`}>
      {editProductInputs.map((item, index) => {
        return (
          <EditProductInput
            key={`${item.field}-${index}`}
            editData={editData}
            onInputChange={onInputChange}
            loading={loading}
            error={error}
            {...item}
          />
        );
      })}
    </div>
  );
}
