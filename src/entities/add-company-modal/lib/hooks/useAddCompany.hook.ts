import { useCallback, useEffect, useState } from "react";
import { useCreateNew } from "~/src/shared/lib/hooks";
import { useUserCompanies } from "~/src/features/user/lib/hooks";

import {
  addCompanyRequiredFields,
  AddCompanySpecificFields,
  addCompanySpecificFields,
  newCompanySkeleton,
  specificErrorDetectors,
} from "../../model";
import { IUserCompanyBase } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";

export const useAddCompany = (onClose: () => void) => {
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

    addCompanySpecificFields.forEach((field) => {
      const errorDetector =
        specificErrorDetectors[field as AddCompanySpecificFields];
      if (errorDetector) {
        newError = errorDetector(newCompany);
        if (newError) return;
      }
    });

    setSpecificError(newError);
    return newError !== null;
  }, [newCompany]);

  const onSaveCompany = useCallback(async () => {
    const specificError = hasSpecificError();
    if (specificError) return;
    await onSave(async () => {
      await addCompany(newCompany, onClose);
    });
  }, [addCompany, newCompany, hasSpecificError, onSave, onClose]);

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
