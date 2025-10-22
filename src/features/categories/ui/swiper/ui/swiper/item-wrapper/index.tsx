"use client";
import React from "react";

import CatalogueItemWrapper from "./catalogue";
import HomeItemWrapper from "./home";
import { CategorySwiperT } from "~/src/features/categories/model/categories.interface";

export interface IBaseWrapperProps {
  itemId: string | null;
  children: React.ReactNode;
  className?: string;
  clickAction?: "toggle" | "clear";
  onClick?: () => void;
}
interface Props extends IBaseWrapperProps {
  type: CategorySwiperT;
}

export default function ItemWrapper({
  children,
  itemId,
  type,
  className,
  clickAction,
  onClick,
}: Props) {
  switch (type) {
    default:
    case "home":
      return (
        <HomeItemWrapper
          itemId={itemId}
          className={className}
          onClick={onClick}
        >
          {children}
        </HomeItemWrapper>
      );
    case "catalogue":
      return (
        <CatalogueItemWrapper
          itemId={itemId}
          className={className}
          clickAction={clickAction}
          onClick={onClick}
        >
          {children}
        </CatalogueItemWrapper>
      );
  }
}
