"use client";
import React from "react";
import OrderContent from "./content";

interface Props {
  forCompany?: boolean;
}
export default function OrderSection({ forCompany = false }: Props) {
  return (
    <section className="flex-column gap-30px">
      <h1 className="text-28 second-family black bold">Оформление заказа</h1>
      <OrderContent forCompany={forCompany} />
    </section>
  );
}
