import { useCallback, useState } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { switchRole } from "~/src/features/user/lib/api/user.api";
import { UserRoleType } from "~/src/features/user/model/user.interface";
import { promiseWrapper } from "~/src/shared/lib/functions/shared.func";

export const useSwitchRole = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSwitchRole = useCallback(
    async (roleToSwitch: UserRoleType) => {
      await promiseWrapper({
        setLoading,
        callback: async () => {
          const res = await switchRole(roleToSwitch);
          if (res) {
            if (res.user) {
              dispatch(setUser({ userInfo: res.user }));
            }
            dispatch(setUser({ role: roleToSwitch }));
          }
        },
      });
    },
    [dispatch],
  );

  return {
    loading,
    handleSwitchRole,
  };
};
