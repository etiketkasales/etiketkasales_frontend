"use client";

import {
  useCompanyRegister,
  useGetAvailableCities,
} from "~/src/entities/company-registration/lib/hooks";

import CompanyPersonal from "./personal";
import CompanyStatus from "./status";
import CompanyName from "./name";
import CompanyCity from "./city";
import {
  RegCommonPropsI,
  RegistrationStageT,
} from "~/src/entities/company-registration/model";

interface Props {
  stage: RegistrationStageT;
}

export default function CompanyRegistration({ stage }: Props) {
  const cityCatalog = useGetAvailableCities(stage === "city");
  const {
    handleChangeData,
    handleButtonClick,
    handleChangeBoolean,
    error,
    handleChangeStage,
    companyData,
  } = useCompanyRegister({ stage });

  const commonProps: RegCommonPropsI = {
    onInputChange: handleChangeData,
    changeStage: handleChangeStage,
    buttonClick: handleButtonClick,
    companyInfo: companyData,
    error: error,
  };

  const REG_COMPONENTS: Record<RegistrationStageT, React.ReactNode | null> = {
    personal: (
      <CompanyPersonal {...commonProps} onBooleanChange={handleChangeBoolean} />
    ),
    status: <CompanyStatus {...commonProps} />,
    name: <CompanyName {...commonProps} />,
    city: <CompanyCity {...commonProps} cityCatalog={cityCatalog} />,
  };

  return REG_COMPONENTS[stage] || null;
}
