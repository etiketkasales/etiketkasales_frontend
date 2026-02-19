import { useCallback, useState } from "react";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { MessageI } from "~/src/shared/model";
import { loginFinalStageRequiredFields } from "../../model";
import { IChangeableProfile } from "~/src/features/user/model";

interface Props {
  agreementAccepted: boolean;
  userInfo: IChangeableProfile;
}

export const useLoginFinalStageValidation = ({
  agreementAccepted,
  userInfo,
}: Props) => {
  const [error, setError] = useState<MessageI | null>(null);

  const isValidFields = useCallback((): boolean => {
    const keys = loginFinalStageRequiredFields;
    const newError = FormUtils.getFormError<IChangeableProfile>({
      requiredFields: keys,
      checkData: userInfo,
      currentError: error,
    });

    if (!newError && !agreementAccepted) {
      if (error && error.field === "agreement") return false;
      setError({
        message: "",
        field: "agreement",
        type: "error",
      });
      return false;
    }

    setError(newError);
    return !newError;
  }, [userInfo, error, agreementAccepted]);

  const isValidEmail = useCallback((): boolean => {
    const email = userInfo.email;
    if (!email) return false;
    const newError = FormUtils.getEmailError({
      email,
      emailField: "email",
    });
    setError(newError);
    return !newError;
  }, [userInfo.email]);

  const isValidForm = useCallback((): boolean => {
    return isValidFields() && isValidEmail();
  }, [isValidFields, isValidEmail]);

  return {
    error,
    setError,
    isValidForm,
  };
};
