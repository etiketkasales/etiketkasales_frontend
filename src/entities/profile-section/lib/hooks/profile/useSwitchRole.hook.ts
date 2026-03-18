import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";
import { useUser } from "~/src/features/user/lib/hooks";

import { switchRole } from "~/src/features/user/lib/api/user.api";

import { UserRoleType } from "~/src/features/user/model";

/**
 * Hook для смены роли пользователя.
 *
 * @returns {Object} - Объект с поля loading и функцией handleSwitchRole.
 * @returns {boolean} loading - Флаг, указывающий на то, что запрос на смену роли находится в процессе выполнения.
 * @returns {function} handleSwitchRole - Функция для смены роли пользователя.
 * @param {UserRoleType} roleToSwitch - Роль, на которую нужно перейти.
 */
export const useSwitchRole = () => {
  const { push } = useRouter();
  const { setUserData } = useUser();
  const createNotification = useCreateNotification();
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
          createNotification(
            res.message || "Для смены роли необходимо пройти регистрацию",
          );
        } else if (res.user) {
          setUserData(res.user);
          createNotification(res.message || "Роль изменена", "success");
        }
      } catch (err) {
        console.error(err);
        createNotification("Непредвиденная ошибка", "error");
      } finally {
        setLoading(false);
      }
    },
    [setUserData, push, createNotification],
  );

  return {
    loading,
    handleSwitchRole,
  };
};
