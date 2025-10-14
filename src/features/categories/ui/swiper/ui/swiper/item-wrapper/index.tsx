"use client";
import React from "react";

import CatalogueItemWrapper from "./catalogue";
import HomeItemWrapper from "./home";
import { CategorySwiperT } from "~/src/features/categories/model/categories.interface";

export interface IBaseWrapperProps {
  itemId: string;
  children: React.ReactNode;
  className?: string;
}
interface Props extends IBaseWrapperProps {
  type: CategorySwiperT;
}

export default function ItemWrapper({
  children,
  itemId,
  type,
  className,
}: Props) {
  switch (type) {
    default:
    case "home":
      return (
        <HomeItemWrapper itemId={itemId} className={className}>
          {children}
        </HomeItemWrapper>
      );
    case "catalogue":
      return (
        <CatalogueItemWrapper itemId={itemId} className={className}>
          {children}
        </CatalogueItemWrapper>
      );
  }
}
