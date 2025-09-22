"use client";
import React from "react";

import FormModal from "~/src/entities/form-modal/ui";
import { RegCommonPropsI } from "~/src/entities/company-registration/model/company-registration.interface";
import { nameInputs } from "~/src/entities/company-registration/model/company-registration.const";

interface Props extends RegCommonPropsI {}

export default function CompanyName({
  onInputChange,
  companyInfo,
  error,
  buttonClick,
}: Props) {
  return (
    <FormModal
      formData={companyInfo}
      onButtonClick={() => buttonClick("city")}
      inputsHeaderText="Название будут видеть покупатели"
      inputs={nameInputs}
      gap={"10"}
      headerText="Укажите название"
      subHeader="2 из 3"
      onInputChange={onInputChange}
      error={error}
    />
  );
}
