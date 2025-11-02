"use client";
import React, { useState } from "react";

import classes from "./filters-modal.module.scss";
import Icon from "~/public/catalogue/filters.svg";
import CurrentFiltersItemWrapper from "../item-wrapper";
import FullscreenModal from "~/src/shared/ui/fullscreen-modal/ui";
import ProductsFilters from "~/src/features/filters/ui";
import { IFilters } from "~/src/features/filters/model";
import FitlersModalButtons from "./buttons";

interface Props {
  initFilters: IFilters;
}

export default function CatalogueFiltersModal({ initFilters }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <CurrentFiltersItemWrapper
        as={"button"}
        type="neutral"
        onClick={() => setIsOpen(true)}
        className={classes.container}
      >
        <Icon />
      </CurrentFiltersItemWrapper>
      <FullscreenModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Фильтры"
        bottomChild={<FitlersModalButtons onClose={() => setIsOpen(false)} />}
      >
        <ProductsFilters
          initFilters={initFilters}
          className={classes.filters}
        />
      </FullscreenModal>
    </>
  );
}
