import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser, setUser } from "~/src/app/store/reducers/user.slice";

import { IProfile } from "~/src/features/user/model";
import { IChangeableProfile } from "../../model";

export const useChangePersonal = () => {
  const dispatch = useAppDispatch();
  const { userInfo, changeableUserInfo } = useAppSelector(selectUser);

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

  return {
    userInfo,
    onInputChange,
  };
};
