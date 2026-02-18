import { useStageFlow } from "~/src/shared/lib";
import { useChangeUserData } from "../profile";
import { useValidateQuote } from ".";

import { selectUser } from "~/src/app/store/reducers/user.slice";
import { useAppSelector } from "~/src/app/store/hooks";

import {
  quoteNextStages,
  quotePrevStages,
  QuoteStageType,
} from "~/src/entities/profile-section/model";

/**
 * Хук для регистрации компании.
 *
 * @return {{changeableUserInfo: IChangeableProfile, onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void, onBooleanChange: (field: keyof IChangeableProfile, value: boolean) => void, onSave: () => void, stage: QuoteStageType, setPrevStage: () => void, loading: boolean, error: MessageI | null}}
 */
export const useRegisterCompany = () => {
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

  return {
    changeableUserInfo,
    onInputChange,
    onBooleanChange,
    onSave,
    stage,
    setPrevStage,
    loading,
    error,
  };
};
