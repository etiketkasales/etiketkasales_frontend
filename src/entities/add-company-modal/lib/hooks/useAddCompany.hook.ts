import { useCallback, useEffect, useState } from "react";
import { useCreateNew } from "~/src/shared/lib/hooks/useCreateNew.hook";
import { useUserCompanies } from "~/src/features/user/lib/hooks/useUserCompanies.hook";
import FormUtils from "~/src/shared/lib/utils/form.util";

import {
  addCompanyRequiredFields,
  addCompanySpecificFields,
  newCompanySkeleton,
} from "../../model";
import { IUserCompanyBase } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";

export const useAddCompany = () => {
  const {
    newData: newCompany,
    onStringInputChange,
    onNumberInputChange,
    onSave,
    loading,
    error,
  } = useCreateNew({
    skeleton: newCompanySkeleton,
    requiredFields: addCompanyRequiredFields,
  });
  const [specificError, setSpecificError] = useState<MessageI | null>(null);
  const [conditionsAccepted, setConditionsAccepted] = useState<boolean>(false);
  const { addCompany } = useUserCompanies();

  const onChange = useCallback(
    (v: string, field: keyof IUserCompanyBase, type: "string" | "number") => {
      if (type === "string") onStringInputChange(v, field);
      if (type === "number") onNumberInputChange(v, field);
    },
    [onStringInputChange, onNumberInputChange],
  );

  const hasSpecificError = useCallback((): boolean => {
    let newError: MessageI | null = null;

    for (const field of addCompanySpecificFields) {
      if (field === "inn") {
        newError = FormUtils.getINNError(newCompany[field], field);
        if (newError) break;
      }
      if (field === "ogrn") {
        newError = FormUtils.getOGRNError(newCompany[field], field);
        if (newError) break;
      }
      if (field === "kpp") {
        newError = FormUtils.getKPPError(newCompany[field], field);
        if (newError) break;
      }
    }

    if (!newError && !conditionsAccepted) {
      newError = {
        field: "checkbox",
        type: "error",
        message: "",
      };
    }

    setSpecificError(newError);
    return newError !== null;
  }, [newCompany, conditionsAccepted]);

  const onSaveCompany = useCallback(async () => {
    const specificError = hasSpecificError();
    if (specificError) return;
    await onSave(async () => {
      await addCompany(newCompany);
    });
  }, [addCompany, newCompany, hasSpecificError, onSave]);

  useEffect(() => {
    if (specificError) {
      hasSpecificError();
    }
    // eslint-disable-next-line
  }, [newCompany]);

  return {
    newCompany,
    onChange,
    onSaveCompany,
    conditionsAccepted,
    setConditionsAccepted,
    error,
    loading,
    specificError,
  };
};
