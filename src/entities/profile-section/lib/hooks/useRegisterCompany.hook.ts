import { useCallback, useEffect, useState } from "react";
import { useChangeUserData } from "./useChangeUserData.hook";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { useAppSelector } from "~/src/app/store/hooks";
import FormUtils from "~/src/shared/lib/utils/form.util";

import {
  quoteNextStages,
  quotePrevStages,
  quoteRequiredFields,
  quoteRequisitsRequiredFields,
  QuoteStageType,
} from "~/src/entities/profile-section/model";
import { IChangeableProfile } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";

export const useRegisterCompany = () => {
  const { changeableUserInfo } = useAppSelector(selectUser);
  const [stage, setStage] = useState<QuoteStageType>("about");

  // Валидация
  const [error, setError] = useState<MessageI | null>(null);
  const getSpecificError = useCallback(
    (data: IChangeableProfile): MessageI | null => {
      if (data.inn) {
        const err = FormUtils.getINNError(data.inn);
        if (err) return err;
      }
      if (data.kpp) {
        const err = FormUtils.getKPPError(data.kpp);
        if (err) return err;
      }
      if (data.ogrn) {
        const err = FormUtils.getOGRNError(data.ogrn);
        if (err) return err;
      }
      if (data.bank_bik) {
        const err = FormUtils.getBankBicError(data.bank_bik);
        if (err) return err;
      }
      if (data.bank_account) {
        const err = FormUtils.getBankAccountError(data.bank_account);
        if (err) return err;
      }
      if (data.correspondent_account) {
        const err = FormUtils.getBankAccountError(
          data.correspondent_account,
          "correspondent_account",
        );
        if (err) return err;
      }

      return null;
    },
    [],
  );

  // общая функция валидации
  const validateStage = useCallback(
    (
      data: IChangeableProfile,
      fieldsToCheck: (keyof IChangeableProfile)[],
    ): MessageI | null => {
      const error = FormUtils.getFormError<IChangeableProfile>({
        requiredFields: fieldsToCheck,
        checkData: data,
      });

      if (error) return error;

      const specificErr = getSpecificError(data);
      if (specificErr) return specificErr;

      return null;
    },
    [getSpecificError],
  );

  const validateAboutStage = useCallback(
    (data: IChangeableProfile): MessageI | null => {
      return validateStage(data, quoteRequiredFields);
    },
    [validateStage],
  );

  const validateRequisitesStage = useCallback(
    (data: IChangeableProfile): MessageI | null => {
      const needAccountant = !data.accountant_is_director;
      return validateStage(data, quoteRequisitsRequiredFields(needAccountant));
    },
    [validateStage],
  );

  // проверка на соответствие ошибки уже существующей и установка новой ошибки
  const validateAndSetError = useCallback(
    (err: MessageI | null): boolean => {
      if (err && err !== error) {
        setError(err);
        return false;
      }
      if (!err && error) {
        setError(null);
      }
      return !err;
    },
    [error],
  );

  // функция для полной валидации в зависимости от стадии
  const isValidFields = useCallback((): boolean => {
    const data = changeableUserInfo;
    if (!data) return false;

    let err: MessageI | null = null;

    if (stage === "about") {
      err = validateAboutStage(data);
    } else if (stage === "requisites") {
      err = validateRequisitesStage(data);
    }

    return validateAndSetError(err);
  }, [
    stage,
    changeableUserInfo,
    validateAboutStage,
    validateRequisitesStage,
    validateAndSetError,
  ]);

  // Изменения текущей стадии заполнения инф-ии
  const setPrevStage = useCallback(() => {
    const prevStage = quotePrevStages[stage];
    if (prevStage) {
      setStage(prevStage);
    }
  }, [stage]);

  const setNextStage = useCallback(() => {
    const nextStage = quoteNextStages[stage];
    if (nextStage) {
      setStage(nextStage);
    }
  }, [stage]);

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

  // проверка валидности полей если ошибка уже есть
  useEffect(() => {
    if (!changeableUserInfo) return;
    if (error) {
      isValidFields();
    }
    // eslint-disable-next-line
  }, [changeableUserInfo]);

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
