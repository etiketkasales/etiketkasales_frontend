"use client";
import { redirect } from "next/navigation";

import { useAppSelector } from "~/src/app/store/hooks";
import { selectOrder } from "~/src/app/store/reducers/order.slice";

export default function OrderPage() {
  const { type } = useAppSelector(selectOrder);

  return redirect(`/order/${type}`);
}
