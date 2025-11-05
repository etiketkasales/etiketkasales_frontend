import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { useUser } from "~/src/features/user/lib/hooks/useUser.hook";
import { selectUser, setUser } from "~/src/app/store/reducers/user.slice";
import { changePersonalData } from "~/src/entities/profile-section/lib/api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { IChangeableProfile, IProfile } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";

export const useChangePersonal = (userInfo: IProfile) => {
  const dispatch = useAppDispatch();
  const { setUserData } = useUser();
  const { changeableUserInfo } = useAppSelector(selectUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(true);
  const [enabledInputs, setEnabledInputs] = useState<
    (keyof IChangeableProfile)[]
  >([]);
  const [error, setError] = useState<MessageI | null>(null);

  // Обработка ошибок
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
    [error?.field]
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

  const onInputChange = useCallback(
    (v: string, field: keyof IChangeableProfile) => {
      let updatedValue: string | null = null;
      if (error) {
        isValidFields();
      }
      if (v.trim() === "") {
        setDisabledButton(true);
      } else {
        updatedValue = v.trim();
        if (v.trim() !== userInfo[field]) {
          setDisabledButton(false);
        }
      }

      dispatch(
        setUser({
          changeableUserInfo: {
            ...changeableUserInfo,
            [field]: updatedValue,
          } as IChangeableProfile,
        })
      );
    },
    [dispatch, userInfo, changeableUserInfo, error, isValidFields]
  );

  const onSave = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        if (!changeableUserInfo) return;
        if (!isValidFields()) return;
        const res = await changePersonalData(changeableUserInfo);
        if (res) {
          setUserData(res.user);
          setEnabledInputs([]);
          setError(null);
        }
      },
      setError,
    });
  }, [changeableUserInfo, isValidFields, setUserData]);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSave();
      }
    },
    [onSave]
  );

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
