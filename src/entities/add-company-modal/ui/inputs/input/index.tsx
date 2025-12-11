"use client";
import React, { useCallback } from "react";

import TextInput from "~/src/shared/ui/inputs/text-input";
import { IAddCompanyInput } from "~/src/entities/add-company-modal/model";
import { IUserCompanyBase } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";

interface Props extends IAddCompanyInput {
  onChange: (
    v: string,
    field: keyof IUserCompanyBase,
    type: "string" | "number",
  ) => void;
  newCompany: IUserCompanyBase;
  error: MessageI | null;
  specificError: MessageI | null;
}

export default function AddCompanyInput({
  onChange,
  newCompany,
  error,
  specificError,
  placeholder,
  field,
  type,
  maxWidth,
}: Props) {
  const getError = useCallback(() => {
    if (error && error.field === field) {
      return error.message;
    }
    if (specificError && specificError.field === field) {
      return specificError.message;
    }
    return undefined;
  }, [specificError, error, field]);

  return (
    <TextInput
      value={newCompany[field]}
      onChange={(e) => onChange(e.target.value, field, type)}
      placeholder={placeholder}
      errorText={getError()}
      autoComplete={"off"}
      id={`buyer_company_${field}`}
      name={`buyer_company_${field}`}
      maxLength={maxWidth}
    />
  );
}
