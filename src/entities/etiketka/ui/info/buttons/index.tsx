"use client";

import classes from "./buttons.module.scss";
import Button from "~/src/shared/ui/button";
import { CurrentIndexI } from "~/src/entities/etiketka/model";
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
              typeButton={isActive ? "yellow-200" : "gray"}
              radius={16}
              onClick={() => {
                setCurrentIndex(item.action);
              }}
              className={classes.item}
              justifyCenter={false}
              needActiveScale={false}
            >
              <span className={`text-body xl just-self-start`}>
                {item.title}
              </span>
            </Button>
          </li>
        );
      })}
    </ul>
  );
}
