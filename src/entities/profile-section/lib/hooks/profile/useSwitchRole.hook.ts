import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { switchRole } from "~/src/features/user/lib/api/user.api";
import { useUser } from "~/src/features/user/lib/hooks";
import { UserRoleType } from "~/src/features/user/model";

export const useSwitchRole = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { setUserData } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSwitchRole = useCallback(
    async (roleToSwitch: UserRoleType) => {
      try {
        setLoading(true);
        const res = await switchRole(roleToSwitch);
        if (
          !res.success &&
          (Array.isArray(res.missing_fields) ||
            res.error?.includes("not verified")) // TODO: придумать, как улучшить эту проверку. Обсудить с бэком
        ) {
          push("/company/registrate");
          dispatch(
            addNotification({
              message: "Заполните все поля",
              type: "error",
              field: "global",
            }),
          );
        } else if (res.user) {
          setUserData(res.user);
          dispatch(
            addNotification({
              message: "Роль изменена",
              type: "success",
              field: "global",
            }),
          );
        }
      } catch (err) {
        console.error(err);
        dispatch(
          addNotification({
            message: "Непредвиденная ошибка",
            type: "error",
            field: "global",
          }),
        );
      } finally {
        setLoading(false);
      }
    },
    [setUserData, push, dispatch],
  );

  return {
    loading,
    handleSwitchRole,
  };
};
