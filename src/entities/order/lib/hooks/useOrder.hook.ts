import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectOrder, setOrder } from "~/src/app/store/reducers/order.slice";
import { selectUser } from "~/src/app/store/reducers/user.slice";

export const useOrder = () => {
  const dispatch = useAppDispatch();
  const { userInfo } = useAppSelector(selectUser);
  const { orderInfo } = useAppSelector(selectOrder);

  useEffect(() => {
    if (userInfo) {
      dispatch(
        setOrder({
          orderInfo: {
            ...orderInfo,
            acceptor: {
              name: userInfo.name || "",
              phone: userInfo.phone || "",
              email: userInfo.email || "",
              surname: userInfo.surname || "",
            },
          },
        }),
      );
    }
    // eslint-disable-next-line
  }, [userInfo, dispatch]); // только для инициализации

  return {};
};
