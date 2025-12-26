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

/**
 * Хук для изменения акцептора заказа
 * @returns объект со следующими поля:
 *   receiver - акцептор заказа
 *   onInputChange - функция для изменения ключевых полей
 *   canChange - флаг изменения акцептора
 *   setCanChange - функция для установки флага изменения акцептора
 *   chosenCompany - выбранная организация
 *   onButtonClick - функция для перехода на страницу выбора организации
 */
export const useAcceptor = () => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { receiver, receiverCompanyId } = useAppSelector(selectOrder);
  const { companies } = useAppSelector(selectUser);
  const [canChange, setCanChange] = useState<boolean>(false);
  const [chosenCompany, setChosenCompany] = useState<IUserCompany | null>(null);

  // Стандартная функция для изменения ключевых полей
  const onInputChange = useCallback(
    (v: string, field: keyof IOrderReceiver) => {
      dispatch(setOrderReceiverData({ ...receiver, [field]: v }));
    },
    [dispatch, receiver],
  );

  // Переводит на страницу выбора организации
  const onButtonClick = useCallback(() => {
    push("/profile/buyer?active_section=companies");
  }, [push]);

  // Ставит дефолтную организацию из профиля как выбранную
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
