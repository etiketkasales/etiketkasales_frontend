"use client";
import React, { useState } from "react";

import classes from "./characteristics.module.scss";
import CharacteristicsButton from "./button";
import SkeletonWrapper from "~/src/shared/ui/skeleton/ui";
import { CharacterI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  characteristics: CharacterI[];
  loaded: boolean;
}

export default function CharacteristicsSection({
  characteristics,
  loaded,
}: Props) {
  const [viewAll, setViewAll] = useState<boolean>(false);
  const skeletons = Array(5).fill("");

  return (
    <div className={`flex-column gap-3 ${classes.container}`}>
      <ul className="flex-column gap-3">
        {loaded
          ? characteristics
              .slice(0, viewAll ? characteristics.length : 5)
              .map((item, index) => {
                return (
                  <li
                    key={index}
                    className={`flex-row gap-1 space-between ${classes.item}`}
                  >
                    <p
                      className={`text-16 regular second-family gray-2 ${classes.text}`}
                    >
                      {item.title}
                    </p>
                    <span className={classes.dots}></span>
                    <p
                      className={`text-16 regular second-family black ${classes.text}`}
                    >
                      {item.value}
                    </p>
                  </li>
                );
              })
          : skeletons.map((_, index) => {
              return (
                <SkeletonWrapper
                  key={index}
                  className={classes.item_skeleton}
                />
              );
            })}
      </ul>
      {characteristics.length > 5 && (
        <CharacteristicsButton viewAll={viewAll} setViewAll={setViewAll} />
      )}
    </div>
  );
}
