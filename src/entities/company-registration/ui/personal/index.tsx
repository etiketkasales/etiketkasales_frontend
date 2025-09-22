"use client";
import React from "react";
import Link from "next/link";

import FormModal from "~/src/entities/form-modal/ui";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
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
        <p className="gray-2 regular text-16 second-family">
          Я соглашаюсь с правилами и условиями, указанными в{" "}
          <Link
            href={"/personal-policy"}
            rel="noopener noreferrer"
            className={"blue-link"}
          >
            Пользовательском соглашении
          </Link>
          , и разрешаю использовать и обрабатывать мои личные данные в
          соответствии с{" "}
          <Link
            href={"/privacy-policy"}
            rel="noopener noreferrer"
            className={"blue-link"}
          >
            Политикой конфиденциальности
          </Link>
        </p>
      </div>
    </FormModal>
  );
}
