"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import FormModal from "~/src/entities/form-modal/ui";
import { RegCommonPropsI } from "~/src/entities/company-registration/model/company-registration.interface";
import { FormModalInputI } from "~/src/entities/form-modal/model/form-modal.interface";
import { IChangeableProfile } from "~/src/features/user/model";

interface Props extends RegCommonPropsI {}

export default function CompanyCity({
  onInputChange,
  companyInfo,
  error,
  buttonClick,
}: Props) {
  const { cities } = useAppSelector(selectNavigation);
  const inputs: FormModalInputI<IChangeableProfile>[] = [
    {
      field: "storage_city",
      type: "select",
      placeholder: "Город",
      selectOptions: ["Москва"],
    },
  ];
  return (
    <FormModal
      formData={companyInfo}
      onButtonClick={() => buttonClick()}
      inputsHeaderText="Если вашего населенного пункта нет в списке, выберите ближайший"
      inputs={inputs}
      gap={"24"}
      headerText="Выберите город, в котором храните товары"
      subHeader="3 из 3"
      onInputChange={onInputChange}
      error={error}
      buttonText="Подтвердить и отправить"
    />
  );
}
