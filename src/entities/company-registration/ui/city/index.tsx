"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import FormModal from "~/src/entities/form-modal/ui";
import Link from "next/link";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import { RegCommonPropsI } from "~/src/entities/company-registration/model/company-registration.interface";
import { FormModalInputI } from "~/src/entities/form-modal/model/form-modal.interface";
import { CompanyI } from "~/src/features/company/model/company.interface";
import CityLabel from "./label";

interface Props extends RegCommonPropsI {
  onBooleanChange: (v: boolean, field: keyof CompanyI) => void;
}

export default function CompanyCity({
  onInputChange,
  companyInfo,
  error,
  buttonClick,
  onBooleanChange,
}: Props) {
  const { cities } = useAppSelector(selectNavigation);
  const inputs: FormModalInputI<CompanyI>[] = [
    {
      field: "warehouse_town",
      type: "select",
      placeholder: "Город",
      selectOptions: cities,
    },
  ];
  return (
    <FormModal
      formData={companyInfo}
      onButtonClick={() => buttonClick()}
      inputsHeaderText="Если вашего населенного пункта нет в списке, выберите ближайший"
      inputs={inputs}
      gap={"6"}
      headerText="Выберите город, в котором храните товары"
      subHeader="3 из 3"
      onInputChange={onInputChange}
      error={error}
      buttonText="Подтвердить и отправить"
    >
      <div className="flex-row gap-10px align-start">
        <CheckboxInput
          checked={companyInfo.is_agree_contact}
          onChange={() => {
            onBooleanChange(!companyInfo.is_agree_contact, "is_agree_contact");
          }}
          name="is_agree_contact"
          error={error?.field === "is_agree_contact"}
        />
        <CityLabel />
      </div>
    </FormModal>
  );
}
