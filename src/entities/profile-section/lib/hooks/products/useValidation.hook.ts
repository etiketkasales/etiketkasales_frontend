import { useCallback, useState } from "react";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { MessageI } from "~/src/shared/model";
import {
  INewProduct,
  newProductRequiredFields,
} from "~/src/entities/profile-section/model";

interface Props {
  checkData: INewProduct;
}

export const useValidation = ({ checkData }: Props) => {
  const [error, setError] = useState<MessageI | null>(null);
  const [requiredFilters, setRequiredFilters] = useState<string[]>([]);

  const getError = useCallback(
    (requiredFields: (keyof INewProduct)[]) => {
      const newError = FormUtils.getFormError({
        currentError: error,
        requiredFields,
        checkData,
      });
      setError(newError);
    },
    [checkData, error],
  );

  const getStageError = useCallback(
    (currentStage: number): boolean => {
      switch (currentStage) {
        default:
          return false;
        case 1:
          getError(newProductRequiredFields);
          return true;
        case 2:
          getError(requiredFilters);
          return true;
      }
    },
    [getError, requiredFilters],
  );

  return {
    error,
    getError,
    setRequiredFilters,
    getStageError,
  };
};
