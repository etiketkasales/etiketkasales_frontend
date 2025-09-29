"use client";
import React from "react";

import FormModal from "~/src/entities/form-modal/ui";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import PersonalLabel from "./label";
import { personalInputs } from "~/src/entities/company-registration/model/company-registration.const";
import { RegCommonPropsI } from "~/src/entities/company-registration/model/company-registration.interface";
import { CompanyI } from "~/src/features/company/model/company.interface";

interface Props extends RegCommonPropsI {
  onBooleanChange: (v: boolean, field: keyof CompanyI) => void;
}

export default function CompanyPersonal({
  companyInfo,
  onInputChange,
  onBooleanChange,
  buttonClick,
  error,
}: Props) {
  return (
    <FormModal
      formData={companyInfo}
      onButtonClick={() => buttonClick("status")}
      inputsHeaderText="Ваши контактные данные"
      inputs={personalInputs}
      gap={"6"}
      headerText="Регистрация продавца"
      onInputChange={onInputChange}
      error={error}
    >
      <div className="flex-row gap-10px align-start">
        <CheckboxInput
          checked={companyInfo.is_agree_confident}
          onChange={() => {
            onBooleanChange(
              !companyInfo.is_agree_confident,
              "is_agree_confident",
            );
          }}
          name="is_agree_confident"
          error={error?.field === "is_agree_confident"}
        />
        <PersonalLabel />
      </div>
    </FormModal>
  );
}
