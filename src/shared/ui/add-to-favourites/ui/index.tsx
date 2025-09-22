"use client";
import React from "react";
import { useFavourites } from "../lib/useFavourites.hook";

import classes from "./add-to-favourites.module.scss";
import Heart from "~/public/etiketka-page/heart.svg";
import Button from "~/src/shared/ui/button";
import { EtiketkaI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  item?: EtiketkaI;
}

export default function AddToFavourites({ item }: Props) {
  const { handleAddEtiketka, handleDeleteEtiketka, isInFavourites } =
    useFavourites({ item });

  return (
    <Button
      typeButton="ghost"
      size="3"
      onClick={() => {
        if (isInFavourites) {
          handleDeleteEtiketka();
        } else {
          handleAddEtiketka();
        }
      }}
      title={isInFavourites ? "Убрать из избранного" : "В избранное"}
    >
      <Heart className={isInFavourites ? classes.active : ""} />
    </Button>
  );
}
