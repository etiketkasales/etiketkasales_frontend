import { useCallback, useMemo, useState } from "react";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { MessageI } from "~/src/shared/model";
import {
  INewProduct,
  newProductRequiredFields,
} from "~/src/entities/profile-section/model";

interface Props {
  checkData: INewProduct;
}

/**
 * useValidation - a hook for validating new product data
 * @param {Props} - an object containing checkData
 * @returns {object} - an object containing error, getError, setRequiredFilters, and getStageError
 * @property {MessageI | null} error - an error message if something went wrong
 * @property {(requiredFields: (keyof INewProduct)[]) => boolean} getError - a function for checking if there are errors in the given fields
 * @property {(requiredFilters: (keyof INewProduct)[]) => void} setRequiredFilters - a function for setting required filters
 * @property {(stage: number) => boolean} getStageError - a function for checking if there are errors in the given stage
 */
export const useValidation = ({ checkData }: Props) => {
  const [error, setError] = useState<MessageI | null>(null);
  const [requiredFilters, setRequiredFilters] = useState<(keyof INewProduct)[]>(
    [],
  );

  const getError = useCallback(
    (requiredFields: (keyof INewProduct)[]): boolean => {
      const newError = FormUtils.getFormError({
        currentError: error,
        requiredFields,
        checkData,
      });
      if (newError) {
        setError(newError);
        return true;
      } else {
        setError(null);
        return false;
      }
    },
    [checkData, error],
  );

  const stageMap: Record<number, (keyof INewProduct)[]> = useMemo(
    () => ({
      1: newProductRequiredFields,
      2: requiredFilters,
    }),
    [requiredFilters],
  );

  const getStageError = useCallback(
    (stage: number) => {
      const fields = stageMap[stage] ?? [];
      return getError(fields);
    },
    [getError, stageMap],
  );

  return {
    error,
    getError,
    setRequiredFilters,
    getStageError,
  };
};
