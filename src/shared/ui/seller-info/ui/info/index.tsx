"use client";
import React from "react";
import { useRouter } from "next/navigation";

import classes from "./info.module.scss";
import ChevronRight from "~/public/etiketka-page/chevron-compact-right.svg";
import Star from "~/public/etiketka-page/star-fill.svg";
import ImageContainer from "~/src/shared/ui/image-container";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";
import { SellerI } from "~/src/shared/ui/seller-info/model/seller.interface";

interface Props {
  sellerInfo: SellerI | null;
  loaded: boolean;
  spaceBetween: boolean;
}

export default function SellerInfo({
  sellerInfo,
  loaded,
  spaceBetween,
}: Props) {
  const { push } = useRouter();

  if (!sellerInfo) return null;

  return (
    <div
      onClick={() => {
        push(`/seller/${sellerInfo.id}`);
      }}
      className="cursor svg-hover--black relative"
    >
      <div
        className={`flex-row gap-3 align-center ${spaceBetween ? "space-between" : ""}`}
      >
        <div className="flex-row gap-3 align-center">
          {loaded ? (
            <>
              <ImageContainer
                src={sellerInfo.avatar}
                width={44}
                height={44}
                fixedSize
                radius={12}
                className="border-bg-gray"
              />
              <div className="flex-column gap-1">
                <p
                  className={`gray-2 text-14 semibold second-family underline-front`}
                >
                  {sellerInfo.name}
                </p>
                <div className="flex-row gap-6px align-center">
                  <Star />
                  <p className="gray-2 text-12 regular nowrap-text second-family">
                    {sellerInfo.rating}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <>
              <SkeletonWrapper className={classes.image_skeleton} />
              <SkeletonWrapper className={classes.text_skeleton} />
            </>
          )}
        </div>
        <ChevronRight className={`svg-hover`} />
      </div>
    </div>
  );
}
