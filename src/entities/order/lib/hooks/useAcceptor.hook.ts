import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectOrder, setOrder } from "~/src/app/store/reducers/order.slice";
import { INewOrderAcceptor } from "../../model";

export const useAcceptor = () => {
  const dispatch = useAppDispatch();
  const { orderInfo } = useAppSelector(selectOrder);
  const [canChange, setCanChange] = useState<boolean>(false);

  const onInputChange = useCallback(
    (v: string, field: keyof INewOrderAcceptor) => {
      dispatch(
        setOrder({
          orderInfo: {
            ...orderInfo,
            acceptor: {
              ...orderInfo.acceptor,
              [field]: v,
            },
          },
        }),
      );
    },
    [dispatch, orderInfo],
  );

  return {
    acceptor: orderInfo.acceptor,
    onInputChange,
    canChange,
    setCanChange,
  };
};
