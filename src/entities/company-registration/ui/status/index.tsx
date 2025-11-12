"use client";
import React from "react";

import FormModal from "~/src/entities/form-modal/ui";
import RadioInput from "~/src/shared/ui/inputs/radio";
import { RegCommonPropsI } from "~/src/entities/company-registration/model/company-registration.interface";

interface Props extends RegCommonPropsI {}

interface InputI {
  label: string;
  name: "ip" | "ooo";
}

export default function CompanyStatus({
  companyInfo,
  onInputChange,
  buttonClick,
  changeStage,
  error,
}: Props) {
  const inputs: InputI[] = [
    {
      label: "Организация",
      name: "ooo",
    },
    {
      label: "ИП",
      name: "ip",
    },
  ];

  return (
    <FormModal
      formData={companyInfo}
      onButtonClick={() => buttonClick("name")}
      onBackButtonClick={() => changeStage("personal")}
      inputsHeaderText=""
      inputs={[]}
      gap={"24"}
      headerText="Укажите ваш статус"
      subHeader="1 из 3"
      onInputChange={onInputChange}
      error={error}
    >
      <div className="flex-column gap-6">
        {inputs.map((item, index) => {
          return (
            <RadioInput
              key={`${item.name}-${index}`}
              name={item.name}
              value={item.name}
              label={item.label}
              onChange={() => {
                onInputChange(item.name, "company_type");
              }}
              checked={companyInfo.company_type === item.name}
              gap="10px"
              type={"yellow"}
            />
          );
        })}
      </div>
    </FormModal>
  );
}
