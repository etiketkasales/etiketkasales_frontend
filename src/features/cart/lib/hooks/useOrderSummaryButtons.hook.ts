import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "~/src/app/store/hooks";
import { selectUser } from "~/src/app/store/reducers/user.slice";
import { setOrderType } from "~/src/app/store/reducers/order.slice";

import { IOrderSummaryButton } from "~/src/entities/order-summary/model";

interface Props {
  openModal: () => void;
}

export const useOrderSummaryButtons = ({ openModal }: Props) => {
  const dispatch = useAppDispatch();
  const { push } = useRouter();
  const { companies } = useAppSelector(selectUser);

  const pushToOrder = useCallback(
    (type: "person" | "company") => {
      dispatch(setOrderType(type));
      push("/order/create");
    },
    [push, dispatch],
  );

  const onAsCompanyClick = useCallback(() => {
    if (!companies || companies.length === 0) {
      openModal();
    } else pushToOrder("company");
  }, [companies, openModal, pushToOrder]);

  const buttons: IOrderSummaryButton[] = [
    {
      title: "Перейти к оформлению",
      type: "yellow",
      link: "/order",
      onClick: useCallback(() => pushToOrder("person"), [pushToOrder]),
    },
    {
      title: "Купить как юр. лицо",
      type: "gray-border",
      link: "/order",
      onClick: onAsCompanyClick,
    },
  ];

  return buttons;
};
