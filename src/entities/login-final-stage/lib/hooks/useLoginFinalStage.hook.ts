import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { useLoginFinalStageValidation } from ".";
import { useChangeUserData } from "~/src/entities/profile-section/lib/hooks";
import { useRouter } from "next/navigation";

import { selectUser } from "~/src/app/store/reducers/user.slice";

export const useLoginFinalStage = () => {
  const { push } = useRouter();
  const { changeableUserInfo } = useAppSelector(selectUser);
  const [agreementAccepted, setAgreementAccepted] = useState<boolean>(false);
  const { isValidForm, error, setError } = useLoginFinalStageValidation({
    userInfo: changeableUserInfo,
    agreementAccepted,
  });
  const { onInputChange, onSave, loading } = useChangeUserData({
    userInfo: changeableUserInfo,
    error,
    setError,
    validationFunction: isValidForm,
    onSaveCallback: () => push("/order"),
  });

  const onSaveCustom = useCallback(
    async () => await onSave("Регистрация прошла успешно"),
    [onSave],
  );

  useEffect(() => {
    if (error) {
      isValidForm();
    }
  }, [error, isValidForm]);

  return {
    userInfo: changeableUserInfo,
    agreementAccepted,
    setAgreementAccepted,
    onInputChange,
    onSave: onSaveCustom,
    loading,
    error,
  };
};
