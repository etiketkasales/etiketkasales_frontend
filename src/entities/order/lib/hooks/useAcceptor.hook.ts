import { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { useRouter } from "next/navigation";
import {
  selectOrder,
  setOrderInfo,
  setOrderReceiverData,
} from "~/src/app/store/reducers/order.slice";

import { IOrderReceiver } from "../../model";
import { IUserCompany } from "~/src/features/user/model";

/**
 * Хук для изменения акцептора заказа
 */
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

  const selectCompany = useCallback(
    (companyId: number) => {
      dispatch(setOrderInfo({ receiverCompanyId: companyId }));
    },
    [dispatch],
  );

  const activeCompany = useMemo(() => {
    if (!companies.length) {
      return null;
    }

    if (receiverCompanyId) {
      return (
        companies.find((company) => company.id === receiverCompanyId) ?? null
      );
    }

    return (
      companies.find((company) => company.is_default) ?? companies[0] ?? null
    );
  }, [companies, receiverCompanyId]);

  useEffect(() => {
    if (!activeCompany) {
      setChosenCompany(null);
      return;
    }

    setChosenCompany(activeCompany);

    if (receiverCompanyId !== activeCompany.id) {
      dispatch(setOrderInfo({ receiverCompanyId: activeCompany.id }));
    }
  }, [activeCompany, receiverCompanyId, dispatch]);

  return {
    receiver,
    onInputChange,
    canChange,
    setCanChange,
    chosenCompany,
    companies,
    selectCompany,
    onButtonClick,
  };
};
