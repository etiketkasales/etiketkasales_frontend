import React, { useCallback, useState } from "react";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
import { useAppDispatch } from "~/src/app/store/hooks";
import { useUser } from "~/src/features/user/lib/hooks/useUser.hook";

import { setUser } from "~/src/app/store/reducers/user.slice";
import { changePersonalData } from "~/src/entities/profile-section/lib/api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { IChangeableProfile } from "~/src/features/user/model";
import { MessageI } from "~/src/shared/model";

interface Props {
  userInfo?: IChangeableProfile;
  validationFunction?: () => boolean;
  onInputChangeCustom?: (v: string, field: keyof IChangeableProfile) => void;
  onSaveCallback?: () => void;
  error?: MessageI | null;
  setError?: React.Dispatch<React.SetStateAction<MessageI | null>>;
}

/**
 * Hook for changing user's data.
 *
 * @param {Props} props - object with required properties:
 * userInfo - user information from state,
 * validationFunction - function that validates user information,
 * onInputChangeCustom - function that is called when user input changes,
 * onSaveCallback - function that is called when user data is successfully changed,
 * error - error message that is displayed if validation fails,
 * setError - function that sets error message.
 *
 * @returns {Object} - object with functions for changing user data and loading state.
 */
export const useChangeUserData = ({
  userInfo,
  validationFunction,
  onInputChangeCustom,
  onSaveCallback,
  error,
  setError,
}: Props) => {
  const dispatch = useAppDispatch();
  const { setUserData } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const createNotification = useCreateNotification();

  const onInputChange = useCallback(
    (v: string, field: keyof IChangeableProfile) => {
      onInputChangeCustom?.(v, field);
      dispatch(
        setUser({
          changeableUserInfo: {
            ...userInfo,
            [field]: v,
          } as IChangeableProfile,
        }),
      );
    },
    [dispatch, userInfo, onInputChangeCustom],
  );

  const onBooleanChange = useCallback(
    (v: boolean, field: keyof IChangeableProfile) => {
      if (error) {
        validationFunction?.();
      }
      dispatch(
        setUser({
          changeableUserInfo: {
            ...userInfo,
            [field]: v,
          } as IChangeableProfile,
        }),
      );
    },
    [dispatch, userInfo, error, validationFunction],
  );

  const onSave = useCallback(
    async (customMessage?: string, overrideUserInfo?: IChangeableProfile) => {
      await promiseWrapper({
        setLoading,
        callback: async () => {
          const data = overrideUserInfo || userInfo;
          if (!data) return;
          const validation = validationFunction;
          if (validation && !validation()) return;

          const res = await changePersonalData(data);
          if (res) {
            createNotification(customMessage || "Профиль обновлён", "success");
            setUserData(res.user);
            onSaveCallback?.();
          }
        },
        setError,
      });
    },
    [
      userInfo,
      createNotification,
      validationFunction,
      setUserData,
      onSaveCallback,
      setError,
      dispatch,
    ],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        e.preventDefault();
        onSave();
      }
    },
    [onSave],
  );

  return {
    onInputChange,
    onBooleanChange,
    onSave,
    loading,
    onKeyDown,
  };
};
