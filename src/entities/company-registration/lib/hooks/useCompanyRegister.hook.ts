import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { setStage } from "~/src/app/store/reducers/company.slice";
import { selectUser, setUser } from "~/src/app/store/reducers/user.slice";
import { useFormValidate } from "~/src/shared/lib/hooks/useFormValidate.hook";
import { useUser } from "~/src/features/user/lib/hooks";
import { changePersonalData } from "~/src/entities/profile-section/lib/api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { requiredFieldsRecord } from "~/src/entities/company-registration/model/company-registration.const";
import { RegistrationStageT } from "~/src/entities/company-registration/model/company-registration.interface";
import { IChangeableProfile } from "~/src/features/user/model";

interface Props {
  stage: RegistrationStageT;
}

export const useCompanyRegister = ({ stage }: Props) => {
  const dispatch = useAppDispatch();
  const { changeableUserInfo, currentRole } = useAppSelector(selectUser);
  const [loading, setLoading] = useState<boolean>(false);
  const { setUserData } = useUser();
  const requiredFields: (keyof IChangeableProfile)[] =
    requiredFieldsRecord[stage];
  const { error, handleHasValidateError, hasEmptyError } = useFormValidate({
    validateData: changeableUserInfo,
    requiredFields,
  });

  const isEmailError = useCallback(() => {
    return handleHasValidateError("email");
  }, [handleHasValidateError]);

  const hasErrors = useCallback(() => {
    return hasEmptyError() || isEmailError();
  }, [isEmailError, hasEmptyError]);

  const handleChangeData = useCallback(
    (v: string, field: keyof IChangeableProfile) => {
      dispatch(
        setUser({
          changeableUserInfo: {
            ...changeableUserInfo,
            [field]: v,
          },
        }),
      );
    },
    [changeableUserInfo, dispatch],
  );

  const handleChangeBoolean = useCallback(
    (v: boolean, field: keyof IChangeableProfile) => {
      dispatch(
        setUser({
          changeableUserInfo: {
            ...changeableUserInfo,
            [field]: v,
          },
        }),
      );
    },
    [changeableUserInfo, dispatch],
  );

  const handleChangeStage = useCallback(
    (stage: RegistrationStageT) => {
      dispatch(setStage(stage));
    },
    [dispatch],
  );

  const onSave = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        const res = await changePersonalData(changeableUserInfo);
        if (res.user) {
          setUserData(res.user);
        }
      },
    });
  }, [setUserData, changeableUserInfo]);

  const handleButtonClick = useCallback(
    (nextPage?: RegistrationStageT) => {
      const isError = hasErrors();
      if (isError) return;
      if (nextPage) {
        handleChangeStage(nextPage);
      }
      if (stage === "city") {
        onSave();
      }
    },
    [hasErrors, handleChangeStage, onSave, stage],
  );

  return {
    loading,
    error,
    companyData: changeableUserInfo,
    handleChangeData,
    handleChangeBoolean,
    handleButtonClick,
    handleChangeStage,
  };
};
