"use client";
import React, { useState } from "react";

import classes from "./filters-modal.module.scss";
import Icon from "~/public/catalogue/filters.svg";
import CurrentFiltersItemWrapper from "../item-wrapper";
import FullscreenModal from "~/src/shared/ui/modals/ui/fullscreen";
import ProductsFilters from "~/src/features/filters/ui";
import FitlersModalButtons from "./buttons";

export default function CatalogueFiltersModal() {
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
        <ProductsFilters className={classes.filters} />
      </FullscreenModal>
    </>
  );
}
