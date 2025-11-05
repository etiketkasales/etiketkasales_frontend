import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser, setUser } from "~/src/app/store/reducers/user.slice";
import { changePersonalData } from "~/src/entities/profile-section/lib/api";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

import { IChangeableProfile, IProfile } from "~/src/features/user/model";

export const useChangePersonal = () => {
  const dispatch = useAppDispatch();
  const { userInfo, changeableUserInfo } = useAppSelector(selectUser);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabledButton, setDisabledButton] = useState<boolean>(false);

  const onInputChange = useCallback(
    (v: string, field: keyof IProfile) => {
      dispatch(
        setUser({
          ...userInfo,
          [field]: v,
        }),
      );
    },
    [dispatch, userInfo],
  );

  const onSave = useCallback(async () => {
    await promiseWrapper({
      setLoading,
      callback: async () => {
        if (!changeableUserInfo) return;
        await changePersonalData(changeableUserInfo);
      },
    });
  }, [changeableUserInfo]);

  return {
    userInfo,
    onInputChange,
    onSave,
    loading,
  };
};
