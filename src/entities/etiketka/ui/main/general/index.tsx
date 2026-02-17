"use client";

import { useAppSelector } from "~/src/app/store/hooks";
import { selectNavigation } from "~/src/app/store/reducers/navigation.slice";

import classes from "./general.module.scss";
import CharacteristicsSection from "./characteristics";
import EtiketkaMainContainer from "../../container";
import { ISpecification } from "~/src/entities/etiketka/model";

interface Props {
  name: string;
  characteristics: ISpecification[];
}

export default function EtiketkaGeneral({ name, characteristics }: Props) {
  const { loaded } = useAppSelector(selectNavigation);

  return (
    <EtiketkaMainContainer
      className={`flex-column gap-7 padding-20 ${classes.container}`}
    >
      <h1
        className={`${loaded ? "black" : "white"} text-24 bold second-family`}
      >
        {name}
      </h1>
      {Array.isArray(characteristics) && (
        <CharacteristicsSection
          characteristics={characteristics}
          loaded={loaded}
        />
      )}
    </EtiketkaMainContainer>
  );
}
