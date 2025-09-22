"use client";
import React from "react";

import FormModal from "~/src/entities/form-modal/ui";
import RadioInput from "~/src/shared/ui/inputs/radio";
import { RegCommonPropsI } from "~/src/entities/company-registration/model/company-registration.interface";

interface Props extends RegCommonPropsI {}

interface InputI {
  label: string;
  name: "organization" | "person";
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
      name: "organization",
    },
    {
      label: "ИП",
      name: "person",
    },
  ];

  return (
    <FormModal
      formData={companyInfo}
      onButtonClick={() => buttonClick("name")}
      onBackButtonClick={() => changeStage("personal")}
      inputsHeaderText=""
      inputs={[]}
      gap={"10"}
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
                onInputChange(item.name, "organization_type");
              }}
              checked={companyInfo.organization_type === item.name}
              gap="10px"
              type={"yellow"}
            />
          );
        })}
      </div>
    </FormModal>
  );
}
