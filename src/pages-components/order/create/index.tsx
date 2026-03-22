"use client";
import { useAppSelector } from "~/src/app/store/hooks";

import { redirect } from "next/navigation";
import { selectOrder } from "~/src/app/store/reducers/order.slice";

export default function OrderCreatePage() {
  const { type } = useAppSelector(selectOrder);

  return redirect(`/order/create/${type}`);
}
