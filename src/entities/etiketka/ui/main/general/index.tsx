"use client";
import React from "react";
import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import classes from "./general.module.scss";
import CharacteristicsSection from "./characteristics";
import EtiketkaMainContainer from "../../container";
import { CharacterI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  name: string;
  characteristics: CharacterI[];
}

export default function EtiketkaGeneral({ name, characteristics }: Props) {
  const { loaded } = useAppSelector(selectNavigation);

  if (!characteristics || !characteristics.length) return null;
  return (
    <EtiketkaMainContainer
      className={`flex-column gap-7 padding-20 ${classes.container}`}
    >
      <h1
        className={`${loaded ? "black" : "white"} text-24 bold second-family`}
      >
        {loaded
          ? name
          : `Термоэтикетки 58х60 мм, 500 шт. в рулоне, белые, ЭКО, 10 рулонов`}
      </h1>
      <CharacteristicsSection
        characteristics={characteristics}
        loaded={loaded}
      />
    </EtiketkaMainContainer>
  );
}
