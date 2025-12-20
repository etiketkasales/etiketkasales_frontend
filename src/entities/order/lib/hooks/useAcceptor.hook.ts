import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { useRouter } from "next/navigation";
import {
  selectOrder,
  setOrderReceiverData,
} from "~/src/app/store/reducers/order.slice";

import { IOrderReceiver } from "../../model";
import { IUserCompany } from "~/src/features/user/model";

export const useAcceptor = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { receiver, receiverCompanyId } = useAppSelector(selectOrder);
  const { companies } = useAppSelector(selectUser);
  const [canChange, setCanChange] = useState<boolean>(false);
  const [chosenCompany, setChosenCompany] = useState<IUserCompany | null>(null);

  const onInputChange = useCallback(
    (v: string, field: keyof IOrderReceiver) => {
      dispatch(setOrderReceiverData({ ...receiver, [field]: v }));
    },
    [dispatch, receiver],
  );

  const onButtonClick = useCallback(() => {
    push("/profile/buyer?active_section=companies");
  }, [push]);

  useEffect(() => {
    if (!receiverCompanyId) return;
    const company =
      companies.find((company) => company.id === receiverCompanyId) ?? null;
    if (company) {
      setChosenCompany(company);
    } else {
      dispatch(
        addNotification({
          message: "Не нашлось подходящей организации в профиле",
          type: "error",
          field: "global",
        }),
      );
    }
  }, [receiverCompanyId, dispatch, companies]);

  return {
    receiver,
    onInputChange,
    canChange,
    setCanChange,
    chosenCompany,
    onButtonClick,
  };
};
