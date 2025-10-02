import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  selectCompany,
  setCompanyData,
  setStage,
} from "~/src/app/store/reducers/company.slice";
import { useFormValidate } from "~/src/shared/lib/hooks/useFormValidate.hook";

import { CompanyI } from "~/src/features/company/model/company.interface";
import { requiredFieldsRecord } from "~/src/entities/company-registration/model/company-registration.const";
import { RegistrationStageT } from "~/src/entities/company-registration/model/company-registration.interface";

interface Props {
  stage: RegistrationStageT;
}

export const useCompanyRegister = ({ stage }: Props) => {
  const dispatch = useAppDispatch();
  const { companyData } = useAppSelector(selectCompany);
  const [loading, setLoading] = useState<boolean>(false);

  const requiredFields: (keyof CompanyI)[] = requiredFieldsRecord[stage];
  const { error, handleHasValidateError, handleIsError } = useFormValidate({
    validateData: companyData,
    requiredFields,
  });

  const isPhoneError = useCallback(() => {
    return handleHasValidateError("phone");
  }, [handleHasValidateError]);

  const isEmailError = useCallback(() => {
    return handleHasValidateError("email");
  }, [handleHasValidateError]);

  const hasErrors = useCallback(() => {
    return handleIsError() || isEmailError() || isPhoneError();
  }, [isPhoneError, isEmailError, handleIsError]);

  const handleChangeData = (v: string, field: keyof CompanyI) => {
    dispatch(setCompanyData({ ...companyData, [field]: v }));
  };

  const handleChangeBoolean = (v: boolean, field: keyof CompanyI) => {
    dispatch(setCompanyData({ ...companyData, [field]: v }));
  };

  const handleButtonClick = (nextPage?: RegistrationStageT) => {
    const isError = hasErrors();
    if (isError) return;
    if (nextPage) {
      handleChangeStage(nextPage);
    }
  };

  const handleChangeStage = (stage: RegistrationStageT) => {
    dispatch(setStage(stage));
  };

  return {
    loading,
    error,
    companyData,
    handleChangeData,
    handleChangeBoolean,
    handleButtonClick,
    handleChangeStage,
  };
};
