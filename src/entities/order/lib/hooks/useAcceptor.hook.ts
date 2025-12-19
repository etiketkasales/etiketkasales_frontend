import { useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import {
  selectOrder,
  setOrderReceiverData,
} from "~/src/app/store/reducers/order.slice";

import { IOrderReceiver } from "../../model";

export const useAcceptor = () => {
  const dispatch = useAppDispatch();
  const { createOrderForCompanyData } = useAppSelector(selectOrder);
  const [canChange, setCanChange] = useState<boolean>(false);

  const onInputChange = useCallback(
    (v: string, field: keyof IOrderReceiver) => {
      dispatch(setOrderReceiverData({ [field]: v }));
    },
    [dispatch],
  );

  return {
    receiver: createOrderForCompanyData.receiver,
    onInputChange,
    canChange,
    setCanChange,
  };
};
