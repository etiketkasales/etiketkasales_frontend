import { useCallback, useEffect, useState } from "react";
import { useChangeUserData } from "./useChangeUserData.hook";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { IChangeableProfile, IProfile } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";

interface Props {
  userInfo: IProfile;
}

export const useChangePersonal = ({ userInfo }: Props) => {
  const dispatch = useAppDispatch();
  const { changeableUserInfo } = useAppSelector(selectUser);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [enabledInputs, setEnabledInputs] = useState<
    (keyof IChangeableProfile)[]
  >([]);

  // Валидация
  const [error, setError] = useState<MessageI | null>(null);
  const isValidEmail = useCallback(
    (email: string | null): boolean => {
      if (email) {
        const emailError = FormUtils.getEmailError({ email });
        if (emailError) {
          setError(emailError);
          return false;
        } else if (error?.field === "email") {
          setError(null);
        }
      }
      return true;
    },
    [error?.field],
  );

  const isValidFields = useCallback((): boolean => {
    if (changeableUserInfo) {
      if (!isValidEmail(changeableUserInfo.email)) return false;
      const newError = FormUtils.getFormError({
        requiredFields: enabledInputs,
        checkData: changeableUserInfo,
      });
      if (newError) {
        setError(newError);
        return false;
      }
    }
    setError(null);
    return true;
  }, [enabledInputs, isValidEmail, changeableUserInfo]);

  // выключение кнопки "Сохранить" при пустом поле
  const onInputChangeCustom = useCallback(
    (v: string, field: keyof IChangeableProfile) => {
      if (v.trim() === "") {
        setDisabledButton(true);
      } else {
        if (v.trim() !== userInfo[field]) {
          setDisabledButton(false);
        }
      }
    },
    [userInfo],
  );

  const { onInputChange, onSave, loading, onKeyDown } = useChangeUserData({
    userInfo: changeableUserInfo,
    validationFunction: isValidFields,
    onInputChangeCustom,
    onSaveCallback: () => {
      setEnabledInputs([]);
      setDisabledButton(true);
      setError(null);
    },
    error,
    setError,
  });

  useEffect(() => {
    if (!changeableUserInfo) return;
    isValidFields();
  }, [changeableUserInfo, enabledInputs]); // eslint-disable-line
  // убрал isValidFields из зависимостей, чтоб не было loop rerendering

  return {
    changeableUserInfo,
    onInputChange,
    onSave,
    loading,
    disabledButton,
    enabledInputs,
    setEnabledInputs,
    onKeyDown,
    error,
  };
};
