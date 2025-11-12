import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { switchRole } from "~/src/features/user/lib/api/user.api";
import { useUser } from "~/src/features/user/lib/hooks";
import { UserRoleType } from "~/src/features/user/model";

export const useSwitchRole = () => {
  const { push } = useRouter();
  const { setUserData } = useUser();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSwitchRole = useCallback(
    async (roleToSwitch: UserRoleType) => {
      try {
        setLoading(true);
        const res = await switchRole(roleToSwitch);
        if (!res.success && Array.isArray(res.missing_fields)) {
          push("/company/registrate");
        } else if (res.user) {
          setUserData(res.user);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [setUserData, push],
  );

  return {
    loading,
    handleSwitchRole,
  };
};
