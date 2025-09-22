"use client";
import React from "react";
import { useSeller } from "../lib/hooks/useSeller.hook";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import SellerInfo from "./info";

interface Props {
  sellerId: number;
  gap: number;
  spaceBetween?: boolean;
}

export default function SellerInfoContainer({
  sellerId,
  gap,
  spaceBetween = true,
}: Props) {
  const { loaded } = useAppSelector(selectNavigation);
  const { sellerInfo, loading, error } = useSeller({ sellerId });
  return (
    <div
      className="flex-column gap-3"
      style={{
        gap: `${gap}px`,
      }}
    >
      <h3 className="text-14 regular gray-2 second-family">Продавец</h3>
      <SellerInfo
        loaded={loaded || !loading}
        sellerInfo={sellerInfo}
        spaceBetween={spaceBetween}
      />
    </div>
  );
}
