import { useStageFlow } from "~/src/shared/lib";
import { useChangeUserData } from "../profile";
import { useValidateQuote } from ".";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";

import {
  selectUser,
  setAccountantAsDirector,
} from "~/src/app/store/reducers/user.slice";

import {
  quoteNextStages,
  quotePrevStages,
  QuoteStageType,
} from "~/src/entities/profile-section/model";
import type { IChangeableProfile } from "~/src/features/user/model";

/**
 * Hook for working with registration of a company
 * @returns {{changeableUserInfo, onInputChange, onBooleanChange, onSave, stage, setPrevStage, loading, error}}
 */
export const useRegisterCompany = () => {
  const dispatch = useAppDispatch();
  const { changeableUserInfo } = useAppSelector(selectUser);
  const {
    stage,
    next: setNextStage,
    prev: setPrevStage,
  } = useStageFlow<QuoteStageType>({
    initialStage: "about",
    nextStagesMap: quoteNextStages,
    prevStagesMap: quotePrevStages,
  });

  const { error, setError, isValidFields } = useValidateQuote({
    stage,
    userInfo: changeableUserInfo,
  });

  const clearErrorAndEdit = useCallback(
    (fn: (v: string, field: keyof IChangeableProfile) => void) =>
      (v: string, field: keyof IChangeableProfile) => {
        setError(null);
        fn(v, field);
      },
    [setError],
  );

  const clearErrorAndEditBool = useCallback(
    (fn: (v: boolean, field: keyof IChangeableProfile) => void) =>
      (v: boolean, field: keyof IChangeableProfile) => {
        setError(null);
        fn(v, field);
      },
    [setError],
  );

  // функции для работы с данными юзера
  const { onInputChange, loading, onSave, onBooleanChange } = useChangeUserData(
    {
      userInfo: changeableUserInfo,
      validationFunction: isValidFields,
      onSaveCallback: () => {
        setNextStage();
        setError(null);
      },
      error,
      setError,
    },
  );

  // TODO: добавить проверку на соотвествие, чтобы было меньше ререндеров
  useEffect(() => {
    const isAccountantDirector = changeableUserInfo.accountant_is_director;
    if (isAccountantDirector) {
      dispatch(setAccountantAsDirector());
    }
  }, [changeableUserInfo, dispatch]);

  return {
    changeableUserInfo,
    onInputChange: clearErrorAndEdit(onInputChange),
    onBooleanChange: clearErrorAndEditBool(onBooleanChange),
    onSave,
    stage,
    setPrevStage,
    loading,
    error,
  };
};
