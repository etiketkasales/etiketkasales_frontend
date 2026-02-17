"use client";

import FormModal from "~/src/entities/form-modal/ui";
import CheckboxInput from "~/src/shared/ui/inputs/checkbox";
import PersonalLabel from "./label";
import { personalInputs } from "~/src/entities/company-registration/model/company-registration.const";
import { RegCommonPropsI } from "~/src/entities/company-registration/model/company-registration.interface";
import { IChangeableProfile } from "~/src/features/user/model";

interface Props extends RegCommonPropsI {
  onBooleanChange: (v: boolean, field: keyof IChangeableProfile) => void;
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
      inputs={personalInputs}
      gap={"24"}
      headerText="Регистрация продавца"
      onInputChange={onInputChange}
      error={error}
    >
      <div className="flex-row gap-10px align-start">
        <CheckboxInput
          checked={companyInfo.agreement_accepted}
          onChange={(e) => {
            onBooleanChange(e, "agreement_accepted");
          }}
          name="agreement_accepted"
          id="agreement_accepted"
          error={error?.field === "agreement_accepted"}
        />
        <PersonalLabel />
      </div>
    </FormModal>
  );
}
