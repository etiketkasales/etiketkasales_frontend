import { useCallback, useEffect, useState } from "react";
import { IChangeableProfile } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";
import { getSpecificQuoteError } from "../../utils";
import FormUtils from "~/src/shared/lib/utils/form.util";
import {
  quoteStageFieldsMap,
  QuoteStageType,
} from "~/src/entities/profile-section/model";

interface Props {
  stage: QuoteStageType;
  userInfo: IChangeableProfile;
}

export const useValidateQuote = ({ stage, userInfo }: Props) => {
  const [error, setError] = useState<MessageI | null>(null);

  // общая функция валидации
  const validateStage = useCallback(
    (data: IChangeableProfile): MessageI | null => {
      const fieldsConfig = quoteStageFieldsMap[stage];

      const fields =
        typeof fieldsConfig === "function" ? fieldsConfig(data) : fieldsConfig;

      const requiredError = FormUtils.getFormError<IChangeableProfile>({
        requiredFields: fields,
        checkData: data,
      });

      if (requiredError) return requiredError;

      return getSpecificQuoteError(data);
    },
    [stage],
  );

  // проверка на соответствие ошибки уже существующей и установка новой ошибки
  const validateAndSetError = useCallback((err: MessageI | null) => {
    setError((prev) => {
      if (prev?.message === err?.message && prev?.field === err?.field) {
        return prev;
      }
      return err;
    });

    return !err;
  }, []);

  // функция для полной валидации в зависимости от стадии
  const isValidFields = useCallback(() => {
    const err = validateStage(userInfo);
    return validateAndSetError(err);
  }, [userInfo, validateStage, validateAndSetError]);

  // проверка валидности полей если ошибка уже есть
  useEffect(() => {
    if (!error) return;

    const err = validateStage(userInfo);

    setError((prev) => {
      if (prev?.message === err?.message && prev?.field === err?.field) {
        return prev;
      }
      return err;
    });
  }, [userInfo, error, validateStage]);

  return {
    error,
    setError,
    isValidFields,
  };
};
