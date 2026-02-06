"use client";
import { useGetAvailableCities } from "../../lib/hooks";

import FormModal from "~/src/entities/form-modal/ui";
import { RegCommonPropsI } from "~/src/entities/company-registration/model";
import { IChangeableProfile } from "~/src/features/user/model";
import { FormModalInputI } from "~/src/entities/form-modal/model";

interface Props extends RegCommonPropsI {}

export default function CompanyCity({
  onInputChange,
  companyInfo,
  error,
  buttonClick,
}: Props) {
  const { availableCities, loading, setSearchQuery } = useGetAvailableCities();
  const inputs: FormModalInputI<IChangeableProfile>[] = [
    {
      field: "storage_city",
      type: "select",
      placeholder: "Город",
      selectOptions: [...availableCities],
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
      onSearch={(v) => setSearchQuery(v)}
      error={error}
      buttonText="Подтвердить и отправить"
      loading={loading}
    />
  );
}
