"use client";
import React, { useState } from "react";

import classes from "./characteristics.module.scss";
import CharacteristicsButton from "./button";
import { CharacterI } from "~/src/entities/etiketka/model/etiketka.interface";

interface Props {
  characteristics: CharacterI[];
  loaded: boolean;
}

export default function CharacteristicsSection({ characteristics }: Props) {
  const [viewAll, setViewAll] = useState<boolean>(false);

  return (
    <div className={`flex-column gap-3 ${classes.container}`}>
      <ul className="flex-column gap-3">
        {characteristics
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
          })}
      </ul>
      {characteristics.length > 5 && (
        <CharacteristicsButton viewAll={viewAll} setViewAll={setViewAll} />
      )}
    </div>
  );
}
