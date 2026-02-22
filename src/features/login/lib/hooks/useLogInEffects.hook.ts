import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useAppDispatch } from "~/src/app/store/hooks";
import { setUser } from "~/src/app/store/reducers/user.slice";
import { useCart } from "~/src/features/cart/lib/hooks";
import { useUser } from "~/src/features/user/lib/hooks";
import { useCreateNotification } from "~/src/widgets/notifications/lib/hooks";

export const useLogInEffects = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const createNotification = useCreateNotification();
  const { handleGetUser: getUserProfile } = useUser();
  const { cartMerging } = useCart();

  const sendPhoneEffect = useCallback(
    (message?: string) => {
      createNotification(message || "Код отправлен", "success");
      push("/login/code");
    },
    [createNotification, push],
  );

  const sendCodeEffect = useCallback(
    async (message?: string) => {
      dispatch(
        setUser({
          isLoggedIn: true,
        }),
      );
      createNotification(message || "Вы вошли в систему", "success");
      await Promise.all([getUserProfile(), cartMerging()]);
    },
    [createNotification, dispatch, cartMerging, getUserProfile],
  );

  return {
    sendPhoneEffect,
    sendCodeEffect,
  };
};
