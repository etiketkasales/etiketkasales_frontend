"use client";
import React from "react";

import classes from "./buttons.module.scss";
import Button from "~/src/shared/ui/button";
import { CurrentIndexI } from "~/src/entities/etiketka/model/etiketka.interface";
import { etiketkaButtonsC } from "~/src/entities/etiketka/model/etiketka.const";

interface Props {
  currentIndex: CurrentIndexI;
  setCurrentIndex: React.Dispatch<React.SetStateAction<CurrentIndexI>>;
}

export default function EtiketkaInfoButtons({
  currentIndex,
  setCurrentIndex,
}: Props) {
  return (
    <ul className={`flex-column gap-3 ${classes.container}`}>
      {etiketkaButtonsC.map((item, index) => {
        const isActive = currentIndex === item.action;
        return (
          <li key={index}>
            <Button
              key={index}
              typeButton={isActive ? "light-yellow" : "bg-gray"}
              size="16"
              radius={16}
              onClick={() => {
                setCurrentIndex(item.action);
              }}
              className={classes.item}
              justifyCenter={false}
              needActiveScale={false}
            >
              <span
                className={`text-16 semibold second-family just-self-start ${isActive ? "yellow-dark-2" : "gray-2"}`}
              >
                {item.title}
              </span>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
