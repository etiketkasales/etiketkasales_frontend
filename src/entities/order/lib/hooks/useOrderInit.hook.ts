import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { addNotification } from "~/src/app/store/reducers/notifications.slice";
import { setOrderReceiverData } from "~/src/app/store/reducers/order.slice";
import FormUtils from "~/src/shared/lib/utils/form.util";

import { IProfile } from "~/src/features/user/model";
import { IOrderReceiver, OrderType } from "../../model";

// Константы, не вижу смысла выносить их в model
const requiredFields: (keyof IProfile)[] = [
  "name",
  "surname",
  "phone",
  "email",
];

const errorMessageTexts = {
  noUser: "Сначала авторизуйтесь на сайте",
  noPersonalData: "Заполните все данные",
};

interface Props {
  type: OrderType;
}

// Если заказ для компании, то устанавливает получателя в заказе. Иначе - ничего
export const useOrderInit = ({ type }: Props) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { userInfo, isLoggedIn, loadingData } = useAppSelector(selectUser);

  const createNotification = useCallback(
    (msg: string) => {
      dispatch(
        addNotification({
          type: "error",
          message: msg,
          field: "global",
        }),
      );
    },
    [dispatch],
  );

  const isValidUser = useCallback((): boolean => {
    if ((!userInfo || !isLoggedIn) && !loadingData) {
      createNotification(errorMessageTexts.noUser);
      return false;
    }

    if (
      FormUtils.getFormError({
        requiredFields,
        checkData: userInfo,
      })
    ) {
      createNotification(errorMessageTexts.noPersonalData);
      push("/profile/buyer?active_section=personal"); // Секция с заполнением личной информации
      return false;
    }

    return true;
  }, [createNotification, userInfo, push, isLoggedIn, loadingData]);

  const initCompanyOrder = useCallback(() => {
    if (!isValidUser()) return;
    const receiver: IOrderReceiver = {
      receiver_email: userInfo.email as string,
      receiver_name: userInfo.name as string,
      receiver_phone: userInfo.phone,
      receiver_surname: userInfo.surname as string,
    };
    // На этом этапе валидация уже прошла, поэтому поля точно есть

    dispatch(setOrderReceiverData({ ...receiver }));
  }, [isValidUser, dispatch, userInfo]);

  useEffect(() => {
    if (type === "company") initCompanyOrder();
  }, [type, initCompanyOrder]);
};
